import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { Role } from "../utility/enums/role.enum";
import { RegisterDto } from "./dto/register.dto";
import { UpdateUser } from "./dto/update.dto";
import { UserValidation } from "./dto/user.validate";
import { UserEntity } from "./entity/user.pg.entity";
import { UserRepository } from "./repo/user.repository";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { FriendRequestDto } from "./dto/frined-request.dto";
import { CreateFriendRequestDto } from "./dto/create-friend-request.dto";
import { UserFriendsRepository } from "./repo/user-friends.repository";
import { UserFriendStatus } from "./payloads/user-friends-status.payload";
import { AcceptRequestDto } from "./dto/accept-request.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(UserFriendsRepository)
        private readonly userFriendsRepository: UserFriendsRepository,
        private readonly authService: AuthService,
    ) {}

    public async register(registerDto: RegisterDto): Promise<UserEntity> {
        const { 
            email,
            password
        } = registerDto;

        const ifUserExists = await this.userRepository.createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne()

        if(ifUserExists) {
            throw new ConflictException(`User with "${email}" email already exists`);
        }

        const salt = await bcrypt.genSalt();
        registerDto.password = await this.hashPassword(password, salt);

        const user = this.userRepository.create(registerDto);
        user.userId = uuid();
        user.salt = salt;

        user.token = await this.authService.generateToken(email, Role.user);
        await user.save();
        return user;
    }

    public async userLogin(userValidation: UserValidation): Promise<{token: string}> {
        const { 
            email,
            password
        } = userValidation;
        
        const user = await this.userRepository.createQueryBuilder('user')
            .where("user.email = :email", {email: email})
            .getOne()
        
        if(!user) {
            throw new BadRequestException('There is no user with that email!');
        }

        if(!await this.validatePassword(password, user)) {
            throw new BadRequestException('You entered wrong credentials!');
        }

        return await this.generateToken(user.email, user.role, user);
    }

    public async findUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findUserById(id);
    }

    public async findUsers(reqParam: any): Promise<any> {
        const {
            firstname,
            lastname,
            age,
        } = reqParam;
        
        const users = await this.userRepository.createQueryBuilder('user')
            .where('user.firstname = :firstname', { firstname })
            .orWhere('user.lastname = :lastname', { lastname })
            .orWhere('user.age = :age', { age })
            .getMany();
        return {
            users
        }
    }

    public async friendRequest(user: UserEntity, friendRequestDto: FriendRequestDto): Promise<any> {
        const {
            userId,
            status 
        } = friendRequestDto
        
        const friend = await this.userRepository.createQueryBuilder('user')
            .where("user.userId = :userId", {userId: userId})
            .getOne()
         
        if(!friend) {
            throw new BadRequestException('There is no user with that email!');
        }

        const createFriendRequestDto: CreateFriendRequestDto = {
            recipient: friend.userId,
            requested: user.userId,
            status: UserFriendStatus.pending,
            requestId: uuid(),
        }

        this.userFriendsRepository.create(createFriendRequestDto);

        return {
            status: createFriendRequestDto.status
        }
    }

    public async acceptRequest(user: UserEntity, acceptRequestDto: AcceptRequestDto): Promise<any> {
        const {
            requestId,
            status
        } = acceptRequestDto;

        const request = await this.userFriendsRepository.createQueryBuilder("userFriend")
            .where("userFriend.requestId = :requestId", { requestId })
            .getOne()

        request.status = status;
        return request;
    }

    public async updateUser(user: UserEntity, updateUser: UpdateUser): Promise<UserEntity> {
        updateUser.role ?
            await Object.assign(user, updateUser, this.generateToken(user.email, updateUser.role, user)) :
            await Object.assign(user, updateUser).save();

        return user;
    }

    public async validatePassword(password: string ,user: UserEntity): Promise<boolean> {
        const hash = await bcrypt.hash(password, user.salt);
        return hash === user.password;
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public async generateToken(email: string, role: Role, user: UserEntity): Promise<{token: string}> {
        const token = await this.authService.generateToken(email, role);
        user.token = token;
        await user.save();
        return {token};
    }
}
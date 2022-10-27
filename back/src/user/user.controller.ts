import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./entity/user.pg.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import { UserValidation } from "./dto/user.validate";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/guards/jwt.auth.guard";
import { Roles } from "../utility/decorators/roles.decorator";
import { Role } from "../utility/enums/role.enum";
import { RolesGuard } from "../utility/guards/roles.guard";
import { User } from "../auth/guards/user.decorator";
import { UpdateUser } from "./dto/update.dto";
import { FriendRequestDto } from "./dto/frined-request.dto";
import { AcceptRequestDto } from "./dto/accept-request.dto";

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe(
        {
            transform: true,
            whitelist: true
        }
    ))
    public async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<UserEntity> {
        return this.userService.register(registerDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    public async userLogin(@Body() userValidation: UserValidation): Promise<{token: string}> {
        return this.userService.userLogin(userValidation);
    }

    @Get('/logout')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    logOut(@Req() req) {
      req.logout();
    }

    @Get('/user/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.user)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    public async findUserById(@Param('id' ,ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }

    @Get('/user')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.user)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    public async findUsers(@Query() reqParam: any): Promise<any> {
        return this.userService.findUsers(reqParam);
    }

    @Post('/updateUser')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        // whitelist: true,
        transform: true
    }))
    public async  updateUser(@Body() updateUser: UpdateUser, @User() user: UserEntity): Promise<UserEntity> {
        return this.userService.updateUser(user, updateUser);
    }

    @Post('/friendRequest')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        // whitelist: true,
        transform: true
    }))
    public async friendRequest(@Body() friendRequestDto: FriendRequestDto, @User() user: UserEntity): Promise<UserEntity> {
        return this.userService.friendRequest(user, friendRequestDto);
    }

    @Post('/acceptRequest')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        // whitelist: true,
        transform: true
    }))
    public async acceptRequest(@Body() acceptRequestDto: AcceptRequestDto, @User() user: UserEntity): Promise<UserEntity> {
        return this.userService.acceptRequest(user, acceptRequestDto);
    }
}
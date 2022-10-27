import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.pg.entity";

@EntityRepository(UserEntity) 
export class UserRepository extends Repository<UserEntity> {
    public async findUserById(id: number): Promise<UserEntity> {
        const user = await this.createQueryBuilder("user")
            .where("user.id = :id", {id: id})
            .getOne()
        
        if(!user) {
            throw new BadRequestException('There is no user with that id!');
        }

        return user;
    }
}
import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserFriendsEntity } from "../entity/user-friends.pg.entity";

@EntityRepository(UserFriendsEntity) 
export class UserFriendsRepository extends Repository<UserFriendsEntity> {
    
}
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UserFriendStatus } from "../payloads/user-friends-status.payload";

export class FriendRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: UserFriendStatus
}
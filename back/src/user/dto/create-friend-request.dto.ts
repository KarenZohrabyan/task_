import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UserFriendStatus } from "../payloads/user-friends-status.payload";

export class CreateFriendRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    recipient: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requested: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: UserFriendStatus

    @IsNotEmpty()
    @IsString()
    requestId: string
}
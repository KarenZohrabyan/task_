import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UserFriendStatus } from "../payloads/user-friends-status.payload";

export class AcceptRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    requestId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: UserFriendStatus
}
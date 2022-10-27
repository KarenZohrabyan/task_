import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../../utility/enums/role.enum";

export class RegisterDto {
    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    firstname: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    lastname: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    role: Role;
}
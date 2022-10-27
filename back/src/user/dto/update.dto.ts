import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../utility/enums/role.enum";

export class UpdateUser {
    @ApiProperty()
    public firstname: string;

    @ApiProperty()
    public lastname: string;
    
    @ApiProperty()
    public role: Role
}
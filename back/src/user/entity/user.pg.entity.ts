import { Exclude } from "class-transformer";
// import { Role } from "src/utility/enums/role.enum";
import { Role } from "../../utility/enums/role.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
@Unique(['email'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar', nullable: true})
    public firstname: string;

    @Column({type: 'varchar', nullable: true})
    public lastname: string;

    @Column({type: 'varchar', nullable: true})
    public age: number;

    @Column({type: 'varchar'})
    public userId: string;

    @Column({type: 'varchar'})
    public email: string;
 
    @Column({type: 'varchar'})
    @Exclude()
    public password: string;

    @Column({type: 'varchar'})
    public token: string;

    @Column({ type: 'varchar'})
    public role: Role = Role.user;

    @Column({type: 'varchar'})
    @Exclude()
    public salt: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}
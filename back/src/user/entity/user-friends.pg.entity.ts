import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserFriendStatus } from "../payloads/user-friends-status.payload";

@Entity({name: 'user-friends'})
export class UserFriendsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public recipient: string;

    @Column({type: 'varchar'})
    public requested: string;

    @Column({type: 'varchar'})
    public status: UserFriendStatus;

    @Column({type: 'varchar'})
    public requestId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
    
    constructor(partial: Partial<UserFriendsEntity>) {
        super();
        Object.assign(this, partial);
    }
}
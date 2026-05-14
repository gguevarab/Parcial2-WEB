import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, nullable: false })
    role_name: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}

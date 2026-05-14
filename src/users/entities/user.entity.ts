import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}

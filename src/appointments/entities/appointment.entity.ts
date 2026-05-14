import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    client_id: string;

    @Column({ type: 'uuid', nullable: false })
    doctor_id: string;

    @Column()
    reason: string;

    @Column({ type: 'timestamp', nullable: false })
    datetime: Date;

    @Column({ type: 'enum', enum: ['pending', 'cancelled', 'done'], default: 'pending' })
    status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: 'client_id' })
    user: User;

    @ManyToOne(() => User, (user) => user.doctors)
    @JoinColumn({ name: 'doctor_id' })
    doctor: User;
}

import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

async function seed() {
    const configService = new ConfigService();
    
    const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Role],
        synchronize: false,
    });

    await dataSource.initialize();

    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);

    // Create Roles
    console.log('Creating roles...');
    const adminRole = roleRepository.create({
        role_name: 'ADMIN',
        description: 'Administrator with full access',
    });
    const userRole = roleRepository.create({
        role_name: 'USER',
        description: 'Regular user with limited access',
    });

    await roleRepository.save([adminRole, userRole]);

    // Create Users
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const adminUser = userRepository.create({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        phone: '123456789',
        roles: [adminRole],
    });

    const regularUser = userRepository.create({
        email: 'user@example.com',
        password: hashedPassword,
        name: 'Regular User',
        phone: '987654321',
        roles: [userRole],
    });

    await userRepository.save([adminUser, regularUser]);

    console.log('Seeding completed successfully!');
    await dataSource.destroy();
}

seed().catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
});

import 'dotenv/config';
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';

const configModule = ConfigModule.forRoot({ envFilePath: '.env' });
const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
    migrations: ["src/migrations/*.ts", "dist/migrations/*.js"],
    subscribers: ["src/subscriber/*.ts", "dist/subscriber/*.js"],
});

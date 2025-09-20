import 'dotenv/config';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();
const nodeEnv = configService.get<string>('NODE_ENV');
const host = configService.get<string>('DATABASE_HOST', 'localhost');
const port = configService.get<number>('DATABASE_PORT', 5432);
const schema = configService.get<string>('DATABASE_SCHEMA', 'public');
const username = configService.get<string>('DATABASE_USERNAME', 'admin');
const password = configService.get<string>('DATABASE_PASSWORD', 'admin');
const database = configService.get<string>(
  'DATABASE_NAME',
  'libraryManagementDB',
);
const logging = configService.get<boolean>('DATABASE_LOGGING', true);

const sourcePath = nodeEnv === 'production' ? 'dist' : 'src';

const dataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  schema,
  entities: [join(process.cwd(), sourcePath, '**/!(base).entity{.ts,.js}')],
  migrations: [join(process.cwd(), sourcePath, `**/migrations/*.ts`)],
  logging,
});

export default dataSource;

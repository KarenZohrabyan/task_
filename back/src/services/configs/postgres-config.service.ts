import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  schema: 'public',
  port: 5432,
  username: 'postgres',
  password: '11111',
  database: 'pharmacy',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  // synchronize: false,
  migrationsTableName: 'mig_table',
  migrations: [
      'dist/src/db/migrations/*js',
  ],
  cli: {
      migrationsDir: 'src/migrations'
  }
}
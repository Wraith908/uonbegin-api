import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfoModule } from './info/info.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    InfoModule,
    CommonModule,
    AuthModule]
})
export class AppModule {}

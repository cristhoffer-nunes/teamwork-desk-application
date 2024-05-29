import { Module } from '@nestjs/common';
import { DeskModule } from './desk/desk.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DeskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

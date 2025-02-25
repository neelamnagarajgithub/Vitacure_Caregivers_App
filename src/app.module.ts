import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './mailer/mailer.module';
import { CaregiversModule } from './caregivers/caregivers.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestsModule } from './requests/requests.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MailerModule, CaregiversModule, AppointmentsModule, PrismaModule, RequestsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

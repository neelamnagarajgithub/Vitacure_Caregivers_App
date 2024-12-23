import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CaregiversController } from './caregivers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [CaregiversService],
  controllers: [CaregiversController]
})
export class CaregiversModule {}

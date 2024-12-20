import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaregiversService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.caregiver.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    const token = this.jwtService.sign({ userId: user.id });
    return { token,user };
  }

  async login(data: any) {
    const user = await this.prisma.caregiver.findUnique({ where: { username: data.username } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error('Invalid password');

    const token = this.jwtService.sign({ userId: user.id });
    return { token ,user};
  }
  
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
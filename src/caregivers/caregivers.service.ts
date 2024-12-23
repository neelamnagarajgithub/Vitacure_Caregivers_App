import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaregiverDto } from './dto/cargiver.dto';

@Injectable()
export class CaregiversService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(createCaregiverDto: CreateCaregiverDto) {
    const { username, password, email, firstName, lastName, category, latitude, longitude,typeofcare } = createCaregiverDto;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the caregiver in the database
    const caregiver = await this.prisma.caregiver.create({
      data: {
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        category,
        latitude,
        longitude,
        typeofcare// replace 'defaultType' with the appropriate value
      },
    });
    const token = this.jwtService.sign({ userId: caregiver.id });

    return { token, caregiver };
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

  async updateLocation(caregiverId: number, latitude: number, longitude: number) {
    return this.prisma.caregiver.update({
      where: { id: caregiverId },
      data: {
      latitude,
      longitude,
      },
    } as any);
  }
}

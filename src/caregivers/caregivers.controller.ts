import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Post('signup')
  async signup(@Body() data: any) {
    return this.caregiversService.signup(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    return this.caregiversService.login(data);
  }
}
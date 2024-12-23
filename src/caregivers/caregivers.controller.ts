import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CaregiversService } from './caregivers.service';
import { CreateCaregiverDto } from './dto/cargiver.dto';

@Controller('caregivers')
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Post('signup')
  signup(@Body() createCaregiverDto: CreateCaregiverDto) {
    return this.caregiversService.signup(createCaregiverDto);
  }
  
  @Post('login')
  async login(@Body() data: any) {
    return this.caregiversService.login(data);
  }
  
}
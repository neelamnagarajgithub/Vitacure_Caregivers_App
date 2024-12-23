import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { haversineDistance } from './utils/haversine';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    const {userid, typeofcare, latitude, longitude, specification } = createRequestDto;

    const caregivers = await this.prisma.caregiver.findMany({
      where: {
        category: specification,
        typeofcare: typeofcare,
      },
    });
    //console.log('Caregivers:', caregivers);
    const maxDistance = 10; 
    const nearbyCaregivers = caregivers.filter(caregiver => {
      const distance = haversineDistance(latitude, longitude, caregiver.latitude, caregiver.longitude);
      return distance <= maxDistance;
    });
    console.log('Nearby Caregivers:', nearbyCaregivers);

    const requests = await Promise.all(
      nearbyCaregivers.map(caregiver =>
        this.prisma.request.create({
          data: {
            userid,
            typeofcare,
            latitude,
            longitude,
            specification,
            caregiverId: caregiver.id,
          },
        }),
      ),
    );

    return requests;
  }
  async acceptRequest(requestId: number) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new Error('Request not found');
    }
    const serviceid=await this.prisma.service.findUnique({
      where:{name: request.typeofcare},
    });
    const appointment = await this.prisma.appointment.create({
      data: {
        caregiverId: request.caregiverId,
        serviceId: serviceid.id,
        userid: request.userid, 
        appointmentDate: new Date(), 
        durationHours: 1, 
        status: 'CONFIRMED',
      },
    });

    await this.prisma.request.delete({
      where: { id: requestId },
    });

    return appointment;
  }
}
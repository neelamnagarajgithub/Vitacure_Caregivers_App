import { CaregiverCategory, typeOfCare } from '@prisma/client';

export class CreateCaregiverDto {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  category: CaregiverCategory;
  latitude: number;
  longitude: number;
  typeofcare: typeOfCare;
}
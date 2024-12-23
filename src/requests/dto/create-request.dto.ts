import { CaregiverCategory, typeOfCare } from '@prisma/client';

export class CreateRequestDto {
  userid:number;
  typeofcare: typeOfCare;
  latitude: number;
  longitude: number;
  specification: CaregiverCategory;
}
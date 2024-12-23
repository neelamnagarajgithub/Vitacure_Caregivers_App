import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const services = [
    { id: 1, name: 'Babysitting', description: 'Taking care of children' },
    { id: 2, name: 'Elderly Care', description: 'Providing care for elderly people' },
    { id: 3, name: 'Nursing', description: 'Medical care provided by a nurse' },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: service,
    });
  }

  console.log('Services populated');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
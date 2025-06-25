import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const senha = 'senha123';
  const hash = await bcrypt.hash(senha, 10);

  await prisma.admin.upsert({
    where: { email: 'tia@delicias.com' },
    update: {},
    create: {
      email: 'tia@delicias.com',
      password: hash,
    },
  });

  console.log('Tia cadastrada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

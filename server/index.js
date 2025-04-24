const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

async function main() {
    const allStudents = await prisma.user.findMany()
    console.log(allStudents)
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

console.log("loading prisma client");
// const prisma = require("../prisma");
const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();
function randomRole() {
  return Math.random() > 0.5 ? UserRole.INSTRUCTOR : UserRole.STUDENT;
}

function randomBoolean() {
  return Math.random() > 0.5;
}

async function seed() {
  for (let index = 0; index < 10; index++) {
    const user = await prisma.user.create({
      data: {
        email: `user${index}@example.com`,
        name: `user${index}`,
        role: randomRole(),
      },
    });
    await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        prisma.post.create({
          data: {
            title: `post ${index + 1} by ${user.name}`,
            content: `this is the content of the post ${index + 1}`,
            published: randomBoolean(),
            author: { connect: { id: user.id } },
          },
        })
      )
    );
  }
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
// Clear and repopulate the database.

// const { faker } = require("@faker-js/faker");

// async function seed() {
//   console.log("Seeding the database.");
//   try {
//     // Clear the database.
//     await db.query("DROP TABLE IF EXISTS student, instructor;");

//     // Recreate the tables
//     await db.query(`
//       CREATE TABLE instructor (
//         id SERIAL PRIMARY KEY,
//         username TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL
//       );
//       CREATE TABLE student (
//         id SERIAL PRIMARY KEY,
//         name TEXT NOT NULL,
//         cohort TEXT NOT NULL,
//         instructorId INTEGER NOT NULL REFERENCES instructor(id) ON DELETE CASCADE
//       );
//     `);

//     // Add 5 instructors.
//     await Promise.all(
//       [...Array(5)].map(() =>
//         db.query(
//           `INSERT INTO instructor (username, password) VALUES ($1, $2);`,
//           [faker.internet.userName(), faker.internet.password()]
//         )
//       )
//     );

//     // Add 4 students for each instructor.
//     await Promise.all(
//       [...Array(20)].map((_, i) =>
//         db.query(
//           `INSERT INTO student (name, cohort, instructorId) VALUES ($1, $2, $3);`,
//           [
//             faker.person.fullName(),
//             faker.number.int({ min: 2000, max: 3000 }),
//             (i % 5) + 1,
//           ]
//         )
//       )
//     );

//     console.log("Database is seeded.");
//   } catch (err) {
//     console.error(err);
//   }
// }

// Seed the database if we are running this file directly.
// if (require.main === module) {
//   seed();
// }

module.exports = seed;

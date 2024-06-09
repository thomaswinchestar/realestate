const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

const generateFakeData = async (numProperties) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "realestate",
  });

  for (let i = 0; i < numProperties; i++) {
    const [result] = await connection.execute(
      "INSERT INTO properties (project_name, short_title, price, bedroom_count, area, short_description) VALUES (?, ?, ?, ?, ?, ?)",
      [
        faker.company.name(),
        faker.lorem.sentence(),
        faker.number.float({ min: 100000, max: 1000000, precision: 2 }), // Replaced with faker.number.float()
        faker.number.int({ min: 1, max: 5 }), // Replaced with faker.number.int()
        faker.number.int({ min: 500, max: 5000 }), // Replaced with faker.number.int()
        faker.lorem.paragraph(),
      ]
    );

    for (let j = 0; j < 5; j++) {
      await connection.execute(
        "INSERT INTO property_images (property_id, image_url) VALUES (?, ?)",
        [result.insertId, faker.image.imageUrl()]
      );
    }
  }

  await connection.end();
};

generateFakeData(10000)
  .then(() => console.log("Data generated"))
  .catch(console.error);

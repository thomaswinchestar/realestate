import { gql } from "apollo-server-micro";
import mysql from "mysql2/promise";

const typeDefs = gql`
  type Property {
    id: ID!
    project_name: String!
    short_title: String!
    price: Float!
    bedroom_count: Int!
    area: Float!
    short_description: String!
    images: [String!]!
  }

  type Query {
    properties(
      type: String
      priceRange: [Float]
      bedroomCount: Int
      areaRange: [Float]
    ): [Property]
  }
`;

const resolvers = {
  Query: {
    properties: async (_, { type, priceRange, bedroomCount, areaRange }) => {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "realestate",
      });

      let query =
        "SELECT p.*, pi.image_url FROM properties p JOIN property_images pi ON p.id = pi.property_id WHERE 1 = 1";
      const params = [];

      if (type) {
        query += " AND p.type = ?";
        params.push(type);
      }

      if (priceRange && priceRange.length === 2) {
        query += " AND p.price BETWEEN ? AND ?";
        params.push(priceRange[0], priceRange[1]);
      }

      if (bedroomCount) {
        query += " AND p.bedroom_count = ?";
        params.push(bedroomCount);
      }

      if (areaRange && areaRange.length === 2) {
        query += " AND p.area BETWEEN ? AND ?";
        params.push(areaRange[0], areaRange[1]);
      }

      const [results] = await connection.execute(query, params);

      const propertiesMap = new Map();
      results.forEach((row) => {
        if (!propertiesMap.has(row.id)) {
          propertiesMap.set(row.id, {
            ...row,
            images: [],
          });
        }
        propertiesMap.get(row.id).images.push(row.image_url);
      });

      return Array.from(propertiesMap.values());
    },
  },
};

export { typeDefs, resolvers };

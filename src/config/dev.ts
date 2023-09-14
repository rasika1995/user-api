import { Config } from "src/types/common/config";

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  env: process.env.NODE_ENV || "dev",
  baseUrl: "http://localhost:3000",
  db: {
    user: "postgres",
    password: "12345678",
    host: "localhost",
    port: 5432,
    database: "mortru",
  },
  jwt: {
    secretKey: "your-secret-key",
  },
  aws: {
    ses: {
      accessKeyId: "AKIASZMOLL6NOTRBB56L",
      secretAccessKey: "AwoCqwOlCMgCLYV2H8OwKRWxJLfPA9c/dN55rNAK",
      region: "eu-north-1",
      verifedEmailOrDomain: "akh.rasika.priyadarshani@gmail.com",
    },
  },
};

export default config;

export interface Config {
  port: number;
  env: string;
  baseUrl: string;
  db: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
  jwt: {
    secretKey: string;
  };
  aws: {
    ses: {
      verifedEmailOrDomain: string;
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
    };
  };
}

import devConfig from "./dev";
import prodConfig from "./prod";

const env = process.env.NODE_ENV || "dev";

const config = env === "prod" ? prodConfig : devConfig;

export default config;

import dotenv from "dotenv";
dotenv.config();
const config = {
  get: (key: string) => {
    return process.env[key];
  },
  getSecret: () => {
    return "app-secret";
  }
};
export default config;

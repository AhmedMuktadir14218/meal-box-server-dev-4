import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  database_url: process.env.MONGODB_URI,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "12",
  client_url: process.env.FRONTEND_URL,
  jwt_secret: process.env.JWT_SECRET || "fallback_secret",
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "1h",
  cookie_expires_in: process.env.COOKIE_EXPIRES_IN || "30",
};

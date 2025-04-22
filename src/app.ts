import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./app/modules/user/user.route";
import { authRouter } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { mealProviderRouter } from "./app/modules/mealProvider/mealPrvider.route";
import { orderRouter } from "./app/modules/Order/order.routes";
import { MealRouter } from "./app/modules/mealMenu/menu.route";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/meals', mealProviderRouter);
app.use('/api/v1/meals', MealRouter);
app.use('/api/v1/orders', orderRouter);
// Global error handler
app.use(errorHandler);

export default app;

// src/app/modules/mealProvider/route/mealProvider.route.ts
import express from 'express';
import { MealProviderController } from './mealPrvider.controller';

const router = express.Router();

router.put('/profile', MealProviderController.updateProfile);

export const mealProviderRouter = router;

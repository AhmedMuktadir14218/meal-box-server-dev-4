// src/app/modules/mealMenu/route/mealMenu.route.ts
import express from 'express';
import auth from '../../../middleware/auth.middleware';
import { MealMenuController } from './meal.controller';

const router = express.Router();

router.post('/' , MealMenuController.createMeal);
router.put('/:mealId', auth('provider'), MealMenuController.updateMeal);
router.delete('/:mealId', auth('provider'), MealMenuController.deleteMeal);
router.get('/provider/:providerId', auth('provider'), MealMenuController.getProviderMeals);


export const MealRouter = router;

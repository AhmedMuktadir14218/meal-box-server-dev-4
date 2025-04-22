// src/app/modules/mealMenu/controller/mealMenu.controller.ts
import { Request, Response } from 'express';
import { MealMenuService } from './menu.service';

const createMeal = async (req: Request, res: Response) => {
  try {
    const meal = await MealMenuService.createMeal(req.body);
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const meal = await MealMenuService.updateMeal(req.params.mealId, req.body);
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    await MealMenuService.deleteMeal(req.params.mealId);
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

const getProviderMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealMenuService.getProviderMeals(req.params.providerId);
    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const MealMenuController = {
  createMeal,
  updateMeal,
  deleteMeal,
  getProviderMeals,
};
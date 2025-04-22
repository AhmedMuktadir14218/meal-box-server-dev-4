// src/app/modules/mealProvider/controller/mealProvider.controller.ts
import { Request, Response } from 'express';
import { MealProviderService } from './mealPrvider.service';

const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await MealProviderService.createOrUpdateProfile(req.body);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const MealProviderController = {
  updateProfile,
};
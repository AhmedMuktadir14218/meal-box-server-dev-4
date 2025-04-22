// src/app/modules/mealMenu/service/mealMenu.service.ts
import { MealMenu, IMealMenu } from '../mealMenu/menu.model';
import mongoose from 'mongoose';


const createMeal = async (mealData: Partial<IMealMenu>): Promise<IMealMenu> => {
    return await MealMenu.create(mealData);
  };
  
  const updateMeal = async (mealId: string, mealData: Partial<IMealMenu>): Promise<IMealMenu | null> => {
    return await MealMenu.findByIdAndUpdate(mealId, mealData, { new: true });
  };
  
  const deleteMeal = async (mealId: string): Promise<IMealMenu | null> => {
    return await MealMenu.findByIdAndDelete(mealId);
  };
  
  const getProviderMeals = async (providerId: string): Promise<IMealMenu[]> => {
    return await MealMenu.find({ providerId: new mongoose.Types.ObjectId(providerId) });
  };
  
  export const MealMenuService = {
    createMeal,
    updateMeal,
    deleteMeal,
    getProviderMeals,
    getMealById: async (mealId: string): Promise<IMealMenu | null> => {
        return await MealMenu.findById(mealId);
  };
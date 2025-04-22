// src/app/modules/mealProvider/service/mealProvider.service.ts
import { MealProvider, IMealProvider } from '../mealProvider/mealPrvider.model';

const createOrUpdateProfile = async (providerData: IMealProvider): Promise<IMealProvider | null> => {
  const { userId, cuisineSpecialties, pricing, experience, availability } = providerData;
  return await MealProvider.findOneAndUpdate(
    { userId },
    { cuisineSpecialties, pricing, experience, availability },
    { new: true, upsert: true }
  );
};

export const MealProviderService = {
  createOrUpdateProfile,
};
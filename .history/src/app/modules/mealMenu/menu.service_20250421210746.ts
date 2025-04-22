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
    I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/app/modules/mealMenu/meal.controller.ts:17:42 - error TS2339: Property 'getMealById' does not exist on type '{ createMeal: (mealData: Partial<IMealMenu>) => Promise<IMealMenu>; updateMeal: (mealId: string, mealData: Partial<IMealMenu>) => Promise<...>; deleteMeal: (mealId: string) => Promise<...>; getProviderMeals: (providerId: string) => Promise<...>; }'.

17       const meal = await MealMenuService.getMealById(req.params.mealId);
                                            ~~~~~~~~~~~
src/app/modules/mealMenu/meal.controller.ts:23:42 - error TS18048: 'req.user' is possibly 'undefined'.

23       if (meal.providerId.toString() !== req.user.id) {
                                            ~~~~~~~~
src/app/modules/mealMenu/meal.controller.ts:37:42 - error TS2339: Property 'getMealById' does not exist on type '{ createMeal: (mealData: Partial<IMealMenu>) => Promise<IMealMenu>; updateMeal: (mealId: string, mealData: Partial<IMealMenu>) => Promise<...>; deleteMeal: (mealId: string) => Promise<...>; getProviderMeals: (providerId: string) => Promise<...>; }'.

37       const meal = await MealMenuService.getMealById(req.params.mealId);
                                            ~~~~~~~~~~~
src/app/modules/mealMenu/meal.controller.ts:43:42 - error TS18048: 'req.user' is possibly 'undefined'.

43       if (meal.providerId.toString() !== req.user.id) {
                                            ~~~~~~~~

    at createTSError (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:859:12)
    at reportTSError (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:863:19)
    at getOutput (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:1077:36)
    at Object.compile (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:1433:41)
    at Module.m._compile (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:1617:30)
    at node:internal/modules/cjs/loader:1706:10
    at Object.require.extensions.<computed> [as .ts] (I:\C backup\ReturnWeb\Full MERN\Assignment 2\MealBox\meal-box-server-dev-4\node_modules\ts-node\src\index.ts:1621:12)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at Function._load (node:internal/modules/cjs/loader:1108:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14) {
  diagnosticCodes: [ 2339, 18048, 2339, 18048 ]
}
[nodemon] app crashed - waiting for file changes before starting...

  };
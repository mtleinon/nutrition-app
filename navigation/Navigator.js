import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SelectNutrientScreen from '../screens/SelectNutrientScreen';
import SelectNutrientWithBarcodeScreen from '../screens/SelectNutrientWithBarcodeScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import MicronutrientScreen from '../screens/MicronutrientScreen';
import MealScreen from '../screens/MealScreen';
import NewMealScreen from '../screens/NewMealScreen';
import PlanScreen from '../screens/PlanScreen';
import NewPlanScreen from '../screens/NewPlanScreen';
import AllPlansScreen from '../screens/AllPlansScreen';
import ConfigureScreen from '../screens/ConfigureScreen';

const AppNavigator = createStackNavigator(
  {
    AllPlans: AllPlansScreen,
    Configure: ConfigureScreen,
    NewPlan: NewPlanScreen,
    Plan: PlanScreen,
    NewMeal: NewMealScreen,
    Meal: MealScreen,
    SelectNutrient: SelectNutrientScreen,
    SelectNutrientWithBarcode: SelectNutrientWithBarcodeScreen,
    Micronutrient: MicronutrientScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(AppNavigator);
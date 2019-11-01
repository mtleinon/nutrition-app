export const en = {
  addNewBarcode: 'Add new barcode',
  addNewMeal: 'Add new meal',
  addNewPlan: 'Add new plan',
  addNutrient: 'Add nutrient',
  AddNutrientToTheMeal: "Add nutrient to the meal",
  allPlans: 'All Plans',
  carb: 'carb',
  clickToAddMeal: 'Click to add meal.',
  configurationScreenTitle: 'Nutrition planner version 0.01',
  description: "Description",
  ener: "ener",
  fet: 'fet',
  found: 'Found ',
  pleaseGiveName: 'Please give name',
  updateMeal: "Update meal",
  updatePlan: "Update plan",
  meal: 'Meal',
  mealHasNoNutrientsYet: 'Meal has no nutrients yet.',
  micronutrientContent: 'Micronutrient Content',
  name: 'Name',
  noAccessToCamera: 'No access to camera',
  noMicronutrientData: 'No micronutrient data',
  noNutrientForTheBarcode: 'No nutrient for the barcode',
  of: 'of',
  plan: 'Plan',
  pleaseScanBarcodeFirst: 'Please read barcode first',
  pleaseSelectNutrientByTouchingANutrientInTheList: 'Please select nutrient by touching a nutrient in the list',
  pleaseSelectNutrient: 'Please select nutrient',
  pleaseUsePhonesCameraToReadBarcode: 'Please use phones camera to read barcode',
  pleaseWriteMealNameToTheField: 'Please write meal name to the field',
  pleaseWritePlanNameToTheField: 'Please write plan name to the field',
  pro: 'pro',
  programVersion: 'This program is used for testing',
  requestingForCameraPermissions: 'Requesting for camera permission',
  scanBarcode: 'Scan barcode',
  searchNutrient: 'Search nutrient:',
  selectNutrient: 'Select nutrient',
  selectNutrientForBarcode: 'Select nutrient for barcode',
  setNewBarcode: "Scan new barcode",
  setNewNutrientForTheBarcode: "Set new nutrient for the barcode",
  setNewNutrientForTheNewBarcode: "Set new nutrient for the new barcode"
};
export const fi = {
  addNewBarcode: 'Lisää uusi viivakoodi',
  addNewMeal: 'Lisää uusi ateria',
  addNewPlan: 'Lisää uusi dietti',
  addNutrient: 'Lisää ravintoaine',
  AddNutrientToTheMeal: "Lisää ravintoaine ateriaan",
  allPlans: 'Kaikki dietit',
  carb: 'hiil',
  clickToAddMeal: 'Paina lisätäksesi aterian.',
  configurationScreenTitle: 'ravintosuunnitelma versio 0.01',
  description: "Sisältö",
  ener: "ener",
  fet: 'rasv',
  found: 'Löydetty ',
  pleaseGiveName: 'Anna nimi',
  updateMeal: "Päivitä ateria",
  updatePlan: "Päivitä dietti",
  meal: 'Ateria',
  mealHasNoNutrientsYet: 'Ateriassa ei ole ravintoaineita vielä',
  micronutrientContent: 'Hivenaineet ja vitamiinit',
  name: 'Nimi',
  noAccessToCamera: 'Kamera ei ole käytettävissä',
  noMicronutrientData: 'Ei ravintoaine tietoja',
  noNutrientForTheBarcode: 'Viivakoodilla ei ole ravintoainetta',
  of: ' ',
  plan: 'Dietti',
  pleaseScanBarcodeFirst: 'Lue ensin viivakoodi',
  pleaseSelectNutrientByTouchingANutrientInTheList: 'Valitse ravintoaine listasta',
  pleaseSelectNutrient: 'Valitse ravintoaine',
  pleaseUsePhonesCameraToReadBarcode: 'Käytä kameraa viivakoodin lukemiseen',
  pleaseWriteMealNameToTheField: 'Kirjoita aterian nimi kenttään',
  pleaseWritePlanNameToTheField: 'Kirjoita dietin nimi kenttään',
  pro: 'pro',
  programVersion: 'Tämä on ohjelman testiversio',
  requestingForCameraPermissions: 'Pyydetään lupaa käyttää puhelimen kameraa',
  scanBarcode: 'Lue viivakoodi',
  searchNutrient: 'Hae ravintoainetta:',
  selectNutrient: 'Valitse ravintoaine',
  selectNutrientForBarcode: 'Valitse ravintoaine viivakoodille',
  setNewBarcode: "Valitse uusi viivakoodi",
  setNewNutrientForTheBarcode: "Valitse uusi ravintoaine viivakoodille",
  setNewNutrientForTheNewBarcode: "Valitse ravintoaine uudelle viivakoodille"
};

const currentLanguage = fi;
export const t = (word) => {
  return currentLanguage[word];
}

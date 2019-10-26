// USDA Nutrient Data Laboratory nutrient data table column information
export default [
  { column: 0, name: { enShort: 'NDB_No' } },
  { column: 1, name: { enShort: 'name' } },
  { column: 2, name: { enShort: 'Water' }, unit: 'g' },
  { column: 3, name: { enShort: 'Food energy' }, unit: 'kcal' },
  { column: 4, name: { enShort: 'Protein' }, unit: 'g' },
  { column: 5, name: { enShort: 'Fat, total lipid' }, unit: 'g' },
  { column: 6, name: { enShort: 'Ash' }, unit: 'g' },
  { column: 7, name: { enShort: 'Carbohydrate' }, unit: 'g' },
  { column: 8, name: { enShort: 'Total dietary fiber' }, unit: 'g' },
  { column: 9, name: { enShort: 'Total sugars' }, unit: 'g' },
  {
    column: 10, name: { enShort: 'Calcium' }, unit: 'mg',
    dri: {
      ai: 1000,
      ul: 2500
    }
  },
  {
    column: 11, name: { enShort: 'Iron' }, unit: 'mg',
    dri: {
      rda: {
        males: 8,
        females: 18
      },
      ai: 1000,
      ul: 45
    }
  },
  {
    column: 12, name: { enShort: 'Magnesium' }, unit: 'mg',
    dri: {
      rda: { males: 420, females: 320 }
    }
  },
  {
    column: 13, name: { enShort: 'Phosphorus' }, unit: 'mg',
    dri: {
      rda: 700,
      ul: 4000
    }
  },
  {
    column: 14, name: { enShort: 'Potassium' }, unit: 'mg',
    dri: {
      ai: 4700
    }
  },
  {
    column: 15, name: { enShort: 'Sodium' }, unit: 'mg',
    dri: {
      ai: 3800,
      ul: 5900
    },
  },
  {
    column: 16, name: { enShort: 'Zinc' }, unit: 'mg',
    dri: {
      rda: { males: 11, females: 8 }
    }
  },
  { column: 17, name: { enShort: 'Copper' }, unit: 'mg' },
  { column: 18, name: { enShort: 'Manganese' }, unit: 'mg' },
  {
    column: 19, name: { enShort: 'Selenium' }, unit: 'yg',
    dri: {
      rda: 55
    }
  },
  {
    column: 20, name: { enShort: 'Vitamin C' }, unit: 'mg',
    dri: {
      rda: { males: 90, females: 75 }
    }
  },
  {
    column: 21, name: { enShort: 'Vitamin B1, Thiamin' }, unit: 'mg',
    dri: {
      rda: { males: 1.2, females: 1.1 }
    }
  },
  {
    column: 22, name: { enShort: 'Vitamin B2, Riboflavin' }, unit: 'mg',
    dri: {
      rda: { males: 1.3, females: 1.1 }
    }
  },
  {
    column: 23, name: { enShort: 'Niacin' }, unit: 'mg',
    dri: {
      rda: { males: 16, females: 14 },
      ul: 35
    }
  },
  { column: 24, name: { enShort: 'Pantothenic acid' }, unit: 'mg' },
  {
    column: 25, name: {
      enShort: 'Vitamin B6',
      dri: {
        rda: 1.3,
        ul: 100
      }
    }, unit: 'mg'
  },
  {
    column: 26, name: { enShort: 'Folate, total' }, unit: 'yg',
    dri: {
      rda: 400
    }
  },
  { column: 27, name: { enShort: 'Folic acid' }, unit: 'yg' },
  { column: 28, name: { enShort: 'Food folate' }, unit: 'yg' },
  { column: 29, name: { enShort: 'Dietary folate equivalents' }, unit: 'yg' },
  { column: 30, name: { enShort: 'Choline, total' }, unit: 'mg' },
  {
    column: 31, name: { enShort: 'Vitamin B12' }, unit: 'yg',
    dri: {
      rda: 2.4
    }
  },
  { column: 32, name: { enShort: 'Vitamin A' }, unit: 'IU' },
  {
    column: 33, name: { enShort: 'Vitamin A retinol activity equivalents' }, unit: 'yg',
    dri: {
      rda: { males: 900, females: 700 }
    }
  },
  { column: 34, name: { enShort: 'Retinol' }, unit: 'yg' },
  { column: 35, name: { enShort: 'Alpha-carotene' }, unit: 'yg' },
  { column: 36, name: { enShort: 'Beta-carotene' }, unit: 'yg' },
  { column: 37, name: { enShort: 'Beta-cryptoxanthin' }, unit: 'yg' },
  { column: 38, name: { enShort: 'Lycopene' }, unit: 'yg' },
  { column: 39, name: { enShort: 'Lutein+zeazanthin' }, unit: 'yg' },
  {
    column: 40, name: { enShort: 'Vitamin E' }, unit: 'mg',
    dri: {
      rda: 15
    }
  },
  {
    column: 41, name: { enShort: 'Vitamin D' }, unit: 'yg',
    dri: {
      rda: 5,
      ul: 50
    }
  },
  { column: 42, name: { enShort: 'Vitamin D' }, unit: 'IU' },
  {
    column: 43, name: { enShort: 'Vitamin K' }, unit: 'yg',
    dri: {
      rda: { males: 120, females: 90 }
    }
  },
  { column: 44, name: { enShort: 'Saturated fatty acid' }, unit: 'g' },
  { column: 45, name: { enShort: 'Monounsaturated fatty acids' }, unit: 'g' },
  { column: 46, name: { enShort: 'Polyunsaturated fatty acids' }, unit: 'g' },
  { column: 47, name: { enShort: 'Cholesterol' }, unit: 'mg' },
  { column: 48, name: { enShort: 'First household weight' }, unit: '-' },
  { column: 49, name: { enShort: 'Description of household weight number 1' }, unit: '-' },
  { column: 50, name: { enShort: 'Second household weight' }, unit: '-' },
  { column: 51, name: { enShort: 'Description of household weight number 2' }, unit: '-' },
  { column: 52, name: { enShort: 'Dummy Description of household weight number 2' }, unit: '-' },
  { column: 53, name: { enShort: 'Dummy Description of household weight number 2' }, unit: '-' },
  { column: 54, name: { enShort: 'Dummy Description of household weight number 2' }, unit: '-' },
]
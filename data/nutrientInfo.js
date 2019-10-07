// Finelli nutrient table header information. Column number identifies the column in the table.

export default [
  { column: 0, name: { fi: 'id' } },
  { column: 1, name: { fi: 'name' } },
  { column: 2, name: { fi: 'energia, laskennallinen (kJ)', fiShort: 'energia', fiShort2: 'energ.' }, unit: 'kJ' },
  { column: 3, name: { fi: 'hiilihydraatti imeytyva (g)', fiShort: 'hiilihydraatti', fiShort2: 'hiil.' }, unit: 'g' },
  { column: 4, name: { fi: 'rasva (g)', fiShort: 'rasva', fiShort2: 'rasva' }, unit: 'g', },
  { column: 5, name: { fi: 'proteiini (g)', fiShort: 'proteiini', fiShort2: 'prot.' }, unit: 'g' },
  { column: 6, name: { fi: 'alkoholi (g)', fiShort: 'alkoholi' }, unit: 'g' },
  { column: 7, name: { fi: 'kuitu, kokonais- (g)', fiShort: 'kuitu' }, unit: 'g' },
  { column: 8, name: { fi: 'orgaaniset hapot (g)', fiShort: 'orgaaniset hapot' }, unit: 'g' },
  { column: 9, name: { fi: 'sokerialkoholi (g)', fiShort: 'sokerialkoholi' }, unit: 'g' },
  { column: 10, name: { fi: 'tarkkelys (g)', fiShort: 'tarkkelys' }, unit: 'g' },
  { column: 11, name: { fi: 'sokerit (g)', fiShort: 'sokerit' }, unit: 'g' },
  { column: 12, name: { fi: 'fruktoosi (g)', fiShort: 'fruktoosi' }, unit: 'g' },
  { column: 16, name: { fi: 'maltoosi (g)', fiShort: 'maltoosi' }, unit: 'g' },
  { column: 13, name: { fi: 'galaktoosi (g)', fiShort: 'galaktoosi' }, unit: 'g' },
  { column: 14, name: { fi: 'glukoosi (g)', fiShort: 'glukoosi' }, unit: 'g' },
  { column: 15, name: { fi: 'laktoosi (g)', fiShort: 'laktoosi' }, unit: 'g' },
  { column: 17, name: { fi: 'sakkaroosi (g)', fiShort: 'sakkaroosi' }, unit: 'g' },
  {
    column: 18,
    name: { fi: 'polysakkaridi, vesiliukoinen ei-selluloosa (g)', fiShort: 'polysakkaridi' },
    unit: 'g'
  },
  { column: 19, name: { fi: 'kuitu veteen liukenematon (g)', fiShort: 'kuitu' }, unit: 'g' },
  { column: 20, name: { fi: 'rasvahapot yhteensa (g)', fiShort: 'rasvahapot' }, unit: 'g' },
  { column: 21, name: { fi: 'rasvahapot monityydyttymättömät (g)', fiShort: 'rasvahapot monityydyttymättömät' }, unit: 'g' },
  {
    column: 22,
    name: { fi: 'rasvahapot yksittaistyydyttymattomat cis (g)', fiShort: 'rasvahapot yksittaistyydyttymättömät' },
    unit: 'g'
  },
  { column: 23, name: { fi: 'rasvahapot tyydyttyneet (g)', fiShort: 'rasvahapot tyydyttyneet' }, unit: 'g' },
  { column: 24, name: { fi: 'rasvahapot trans (g)', fiShort: 'rasvahapot trans' }, unit: 'g' },
  {
    column: 25,
    name: { fi: 'rasvahapot n-3 monityydyttymattomat (g)', fiShort: 'rasvahapot n-3 monityydyttymattomat' },
    unit: 'g'
  },
  {
    column: 26,
    name: { fi: 'rasvahapot n-6 monityydyttymattomat (g)', fiShort: 'rasvahapot n-6 monityydyttymattomat' },
    unit: 'g'
  },
  {
    column: 27,
    name: { fi: 'rasvahappo 18:2 cis,cis n-6 (linolihappo) (mg)', fiShort: 'linolihappo' },
    unit: 'mg'
  },
  {
    column: 28,
    name: { fi: 'rasvahappo 18:3 n-3 (alfalinoleenihappo) (mg)', fiShort: 'alfalinoleenihappo' },
    unit: 'mg'
  },
  { column: 29, name: { fi: 'rasvahappo 20:5 n-3 (EPA) (mg)', fiShort: 'rasvahappo EPA' }, unit: 'mg' },
  { column: 30, name: { fi: 'rasvahappo 22:6 n-3 (DHA) (mg)', fiShort: 'rasvahappo DHA' }, unit: 'mg' },
  { column: 31, name: { fi: 'kolesteroli (GC) (mg)', fiShort: 'kolestori' }, unit: 'mg' },
  { column: 32, name: { fi: 'sterolit (mg)', fiShort: 'sterolit' }, unit: 'mg' },
  {
    column: 33,
    name: { fi: 'kalsium', fiShort: 'kalsium', en: 'calcium' },
    unit: 'mg',
    dri: {
      ai: 1000,
      ul: 2500
    }
  },
  {
    column: 34,
    name: { fi: 'rauta', fiShort: 'rauta', en: 'iron' },
    unit: 'mg',
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
    column: 35,
    name: { fi: 'jodidi (jodi)', fiShort: 'jodi', en: 'iodine' },
    unit: 'yg',
    dri: {
      rda: {
        males: 150,
        females: 150
      }
    }
  },
  {
    column: 36,
    name: { fi: 'kalium', fiShort: 'kalium', en: 'potassium' },
    unit: 'mg',
    dri: {
      ai: 4700
    }
  },
  {
    column: 37,
    name: { fi: 'magnesium', fiShort: 'magnesium', en: 'magnesium' },
    unit: 'mg',
    dri: {
      rda: { males: 420, females: 320 }
    }
  },
  {
    column: 38,
    name: { fi: 'natrium', fiShort: 'natrium', en: 'sodium' },
    unit: 'mg',
    dri: {
      ai: 1500,
      ul: 2300
    }
  },
  {
    column: 39,
    name: { fi: 'suola', fiShort: 'suola', en: 'salt, sodium and chloride' },
    dri: {
      ai: 3800,
      ul: 5900
    },
    unit: 'mg'
  },
  {
    column: 40,
    name: { fi: 'fosfori', fiShort: 'fosfori', en: 'phosphorus' },
    unit: 'mg',
    dri: {
      rda: 700,
      ul: 4000
    }
  },
  {
    column: 41,
    name: { fi: 'seleeni', fiShort: 'seleeni', en: 'selenium' },
    unit: 'yg',
    dri: {
      rda: 55
    }
  },
  {
    column: 42,
    name: { fi: 'sinkki', fiShort: 'sinkki', en: 'zinc' },
    unit: 'mg',
    dri: {
      rda: { males: 11, females: 8 }
    }
  },
  { column: 43, name: { fi: 'tryptofaani (mg)', fiShort: 'tryptofaani' }, unit: 'mg' },
  {
    column: 44,
    name: { fi: 'folaatti', fiShort: 'folaatti', en: 'folate' },
    unit: 'yg',
    dri: {
      rda: 400
    }
  },
  { column: 45, name: { fi: 'niasiiniekvivalentti NE', fiShort: 'niasiiniekvivalentti' }, unit: 'mg' },
  {
    column: 46,
    name: {
      fi: 'niasiini (nikotiinihappo + nikotiiniamidi)',
      fiLong: 'niasiini (nikotiinihappo + nikotiiniamidi)',
      fiShort: 'niasiini',
      en: 'niacin'
    },
    unit: 'mg',
    dri: {
      rda: { males: 16, females: 14 },
      ul: 35
    }
  },
  {
    column: 47,
    name: {
      fi: 'B6-vitamiini',
      fiLong: 'pyridoksiini vitameerit (vetykloridi) (B6) (mg)',
      fiShort: 'B6-vitamiini',
      en: 'vitamin B6'
    },
    unit: 'mg',
    dri: {
      rda: 1.3,
      ul: 100
    }
  },
  {
    column: 48,
    name: { fi: 'B2-vitamiini, riboflaviini', fiShort: 'B2-vitamiini', en: 'vitamin B2, riboflavin' },
    unit: 'mg',
    dri: {
      rda: { males: 1.3, females: 1.1 }
    }
  },
  {
    column: 49,
    name: { fi: 'B1-vitamiini, tiamiini', fiShort: 'B1-vitamiini', en: 'vitamin B1, thiamin' },
    unit: 'mg',
    dri: {
      rda: { males: 1.2, females: 1.1 }
    }
  },
  {
    column: 50,
    name: { fi: 'B12-vitamiini, kobalamiini', fiShort: 'B12-vitamiini', en: 'vitamin B12, cobalamin' },
    unit: 'yg',
    dri: {
      rda: 2.4
    }
  },
  {
    column: 51,
    name: { fi: 'C-vitamiini (mg)', fiShort: 'C-vitamiini', en: 'vitamin C' },
    unit: 'mg',
    dri: {
      rda: { males: 90, females: 75 }
    }
  },
  {
    column: 52,
    name: { fi: 'A-vitamiini RAE', fiShort: 'A-vitamiini', en: 'vitamin A' },
    unit: 'yg',
    dri: {
      rda: { males: 900, females: 700 }
    }
  },
  { column: 53, name: { fi: 'karotenoidit', fiShort: 'karotenoidit', en: 'carotenoids' }, unit: 'g' },
  {
    column: 54,
    name: { fi: 'D-vitamiini', fiShort: 'D-vitamiini', en: 'vitamin D' },
    unit: 'yg',
    dri: {
      rda: 5,
      ul: 50
    }
  },
  {
    column: 55,
    name: { fi: 'E-vitamiini alfatokoferoli', fiShort: 'E-vitamiini', en: 'vitamin E' },
    unit: 'mg',
    dri: {
      rda: 15
    }
  },
  {
    column: 56,
    name: { fi: 'K-vitamiini', fiShort: 'K-vitamiini', en: 'vitamin K' },
    unit: 'yg',
    dri: {
      rda: { males: 120, females: 90 }
    }
  }
];

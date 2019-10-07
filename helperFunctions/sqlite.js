// import { SQLite } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
const dbName = 'nutrition-app.db';
const plans = 'plans';
const meals = 'meals';
const nutrients = 'nutrients';
const nutrientDataTable = 'nutrientsData';

const db = SQLite.openDatabase(dbName);

export const initializeDatabase = () => {
  console.log('initializeDatabase: start');

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log('transaction');

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${plans} (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL);`,
        [],
        () => {
          console.log('plans transaction step succeeded:');
        },
        (err) => {
          console.log('plans transaction step failed', err)
          reject(err);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${meals}
        (
          id INTEGER PRIMARY KEY,
          planId INTEGER,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          FOREIGN KEY (planId)
            REFERENCES plans (planId)
              ON DELETE SET NULL
              ON UPDATE NO ACTION
        );`,
        [],
        () => {
          console.log('meals step in transaction succeeded')
        },
        (_, err) => {
          console.log('meals step in transaction failed', err)
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nutrients}
        (
          id INTEGER PRIMARY KEY,
          amount REAL NOT NULL,
          mealId INTEGER NOT NULL,
          nutrientDataId INTEGER NOT NULL,
          FOREIGN KEY (nutrientDataId)
            REFERENCES nutrientData (nutrientDataId)
              ON DELETE CASCADE
              ON UPDATE NO ACTION,
          FOREIGN KEY (mealId)
            REFERENCES meals (mealId)
              ON DELETE CASCADE
              ON UPDATE NO ACTION
        );`,
        [],
        () => {
          console.log('nutrients step in transaction succeeded')
        },
        (_, err) => {
          console.log('nutrients step in transaction failed', err)

          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${nutrientDataTable} (
          id INTEGER PRIMARY KEY,
          column0 INTEGER NOT NULL,
          column1 TEXT NOT NULL,
          column2 REAL NOT NULL,
          column3 REAL NOT NULL,
          column4 REAL NOT NULL,
          column5 REAL NOT NULL,
          column6 REAL NOT NULL,
          column7 REAL NOT NULL,
          column8 REAL NOT NULL,
          column9 REAL NOT NULL,
          column10 REAL NOT NULL,
          column11 REAL NOT NULL,
          column12 REAL NOT NULL,
          column13 REAL NOT NULL,
          column14 REAL NOT NULL,
          column15 REAL NOT NULL,
          column16 REAL NOT NULL,
          column17 REAL NOT NULL,
          column18 REAL NOT NULL,
          column19 REAL NOT NULL,
          column20 REAL NOT NULL,
          column21 REAL NOT NULL,
          column22 REAL NOT NULL,
          column23 REAL NOT NULL,
          column24 REAL NOT NULL,
          column25 REAL NOT NULL,
          column26 REAL NOT NULL,
          column27 REAL NOT NULL,
          column28 REAL NOT NULL,
          column29 REAL NOT NULL,
          column30 REAL NOT NULL,
          column31 REAL NOT NULL,
          column32 REAL NOT NULL,
          column33 REAL NOT NULL,
          column34 REAL NOT NULL,
          column35 REAL NOT NULL,
          column36 REAL NOT NULL,
          column37 REAL NOT NULL,
          column38 REAL NOT NULL,
          column39 REAL NOT NULL,
          column40 REAL NOT NULL,
          column41 REAL NOT NULL,
          column42 REAL NOT NULL,
          column43 REAL NOT NULL,
          column44 REAL NOT NULL,
          column45 REAL NOT NULL,
          column46 REAL NOT NULL,
          column47 REAL NOT NULL,
          column48 REAL NOT NULL,
          column49 REAL NOT NULL,
          column50 REAL NOT NULL,
          column51 REAL NOT NULL,
          column52 REAL NOT NULL,
          column53 REAL NOT NULL,
          column54 REAL NOT NULL,
          column55 REAL NOT NULL,
          column56 REAL NOT NULL
        );`,
        [],
        () => {
        },
        (_, err) => {
          console.log('nutrientsData step in transaction failed', err)

          reject(err);
          console.log('nutrientsData step in transaction succeeded')
        }
      );
      console.log('all transaction steps started')
    },
      (err) => {
        console.log('transaction failed', err)
        reject(err);
      },
      (result) => {
        console.log('transaction succeeded:', result);
        resolve()
      });
  });
};

export const insertPlan = (name, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${plans} (name, description)
         VALUES (?, ?);`,
        [name, description],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const deletePlan = (planId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log('deletePlan: execute', `DELETE FROM ${plans} WHERE id=${planId};`);

      tx.executeSql(
        `DELETE FROM ${plans} WHERE id=${planId};`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const getAllPlans = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${plans};`,
        [],
        (_, result) => {
          console.log('result', result["rows"]["_array"]);
          resolve(result.rows["_array"]);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};


export const insertMeal = (planId, name, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${meals} (planId, name, description)
         VALUES (?, ?, ?);`,
        [planId, name, description],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const deleteMeal = (mealId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log('deleteMeal: execute', `DELETE FROM ${meals} WHERE id=${mealId};`);

      tx.executeSql(
        `DELETE FROM ${meals} WHERE id=${mealId};`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const getAllMeals = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${meals};`,
        [],
        (_, result) => {
          console.log('result', result["rows"]["_array"]);
          resolve(result.rows["_array"]);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};

export const insertNutrient = (mealId, nutrientDataId, amount) => {
  return new Promise((resolve, reject) => {
    console.log(`INSERT INTO ${nutrients} (mealId, nutrientDataId, amount)
      VALUES (?, ?, ?);`, [mealId, nutrientDataId, amount]);
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${nutrients} (mealId, nutrientDataId, amount)
         VALUES (?, ?, ?);`,
        [mealId, nutrientDataId, amount],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
// update nutrients set amount = 1000.0 where nutrientDataId=812;
export const updateNutrientAmount = (mealId, nutrientDataId, amount) => {
  return new Promise((resolve, reject) => {
    console.log(`UPDATE ${nutrients} SET amount = ${amount} WHERE nutrientDataId=${nutrientDataId} AND mealId=${mealId};`);

    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${nutrients} SET amount = ${amount} WHERE nutrientDataId=${nutrientDataId} AND mealId=${mealId};`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const deleteNutrient = (mealId, nutrientId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log('deleteNutrient: execute', `DELETE FROM ${nutrients} WHERE id=${nutrientId};`);

      tx.executeSql(
        `DELETE FROM ${nutrients} WHERE id=${nutrientId};`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const getAllNutrients = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${nutrients};`,
        [],
        (_, result) => {
          console.log('result', result["rows"]["_array"]);
          resolve(result.rows["_array"]);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const getNutrientData = () => {
  return new Promise((resolve, reject) => {
    console.log(`SELECT * FROM ${nutrientDataTable};`);

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${nutrientDataTable};`,
        [],
        (_, result) => {
          console.log('result', result["rows"]["_array"].length);
          resolve(result.rows["_array"]);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};

//-----------------------------------------------

export const insertAllNutrientData = (allNutrientData) => {
  return new Promise((resolve, reject) => {
    console.log('insertAllNutrientData START, write nutrientdata:', allNutrientData.length);
    db.transaction((tx) => {
      const columnNames = allNutrientData[0].map((_, index) => 'column' + index);
      const questionMarks = allNutrientData[0].map(_ => '?');
      // console.log('insertNutrientData', `INSERT INTO ${nutrientDataTable} ( ${columnNames} ) VALUES ( ${questionMarks} );`);
      allNutrientData.forEach(nutrientData => {
        tx.executeSql(
          `INSERT INTO ${nutrientDataTable} ( ${columnNames} ) VALUES ( ${questionMarks} );`,
          nutrientData,
          null,
          (_, err) => {
            console.log('insertAllNutrientData FAILED');
            reject(err);
          }
        );
      });
    },
      (_, err) => {
        console.log('insertAllNutrientData FAILED att end', err);
        reject(err);
      },
      (_, result) => {
        console.log('insertAllNutrientData SUCCEEDED');
        resolve(result)
      }
    )
  });
};

export const insertNutrientData = (nutrientData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const columnNames = nutrientData.map((_, index) => 'column' + index);
      const questionMarks = nutrientData.map(_ => '?');
      // console.log('insertNutrientData', `INSERT INTO ${nutrientDataTable} ( ${columnNames} ) VALUES ( ${questionMarks} );`);
      tx.executeSql(
        `INSERT INTO ${nutrientDataTable} ( ${columnNames} ) VALUES ( ${questionMarks} );`,
        nutrientData,
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};
export const getNutrientDataCount = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) AS nutrientDataCount FROM ${nutrientDataTable};`,
        null,
        (_, result) => {
          console.log('getNutrientDataCount=', result.rows["_array"][0]["nutrientDataCount"]);

          resolve(result.rows["_array"][0]["nutrientDataCount"]);
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};


// export const addMealToPlan = (planId, mealIds) => {
//   mealIdsString = mealIds.join(',');
//   console.log('addMealToPlan: mealIdsString:', mealIdsString);

//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `UPDATE ${plans} 
//          SET (mealIds)
//          VALUES (?)
//          WHERE planId=${planId};`,
//         [mealIds.join(',')],
//         (_, result) => {
//           resolve(result)
//         },
//         (_, err) => {
//           reject(err);
//         }
//       )
//     })
//   });
// };

export const readAllPlans = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${plans};`,
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};

//-------------------------------------------------

export const insertMealAndAddItToPlan = (planId, name, description, mealIds) => {
  mealIdsString = mealIds.join(',');
  console.log('insertPlan: mealIdsString:', mealIdsString);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${meals} (name, description, nutrients)
         VALUES (?, ?, ?);`,
        [name, description, ""],
        (_, result) => {
          console.log('insertMealAndAddItToPlan: INSERT INTO ${meals} (name, description)', result);
          console.log('insertMealAndAddItToPlan: dbResult', result, result.insertId.toString());
          const newMealId = result.insertId.toString();
          const newMealIds = mealIds.concat(newMealId);
          tx.executeSql(
            `UPDATE ${plans} 
             SET mealIds = ?
             WHERE ID = ${planId};`,
            [newMealIds.join(',')],
            (_, result) => {
              resolve(newMealId);
            },
            (_, err) => {
              reject(err);
            }
          )
        },
        (_, err) => {
          reject(err);
        }
      )
    })
  });
};




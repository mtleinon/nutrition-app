import * as db from '../../helperFunctions/sqlite';

export const SET_ALL_BARCODES = 'SET_ALL_BARCODES';
export const ADD_BARCODE = 'ADD_BARCODE';
export const UPDATE_BARCODE = 'UPDATE_BARCODE';
export const DELETE_BARCODE = 'DELETE_BARCODE';

// Handling the plans in redux
export const addBarcode = barcode => ({ type: ADD_BARCODE, barcode })
export const updateBarcode = barcode => ({ type: UPDATE_BARCODE, barcode })
export const deleteBarcode = barcodeId => ({ type: DELETE_BARCODE, barcodeId })

// Handling the plans in database. Functions update database asychronously
// and when it has finished they update redux accordingly
export const storeBarcodeToDb = barcode => {
  return async dispatch => {
    dbResult = await db.insertBarcode(barcode);
    barcode.id = dbResult.insertId;
    // // console.log('storeBarcodeToDb', barcode);
    dispatch(addBarcode(barcode));
  }
};

export const updateBarcodeInDb = barcode => {
  return async dispatch => {
    // console.log('updateBarcodeToDb', barcode);
    dbResult = await db.updateBarcode(barcode);
    dispatch(updateBarcode(barcode));
  }
};

export const deleteBarcodeFromDb = barcodeId => {
  return async dispatch => {
    dbResult = await db.deleteBarcode(barcodeId);
    // console.log('dbResult', dbResult);
    dispatch(deleteBarcode(barcodeId));
  }
};

export const readAllBarcodesFromDb = () => {
  // console.log('readAllBarcodesFromDb');
  return async dispatch => {
    const barcodes = await db.getAllBarcodes();
    // console.log('readAllPlansFromDatabase', barcodes);
    dispatch({ type: SET_ALL_BARCODES, barcodes });
  }
};


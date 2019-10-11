import {
  SET_ALL_BARCODES,
  // ADD_BARCODE_TO_BARCODE,
  // REMOVE_BARCODE_FROM_BARCODE,
  DELETE_BARCODE,
  ADD_BARCODE,
  UPDATE_BARCODE,
  // UPDATE_BARCODE_IN_BARCODE
} from '../actions/barcodes';

import Barcode from '../../models/Barcode';
// import testBarcodesData from '../../data/testBarcodesData';

const initialState = {
  barcodes: [],
};

export default (state = initialState, action) => {
  console.log('barcodes action', action.type);

  switch (action.type) {

    case ADD_BARCODE:
      return {
        barcodes: [...state.barcodes, action.barcode]
      }
    case DELETE_BARCODE:
      return {
        barcodes: state.barcodes.filter(barcode => barcode.id !== action.barcodeId)
      }
    case UPDATE_BARCODE:
      console.log('UPDATE_BARCODE: barcodes action', action);
      return {
        barcodes: state.barcodes.map(barcode => {
          if (barcode.id === action.barcode.id) {
            return new Barcode(barcode.id, action.barcode.barcode, action.barcode.nutrientDataId);
          }
          return barcode;
        })
      }
    case SET_ALL_BARCODES:
      return {
        barcodes: action.barcodes
      }
  }
  return state;
}


import { ACTIONS_MAPPERS } from "../../config/app";

export const A__getAll = ( ) => {
  return( dispatch : any ) => {
    dispatch({
      type: ACTIONS_MAPPERS[ "GET_ALL" ],
      //payload : {}
    });
  };
};

export const A__setAll = ( data : any ) => {
  return( dispatch : any ) => {
    dispatch({
      type: ACTIONS_MAPPERS[ "SET_ALL" ],
      payload : data
    });
  };
};

export const A__updFiles = ( data : any ) => {
  return( dispatch : any ) => {
    dispatch({
      type: ACTIONS_MAPPERS[ "UPD_FILES" ],
      payload : data
    });
  };
};

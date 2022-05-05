import /*React,*/ { Component } from 'react';
import { INITIAL_APP_STATE, T__GenericFunctionVoid } from '../../../config/app';

// export const CELL_SIZE = 20;
// export const WIDTH = 800;
// export const HEIGHT = 400

export interface I__gridSettingsParams {
  cellsize : any;
  rows? : any;
  cols? : any;
  height? : any;
  width? : any;
}
export const DEFAULT_GRID = {
  cellsize : 20,
  width : 800,
  height: 600
} as I__gridSettingsParams;

export const getGrid = ( settings : I__gridSettingsParams ) : I__gridSettingsParams => {
  let res = {
    ...settings
  } as I__gridSettingsParams;

  if( settings.width && settings.height ) {
    res.rows = Number( settings.height / settings.cellsize );
    res.cols = Number( settings.width / settings.cellsize );
  } else if( settings.rows && settings.cols ) {
    res.width = Number( settings.cols * settings.cellsize );
    res.height = Number( settings.rows * settings.cellsize );
  }
  return res;
}

type T__Props_GOF_ = { 
  // loadingData : T__GenericFunctionVoid;
  settingData : T__GenericFunctionVoid;
  contentData : any;
}; 
type T__Props_CELL = { 
  x : number;
  y : number;
  size : number;
}; 

export const COMPONENT_SETTINGS = {
  INITIAL_STATE : {    
    ...INITIAL_APP_STATE,
    gridSettings : getGrid( DEFAULT_GRID )
  },
  PROTO_CLASS_GOF_ : class C__ProtoComponent extends Component<T__Props_GOF_> {},
  PROTO_CLASS_CELL : class C__ProtoComponent extends Component<T__Props_CELL> {}
};



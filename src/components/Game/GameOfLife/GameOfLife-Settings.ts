import /*React,*/ { Component } from 'react';
import { INITIAL_APP_STATE, T__GenericFunctionVoid } from '../../../config/app';

export const CELL_SIZE = 20;
export const WIDTH = 800;
export const HEIGHT = 600

type T__Props_GOF_ = { 
  // loadingData : T__GenericFunctionVoid;
  settingData : T__GenericFunctionVoid;
  // contentData : any;
}; 
type T__Props_CELL = { 
  x : number;
  y : number;
}; 

export const COMPONENT_SETTINGS = {
  INITIAL_STATE : {    
    ...INITIAL_APP_STATE
  },
  PROTO_CLASS_GOF_ : class C__ProtoComponent extends Component<T__Props_GOF_> {},
  PROTO_CLASS_CELL : class C__ProtoComponent extends Component<T__Props_CELL> {}
};



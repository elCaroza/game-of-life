import /*React,*/ { Component } from 'react';
import { T__GenericFunctionVoid } from '../../config/app';

type T__Props = { 
  loadingData : T__GenericFunctionVoid;
  settingData : T__GenericFunctionVoid;
  contentData : any;
}; 

export const COMPONENT_SETTINGS = {
  INITIAL_STATE : {
    starting : undefined,
    isGaming : false
  },
  PROTO_CLASS : class C__ProtoComponent extends Component<T__Props> {}
};



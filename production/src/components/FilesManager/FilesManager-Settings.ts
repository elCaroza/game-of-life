import /*React,*/ { Component } from 'react';
import { INITIAL_APP_STATE, T__GenericFunctionVoid } from '../../config/app';

// type T__Props = { 
//   loadingData : T__GenericFunctionVoid;
//   settingData : T__GenericFunctionVoid;
//   contentData : any;
// }; 

// export const COMPONENT_SETTINGS = {
//   INITIAL_STATE : {
//     ...INITIAL_APP_STATE
//   },
//   PROTO_CLASS : class C__ProtoComponent extends Component<T__Props> {}
// };

export interface I__COMPONENT_SETTINGS {
  PROPS : {
    fileType : "text" | "audio",
    onLoading : any
  },
};


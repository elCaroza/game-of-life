import { createTheme, Paper, styled } from '@mui/material';
import /*React,*/ { Component } from 'react';
import { T__GenericFunctionVoid } from '../../config/app';

type T__Props = { 
  loadingData : T__GenericFunctionVoid;
  settingData : T__GenericFunctionVoid;
  updateFiles : T__GenericFunctionVoid;
  contentData : any;
}; 

export const COMPONENT_SETTINGS = {
  INITIAL_STATE : {
    starting : undefined,
    isGaming : false
  },
  PROTO_CLASS : class C__ProtoComponent extends Component<T__Props> {},
  DARK_THEME : createTheme({ palette: { mode: "dark" } })
};

export const ContentApp = styled( Paper )(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  with : "100vw",
  height : "100vh",
  padding : 20,
  display : "flex",
  alignItems : "center"
}));



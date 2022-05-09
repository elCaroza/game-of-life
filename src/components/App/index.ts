import { connect } from 'react-redux';
import AppComponent from './App-Component';
import { A__getAll, A__setAll, A__updFiles } from '../../store/actions/appActions';

const mapStateToProps = ( state : any ) => {
  var { appData } = state
  return {
    contentData : {
      numberOfGenerations: appData.numberOfGenerations,
      filesGenerations : Object.keys( appData.fromFilesGenerationsInit )
    }
  }
};

const mapDispatchToProps = ( dispatch : any ) => ({
  loadingData : () => dispatch( A__getAll( ) ),
  settingData : ( data : any ) => dispatch( A__setAll( data ) ),
  updateFiles : ( data : any ) => dispatch( A__updFiles( data ) )
});

const App = connect( mapStateToProps, mapDispatchToProps )( AppComponent );

export default App

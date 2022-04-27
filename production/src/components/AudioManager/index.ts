import { connect } from 'react-redux';
import AudioManagerComponent from './AudioManager-Component';
import { A__getAll, A__setAll } from '../../store/actions/appActions';

const mapStateToProps = ( state : any ) => {
  return {
  	// error: state.alerts.error,
  	// loading: state.loading.loading,
  	// success: state.alerts.success,
    contentData : state.appData
  }
};

const mapDispatchToProps = ( dispatch : any ) => ({
  loadingData : () => dispatch( A__getAll( ) ),
  settingData : ( data : any ) => dispatch( A__setAll( data ) ) 
});

const AudioManager = connect( mapStateToProps, mapDispatchToProps )( AudioManagerComponent );

export default AudioManager

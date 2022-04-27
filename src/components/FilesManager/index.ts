// import { connect } from 'react-redux';
// import FilesManagerComponent from './FilesManager-Component';
// import { A__getAll, A__setAll } from '../../store/actions/appActions';

import { FilesManagerComponent } from "./FilesManager-Component";

// const mapStateToProps = ( state : any ) => {
//   return {
//   	// error: state.alerts.error,
//   	// loading: state.loading.loading,
//   	// success: state.alerts.success,
//     contentData : state.appData
//   }
// };

// const mapDispatchToProps = ( dispatch : any ) => ({
//   loadingData : () => dispatch( A__getAll( ) ),
//   settingData : ( data : any ) => dispatch( A__setAll( data ) ) 
// });

// const FilesManager = connect( mapStateToProps, mapDispatchToProps )( FilesManagerComponent );

const FilesManager = FilesManagerComponent;
export default FilesManager

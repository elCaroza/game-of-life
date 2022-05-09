import { INITIAL_APP_STATE, I__ReduxAction, ACTIONS_MAPPERS } from "../../config/app";

const appData = ( state = INITIAL_APP_STATE, action : I__ReduxAction ) => {
	let res;

	// Dispatch with no manipulation otherwise without payload
	if( [ ACTIONS_MAPPERS.GET_ALL, ACTIONS_MAPPERS.SET_ALL ].includes( action.type ) ) {
		res = {
			...state,
			...action.payload
		};
	} else if( action.type === ACTIONS_MAPPERS.UPD_FILES ) {
		res = {
			...state,
			fromFilesGenerationsInit : {
				...state.fromFilesGenerationsInit,
				...action.payload
			}
		};
	}
	
	// Without payload
	else {
		res = { ...state };
	}

	return res;
}
export default appData;

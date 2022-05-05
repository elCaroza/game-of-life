// import { ACTIONS_MAPPERS } from "../actions/appActions";
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






// import { INITIAL_APP_STATE, /*ROUTE_VIEWS,*/ VIEWS_SETTINGS, getCurrentRouteSettings } from "../../config/app";

// // Creazione nuovo intervento
// interface I__NewCalendarIntervent {
// 	event : any,
// 	day : string
// }
// const addNewIntervent = ( old : any, newCalendarIntervent : I__NewCalendarIntervent ) : any => {
// 	let calendars_event = { ...old };
// 	if( !calendars_event[ newCalendarIntervent.day ] ) {
// 		calendars_event[ newCalendarIntervent.day ] = []
// 	}
// 	calendars_event[ newCalendarIntervent.day ].push( { 
// 		...newCalendarIntervent.event,
// 		doneEvent : "0"
// 	} );

// 	return calendars_event;
// }

// const appData = ( state = INITIAL_APP_STATE, action : I__ReduxAction ) => {
// 	console.log(
// 		"ACTION:", action, 
// 		" type:",(action.type==ACTIONS_MAPPERS[ "SET_ALL" ]),
// 		'ACTIONS_MAPPERS[ "SET_ALL" ]:', ACTIONS_MAPPERS[ "SET_ALL" ] )
// 	switch ( action.type ) {
//     	case ACTIONS_MAPPERS[ "GET_ALL" ] || ACTIONS_MAPPERS[ "SET_ALL" ] :
// 			var obj = {
// 				...state,
// 				...action.payload
// 			};

// 			console.log("obj:", obj)

// 			// let spineAvailable = Object.keys( obj.settings.spine );
// 			// let customersToDelete = [];
// 			// for( var item in obj.customers ) {
// 			// 	if( ( spineAvailable ).indexOf( obj.customers[ item ].spinaType ) == -1 ) {
// 			// 		customersToDelete.push( item );
// 			// 		delete obj.customers[ item ];
// 			// 	}
// 			// }
// 			// for( var item in obj.calendars_event ) {
// 			// 	let dayEvents = ( obj.calendars_event[ item ] ).filter( thisEvent => ( ( customersToDelete ).indexOf( thisEvent.customerID ) == -1 ) );

// 			// 	if( dayEvents.length > 0 ) {
// 			// 		obj.calendars_event[ item ] = dayEvents;
// 			// 	}
// 			// }

//       		return obj;

// 		// case ACTIONS_MAPPERS[ "ADD_USER" ]:
// 		// 	let old = {
// 		// 		...state
// 		// 	}
// 		// 	old.customers = {
// 		// 		...old.customers,
// 		// 		...action.payload.new_customer
// 		// 	}

// 		// 	// Creazione nuovo intervento
// 		// 	old.calendars_event = addNewIntervent( old.calendars_event, action.payload.new_calendars_event ) 
// 		// 	// if( !old.calendars_event[ action.payload.new_calendars_event.day ] ) {
// 		// 	// 	old.calendars_event[ action.payload.new_calendars_event.day ] = []
// 		// 	// }
// 		// 	// old.calendars_event[ action.payload.new_calendars_event.day ].push( action.payload.new_calendars_event.event );

//       	// 	return old;

// 		// case ACTIONS_MAPPERS[ "ADD_USER_INTERVENT" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 	};
			
// 		// 	// Creazione nuovo intervento
// 		// 	obj.calendars_event = addNewIntervent( obj.calendars_event, action.payload.new_calendars_event ) 

// 		// 	obj.refreshedOn = new Date();

// 		// 	return obj;

// 		// case ACTIONS_MAPPERS[ "UPDATE_USER_INTERVENT" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 	};
// 		// 	const { moving } = action.updater; 

// 		// 	// add updated intervent
// 		// 	obj.calendars_event = addNewIntervent( obj.calendars_event, { day: moving.to, event : action.payload } ) 
			
// 		// 	// remove old intervent
// 		// 	obj.calendars_event[ moving.from ] = ( obj.calendars_event[ moving.from ] ).filter( ( singleEvent : any ) => {
// 		// 		return !( 
// 		// 			singleEvent.eventID == action.payload.eventID && 
// 		// 			singleEvent.customerID == action.payload.customerID 
// 		// 		)
// 		// 	} )
// 		// 	if ( obj.calendars_event[ moving.from ].length == 0 ) {
// 		// 		delete obj.calendars_event[ moving.from ]
// 		// 	}
			
// 		// 	// for ( var eventName in obj.calendars_event ) {
// 		// 	// 	const listEvents = obj.calendars_event[ eventName ];
// 		// 	// 	( listEvents ).map( ( singleEvent, eventKey ) => {
// 		// 	// 		if( singleEvent.eventID == action.payload.eventID && singleEvent.customerID == action.payload.customerID ){
// 		// 	// 			obj.calendars_event[ eventName ][ eventKey ] = {
// 		// 	// 				...singleEvent,
// 		// 	// 				...action.payload
// 		// 	// 			}
// 		// 	// 		}
// 		// 	// 	} )
// 		// 	// }
// 		// 	// console.log("NEW calendars_event:", obj.calendars_event[ moving.to ]);
// 		// 	// console.log("OLD calendars_event:", obj.calendars_event[ moving.from ]);

// 		// 	obj.refreshedOn = new Date();

// 		// 	return obj;

// 		// case ACTIONS_MAPPERS[ "DONE_USER_INTERVENT" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 	};

// 		// 	// // Evento segnato come fatto
// 		// 	// console.log("##############################");
// 		// 	// console.log("action:", action);
// 		// 	// console.log("action.payload:", action.payload);
// 		// 	// console.log("action.payload.done_intervent:", action.payload.done_intervent);
// 		// 	// console.log("action.payload.done_intervent.eventDay:", action.payload.done_intervent.eventDay);
// 		// 	// console.log("calendars_event:", obj.calendars_event[ action.payload.done_intervent.eventDay ]);
// 		// 	// vedi sotto, riga 104 e 112 dovrebbero essere nello stesso if perchè "calendars_event:"undefined (riga sopra)
			
// 		// 	let doneInterventPayload = action.payload.done_intervent as any
// 		// 	let doneIntervent = obj.calendars_event[ doneInterventPayload.eventDay ] as any[]


// 		// 	// console.log("doneInterventPayload:", doneInterventPayload);
// 		// 	// console.log("doneIntervent:", doneIntervent);
// 		// 	// console.log("action:", action);
			
// 		// 	if ( doneIntervent != undefined ) {			
// 		// 		( doneIntervent ).map( currentEvent => {
// 		// 			if( currentEvent.eventID === doneInterventPayload.eventID ) {
// 		// 				currentEvent.doneEvent = "1";
// 		// 			}
// 		// 			return currentEvent;
// 		// 		})	
// 		// 	}


// 		// 	// Creazione nuovo intervento
// 		// 	obj.calendars_event = addNewIntervent( obj.calendars_event, action.payload.new_calendars_event ) 

// 		// 	// // Creazione nuovo intervento
// 		// 	// if( !obj.calendars_event[ action.payload.new_calendars_event.day ] ) {
// 		// 	// 	obj.calendars_event[ action.payload.new_calendars_event.day ] = []
// 		// 	// }
// 		// 	// obj.calendars_event[ action.payload.new_calendars_event.day ].push( action.payload.new_calendars_event.event );
			
// 		// 	obj.refreshedOn = new Date();

// 		// 	return obj;

// 		// case ACTIONS_MAPPERS[ "DETAILS_THIS_EVENT" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 		...action.payload,
// 		// 		//...getCurrentRouteSettings( ROUTE_VIEWS.DETAILS_EVENT )
// 		// 	};
//       	// 	return obj

// 		// case ACTIONS_MAPPERS[ "SEARCH_QUERY" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 		...action.payload
// 		// 	};

// 		// 	return obj;

//     	// case ACTIONS_MAPPERS[ "LOG_IN_USER" ]:
// 		// 	var obj = {
// 		// 		...state,
// 		// 		...action.payload
// 		// 	};

//       	// 	return obj;

// 		// case ACTIONS_MAPPERS[ "ROUTE_TO_VIEW" ]:
// 		// 		var obj = {
// 		// 	    	...state,
// 		// 			...getCurrentRouteSettings( action.payload )
// 		// 		};
// 	    //   	return obj

//     	// case ACTIONS_MAPPERS[ "UPDATE_VIEW" ]:
// 		// 	let currentView = VIEWS_SETTINGS[ action.payload.name ];
// 		// 	let currentStateView = state.localView;

// 		// 	if( currentView.name === currentStateView.name ) {
// 		// 		if( action.payload.requestType === "BACK" ) {
// 		// 			currentStateView.step = ( currentStateView.step > 1 ? ( currentStateView.step - 1 ) : 1 )
// 		// 		}
// 		// 		else if( action.payload.requestType === "NEXT" ) {
// 		// 			let tryStep = ( currentStateView.step + 1 );
// 		// 			if( tryStep < currentView.steps ) {
// 		// 				currentStateView.step = tryStep
// 		// 			}
// 		// 		}
// 		// 	} else {
// 		// 		currentStateView = {
// 		// 			name : currentView.name,
// 		// 			navbar : currentView.navbar,
// 		// 			step : 1
// 		// 		}
// 		// 	}

// 		// 	return {
// 		// 		...state,
// 		// 		localView : currentStateView
// 		// 	}
    	
// 		default:
//     	return state;
//   	}
// };

//export default appData;

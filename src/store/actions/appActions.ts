
import { ACTIONS_MAPPERS } from "../../config/app";

export const A__getAll = ( ) => {
  return( dispatch : any ) => {
    dispatch({
      type: ACTIONS_MAPPERS[ "GET_ALL" ],
      //payload : {}
    });
  };
};

export const A__setAll = ( data : any ) => {
  return( dispatch : any ) => {
    dispatch({
      type: ACTIONS_MAPPERS[ "SET_ALL" ],
      payload : data
    });
  };
};






// import { API_CALL, REQUESTS_SERVER, UserExistsOnDB } from "../../persisting-data/APIs_manager";
// import { /* verifyIdTokenOnFirebase */ userOnFirebase } from "../../persisting-data/firebase";
// import { VIEWS_SETTINGS, STATIC_ASSETS } from "../../config/app";
// import { getEntireDate } from "../../models/dates-operations";
// import { doFunctionOnForm } from "../../components/sections/forms/Forms-Manager";

// interface I__BodyAction {
//   contentType? : string,
//   content? : any,
//   updater? : any
// }

// export const ACTIONS_MAPPERS = {
//   "GET_ALL"               : "[ appData ] : Get all settings from redux",
//   // "UPDATE_VIEW"           : "[ appData ] : Update view on routing",
//   // "LOG_IN_USER"           : "[ appData ] : Login current user",


//   // "DETAILS_THIS_EVENT"    : "[ appData ] : Show details from current event",
//   // "ROUTE_TO_VIEW"         : "[ appData ] : Go to a specific View",
//   // "SEARCH_QUERY"          : "[ appData ] : Text Searched on searchbar",
//   // "ADD_USER"              : "[ appData ] : Add new user with its calendar event",
//   // "ADD_USER_INTERVENT"    : "[ appData ] : Add user's intervent",
//   // "UPDATE_USER_INTERVENT" : "[ appData ] : Update user's intervent",
//   // "DONE_USER_INTERVENT"   : "[ appData ] : Make done user's intervent"
// };

// export const getAllData = ( data : any ) => {
//   return( dispatch ) => {
//     API_CALL( REQUESTS_SERVER.GET_ALL_DATA ).subscribe( res => {
//       dispatch({
//         type: ACTIONS_MAPPERS[ "GET_ALL" ],
//         payload : {
//           // calendars_event   : res.data[ "calendars_event" ],
//           // not_done          : res.data[ "not_done" ],
//           // customers         : res.data[ "customers" ],
//           // settings          : res.data[ "settings" ],
//           ...res.data,
//           user : {
//             logged: false
//           },
//           localView : VIEWS_SETTINGS.INIT,
//           downloadCompleted : true,
//           //settingsModalData : {
//           //  modalVisible    : false
//           //}
//         }
//       });

//     })


//     // #TMP:
//     // qui poi ci andrà l'auto log utente
//     /*setTimeout( () => {
//       // fetchFonts().then( y => {
//         dispatch({
//           type: ACTIONS_MAPPERS[ "GET_ALL" ],
//           payload : {
//             user : {
//               logged: false
//             },
//             localView : VIEWS_SETTINGS.INIT
//           }
//         })
//       // })
//     }, 2000) */
//   }
// }

// export const sendResearchTo = ( searchQuery : string ) => dispatch => {
//   dispatch({
//     type: ACTIONS_MAPPERS[ "SEARCH_QUERY" ],
//     payload : {
//       searchQuery : searchQuery
//     }
//   });
// }

// export const routeToView = ( view : any ) => dispatch => {
//   dispatch({
//     type: ACTIONS_MAPPERS[ "ROUTE_TO_VIEW" ],
//     payload : view
//   });
// }

// export const spinaManager = ( data : any ) => {
//   return( dispatch ) => {
//     API_CALL( REQUESTS_SERVER.MANAGER_SPINA, data ).subscribe( res => {
//       dispatch({
//         type: ACTIONS_MAPPERS[ "GET_ALL" ],
//         payload : {
//           settings : res.data[ "settings" ],
//         }
//       });
//       if( data.contentType !== "delete" ) {
//         doFunctionOnForm( `spina_${ data.content.id }`, "form_available" );
//       }
//     })
//   }
// }

// export const customerManager = ( body : I__BodyAction, callback : any ) => {
//   const updater = body[ "updater" ] as I__BodyAction[ "updater" ];
//   var data = {
//     ...body
//   } as I__BodyAction
//   delete data.updater;

//   return( dispatch ) => {
//     API_CALL( REQUESTS_SERVER.MANAGER_CUSTOMER, data ).subscribe( res => {

//       let fromDB = res.data;
//       let selectedDay;
//       let callbackResponse;

//       switch ( data.contentType ) {

//         // Nuovo utente e nuovo intervento assieme
//         case "add":
//           // creazione nuovo cliente
//           let content = {
//             ...data.content,
//             customerID : `${ fromDB[ "customerID" ] }`
//           }
//           delete content.dateEvent;
//           delete content.otherInfo;
//           let newCustomer = {
//             [ content.customerID ] : {
//               ...content
//             }
//           }

//           // creazione nuovo intervento
//           selectedDay = ( ( fromDB.newEvent.dateEvent ).split( " " ) )[ 0 ];

//           dispatch({
//             type: ACTIONS_MAPPERS[ "ADD_USER" ],
//             payload : {
//               new_customer : newCustomer,
//               new_calendars_event : {
//                 day : selectedDay,
//                 event : fromDB.newEvent
//               }
//             }
//           });
//           break;

//         // Creazione nuovo intervento in utente già esistente
//         //$
//         case "newEvent" :
//           callbackResponse = fromDB.newEvent;
//           if( callbackResponse ) {
//             dispatch({
//               type: ACTIONS_MAPPERS[ "ADD_USER_INTERVENT" ],
//               payload : {
//                 new_calendars_event : {
//                   day : data.content.dateEvent,
//                   event : callbackResponse
//                 }
//               }
//             });
//           }
//           break;

//         // Modifica intervento già esistente in utente già esistente
//         case "update_intervent" :
//           callbackResponse = fromDB.update_intervent;
//           if( callbackResponse ) {
//             dispatch({
//               type: ACTIONS_MAPPERS[ "UPDATE_USER_INTERVENT" ],
//               payload : {
//                 ...data.content
//               },
//               updater : updater
//             });
//           }
//           break;

//         // Intervento segnato come fatto
//         case "done_intervent":
//           callbackResponse = fromDB.done_intervent;
//           if( callbackResponse ) {
//             selectedDay = ( ( data.content.newEvent.dateEvent ).split( " " ) )[ 0 ];
//             //selectedDay = ( ( fromDB.newEvent.dateEvent ).split( " " ) )[ 0 ];
//             //console.log("DATA:", data)
//             dispatch({
//               type: ACTIONS_MAPPERS[ "DONE_USER_INTERVENT" ],
//               payload : {
//                 done_intervent : {
//                   eventDay : data.content.eventDay,
//                   eventID : data.content.eventID
//                 },
//                 new_calendars_event : {
//                   day : selectedDay,
//                   event : fromDB.newEvent
//                 }
//               }
//             });
//             console.log("selectedDay:", selectedDay)
//           }
//           break;

//         default:
//           break;
//       }

//       // doFunctionOnForm( "newCustomerForm", "form_available" )
//       callback( callbackResponse );
//     })
//   }
// }

// export const detailsThisEvent = ( day : any, item : any ) => dispatch => {
//   dispatch({
//     type: ACTIONS_MAPPERS[ "DETAILS_THIS_EVENT" ],
//     payload : {
//       detailsThisEvent : {
//         day : day,
//         item : item
//       }
//     }
//   });
// }

// export const updateLocalView_UnLogged = ( viewType : string, requestType? : string ) => dispatch => {
//   let payload = {};
//   let typeDispatch = "GET_ALL";

//   if( viewType === "INIT" ) {
//     payload = {
//       localView : VIEWS_SETTINGS.INIT
//     }
//   }
//   if( viewType === "REGISTER" || viewType === "ACCESS" ) {
//     payload = {
//       localView : {
//         name : VIEWS_SETTINGS[ viewType ].name,
//         navbar : VIEWS_SETTINGS[ viewType ].navbar,
//         voice : VIEWS_SETTINGS[ viewType ].voice,
//         step : 1
//       }
//     }
//   }

//   if( requestType !== undefined ) { // BACK o NEXT
//     typeDispatch = "UPDATE_VIEW";
//     payload = {
//       name : viewType,
//       requestType : requestType
//     }
//   }

//   dispatch({
//     type: ACTIONS_MAPPERS[ typeDispatch ],
//     payload : payload
//   });
// }

// export const userAccessManager = ( data : any, mode : string ) => {

//   return( dispatch ) => {

//     const dispatchThisUser = ( userData : any ) : void => {

//       console.log("userData:", userData)

//       dispatch({
//         type: ACTIONS_MAPPERS[ "LOG_IN_USER" ],
//         payload : {
//           user : {
//             // ... other User Data
//             logged: true
//           },
//           localView : VIEWS_SETTINGS.HOME_LOGGED
//         }
//       })
//     }

//     if( mode === "register" ) {
//       // #FIXME :
//       // DISABILITATO IN ATTESA DI CORRETTO FUNZIONAMENTO BACKEND
//       console.log( data.email, data.password, mode )
//       userOnFirebase( data.email, data.password, mode ).subscribe( thisUser => {
//         if( thisUser.idToken != undefined ) {
//           // console.log("thisUser:", {
//           //   profile_image_url : STATIC_ASSETS.PLACEHOLDER_IMG,
//           //   nickname : data.nickname,
//           //   lastname : data.cognome,
//           //   firstname : data.nome,
//           //   firebase_idToken : thisUser.idToken,
//           //   email : data.email,
//           //   birthday : getEntireDate( data.data_nascita, true ),
//           //   birth_place : `${ data.luogo_nascita }`,
//           //   gender : `${ data.gender }`,
//           //   residence_city : data.luogo_residenza
//           // })


//           API_CALL( REQUESTS_SERVER.CREATE_ACCOUNT, {
//             profile_image_url : STATIC_ASSETS.PLACEHOLDER_IMG,
//             nickname : data.nickname,
//             lastname : data.cognome,
//             firstname : data.nome,
//             firebase_idToken : thisUser.idToken,
//             email : data.email,
//             birthday : getEntireDate( data.data_nascita, true ),
//             birth_place : `${ data.luogo_nascita }`,
//             gender : `${ data.gender }`,
//             residence_city : data.luogo_residenza
//           } ).subscribe( userRegistered => dispatchThisUser( userRegistered ) )
//         }
//       } )

//     } else if( mode === "login" ) {
//       console.log("login")
//       // TMP
//       dispatchThisUser( {} )
//     }

//   }
// }

// export const settingsModalConfig = ( settings : any ) => dispatch => {

//   let newConfig = {
//     settingsModalData : settings
//   };
//   if( settings.modalVisible == false ) {
//     newConfig.loopContentData = undefined
//   }

//   dispatch({
//     type: ACTIONS_MAPPERS[ "GET_ALL" ],
//     payload : newConfig
//   });
// }

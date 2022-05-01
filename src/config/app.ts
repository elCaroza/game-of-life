
export type T__GenericFunctionVoid = ( args? : any ) => void;

export const INITIAL_APP_STATE = {
    cells: [],
    isRunning: false,
    interval: 100,
    numberOfGenerations : 0
}

export const FREE_GENERATION = "*** FREE ***";

export const ACTIONS_MAPPERS = {
    "GET_ALL"               : "[ appData ] : Get all settings from redux",
    "SET_ALL"               : "[ appData ] : Set all settings from redux",
    // "UPDATE_VIEW"           : "[ appData ] : Update view on routing",
    // "LOG_IN_USER"           : "[ appData ] : Login current user",


    // "DETAILS_THIS_EVENT"    : "[ appData ] : Show details from current event",
    // "ROUTE_TO_VIEW"         : "[ appData ] : Go to a specific View",
    // "SEARCH_QUERY"          : "[ appData ] : Text Searched on searchbar",
    // "ADD_USER"              : "[ appData ] : Add new user with its calendar event",
    // "ADD_USER_INTERVENT"    : "[ appData ] : Add user's intervent",
    // "UPDATE_USER_INTERVENT" : "[ appData ] : Update user's intervent",
    // "DONE_USER_INTERVENT"   : "[ appData ] : Make done user's intervent"
};

export interface I__ReduxAction {
    type : string;
    payload? : any;
}
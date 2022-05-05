
export type T__GenericFunctionVoid = ( args? : any ) => void;

export interface I__InitialAppState {
    cells : any[],
    isRunning : boolean,
    interval : number,
    numberOfGenerations : number,
    fromFilesGenerationsInit : Record<string, I__GetFileGenerationAsData>
}

export const INITIAL_APP_STATE = {
    cells: [],
    isRunning: false,
    interval: 100,
    numberOfGenerations : 0,
    fromFilesGenerationsInit : {
        // "gen3.txt" : {
        //     initGenCounter : 3,
        //     gridSize : { rows : 4, cols : 8 },
        //     cells : [ "2,5", "3,4", "3,5" ]
        // },
        // "gen4.txt" : {
        //     initGenCounter : 4,
        //     gridSize : { rows : 4, cols : 8 },
        //     cells : [ "2,4", "2,5", "3,4", "3,5" ]
        // }
    }
}

export const FREE_GENERATION = "*** FREE ***";

export const ACTIONS_MAPPERS = {
    "GET_ALL"               : "[ appData ] : Get all settings from store",
    "SET_ALL"               : "[ appData ] : Set all settings on store",
    "UPD_FILES"             : "[ appData ] : Update store with fake uploaded file's data",

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

export interface I__GetFileGenerationAsData {
    initGenCounter : number | undefined,
    gridSize : { rows : number, cols : number } | undefined,
    cells : string[] | undefined
}

export const DIED_CELL = ".";
export const ALIVE_CELL = "*";
export const WRONG_CELL = "0";
export const CORRECT_CELL = "1";


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
    fromFilesGenerationsInit : {}
}

export const FREE_GENERATION = "*** FREE ***";

export const ACTIONS_MAPPERS = {
    "GET_ALL"               : "[ appData ] : Get all settings from store",
    "SET_ALL"               : "[ appData ] : Set all settings on store",
    "UPD_FILES"             : "[ appData ] : Update store with fake uploaded file's data"
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

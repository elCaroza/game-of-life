import { ALIVE_CELL, CORRECT_CELL, DIED_CELL, I__GetFileGenerationAsData, WRONG_CELL } from "./app";

export const getFileGenerationAsData = ( strContent : string ) : I__GetFileGenerationAsData => {
    let res = {
        initGenCounter : undefined,
        gridSize : undefined,
        cells : undefined
    } as I__GetFileGenerationAsData;
    var rows = strContent.split( "\n" );

    // initGenCounter RULE: "Generation $n:"
    res.initGenCounter = Number( ( rows[ 0 ].split( "Generation " ) )[ 1 ].split( ":" )[ 0 ] ) || undefined;

    // gridSize RULE: "$row $col"
    var sizes = rows[ 1 ].split( " " ) as string[];
    if( sizes.length === 2 ) {
        res.gridSize = {
            rows : Number( sizes[ 0 ] ),
            cols : Number( sizes[ 1 ] )
        }
    }

    // cells 
    var cells = [] as string[];
    var rowsAreCorrect = {};
    for (let index = 2; index < rows.length; index++ ) {
        var row = index - 1; 
        var gridRow = rows[ index ].split( "" ) as string[];
        rowsAreCorrect[ row ] = gridRow.map( ( char, indexCol ) => {
            if( [ DIED_CELL, ALIVE_CELL ].includes( char ) ) {
                var col = indexCol + 1;
                if( char === ALIVE_CELL ) {
                    cells.push( `${ row },${ col }` )
                }
                return CORRECT_CELL;
            } else {
                return WRONG_CELL;
            }
        }).join( "" )
    }
    var gridIsCorrect = !Object.values( rowsAreCorrect ).join( "" ).includes( WRONG_CELL )
    if( gridIsCorrect ) {
        res.cells = cells
    }
    return res;
}
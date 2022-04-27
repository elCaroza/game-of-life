export {}

// export const indexOfString  = ( contentSaerch : string, searchQuery : string ) : number => {
//   return ( contentSaerch.toLowerCase() ).indexOf( searchQuery.toLowerCase() )
// }

//  export const s__AvailableElements = ( listData : any, searchQuery : string ) : any[] => {
//    return Object.values( listData )
//      .filter( item => {
//        return ( !searchQuery ) ? true : (
//          indexOfString( item.name, searchQuery ) !== -1 ||
//          indexOfString( item.where, searchQuery ) !== -1
//        )
//      })
//  }

//  export const s__SelectedUser = ( listData : any, indexElem : string, settingsModal : any ) : any => {
//    let res = undefined;
//    if( indexElem ) {
//      res = listData[ indexElem ]
//    }
//    return res
//  };

//  export const s__extractCalendarsFromUsers = ( calendarsEvent : any ) : any => {
//    var calendarsFromUsers = {};

//    ( Object.values( calendarsEvent ) ).map( currentDay => {
//      ( currentDay ).map( currentEvent => {
//        let customerID = currentEvent[ "customerID" ];
//        if( !calendarsFromUsers[ customerID ] ) {
//          calendarsFromUsers[ customerID ] = []
//        }
//        let event = Object.assign( { }, currentEvent )
//        delete event[ "customerID" ]
//        calendarsFromUsers[ customerID ].push( event )
//      } )
//    } )
//    return calendarsFromUsers
//  }

// /*
//  export const s__countTotalCustomers = ( listTotalUsers : any ) : number => {
//    let res = ( Object.keys( listTotalUsers ) );
//    return Number( res[ ( res.length - 1 ) ] )
//  };
// */

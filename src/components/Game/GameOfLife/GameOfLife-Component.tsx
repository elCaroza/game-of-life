import { FREE_GENERATION } from '../../../config/app';
import { /*CELL_SIZE, WIDTH, HEIGHT,*/ COMPONENT_SETTINGS, getGrid, I__gridSettingsParams, DEFAULT_GRID } from './GameOfLife-Settings';
import "./GameOfLife-Styles.scss";

class Cell extends COMPONENT_SETTINGS.PROTO_CLASS_CELL {
  render() {
    const { x, y, size } = this.props;
    return (
      <div className="cell" style={{
        left: `${ size * x + 1 }px`,
        top: `${ size * y + 1 }px`,
        width: `${ size - 1 }px`,
        height: `${ size- 1 }px`,
      }} />
    );
  }
}

export default class GameOfLifeComponent extends COMPONENT_SETTINGS.PROTO_CLASS_GOF_ {

  state = COMPONENT_SETTINGS.INITIAL_STATE;

  rows;cols;board;boardRef;timeoutHandler;

  constructor(props) {
    super(props);
    // this.state.gridSettings.rows = HEIGHT / CELL_SIZE;
    // this.state.gridSettings.cols = WIDTH / CELL_SIZE;
    setTimeout( () => this.initGeneration(), 100 );
  }

  UNSAFE_componentWillReceiveProps( nextProps : any ) {
    const { action, realUpdate, initGeneration } = nextProps.contentData();

    if( action === "generation" ) {
      var gridSettingsParams : I__gridSettingsParams;
      var cells = undefined as any;
      var numberOfGenerations = 0;

      if( realUpdate === FREE_GENERATION )  {
        gridSettingsParams = DEFAULT_GRID;
      } else {
        gridSettingsParams = {
          cellsize : 60,
          ...initGeneration.gridSize
        }
        numberOfGenerations = initGeneration.initGenCounter;
        cells = initGeneration.cells;
      }
      var gridSettings = getGrid( gridSettingsParams )

      this.handleClear( false, numberOfGenerations );

      this.setState( {
        gridSettings : gridSettings
      } )

      setTimeout( () => this.initGeneration( cells ), 100 );
    }
    if( action === "clear" ) {
      this.handleClear();
    }
    if( action === "try" ) {
      this.runIteration( false );
    }
    if( action === "interval" ) {
      this.setState({ interval: ( realUpdate * 1000 ) });
    }
    if( action === "isRunning" ) {
      this.setState({ isRunning : realUpdate });
      ( realUpdate ? this.runGame() : this.stopGame() )
    }

    // if( JSON.stringify( nextProps.contentData ) != JSON.stringify( this.state ) ) {
    //   this.setState( nextProps.contentData );
    // }
  }

  makeEmptyBoard() {
    let board = [] as any[];
    const { rows, cols } = this.state.gridSettings;
    for (let y = 0; y < rows; y++) {
      board[ y ] = [] as boolean[];
      for ( let x = 0; x < cols; x++ ) {
        board[ y ][ x ] = false;
      }
    }

    return board;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  makeCells() {
    let cells = [] as any;
    const { rows, cols } = this.state.gridSettings;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (this.board[ y ][ x ]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  handleClick = ( event ) => {

    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    
    const x = Math.floor( offsetX / this.state.gridSettings.cellsize );
    const y = Math.floor( offsetY / this.state.gridSettings.cellsize );

    const { rows, cols } = this.state.gridSettings;

    if ( x >= 0 && x <= cols && y >= 0 && y <= rows ) {
      this.board[ y ][ x ] = !this.board[ y ][ x ];
    }

    this.setState({ cells: this.makeCells() });
  }

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration( true );
  }

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout( this.timeoutHandler );
      this.timeoutHandler = null;
    }
  }

  updateStoreAndRedux = ( numberOfGenerations : number, isRunning? : any ) : void => {
    var newState = { 
      numberOfGenerations : numberOfGenerations,
      cells: this.makeCells() 
    }
    if( isRunning === true || isRunning === false )
      newState[ "isRunning" ] = isRunning;

    if( isRunning === false )
      this.stopGame();
    this.setState( newState );
    this.props.settingData({
      action : "realtimeChanging",
      ...newState
    })
  }

  runIteration = ( restarting : boolean ) : void => {
    let newBoard = this.makeEmptyBoard();
    const { rows, cols } = this.state.gridSettings;

    for ( let y = 0; y < rows; y++ ) {
      for ( let x = 0; x < cols; x++ ) {
        let neighbors = this.calculateNeighbors( this.board, x, y );
        if (this.board[ y ][ x ]) {
          if ( neighbors === 2 || neighbors === 3 ) {
            newBoard[ y ][ x ] = true;
          } else {
            newBoard[ y ][ x ] = false;
          }
        } else {
          if ( !this.board[ y ][ x ] && neighbors === 3 ) {
            newBoard[ y ][ x ] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.updateStoreAndRedux( ( this.state.numberOfGenerations + 1 ) )
    
    if( restarting ) {
      this.timeoutHandler = window.setTimeout( () => {
        this.runIteration( restarting );
      }, this.state.interval);
    }
  }

  /**
   * Calculate the number of neighbors at point (x, y)
   * @param {Array} board 
   * @param {int} x 
   * @param {int} y 
   */
  calculateNeighbors( board, x, y ) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];    
    const { rows, cols } = this.state.gridSettings;
    for ( let i = 0; i < dirs.length; i++ ) {
      const dir = dirs[ i ];
      let y1 = y + dir[ 0 ];
      let x1 = x + dir[ 1 ];

      if ( x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[ y1 ][ x1 ] ) {
        neighbors++;
      }
    }

    return neighbors;
  }

  // handleIntervalChange = (event) => {
  //   this.setState({ interval: event.target.value });
  // }

  handleClear = ( reboard = true, numberOfGenerations = 0 ) => {
    if( window.confirm( "Are you sure? This will be clear everything" ) !== false ) {
      if( reboard ) {
        this.board = this.makeEmptyBoard();
      }
      this.updateStoreAndRedux( numberOfGenerations, false )
    }
  }

  initGeneration = ( initCells? : string[] ) : void => {
    var getRandom = () : boolean => ( Math.random() >= 0.5 );
    var getIf = ( y : number, x : number ) => {
      var isAlive = initCells && initCells.includes( `${ y + 1 },${ x + 1 }` );
      return isAlive;
    }

    let board = [] as any[];
    const { rows, cols } = this.state.gridSettings;
    for ( let y = 0; y < rows; y++ ) {
      board[y] = [] as boolean[];
      for ( let x = 0; x < cols; x++ ) {
        board[ y ][ x ] = ( initCells !== undefined ? getIf( y, x ) : getRandom() );
      }
    }
    this.board = board;

    this.setState({ cells: this.makeCells() });
  }

  // handleRandom = ( settings? ) => {
  //   for (let y = 0; y < this.state.gridSettings.rows; y++) {
  //     for (let x = 0; x < this.state.gridSettings.cols; x++) {
  //       this.board[y][x] = (Math.random() >= 0.5);
  //     }
  //   }

  //   this.setState({ cells: this.makeCells() });
  // }

  render() {
    const { cells /*, interval, isRunning*/ } = this.state;
    const { width, height, cellsize } = this.state.gridSettings;

    return (
      <div className="game-of-life">
        <div className="board"
          style={{ width: width, height: height, backgroundSize: `${ cellsize }px ${ cellsize }px`}}
          onClick={ this.handleClick }
          ref={ ( n ) => { this.boardRef = n; }}>

          { cells.map( cell => (
            <Cell x={ cell["x"] } y={ cell["y"] } size={ cellsize } key={ `${ cell[ "x" ] },${ cell[ "y" ] }` } />
          ))}
        </div>
      </div>
    );
  }
}

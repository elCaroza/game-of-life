import { FREE_GENERATION } from '../../../config/app';
import { CELL_SIZE, WIDTH, HEIGHT, COMPONENT_SETTINGS } from './GameOfLife-Settings';
import "./GameOfLife-Styles.scss";

class Cell extends COMPONENT_SETTINGS.PROTO_CLASS_CELL {
  render() {
    const { x, y } = this.props;
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
      }} />
    );
  }
}

export default class GameOfLifeComponent extends COMPONENT_SETTINGS.PROTO_CLASS_GOF_ {

  state = COMPONENT_SETTINGS.INITIAL_STATE;

  rows;cols;board;boardRef;timeoutHandler;

  constructor(props) {
    super(props);
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.makeEmptyBoard();

    setTimeout( () => this.handleRandom(), 100 );
  }

  UNSAFE_componentWillReceiveProps( nextProps : any ) {
    
    if( nextProps.contentData.action === "generation" ) {
      this.handleClear();
      if( nextProps.contentData.realUpdate === FREE_GENERATION )  {
        this.handleRandom();
      }
    }
    if( nextProps.contentData.action === "clear" ) {
      this.handleClear();
    }
    if( nextProps.contentData.action === "try" ) {
      this.runIteration();
    }
    if( nextProps.contentData.action === "interval" ) {
      this.setState({ interval: ( nextProps.contentData.realUpdate * 1000 ) });
    }
    if( nextProps.contentData.action === "isRunning" ) {
      this.setState({ isRunning : nextProps.contentData.realUpdate });
      ( nextProps.contentData.realUpdate ? this.runGame() : this.stopGame() )
    }

    // if( JSON.stringify( nextProps.contentData ) != JSON.stringify( this.state ) ) {
    //   this.setState( nextProps.contentData );
    // }
  }

  makeEmptyBoard() {
    let board = [] as any[];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [] as boolean[];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
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
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  handleClick = (event) => {

    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.makeCells() });
  }

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  }

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
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
    this.setState( newState );
    this.props.settingData({
      action : "realtimeChanging",
      ...newState
    })
  }

  runIteration() {
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.updateStoreAndRedux( ( this.state.numberOfGenerations + 1 ) )

    console.log("this.state.isRunning:", this.state.isRunning)
    //if( this.state.isRunning ) {
      this.timeoutHandler = window.setTimeout(() => {
        this.runIteration();
      }, this.state.interval);
    //}
  }

  /**
   * Calculate the number of neighbors at point (x, y)
   * @param {Array} board 
   * @param {int} x 
   * @param {int} y 
   */
  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  }

  // handleIntervalChange = (event) => {
  //   this.setState({ interval: event.target.value });
  // }

  handleClear = () => {
    if( window.confirm( "Are you sure? This will be clear everything" ) !== false ) {
      this.board = this.makeEmptyBoard();
      this.updateStoreAndRedux( 0, false )
    }
  }

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = (Math.random() >= 0.5);
      }
    }

    this.setState({ cells: this.makeCells() });
  }

  render() {
    const { cells /*, interval, isRunning*/ } = this.state;
    return (
      <div>
        <div className="Board"
          style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
          onClick={ this.handleClick }
          ref={ ( n ) => { this.boardRef = n; }}>

          { cells.map( cell => (
            <Cell x={ cell["x"] } y={ cell["y"] } key={ `${cell["x"]},${cell["y"]}` } />
          ))}
        </div>
      </div>
    );
  }
}

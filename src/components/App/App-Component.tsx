import { COMPONENT_SETTINGS, ContentApp } from './App-Settings';
import "./App-Styles.scss";
import FilesManager from '../FilesManager';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Player from '../Game/Player';
import GenerationsLabelling from '../Game/GenerationsLabelling';
import GameOfLife from '../Game/GameOfLife';
import { FREE_GENERATION } from '../../config/app';
import { getFileGenerationAsData } from '../../config/utils';

export default class AppComponent extends COMPONENT_SETTINGS.PROTO_CLASS {

  state = COMPONENT_SETTINGS.INITIAL_STATE;
  checkInterval = {};

  componentDidMount(){}

  startGame = () => {
    this.setState({
      isGaming: true
    })
  }

  render() {
    const { filesGenerations, numberOfGenerations } = this.props.contentData;

    return(
      <ThemeProvider theme={ COMPONENT_SETTINGS.DARK_THEME }>
        <ContentApp>
          <Card sx={{ my:4, margin : "auto" }} elevation={ 24 }>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Game of life
                </Typography>
                { ( this.state.isGaming === false ) && (
                  <>
                    <Typography variant="body2" color="text.secondary" className="intro-txt">
                      Drag and drop below your .txt file with starting generation of cells, 
                      typing "." to point dead cells and "*" to alive ones, <br />
                      this file will be read as a per row and column vector. <br /> <br />
                    </Typography>
                    <div style={{textAlign:"left", padding : "0px 20px 20px 20px"}}>
                      Some examples are located in <b>generations/</b> folder and must be with the same structure rules: <br />
                      - First row with generation starter init : "Generation $n" <br />
                      - Second row with grid size : "$rows $cols" <br />
                      - From third row to EOF each one as grid row, Is not necessary to set every single row and column <br /> 
                        in fact you can set from (0,0) to necessary alive ones obmitting remaining dead cells. <br />
                      Remember dead cells with "." and alive ones with "*" other chars will cause error. <br />
                      If dropped file causes errors you cannot go on.
                    </div>
                    <FilesManager 
                      fileType={ "text" }
                      onLoading={( data ) => { 

                        // fake loading 
                        data.chunks.totalChunks = 100
                        this.checkInterval[ data.name ] = setInterval( () => {
                          if( data.chunks.currentChunkIndex < 100 ) {
                            data.chunks.currentChunkIndex++;
                            data.loading()   
                          } else {
                            clearInterval( this.checkInterval[ data.name ] );

                            this.props.updateFiles( {
                              [ data.name ] : getFileGenerationAsData( data.getContent() )
                            } );

                            this.setState({
                              starting : true
                            });
                          }           
                        }, 100 )
                      }}
                    ></FilesManager>
                  </>
                ) }

              { ( this.state.isGaming === true ) && (
                <GameOfLife />
              ) }
                
              </CardContent>
            </CardActionArea>
            <CardActions className="controllers-game-container">
              { ( this.state.starting && !this.state.isGaming ) && (
                <Button color="primary" variant="contained" size="large" style={{ margin:"auto" }} 
                onClick={ this.startGame }>Start gaming</Button>
              ) }
              { ( this.state.isGaming === true ) && (
                <>
                  <Player 
                    generations={[
                      FREE_GENERATION,
                      ...filesGenerations
                    ]} 
                    defaultRefresh={ 1 } 
                    min={ 0.1 } 
                    max={ 5 }
                    step={ 0.2 } 
                    getSettings={( action : string, realUpdate : any )=> {
                      this.props.settingData({
                        action : action,
                        realUpdate : realUpdate
                      })
                    }}  
                  />
                  <GenerationsLabelling currentValue={ numberOfGenerations } />
                </>
              ) }
            </CardActions>
          </Card>
        </ContentApp>
      </ThemeProvider>
    );
  }
}

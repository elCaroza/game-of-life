import { COMPONENT_SETTINGS, ContentApp } from './App-Settings';
import "./App-Styles.scss";
// import AudioManager from '../AudioManager';
// import axios from 'axios';
import FilesManager from '../FilesManager';
// import ChatRoom from '../ChatRoom/ChatRoom';
// import Demo from '../DemoMUI/Demo';
import Elevation from '../DemoMUI/Elevation';

// import Paper from '@mui/material/Paper';
import { /*createTheme, styled,*/ ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Player from '../Game/Player';
import GenerationsLabelling from '../Game/GenerationsLabelling';
import GameOfLife from '../Game/GameOfLife';
import { FREE_GENERATION } from '../../config/app';
import { getFileGenerationAsData } from '../../config/utils';

// const ContentApp = styled( Paper )(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   with : "100vw",
//   height : "100vh",
//   padding : 20,
//   display : "flex",
//   alignItems : "center"
// }));
//const darkTheme = createTheme({ palette: { mode: "dark" } });

// import { map } from "rxjs/operators";
// import { interval } from 'rxjs';

// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import SockJsClient from 'react-stomp';

// var socket = new SockJS('/hello');
// var stompClient = Stomp.over(socket);
// 	stompClient.connect({ username: "prova", }, function() {
// 		console.log('Web Socket is connected');
// 		stompClient.subscribe('/users/queue/messages', function(message) {
// 			console.log("BODY:", message.body);
// 		});
// 	});

//   setTimeout(() => {
  
//   // send message
//   stompClient.send("/app/hello", {}, "MSG : "+(new Date()))
// }, 5000);


// var sock = new SockJS('/our-websocket');
// let stompClient = Stomp.over(sock);
// console.log(sock,stompClient)
// sock.onopen = () => {
//   console.log('onopen');
// }
// sock.onerror = ( err : any ) => {
//   console.log('onerror:', err);
//   sock.close()
// }
// sock.onmessage = ( msg : any ) => {
//   console.log('onmessage:', msg);
// }
// stompClient.connect({}, (frame : any) => {
//   console.log('Connected: ' + frame);

//   stompClient.subscribe('/topic/messages', (greeting : any) => {
//     console.log("greeting:", greeting);
//     //you can execute any function here
//   });
  
// });


// setTimeout(() => {
  
// // send message
// stompClient.send("/ws/message", {}, "MSG : "+(new Date()))
// }, 5000);


export default class AppComponent extends COMPONENT_SETTINGS.PROTO_CLASS {

  state = COMPONENT_SETTINGS.INITIAL_STATE;
  checkInterval = {};

  // constructor( props : any ) {
  //   super( props );
  // }

  componentDidMount(){

    // FUNZIONAVA (ultimo test)
    // var ws = new WebSocket('ws://localhost:8080/user');
    // ws.onmessage = function(data) {
    //   console.log("onmessage:", data)
    // }

    // var data = JSON.stringify({
    //   'user' : "prova"
    // })
    // console.log("send:", data)
    // ws.send(data);

    

    // fetch('/api/dadjokes')
    //   .then(response => response.text())
    //   .then(message => {
    //     console.log("message:", message)
    //   });

    // axios.get('/api/dadjokes')
    //   .then(response => response.data)
    //   .then(response=>{
    //     console.log("response:", response)
    //   })


    // setInterval( () => 
    // stompClient.send("/ws/message", {}, "MSG : "+(new Date()))
    // , 2000 )

    // setInterval(() => {
    //   this.exampleActionRedux();
    // }, 2000);

    // fetch('https://localhost:8443/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({}),
    // })
    // //.then((response) => response.json())
    // .then((responseJson) => {
    //   console.log("#### responseJson:", responseJson)
    // })
    // .catch((error) => {
    //   console.error("#### error:",error);
    // });


    // eventSource.onerror = err => {
    //   console.log('EventSource error: ', err);
    // };

    // axios.post("http://localhost:8080/event/resources/usage")
    // .then( res => res.data )
    // .then( result => {
    //   console.log("RES:", result)
    // } )


    // FUNZIONA
    // const eventSource = new EventSource("http://localhost:8080/event/resources/usage", {withCredentials:false});
    
    // eventSource.onopen = result => {
    //   console.log('onopen: ', result);
    // };
    // eventSource.onmessage = result => {
    //   const data = JSON.parse(result.data);
    //   console.log('Data: ', data);
    // };
    // eventSource.onerror = result => {
    //   console.log('onerror: ', result);
    // };

	}

  // UNSAFE_componentWillReceiveProps( nextProps : any ) {

  //   if( JSON.stringify( nextProps.contentData ) != JSON.stringify( this.state ) ) {
  //     this.setState( nextProps.contentData );
  //   }
  // }

  // exampleActionRedux = () => {
  //   this.props.settingData({ val : this.props.contentData.val + 1 })
  // }

  // clientRef : any;

  // sendMessage = () => {
  //   this.clientRef.sendMessage('/app/user-all', JSON.stringify({
  //       name: "Nome",
  //       message: "messaggio"
  //   }));
  // };

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
                      this file will be read as a per row and column vector  
                    </Typography>
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





  // ### NON USATO
  render222(){

    //const { contentData } = this.props;

    return(
      <div className="container App">
        {/* <SockJsClient url='http://localhost:8080/websocket-chat/'
          topics={['/topic/user']}
          onConnect={() => {
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(msg : any) => {
            console.log("msg:",msg);
          }}
          ref={(client : any ) => {
            this.clientRef = client
          }}
        />
        <button 
          color="primary"
          onClick={this.sendMessage}>Send</button> */}


          {/* <ChatRoom /> */}
   
        <FilesManager 
          fileType={"text"}
          onLoading={( content ) => { 

            // fake loading 
            content.chunks.totalChunks = 100
            var checkInterval = setInterval( () => {
              if( content.chunks.currentChunkIndex < 100 ) {
                content.chunks.currentChunkIndex++;
                content.loading()   
              } else {
                clearInterval( checkInterval )

                // Content to save in redux 
                getFileGenerationAsData( content.getContent() );

                this.setState({
                  starting : true
                })
              }           
            }, 100 )
          }}
        ></FilesManager>
        { this.state.starting && (
          <>
          <button color="primary" onClick={this.startGame}>Start gaming</button> 
          {/* <Demo /> */}
          <Elevation />
          </>
        ) }
        {/* <AudioManager src={ "https://sampleswap.org/mp3/artist/46669/joevirus_confused-160.mp3" }></AudioManager>
        <div className="words-board">
          <span className="words">
            { JSON.stringify( contentData ) }
          </span>          
        </div> */} 
      </div>
    );
  }
}

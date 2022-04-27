import React from "react";
import {useState, useEffect} from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//import axios from "axios";
import './FilesManager-Styles.scss';


// import {over} from 'stompjs';
// import SockJS from 'sockjs-client';
import { I__COMPONENT_SETTINGS } from "./FilesManager-Settings";
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";
//var stompClient =null as any;

const chunkSize = 10 * 1024;
// const GET_API_LINK_FROM = ( fileName : string, requestType : string ) => {
//   let apiPath = "http://localhost:8080/files";
//   if( requestType == "upload" ) apiPath += `/upload?${ fileName }`;
//   if( requestType == "uploads" ) apiPath += `/uploads/${ fileName }`;
//   return apiPath
// }

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export function FilesManagerComponent( props : I__COMPONENT_SETTINGS[ "PROPS" ] ) {

  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [files, setFiles] = useState([] as any[]);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
  const [invalidFile, setInvalidFile] = useState(false);

  const updateFilesWith = ( content : any ) => {
    var newFiles = [] as any[];   
    files.map( (f) => {
      if(f != {}) {
        let newFile = {
          ...f,
          ...( f.name === content.name ? content : {} )
        }
        newFiles.push(newFile)
      }
    } )
    setFiles([...newFiles] as any);
  }

    
  // const [userData, setUserData] = useState({
  //   username: '',
  //   receivername: '',
  //   connected: false,
  //   message: ''
  // });

  // const [contentFile, setContentFile] = useState({
  //   file : "",
  //   name : "",
  //   size : 0,
  //   chunks : {
  //     currentChunkIndex : 0,
  //     totalChunks : 0
  //   }
  // });

  // const connect =( content )=>{
  //   updateFilesWith( content );
  //   let Sock = new SockJS('http://localhost:8080/ws');
  //   stompClient = over(Sock);
  //   stompClient.connect({}, () => {
  //     stompClient.subscribe('/trigger/current_audio', onMessageReceived);
  //     setTimeout(() => {
  //       stompClient.send("/app/upload_chunk", {}, JSON.stringify(content));
  //     })
  //   }, onError);
  // }

  // const onConnected = (content) => {
  //   //setUserData({...userData,"username":"prova", "connected": true});
  //   stompClient.subscribe('/trigger/current_audio', onMessageReceived);
  //   //stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
  //   // // userJoin();

  //   setTimeout(() => {
  //     //console.log("content:", content)
  //     stompClient.send("/app/upload_chunk", {}, JSON.stringify(content));
  //   }, 5000);
  // }

  const onMessageReceived = (payload)=>{
    var payloadData = JSON.parse(payload.body);
    updateFilesWith( payloadData );
  }
  // const onPrivateMessage = (payload)=>{
  //   console.log("onPrivateMessage:::", payload);
  // }

//   const userJoin=()=>{
//     // var chatMessage = {
//     //   senderName: userData.username,
//     //   status:"JOIN"
//     // };
//     stompClient.send("/app/message", {}, JSON.stringify(contentFile));
// }

  const onError = (err) => {
    console.log("ERROR SOCKET:", err);  
  }

  // const sendMSG=( msg : any )=>{
  //   var thisMsg = {
  //     senderName: msg,
  //     status:"JOIN"
  //   };
  //   stompClient.send("/app/message", {}, JSON.stringify(thisMsg));
  // }

  function handleDrop(e : any) {
    e.preventDefault();
    setFiles([...files, ...e.dataTransfer.files] as any);
  }

  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file = files[currentFileIndex as any] as string;
    if (!file) {
      return;
    }
    const from = Number(currentChunkIndex) * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to) as any;
    reader.onload = e => uploadChunk(e);
    reader.readAsDataURL(blob);
  }

  function uploadChunk(readerEvent : any) {
    // const headers = {'Content-Type': 'application/json'};
    // const url =  GET_API_LINK_FROM( "", "upload" );  //'http://localhost:4001/upload?'+params.toString();
    
    const file = files[currentFileIndex as any];
    const isAudio = (file["type"] as string).startsWith( `${ props.fileType }/` );
    setInvalidFile( !isAudio );
    if( isAudio ) {
      var content = {
        file : readerEvent.target.result as string,
        name : file["name"] as string,
        size : file["size"],
        chunks : {
          currentChunkIndex : Number(currentChunkIndex),
          totalChunks : Number(Math.ceil(file["size"] / chunkSize))
        },
        loading : () => {
          updateFilesWith( content )
        },
        getContent : () => {
          const encodingIn = "base64";
          const fileContent = (content.file.split( `${ encodingIn },` ))[ 1 ]
          const myBuffer = Buffer.from( fileContent , encodingIn);
          var c = myBuffer.toString();
          return c;
        }
      } as any;
      props.onLoading( content )
      //connect( content );
    }

    //connect();
    
    // sendMSG( "prova" )

    // axios.post(url, content, {headers})
    //   .then(response => response.data )
    //   .then(response => {
    //     console.log("RESPONSE:", response)
    //   })

    //const data = readerEvent.target.result;
    // const params = new URLSearchParams();
    // params.set('name', file["name"]);
    // params.set('size', file["size"]);
    // params.set('currentChunkIndex', (currentChunkIndex as any));
    // params.set('totalChunks', (Math.ceil(file["size"] / chunkSize) as any));
    // console.log("url:", url);
    // console.log("content:", content)
    // axios.post(url, data, {headers})
    //   .then(response => {
    //     var file = { 
    //       ...(files[currentFileIndex as any] as any[]), 
    //       finalFilename : "" 
    //     } as any;
    //     const filesize = files[currentFileIndex as any]["size"];
    //     const chunks = Math.ceil(filesize / chunkSize) - 1;
    //     const isLastChunk = currentChunkIndex === chunks;
    //     if (isLastChunk) {
    //       file["finalFilename"] = response.data.finalFilename;
    //       setLastUploadedFileIndex(currentFileIndex);
    //       setCurrentChunkIndex(null);
    //     } else {
    //       setCurrentChunkIndex((currentChunkIndex as any) + 1);
    //     }
    //   });
  }

  useEffect(() => {
    if (lastUploadedFileIndex === null) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === files.length - 1;
    const nextFileIndex = isLastFile ? null : (currentFileIndex as any) + 1;
    setCurrentFileIndex(nextFileIndex);
  }, [lastUploadedFileIndex]);

  useEffect(() => {
    if (files.length > 0) {
      if (currentFileIndex === null) {
        setCurrentFileIndex(
          (lastUploadedFileIndex as any) === null ? 0 : (lastUploadedFileIndex as any) + 1
        );
      }
    }
  }, [files.length]);

  useEffect(() => {
    if (currentFileIndex !== null) {
      setCurrentChunkIndex(0 as any);
    }
  }, [currentFileIndex]);

  useEffect(() => {
    if (currentChunkIndex !== null) {
      readAndUploadCurrentChunk();
    }
  }, [currentChunkIndex]);

  return (
    <div className="FilesManager">
      <div
        onDragOver={e => {setDropzoneActive(true); e.preventDefault();}}
        onDragLeave={e => {setDropzoneActive(false); e.preventDefault();}}
        onDrop={e => handleDrop(e)}
        className={"dropzone" + (dropzoneActive ? " active" : "")}>
          Drop your <b>{ props.fileType }</b> file here
      </div>

      <div className="files">
        {files.map((file,fileIndex) => {
          let linkPath = "";
          let progress = file["chunks"] ? Math.round((file["chunks"]["currentChunkIndex"] as any) / file["chunks"]["totalChunks"] * 100) : 0;
          let labelName = `${ file["name"]} ${ (progress === 100 ? '' : `( ${ progress }% )` ) }`;

          return (
            <div key={ `${ file["name"] }-${ fileIndex }` } className="file">
              <div className="name">{ labelName }</div>
              <div className={"progress " + (progress === 100 ? 'done' : '')} style={{width:progress+'%'}}></div>
            </div>
          ); 
        })}
      </div>

      { invalidFile && (
        <Alert variant="filled" severity="error" style={{ margin:"20px 0px 20px 0px" }}>
          <AlertTitle  style={{textAlign:"left" }}>Error</AlertTitle>
          This file is not valid, please serve <strong>{ props.fileType }</strong> type file
        </Alert>
      )}

    </div>
  );
};



// import { COMPONENT_SETTINGS } from './FilesManager-Settings';
// import "./FilesManager-Styles.scss";
// import logo from "../../assets/img/logo.svg";

// export default class FilesManagerComponent extends COMPONENT_SETTINGS.PROTO_CLASS {

//   state = COMPONENT_SETTINGS.INITIAL_STATE;

//   // constructor( props : any ) {
//   //   super( props );
//   // }

//   componentDidMount(){

//     // setInterval(() => {
//     //   this.exampleActionRedux();
//     // }, 2000);
// 	}

//   // UNSAFE_componentWillReceiveProps( nextProps : any ) {

//   //   if( JSON.stringify( nextProps.contentData ) != JSON.stringify( this.state ) ) {
//   //     this.setState( nextProps.contentData );
//   //   }
//   // }

//   exampleActionRedux = () => {
//     this.props.settingData({ val : this.props.contentData.val + 1 })
//   }

//   render(){

//     const { contentData } = this.props;

//     return (
//       <div className="FilesManager">
//         FilesManager
//       </div>
//     );
//   }
// }

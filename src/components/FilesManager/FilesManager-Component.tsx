import React from "react";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './FilesManager-Styles.scss';
import { I__COMPONENT_SETTINGS } from "./FilesManager-Settings";

const chunkSize = 10 * 1024;

export function FilesManagerComponent( props : I__COMPONENT_SETTINGS[ "PROPS" ] ) {

  const [ dropzoneActive, setDropzoneActive ] = useState( false );
  const [ files, setFiles ] = useState( [] as any[] );
  const [ currentFileIndex, setCurrentFileIndex ] = useState( null );
  const [ lastUploadedFileIndex /*, setLastUploadedFileIndex*/ ] = useState( null );
  const [ currentChunkIndex, setCurrentChunkIndex ] = useState( null );
  const [ invalidFile, setInvalidFile ] = useState( false );

  const updateFilesWith = ( content : any ) => {
    var newFiles = [] as any[];   
    files.map( ( f ) => {
      if( f !== {} ) {
        let newFile = {
          ...f,
          ...( f.name === content.name ? content : {} )
        }
        newFiles.push( newFile )
      }
      return true
    } )
    setFiles( [ ...newFiles ] as any );
  }

  function handleDrop( e : any ) {
    e.preventDefault();
    setFiles( [ ...files, ...e.dataTransfer.files ] as any );
  }

  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file = files[ currentFileIndex as any ] as string;
    if ( !file ) {
      return;
    }
    const from = Number( currentChunkIndex ) * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice( from, to ) as any;
    reader.onload = e => uploadChunk( e );
    reader.readAsDataURL( blob );
  }

  function uploadChunk( readerEvent : any ) {
    const file = files[ currentFileIndex as any ];
    const isAudio = (file["type"] as string).startsWith( `${ props.fileType }/` );
    setInvalidFile( !isAudio );
    if( isAudio ) {
      var content = {
        file : readerEvent.target.result as string,
        name : file[ "name" ] as string,
        size : file[ "size" ],
        chunks : {
          currentChunkIndex : Number( currentChunkIndex ),
          totalChunks : Number( Math.ceil( file[ "size" ] / chunkSize ) )
        },
        loading : () => {
          updateFilesWith( content )
        },
        getContent : () => {
          const encodingIn = "base64";
          const fileContent = ( content.file.split( `${ encodingIn },` ))[ 1 ]
          const myBuffer = Buffer.from( fileContent , encodingIn );
          var c = myBuffer.toString();
          return c;
        }
      } as any;
      props.onLoading( content )
    }
  }

  useEffect(() => {
    if ( lastUploadedFileIndex === null ) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === files.length - 1;
    const nextFileIndex = isLastFile ? null : ( currentFileIndex as any ) + 1;
    setCurrentFileIndex( nextFileIndex );
  }, [ lastUploadedFileIndex, currentFileIndex, files.length ] );

  useEffect(() => {
    if ( files.length > 0 ) {
      if ( currentFileIndex === null ) {
        setCurrentFileIndex(
          ( lastUploadedFileIndex as any ) === null ? 0 : ( lastUploadedFileIndex as any ) + 1
        );
      }
    }
  }, [ lastUploadedFileIndex, currentFileIndex, files.length ] );

  useEffect(() => {
    if ( currentFileIndex !== null ) {
      setCurrentChunkIndex( 0 as any );
    }
  }, [ currentFileIndex ] );

  useEffect(() => {
    if ( currentChunkIndex !== null ) {
      readAndUploadCurrentChunk();
    }
  }, [ currentChunkIndex ] );

  return (
    <div className="files-manager">
      <div
        onDragOver={ e => { setDropzoneActive( true ); e.preventDefault(); }}
        onDragLeave={ e => { setDropzoneActive( false ); e.preventDefault(); }}
        onDrop={ e => handleDrop( e ) }
        className={"dropzone" + ( dropzoneActive ? " active" : "" ) }>
          Drop your <b>{ props.fileType }</b> file here
      </div>

      <div className="files">
        { files.map( ( file, fileIndex ) => {
          //let linkPath = "";
          let progress = file[ "chunks" ] ? Math.round( ( file[ "chunks" ][ "currentChunkIndex" ] as any ) / file[ "chunks" ][ "totalChunks" ] * 100 ) : 0;
          let labelName = `${ file[ "name" ] } ${ ( progress === 100 ? "" : `( ${ progress }% )` ) }`;

          return (
            <div key={ `${ file[ "name" ] }-${ fileIndex }` } className="file">
              <div className="name" >{ labelName }</div>
              <div className={ "progress " + ( progress === 100 ? "done" : "" )} style={{ width: progress + "%" }}></div>
            </div>
          ); 
        })}
      </div>

      { invalidFile && (
        <Alert variant="filled" severity="error" className="invalid-file-container">
          <AlertTitle className="main-title">Error</AlertTitle>
          This file is not valid, please serve <strong>{ props.fileType }</strong> type file
        </Alert>
      )}

    </div>
  );
};



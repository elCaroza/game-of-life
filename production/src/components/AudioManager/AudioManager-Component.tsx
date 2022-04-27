import { COMPONENT_SETTINGS } from './AudioManager-Settings';
import "./AudioManager-Styles.scss";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class AudioManagerComponent extends COMPONENT_SETTINGS.PROTO_CLASS {

  state = COMPONENT_SETTINGS.INITIAL_STATE;

  // constructor( props : any ) {
  //   super( props );
  // }

  componentDidMount(){}

  updateAudioTrigger = ( data : any ) => {
    this.props.settingData( data )
  }

  render(){

    const src = this.props.src || "";

    return (
      <div className="AudioManager">
        <AudioPlayer
          autoPlay
          src={ src }
          onListen={ ( e : any ) => this.updateAudioTrigger( { currentTime : e.target.currentTime } ) }
          onPlay={ ( e : any ) => this.updateAudioTrigger( { status : "onPlay" } ) }
          onPause={ ( e : any ) => this.updateAudioTrigger( { status : "onPause" } ) }
        />
      </div>
    );
  }
}

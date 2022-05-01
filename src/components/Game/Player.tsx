import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TryIcon from '@mui/icons-material/Try';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Player( props ) {
  const [value, setValue] = React.useState<boolean>( false );
  const [refresh, setRefresh] = React.useState<number>( props.defaultRefresh );
  const [selection, setSelection] = React.useState<string>( props.generations[ 0 ] );
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelection( value[0] );
    setValue( false );
    props.getSettings( "generation", value[0] )
  };

  const isFreeGeneration = ( ) : boolean => ( selection === props.generations[ 0 ] )
  const isRunning = ( ) : boolean => ( value === true )

  const handleChangeRefresh = (event: Event, newRefresh: number | number[]) => {
    if (typeof newRefresh === 'number') {
      setRefresh(newRefresh);
      props.getSettings( "interval", newRefresh )
    }
  };

  const handleClick = ( btnType = "isRunning" || "try" || "clear" ) => {
    var realUpdate = undefined as any;
    if( btnType === "isRunning" ) {
      setValue(!value);
      realUpdate = !value;
    }
    else if( btnType === "try" ) {      
      setValue( false )
    }
    else if( btnType === "clear" ) {
      setValue( false )
    }
    props.getSettings( btnType, realUpdate )
  }

  return (
      <div style={{ display: "flex" }}>
         <Box sx={{ width: 250 }}>
          <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Generation init
            </InputLabel>
            <Select
              native
              value={selection}
              // @ts-ignore Typings are not considering `native`
              onChange={handleChangeMultiple}
              label="Native"
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {props.generations.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 250 }}>
            <Typography id="non-linear-slider" gutterBottom>
                Refresh on: <strong>{ refresh }</strong> seconds
            </Typography>
            <Slider
                value={refresh}
                min={ props.min }
                step={ props.step }
                max={ props.max }
                onChange={handleChangeRefresh}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
            />
        </Box>
        <Box sx={{ padding : "0px 20px 0px 20px" }}>
            <Button variant="outlined" size="large" onClick={ ()=> handleClick( "isRunning" ) } startIcon={( value ? <PauseIcon /> : <PlayArrowIcon /> )} style={{ margin: "20px 10px 0px 10px"}}>
                { value ? "Pause" : "Play" }
            </Button>
            <Button disabled={ isFreeGeneration() && isRunning() } variant="outlined" size="large" onClick={ () => handleClick( "try" ) } startIcon={<TryIcon />} style={{ margin: "20px 10px 0px 10px"}}>
                Try
            </Button>
            <Button variant="outlined" size="large" onClick={ () => handleClick( "clear" ) } startIcon={<ClearIcon />} style={{ margin: "20px 10px 0px 10px"}}>
                Clear
            </Button>
        </Box>
      </div>  
  );
}
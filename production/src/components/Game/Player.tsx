import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TryIcon from '@mui/icons-material/Try';

export default function Player( props ) {
  const [value, setValue] = React.useState<boolean>( false );
  const [refresh, setRefresh] = React.useState<number>( props.defaultRefresh );

  const handleChangeRefresh = (event: Event, newRefresh: number | number[]) => {
    if (typeof newRefresh === 'number') {
      setRefresh(newRefresh);
    }
  };

  const onclickBTN = () => {
    setValue(!value)

    console.log("Is playing:", !value)
  }

  const nextkBTN = () => {
    console.log("NEXT")
  }

  return (
      <div style={{ display: "flex" }}>
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
            <Button variant="outlined" size="large" onClick={ onclickBTN } startIcon={( value ? <PauseIcon /> : <PlayArrowIcon /> )} style={{ margin: "20px 10px 0px 10px"}}>
                { value ? "Pause" : "Play" }
            </Button>
            <Button variant="outlined" size="large" onClick={ nextkBTN } startIcon={<TryIcon />} style={{ margin: "20px 10px 0px 10px"}}>
                Try
            </Button>
        </Box>
      </div>
  );
}
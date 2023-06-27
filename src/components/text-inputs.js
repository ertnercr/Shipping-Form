import React from 'react';
import { TextField} from '@mui/material';
function TextInputs(props) {



  return (
    <div>
        <TextField InputProps={{ sx: { borderRadius: 2 } }} InputLabelProps={{ shrink: true }} {...props} size='small' required id="outlined-basic" variant='outlined' />
    </div>
  )
}

export default TextInputs 
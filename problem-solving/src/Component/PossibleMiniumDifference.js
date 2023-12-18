import { Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react'

const PossibleMiniumDifference = () => {

  const [showInput, setShowInput] = useState(false)

  const handleClick = () => {
    setShowInput(true);
  }

  const handleSubmit = () => {
    setShowInput(true);
  }

  return (
    <div>
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Possible Minium Difference
        </Button>
      </div>
      <br></br>
      <div style={{display:"flex", gap:"2rem"}}>
        {showInput && (
          <>
            <TextField
              id="filled-basic" label="Enter password" variant="filled"
            />
            <Button
              variant="outlined"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default PossibleMiniumDifference
import React, { useEffect, useState } from 'react'
import { Button, Input, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { BACKEND_URL } from './Constant';

const StrongPassword = () => {
  const [showInput, setShowInput] = useState(false)

  const [password, setPassword] = useState('')

  const [rows, setRows] = useState([]);

  const fetchListPassword = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/fetch-StrongPassword`);

      setRows(response?.data?.result?.data);

      console.log("Response: ", response)
    }
    catch (error) {
      console.error('Error: ', error)
    }
  }

  useEffect(()=>{
    fetchListPassword()
  },[])
  const handleClick = () => {
    setShowInput(true)
  }

  const handleSubmit = async () => {
    let result = checkStrongPassword(password);
    let payload = {
      passwordString: password,
      noOfAlliteration: result
    }
    console.log(payload)
    try {
      const response = await axios.post(`${BACKEND_URL}/strongPassword`, payload);
      fetchListPassword()
      console.log("Response: ", response)
    }
    catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleChange = (event) => {
    setPassword(event.target.value)
  }

  const checkStrongPassword = (password) => {
    let changesNeeded = 0,
      lowercasePresent = 1,
      uppercasePresent = 1,
      digitPresent = 1;

    const passwordChars = password.split("");
    const charCountArray = new Array(passwordChars.length).fill(0);

    for (let i = 0; i < charCountArray.length;) {
      if (passwordChars[i].toLowerCase() !== passwordChars[i]) uppercasePresent = 0;
      if (passwordChars[i].toUpperCase() !== passwordChars[i]) lowercasePresent = 0;
      if (!isNaN(parseInt(passwordChars[i]))) digitPresent = 0;

      let j = i;
      while (i < passwordChars.length && passwordChars[i] === passwordChars[j]) i++;
      charCountArray[j] = i - j;
    }

    const totalMissingTypes = lowercasePresent + uppercasePresent + digitPresent;

    if (charCountArray.length < 6) {
      changesNeeded += totalMissingTypes + Math.max(0, 6 - (charCountArray.length + totalMissingTypes));
    } else {
      const excessLength = Math.max(charCountArray.length - 20, 0);
      let remainingExcess = 0;
      changesNeeded += excessLength;

      for (let k = 1; k < 3; k++) {
        for (let i = 0; i < charCountArray.length && excessLength > 0; i++) {
          if (charCountArray[i] < 3 || charCountArray[i] % 3 !== k - 1) continue;
          charCountArray[i] -= Math.min(excessLength, k);
          excessLength -= k;
        }
      }

      for (let i = 0; i < charCountArray.length; i++) {
        if (charCountArray[i] >= 3 && excessLength > 0) {
          const requiredReduction = charCountArray[i] - 2;
          charCountArray[i] -= excessLength;
          excessLength -= requiredReduction;
        }

        if (charCountArray[i] >= 3) remainingExcess += Math.floor(charCountArray[i] / 3);
      }

      changesNeeded += Math.max(totalMissingTypes, remainingExcess);
    }

    return changesNeeded;
  }

  return (
    <div>
      <div>
        <div>
          <Button
            variant="contained"
            onClick={handleClick}
          >
            Strong Password
          </Button>
        </div>
        <br></br>
        <div style={{ display: "flex", gap: "2rem", justifyContent: 'space-around' }}>
          {showInput && (
            <>
              <TextField
                id="filled-basic"
                label="Enter password"
                variant="standard"
                onChange={(e) => { handleChange(e) }}
                value={password}
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
      <br></br>
      {showInput && (
        <>
          <Typography sx={{ textAlign: "center", backgroundColor: "lightskyblue", borderRadius: "4px", fontWeight: "bold" }}>List of Password's</Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Password String</TableCell>
                  <TableCell>No of Alliteration Required</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* <TableCell component="th" scope="row">{row.name}</TableCell> */}
                    <TableCell>{row?.passwordString}</TableCell>
                    <TableCell>{row?.noOfAlliteration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}

export default StrongPassword
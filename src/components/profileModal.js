import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SimpleSnackbar from './snackbar'
import axios from 'axios'


export default function ProfileDialog({openModal,setOpenModal,getUserDetail,setOpenSnackbar,handleCloseSuccess}) {
  const [number,setNumber] = React.useState("");
  const [address,setAddress] = React.useState("");
  const [openSB,setOpenSB] = React.useState(false);

  const handleClose = () => {
    setOpenModal(false);
    updateData();
    return (<><SimpleSnackbar openSB={openSB} setOpenSB={setOpenSB}/></>)
  };
  let name =localStorage.getItem("username");
  let id = localStorage.getItem("userId");
  const updateData = async()=>{
    await axios.post("http://localhost:8081/addUserDetails",{id,name, number,address}).then((res)=>{
        console.log(res)
        setOpenSnackbar(true);
        getUserDetail()
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <React.Fragment>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit details</DialogTitle>
        <DialogContent>
          <TextField value={number} onChange={(e)=>{
            setNumber(e.target.value)
            }
        } variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Enter Phone No."/>
        </DialogContent>
        <DialogContent>
          <TextField value={address} onChange={(e)=>setAddress(e.target.value)} variant="standard" inputProps={{ inputMode: 'numeric', pattern: '/w*' }} label="Enter address"/>
        </DialogContent>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleClose}>Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

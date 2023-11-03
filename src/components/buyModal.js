import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SimpleSnackbar from './snackbar'


export default function FormDialog({open,setOpen,stockPrice}) {
  const [quantity,setQuantity] = React.useState(0);
  const [price,setPrice] = React.useState(stockPrice);
  const [openSB,setOpenSB] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    return (<><SimpleSnackbar openSB={openSB} setOpenSB={setOpenSB}/></>)
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <TextField value={quantity} onChange={(e)=>setQuantity(e.target.value)} variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Enter quantity"/>
        </DialogContent>
        <DialogContent>
          <TextField value={price} onChange={(e)=>setPrice(e.target.value)} variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Enter price"/>
        </DialogContent>
        <DialogContent>
          Total Amount Invested : <strong>{quantity*price}</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Buy</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

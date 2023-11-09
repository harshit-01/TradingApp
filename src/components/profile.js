import { useEffect, useState,forwardRef } from "react"
import Navbar from "./navbar.js"
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ProfilePic from "../images/profilePic.png"
import ProfileDialog from "./profileModal.js"
import axios from "axios"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  

export default function Profile(){
    let navigate = useNavigate();
    const [open,setOpen] = useState();
    const [password,setPassword] = useState("");
    const [openModal,setOpenModal] = useState(false);
    const [userDetails,setUserDetails] = useState(null);
    const [openSnackbar,setOpenSnackbar] = useState(false)
    let s = "";
    const handlePasswordChange = (e)=>{
        s = s + e.target.value;
        setPassword(s);
    }
    const handleCloseSuccess = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
            }
    
        setOpenSnackbar(false);
    }
    async function getUserDetail(){
        let id = localStorage.getItem("userId");
        console.log(id);
        let response = axios.get(`http://localhost:8081/userDetailsById/${id}`,)
            .then((res)=>{
                setUserDetails(res.data);
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        getUserDetail();
      },[])
    console.log(openModal)
    return(
        <>
            <Navbar />
            <div className="" style={{margin:"15px"}}>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{height:"100px",width:"100px",border:"1px solid grey",borderRadius:"5px"}}>
                        <img src={ProfilePic} width="90px" height="90px" style={{padding:"5px"}}></img>
                    </div>
                </div>
                <div>
                    <b>{userDetails ? userDetails.name : null}</b>
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",margin:"35px",fontWeight:"bold"}}>
                    <div style={{width:"100%"}}>
                        Phone No.
                    </div>
                    <div style={{width:"100%"}}>
                        Demat Account No.
                    </div>
                    <div style={{width:"100%"}}>
                        Address
                    </div>
                    <div style={{width:"100%"}}>
                        Account Balance
                    </div>
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",margin:"35px"}}>
                    <div style={{width:"100%"}}>
                    {userDetails ? userDetails.number : "NA"}
                    </div>
                    <div style={{width:"100%"}}>
                    {userDetails ? userDetails.id : "NA"}
                    </div>
                    <div style={{width:"100%"}}>
                    {userDetails ? userDetails.address : "NA"}
                    </div>
                    <div style={{width:"100%"}}>
                        0
                    </div>
                </div>
                <Button variant="outlined" onClick={()=>setOpen(!open)}>Add funds</Button>
                <Button variant="outlined" style={{marginLeft:"15px"}} onClick={()=>setOpenModal(true)}>Edit profile</Button>
                {open ? 
                <div style={{margin:"50px",padding:"15px",display:"flex",justifyContent:"center",alignItems:"center",
                boxShadow:"1px 1px 1px 1px grey"}}>
                    <label>Enter your password:</label>
                    <TextField value={password} onChange={handlePasswordChange}  
                    size="small" fullWidth label="Password" id="fullWidth" />
                </div>: null}
                <ProfileDialog openModal={openModal} setOpenModal={setOpenModal} getUserDetail={getUserDetail} setOpenSnackbar={setOpenSnackbar} handleCloseSuccess={handleCloseSuccess}/>
            </div>
            <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    User Logged in successfully;
                </Alert>
            </Snackbar>
        </>
    )
}
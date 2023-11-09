import "./style/signup.css"
import appLogo from "./../images/appLogo.png"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate  } from "react-router-dom";
import { useState, useEffect, useRef,forwardRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  

export default function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [openIncorrectDetails, setOpenIncorrectDetails] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClickSnackbar = () => {
        setOpen(true);
    };
    const handleSuccessClickSnackbar = () => {
        setOpen(true);
    };
    const handleIncorrectClickSnackbar = () => {
        setOpenIncorrectDetails(true);
    };
    const handleCloseIncorrectSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenIncorrectDetails(false);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSuccess(false);
    };
    let navigate = useNavigate();
    const handleUsernameChange = (e)=> {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=> {
        setPassword(e.target.value);
    }
    const handleClick = async(e) => {
        if(username.length === 0){
            setUsernameError(true);
            if(password.length === 0){
                setPasswordError(true);
            }
            else{
                setPasswordError(false);
            }
            return;
        }
        else{
            setUsernameError(false);
            if(password.length === 0){
                setPasswordError(true);
            }
            else{
                setPasswordError(false);
            }
        }
        await axios.post("http://localhost:8081/auth",{username,password}).then((res)=>{
            console.log(res);
            console.log(res?.data?.response?.split(",")[1]?.split(":")[2]?.split('"')[1])
            if(res.status == "200"){
                handleSuccessClickSnackbar();
                localStorage.setItem("username", username);
                localStorage.setItem("userId",res.data.response.split(",")[1].split(":")[2].split('"')[1])
                return navigate("/home");
            }
           
        }).catch((err)=>{
            console.log(err)
            if(err?.response?.status == "401"){
                console.log(openIncorrectDetails)
                handleIncorrectClickSnackbar();
            }
            if(err?.response?.status =="404"){
                handleClickSnackbar();
            }
            console.log(err)
        })
        console.log(username,password,usernameError);
        // API request
    };
    return(
        <div className="signupContainer">
            <div className="signupBox">
                <img className="appLogo" src={appLogo}></img>
                <p className="loginText">Login</p>
                <Box
                    sx={{
                    width: 500,
                    maxWidth: '90%',
                    marginX:3,
                    marginBottom:9
                }}
                >
                    <TextField value={username} onChange={handleUsernameChange} 
                    error ={usernameError}  color={usernameError === false ? "success" : "error"} 
                    size="small" fullWidth 
                    label="Username" id="fullWidth" helperText={usernameError ? "*Required": null}/>

                    <TextField value={password} onChange={handlePasswordChange} 
                    error ={passwordError}  color={passwordError === false ? "success" : "error"} 
                    size="small" sx={{marginTop:4,height:2}} fullWidth 
                    label="Password" id="fullWidth" helperText={passwordError ? "*Required": null}/>
                </Box>
                <div className="btnLogin">
                    <button type="submit" onClick={()=>handleClick()}>Login</button>
                </div>
                <div style={{marginTop:"20px"}}>
                    <Link href="/signup" underline="none" sx={{fontSize:"12px",color:"#234f1e"}}>
                        Dont have an account? Click to Signup.
                    </Link>
                </div>
            </div>
            <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="error" sx={{ width: '100%' }}>
                    User Logged in successfully;
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={openIncorrectDetails} autoHideDuration={6000} onClose={handleCloseIncorrectSnackbar}>
                <Alert onClose={handleCloseIncorrectSnackbar} severity="error" sx={{ width: '100%' }}>
                    Incorrect credentials provided
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    User Not found in the database
                </Alert>
            </Snackbar>
        </div>
    )
}
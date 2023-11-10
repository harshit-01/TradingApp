import "./style/signup.css"
import appLogo from "./../images/appLogo.png"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useState, useEffect, useRef,forwardRef } from "react";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ValidateEmail(email) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      alert("You have entered an invalid email address!")
      return (false)
}
  
export default function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClickSnackbar = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
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
            // if(!ValidateEmail(username)){
            //     setUsernameError(true);
            //     return;
            // }
            setUsernameError(false);
            if(password.length === 0){
                setPasswordError(true);
            }
            else{
                setPasswordError(false);
            }
        }
        await axios.post("http://localhost:8081/subscribe",{username,password}).then((res)=>{
            console.log(res);
            if(res.status == "200"){
                handleClickSnackbar();
                return navigate("/login");
            }
           
        }).catch((err)=>{
            console.log(err)
            
            console.log(err)
        })
        console.log(username,password,usernameError);
        // API request
    };
    return(
        <div className="signupContainer">
            <div className="signupBox">
                <img className="appLogo" src={appLogo}></img>
                <p className="signupText">Signup</p>
                <Box
                    sx={{
                    width: 500,
                    maxWidth: '90%',
                    marginX:3,
                    marginBottom:9
                }}
                >
                    <TextField value={username} onChange={handleUsernameChange} 
                    error ={usernameError}  color={usernameError === false ? "warning" : "error"} 
                    size="small" fullWidth 
                    label="Username" id="fullWidth" helperText={usernameError ? "*Required": null}/>

                    <TextField value={password} onChange={handlePasswordChange} 
                    error ={passwordError}  color={passwordError === false ? "warning" : "error"} 
                    size="small" sx={{marginTop:4,height:2}} fullWidth 
                    label="Password" id="fullWidth" helperText={passwordError ? "*Required": null}/>

                </Box>
                <div className="btn">
                    <button type="submit" onClick={()=>handleClick()}>Signup</button>
                </div>
                <div style={{marginTop:"20px"}}>
                    <Link href="/login" underline="none" sx={{fontSize:"12px",color:"#ff7400"}}>
                        Already have an account. Click to Login.
                    </Link>
                </div>
            </div>
            <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    User Logged in successfully;
                </Alert>
            </Snackbar>
        </div>
    )
}
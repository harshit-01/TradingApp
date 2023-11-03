import "./style/signup.css"
import appLogo from "./../images/appLogo.png"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate  } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    let navigate = useNavigate();
    const handleUsernameChange = (e)=> {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=> {
        setPassword(e.target.value);
    }
    const handleClick = (e) => {
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
        return navigate("/home");
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
        </div>
    )
}
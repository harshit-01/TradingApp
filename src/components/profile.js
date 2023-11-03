import { useEffect, useState } from "react"
import Navbar from "./navbar.js"
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function Profile(){
    let navigate = useNavigate();
    const [open,setOpen] = useState();
    const [password,setPassword] = useState("");
    let s = "";
    const handlePasswordChange = (e)=>{
        s = s + e.target.value;
        setPassword(s);
    }
    return(
        <>
            <Navbar />
            <div className="" style={{margin:"15px"}}>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{height:"100px",width:"100px",border:"1px solid grey",borderRadius:"5px"}}></div>
                </div>
                <div>
                    Name
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",margin:"35px"}}>
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
                        Na
                    </div>
                    <div style={{width:"100%"}}>
                        Na
                    </div>
                    <div style={{width:"100%"}}>
                        Na
                    </div>
                    <div style={{width:"100%"}}>
                        Na
                    </div>
                </div>
                <Button variant="outlined" onClick={()=>setOpen(!open)}>Add funds</Button>
                {open ? 
                <div style={{margin:"50px",padding:"15px",display:"flex",justifyContent:"center",alignItems:"center",
                boxShadow:"1px 1px 1px 1px grey"}}>
                    <label>Enter your password:</label>
                    <TextField value={password} onChange={handlePasswordChange}  
                    size="small" fullWidth label="Password" id="fullWidth" />
                </div>: null}
            </div>
        </>
    )
}
import Link from '@mui/material/Link';
import appLogo from "./../images/appLogo.png"
import  "./style/navbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import { useNavigate  } from "react-router-dom";

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    console.log(name)
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0].toUpperCase()}`,
    };
  }

export default function Navbar(){
    let navigate = useNavigate();
    let username = localStorage.getItem("username");
    return(
        <div className="navbar">
                <img className="appLogoHome" src={appLogo}></img>
                <div style={{width:"14%",height:"100%"}}></div>
                <div className="navContent">
                {/* <div> */}
                    <Link href="/home" underline="none" sx={{fontSize:"12px",color:"black",fontWeight:"bold",width:"12%"}}>
                        Home
                    </Link>
                    <Link href="/profile" underline="none" sx={{fontSize:"12px",color:"black",fontWeight:"bold",width:"12%"}}>
                        Profile
                    </Link>
                    <Link href="/myPortfolio" underline="none" sx={{fontSize:"12px",color:"black",fontWeight:"bold",width:"12%"}}>
                        Portfolio
                    </Link>
                    <Link href="/trade" underline="none" sx={{fontSize:"12px",color:"black",fontWeight:"bold",width:"12%"}}>
                        Trade
                    </Link>
                    <Link href="/login" underline="none" sx={{fontSize:"12px",color:"black",fontWeight:"bold",width:"12%"}}>
                        Logout
                    </Link>
                {/* </div> */}
            </div>
            <div className="avatar">
                <p><NotificationsNoneIcon fontSize="small" sx={{paddingTop:"5px"}}/></p>
                <Avatar {...stringAvatar(username)} onClick={()=> navigate('/profile')}/>
            </div>
        </div>
    )
}
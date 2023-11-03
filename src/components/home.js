import  "./style/home.css";
import appLogo from "./../images/appLogo.png"
import Link from '@mui/material/Link';

import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useEffect, useState } from "react"
import { TextField } from "@mui/material";
import axios from "axios"
import _, { toInteger } from 'lodash';
import LiveChart from './LiveChart'
import { useNavigate  } from "react-router-dom";
import BasicPopover from './popup.js';

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
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function Home(){
    const [searchStocks,setSearchStocks] = useState(""); 
    const [topGainers,setTopGainers] = useState(null);   
    const [topLosers,setTopLosers] = useState(null); 
    const [niftyValue,setNiftyValue] = useState(19500.00);
    const [sensexValue,setSensexValue] = useState(58500.00);  
    const [niftyValuePercentageChange,setNiftyValuePercentageChange] = useState(0);
    const [sensexValuePercentageChange,setSensexValuePercentageChange] = useState(0); 
    const [searchStocksChart,setSearchStocksChart] = useState("IBM"); 
    const [stockData, setStockData] = useState({})
    let navigate = useNavigate();
    let s = "";
    let searchString = "";
    const fetchStockData = async (symbol) => {
        console.log(symbol)
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=demo`)
        //const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=7X8K8UF6MZY8OL6J`)
        const data = await response.json()
        return data
    }
    const handleChange = (e)=>{
        console.log(e.target.value)
        s = s + e.target.value;
        setSearchStocks(s);
    }
    const handleChartChange = (e)=>{
        console.log(e.target.value)
        searchString = searchString + e.target.value;
        setSearchStocksChart(searchString);
        fetchStockData(searchString);
    }
    useEffect(() => {
        fetchStockData(searchStocksChart).then(data =>
            setStockData(data)
        )
    }, [searchStocksChart])
    useEffect(()=>{
        let response;
        async function temp(){
            //let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=7X8K8UF6MZY8OL6J";
            let url2 = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo"
            await axios.get(url2).then(res => {
            console.log(res.data.top_gainers);
            setTopGainers(res.data.top_gainers);
            setTopLosers(res.data.top_losers)
            })
            .catch(error => console.log(error))
        }
        temp();
        console.log(topGainers,topLosers)
        setInterval(()=>{
            setNiftyValue(getRandomArbitrary(18500,21500));
        },10000);
        setInterval(()=>{
            setSensexValue(getRandomArbitrary(58000,60000));
        },10000);
        setInterval(()=>{
            setNiftyValuePercentageChange(getRandomArbitrary(0,5));
        },10000)
        setInterval(()=>{
            setSensexValuePercentageChange(getRandomArbitrary(0,5));
        },10000)
    },[])
    function getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }
    return (
        <div className="container">

            {/* Body */}
            <div className="allStockContainer">
                <div className="allStock">
                    <div className="indexPrice">
                        <span className="indexPriceText">
                            <b>NIFTY50:</b> <span style={{color:"green"}}>{niftyValue}</span><small className="small">{niftyValuePercentageChange}%</small>
                        </span>
                        <span className="indexPriceText">
                            <b>SENSEX:</b>  <span style={{color:"green"}}>{sensexValue}</span><small className="small">{sensexValuePercentageChange}%</small>
                        </span>
                    </div>
                    <hr/>
                    <div className="stockWatchlist">
                        <SearchSharpIcon sx={{padding:"10px"}}/>
                        <small style ={{paddingTop:"14px",color:"lightgray"}}><input className="searchStocks" placeholder="Search stocks"  value={searchStocks} onChange={handleChange}/></small>
                    </div>
                    <div className="stockList">
                        {topGainers?.length > 0 ? <strong>Top Gainers</strong> : "Stock info not available"}
                        {topGainers?.slice(0,14)?.map((info,index)=>{
                            return(
                                <div className="stockData" key={index}>
                                    <span className="stockName">
                                        {info.ticker}
                                    </span>
                                    <span className="stockGainPrice">
                                        {info.price}
                                    </span>
                                    <span className="stockPercentage">
                                        {info.change_percentage}
                                    </span>
                                </div>
                            )
                        })}
                        <div style={{margin:"10px"}}></div>
                        {topLosers?.length > 0 ?<strong>Top Losers</strong>:null}
                        {topLosers?.slice(0,14)?.map((info,index)=>{
                            return(
                                <div className="stockData" key={index}>
                                    <span className="stockName">
                                        {info.ticker}
                                    </span>
                                    <span className="stockLossPrice">
                                        {info.price}
                                    </span>
                                    <span className="stockPercentage">
                                        {info.change_percentage}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* Navbar */}
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
                    <Avatar {...stringAvatar('Kent Dodds')} onClick={()=> navigate('/profile')} />
                 </div>
                 <div className="myInvestment">
                    <p style={{marginLeft:"15px"}}>Hi Trader, Welcome to <b>TradeEasy
                        
                    </b></p>
                    <div className="myBalance">
                        <p>My Balance</p>
                        <p>Commodities</p>
                        <p>50k</p>
                        <p>NA</p>
                    </div>
                    <hr />
                    <div style={{width:"100%"}}>
                        <input className="searchStocksChart" placeholder="Search stock to analyze"  onChange={handleChartChange}/>
                        <LiveChart symbol={searchStocksChart} stockData={stockData}/>
                    </div>
                 </div>
            </div>
        </div>
    )
}
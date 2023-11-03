import Navbar from "./navbar.js"
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import "./style/trade.css"
import FormDialog from "./buyModal.js"

export default function Trade(){
    const [buyStocks,setBuyStocks] = useState("");
    const [stock,setStock] = useState(null)
    const [open, setOpen] = useState(false);
    const handleBuyStocks = (e)=> {
        setBuyStocks(e.target.value);
    }
    const handleClickOpen = (e) => {
        setOpen(true);
      };
    const handleClick = async function temp(e){
        //let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=7X8K8UF6MZY8OL6J";
        let url2 = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${buyStocks}&apikey=7X8K8UF6MZY8OL6J`
        await axios.get(url2).then(res => {
        console.log(res?.data["Global Quote"]);
        setStock(res?.data["Global Quote"]);
        })
        .catch(error => console.log(error))
    }
    return (
        <>
            <Navbar />
            <div style={{margin:"25px",textAlign:"start"}}>
                <label>Search Stock to buy:</label>
                <TextField value={buyStocks} onChange={handleBuyStocks} 
                    size="small" fullWidth 
                    label="Buy stock" id="fullWidth" variant="standard" sx={{marginTop:"15px"}}
                />
                <Button onClick={handleClick} variant="outlined" sx={{mt:2}}>Submit</Button>
                {stock && <div className="stockToBuy">
                    <div className="col">
                        {stock && "Symbol"}
                    </div>
                    <div className="col">
                        {stock && "open"}
                    </div>
                    <div className="col">
                        {stock && "high"}
                    </div>
                    <div className="col">
                        {stock && "Low"}
                    </div>
                    <div className="col">
                        {stock &&  "Price"}
                    </div>
                    <div className="col">
                        {stock && "Volume"}
                    </div>
                    <div className="col">
                        {stock && "Latest trading day"}
                    </div>
                    <div className="col">
                        {stock && "Previous close"}
                    </div>
                    <div className="col">
                        {stock && "Change percent"}
                    </div>
                    <div className="headers">
                        {stock && stock["01. symbol"]}
                    </div>
                    <div className="headers">
                        {stock && stock["02. open"]}
                    </div>
                    <div className="headers">
                        {stock && stock["03. high"]}
                    </div>
                    <div className="headers">
                        {stock && stock["04. low"]}
                    </div>
                    <div className="headers">
                        {stock && stock["05. price"]}
                    </div>
                    <div className="headers">
                        {stock && stock["06. volume"]}
                    </div>
                    <div className="headers">
                        {stock && stock["07. latest trading day"]}
                    </div>
                    <div className="headers">
                        {stock && stock["08. previous close"]}
                    </div>
                    <div className="headers">
                        {stock && stock["10. change percent"]}
                    </div>
                    <div style={{width:"100%", textAlign:"center",marginTop:"15px"}}>
                        <Button variant="outlined" color="primary" sx={{textAlign:"center"}} onClick={handleClickOpen}>Buy</Button>
                    </div>
                </div>
                }
            </div>
            <FormDialog open={open} setOpen={setOpen} stockPrice={stock && stock["05. price"]}/>
        </>
    )
}
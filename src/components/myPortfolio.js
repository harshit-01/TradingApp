import { useEffect, useState } from "react"
import Navbar from "./navbar.js"
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import  "./style/portfolio.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function MyPortfolio(){
    return(
        <>
            <Navbar />
            <div className="holdingsText">
                <div className="holdings">
                    <WorkOutlineOutlinedIcon sx={{marginRight:"10px"}}/>
                    <p>Holdings</p>
                </div>
                {/* <div className="Line"></div> */}
                <div className="myPortfolioValue">
                    <div className="myInvestment">
                        <b>My Investments</b>
                    </div>
                    <div className="portfolioData">
                        <div className="portfolioVal">
                            <span>Invested Amount: </span>
                        </div>
                        <div className="portfolioVal">
                            <span>Current Amount: </span>
                        </div>
                        <div className="portfolioVal">
                            <span>Portfolio Percentage: </span>
                        </div>
                        <div className="portfolioVal">
                            <span>50k </span>
                        </div>
                        <div className="portfolioVal">
                            <span>50k </span>
                        </div>
                        <div className="portfolioVal">
                            <span>50k </span>
                        </div>
                    </div>
                </div>
                <div className="stockAnalysis">
                    <ArrowBackOutlinedIcon color="primary" fontSize="small"/>
                    <span style={{color:"#1976d2",fontSize:"18px", width:"90%",textAlign:"start",margin:"5px"}}>Portfolio analysis by TradeEasy</span>
                    <div className="piechart">
                        <div className="myStocks">
                            <p>My StockList</p>
                        </div>
                        <div className="graphs">
                            Piechart
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
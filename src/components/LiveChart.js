import React, { useEffect, useMemo, useState } from 'react'
import { formatStockData } from './util'
import ReactApexChart from 'react-apexcharts'
import { candleStickOptions } from './const'

const LiveChart = ({ symbol, stockData}) => {


    const seriesData = useMemo(() => formatStockData(stockData), [stockData])

    return (
        <ReactApexChart
            series={
                [
                    {
                        data: seriesData
                    }
                ]
            }
            options={candleStickOptions}
            type="candlestick"
        />
    )
}

export default LiveChart
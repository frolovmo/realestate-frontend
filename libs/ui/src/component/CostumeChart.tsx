import React from "react";
import { Chart } from 'primereact/chart';

interface ChartProps {
    data: number[]; 
    colors?: string[]; 
    cutout?: string | number; 
    responsive?: boolean; 
    borderWidth?: number; 
    additionalOptions?: object; 
    type?: "doughnut" | "pie";
    response?: any
}

export const CostumeChart  = ({
    data,
    colors,
    cutout = '70%',
    responsive = true,
    borderWidth = 0,
    additionalOptions = {},
    type = "doughnut",
    response  
}: ChartProps) =>{

    const doughnutLabel1 = {
        id :'doughnutLabel',
        beforeDatasetsDraw(chart:any, args:any ,pluginOptions:any){
            const { ctx, chartArea } = chart;
            ctx.save();
    
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
    
            ctx.font = 'bold 10px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle'; 
            ctx.fillText("10", centerX, centerY); // Adjust this to show dynamic percentage
    
            ctx.restore();        
        }
    }
    
    const chartData = {
        datasets: [
          {
            data,
            backgroundColor: colors,
            borderWidth,
          },
        ],
      };
    
    const chartOptions = {
        cutout,
        responsive,
        ...additionalOptions, 
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' , flexDirection: 'column', justifyContent: 'center',}}>
            <Chart type={type} data={chartData} options={chartOptions} plugins={[doughnutLabel1]}/>
            <div className="w-full" style={{ width: '100%', height: '100%', display: 'flex' , flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <text style={{
                    fontFamily: 'bold',
                    fontSize: '0.6rem',
                    color: '#737373'
                    }}>{response}</text>
            </div>
        </div>
    )
    
}


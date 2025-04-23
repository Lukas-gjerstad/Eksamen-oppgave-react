import "./lineChart.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LineChartComponent(props) {
    let workoutData = props.workoutData
    let exercises = props.exercises
    let session = props.session ||  []
    let selectedExercise = props.selectedExercise
    let selectedWeight = props.selectedWeight
    let selectedReps = props.selectedReps

    let lineChartData1 = [110, 82, 64, 28, 4]
    
    const lineChartData = session.map((s, index) => {
        return {
            date: new Date(s.date).toLocaleDateString("en-GB"),
            // double pipe || er logisk operator for or 
            // setter value til linechartdata hvis den ikke er null/undefined
            value: lineChartData1[index] || 0
        }
    })
    return(
        <div className={"LineChartContainer"}>
        <p>a{selectedReps}</p>
            
            <Stack direction="row" sx={{ width: '50%', height: "500px"}}>
                <Box sx={{ 
                    flexGrow: 1,
                    background: "white",
                    color: "white"
                }}>
                <LineChart 
                    xAxis={[{
                        scaleType: 'band',
                        data: lineChartData.map(d => d.date),
                    }]}
                    series={[
                        {
                        id: "series1",
                        data: lineChartData.map(d => d.value),
                        label: 'Lukas IQ',
                        curve: "linear",
                        color: "black"
                        },
                    ]}

                    grid={{ vertical: true, horizontal: true }}

                    axisHighlight={{
                        x: 'band', 
                        y: 'line', 
                    }} 
                    />
                </Box>
            </Stack>
        </div>
    )
}
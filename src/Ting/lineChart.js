import "./lineChart.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartComponent(props) {

    let workoutEntries = props.workoutEntries
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
    let chartSeries = []

    const entriesFiltered = selectedExercise && workoutEntries.filter(entry => entry.exerciseID === selectedExercise.exerciseID)

            if (selectedReps && selectedExercise?.name) {
                chartSeries.push({
                    id: `reps-${selectedExercise?.name}`,
                    data: entriesFiltered.map(entry => entry.reps),
                    label: `Reps ${selectedExercise?.name}`,
                    color: "blue",
                    curve: "linear",
                })
            }
            if (selectedWeight && selectedExercise?.name) {
                chartSeries.push({
                    id: `weight-${selectedExercise?.name}`,
                    data: entriesFiltered.map(entries => entries.weight),
                    label: `Weight ${selectedExercise?.name}`,
                    color: "red",
                    curve: "linear",
                })
            }
        
    return(
        <div className={"LineChartContainer"}>
            <Stack direction="row" sx={{ width: '70%', height: "420px"}}>
                <Box sx={{ 
                    flexGrow: 1,
                    background: "white",
                    color: "white"
                }}>
                <LineChart 
                    xAxis={[{
                        scaleType: 'band',
                        data: selectedExercise ? entriesFiltered.map(d => d.sessionID) : "",
                    }]}

                    series={chartSeries}

                    grid={{ vertical: true, horizontal: true }}
                    axisHighlight={{
                        x: 'band', 
                    }} 
                    />
                </Box>
            </Stack>
        </div>
    )}
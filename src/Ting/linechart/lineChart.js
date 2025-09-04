import "./lineChart.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartComponent({workoutEntries, selectedExercise, selectedWeight, selectedReps, selectSets}) {
    let chartSeries = []

    const workoutEntryMap = selectedExercise && workoutEntries.flatMap((workoutEntry) => {
         return workoutEntry.exercise
            .filter(ex => ex.name === selectedExercise.name)
            .map(ex =>  {
                const set = ex.sets?.[selectSets]
                return set
                    ? {
                        weight: set.weight,
                        reps: set.reps,
                        sessionID: workoutEntry._id
                    }
                    : null
            })
            .filter(Boolean)
    })

       if (selectedReps && selectedExercise?.name) {
        chartSeries.push({
            id: `reps-${selectedExercise?.name}`,
            data: workoutEntryMap.map(entry => entry.reps),
            label: `Reps ${selectedExercise?.name}`,
            color: "blue",
            curve: "linear",
        })
    }
    if (selectedWeight && selectedExercise?.name) {
        chartSeries.push({
            id: `weight-${selectedExercise?.name}`,
            data: workoutEntryMap.map(entry => entry.weight),
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
                        data: selectedExercise ? workoutEntryMap.map(d => d.sessionID) : [],
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
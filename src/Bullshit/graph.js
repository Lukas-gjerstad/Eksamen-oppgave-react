import "./graph.css"
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

function Graph() {
    let lineChartData = [1, 4, 2, 5, 7, 2, 4, 10]
    let sample = [1, 10, 30, 50, 70, 90, 100];

    return(
        <div className={"LineChartContainer"}>
            <Stack direction="row" sx={{ width: '50%', height: "500px"}}>
                <Box sx={{ flexGrow: 1}}>
                    <LineChart 
                        series={[
                            {
                                data: lineChartData,
                            },
                        ]}
                    />
                </Box>
            </Stack>
        </div>
    )
}

export default Graph
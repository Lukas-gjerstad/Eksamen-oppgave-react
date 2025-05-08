import "./sessionTable.css"

export default function SessionTable(props) {
    const exerciseData = props.exerciseData
    const exerciseArr = props.exerciseArr

    return(
        <div>
            <table>
                <thead>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </thead>
                <tbody>
                    {
                        exerciseArr && exerciseArr.map((item, index) => {
                            return (
                            <tr key={index}>
                                <td>{item.exercise}</td>
                                <td>{item.weight}</td>
                                <td>{item.reps}</td>
                            </tr>)
                        })  
                    }
                </tbody>
            </table>
        </div>
    )
}
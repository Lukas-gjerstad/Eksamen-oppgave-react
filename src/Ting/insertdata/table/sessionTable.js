import "./sessionTable.css"

export default function SessionTable(props) {
    const exerciseData = props.exerciseData
    const exerciseArr = props.exerciseArr

    return(
        <div>
            <table id="entryTable">
                <thead>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </thead>
                <tbody>
                    {
                        exerciseArr && exerciseArr.map((exercise, index) => {
                            return exercise.sets.map((set, setIndex) => (
                                <tr key={index}>
                                    <td>{exercise.name}</td>
                                    <td>{set.weight}</td>
                                    <td>{set.reps}</td>
                                </tr>
                            ))
                       })   
                    }
                </tbody>
            </table>
        </div>
    )
}
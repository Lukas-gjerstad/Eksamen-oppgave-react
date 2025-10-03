import "./sessionTable.css"
import "../../../variables.css"

export default function SessionTable(props) {
    const exerciseArr = props.exerciseArr

    return(
        <div className="tableWrapper">
            <table id="entryTable">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Weight</th>
                        <th>Reps</th>
                    </tr>
                </thead>
            </table>
            <div className="tableBodyWrapper">
                <table id="entryTableBodyOnly">
                    <tbody>
                        {exerciseArr && exerciseArr.map((exercise, index) =>
                            exercise.sets.map((set, setIndex) => (
                                <tr key={`${index}-${setIndex}`}>
                                <td>{exercise.name}</td>
                                <td>{set.weight}</td>
                                <td>{set.reps}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
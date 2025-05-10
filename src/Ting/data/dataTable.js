import { useEffect, useState} from 'react';
import "./dataTable.css"

export default function DataTable({workoutEntries, setWorkoutEntries, exercises, session, selectedEntry, setSelectedEntry}) {

    return (
        <div style={{paddingLeft: "20%", paddingTop: "10%" }}>
            <table>
                <thead>
                    <th>Session</th>
                    <th>Excerisse</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </thead>
            <tbody>
                {/* d er verdien og i er indexen i arrayen (hvor den ligger i arrayen) */}
                {workoutEntries
                .filter((entry) => entry.sessionID === selectedEntry) // only entries from selected session
                .map((entry, i) => {
                    const sessionObj = session.find((s) => s.sessionID === entry.sessionID)
                    const exerciseObj = exercises.find((e) => e.exerciseID === entry.exerciseID)
                    const dateFormatted = sessionObj ? new Date(sessionObj.date).toLocaleDateString("en-GB") : "Unknown date"

                    return (
                    <tr key={i}>
                        <td>{dateFormatted}</td>
                        <td>{exerciseObj ? exerciseObj.name : "Unknown Exercise"}</td>
                        <td>{entry.weight} KG</td>
                        <td>X {entry.reps}</td>
                    </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    );
}
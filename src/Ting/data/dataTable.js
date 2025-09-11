import { useEffect, useState} from 'react';
import "./dataTable.css"

export default function DataTable({workoutEntries, setWorkoutEntries, exercises, selectedEntry, setSelectedEntry}) {

    const session = workoutEntries.find(entry => entry._id === selectedEntry)

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
               {
                        session ? (
                            session.exercise.map((exercise, i) =>
                                exercise.sets.map((set, j) => (
                                    <tr key={`${i}-${j}`}>
                                        <td>{session._id}</td>
                                        <td>{exercise.name}</td>
                                        <td>{set.weight} KG</td>
                                        <td>X {set.reps}</td>
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="4">Select a session to view entries.</td>
                            </tr>
                        )
                    }
            </tbody>
            </table>
        </div>
    );
}
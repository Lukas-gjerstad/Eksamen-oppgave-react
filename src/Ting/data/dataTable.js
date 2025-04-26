import { useEffect, useState} from 'react';
import "./dataTable.css"

export default function DataTable(props) {
    let workoutEntries = props.workoutEntries
    let exercises = props.exercises
    let session = props.session

    return (
        <div style={{padding: "50px", }}>
            <table>
                <thead>
                    <th>Session</th>
                    <th>Excerisse</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </thead>
            <tbody>
                {/* d er verdien og i er indexen i arrayen (hvor den ligger i arrayen) */}
            {workoutEntries.map((d, i) => {
                // e er verdien. Finner index som har verdien fra den workout logen vi valgte
                const matchedExercise = exercises.find(e => e.exerciseID === d.exerciseID)
                const matchedSession = session.find(e => e.sessionID === d.sessionID)

                // kutter av iso bullshit etter date
                // en-GB gjør dd-mm-yy
                const dateCut = new Date(matchedSession.date).toLocaleDateString('en-GB')

                return (
                <tr key={i}>
                    {/* hvis matchedExercise ikke er null/undefined viser den dateCut */}
                    <td>{matchedSession ? dateCut : 'You fucked up dumbass '}</td>
                    <td>{matchedExercise ? matchedExercise.name : 'You fucked up dumbass '}</td>
                    <td>{d.weight} KG</td>
                    <td>X {d.reps}</td>
                </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    );
}

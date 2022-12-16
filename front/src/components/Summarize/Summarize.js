import React from 'react'
import './Summarize.css'

export function Summarize({ handleSubmit }) {
    return (
        <div className="summarizeButton">
            <button onClick={handleSubmit}>Summarize</button>
        </div>
    )
}

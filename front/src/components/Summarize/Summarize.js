import React from 'react'

export function Summarize({ handleSubmit }) {
    return (
        <div className="summarizeButton">
            <button onClick={handleSubmit}>Summarize</button>
        </div>
    )
}

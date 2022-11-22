import React from 'react'

function Summarize({ handleSubmit }) {
    return (
        <div className="summarizeButton">
            <button onClick={handleSubmit}>Summarize</button>
        </div>
    )
}

export default Summarize

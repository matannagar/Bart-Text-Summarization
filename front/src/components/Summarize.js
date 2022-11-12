import React from 'react'

function Summarize({ handleSubmit }) {
    return (
        <div className="item summarizeButton">
            <button onClick={handleSubmit}>Summarize</button>
        </div>
    )
}

export default Summarize

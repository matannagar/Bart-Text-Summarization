import React from 'react'

function Summarize({ handleOnSubmit }) {
    return (
        <div className="item summarizeButton">
            <button onClick={handleOnSubmit}>Summarize</button>
        </div>
    )
}

export default Summarize

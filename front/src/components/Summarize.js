import React from 'react'

function Summarize({ post }) {
    return (
        <div className="item summarizeButton">
            <button onClick={post}>Summarize</button>
        </div>
    )
}

export default Summarize

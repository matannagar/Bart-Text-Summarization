import React from 'react'
import Spinner from './Spinner'
function Summarization({ summary, fetchInProgress, message }) {
    return (
        <div className="item summarization">
            <div className="output">
                {message ? message : ''}
                {fetchInProgress ? <Spinner /> : summary}
            </div>

        </div>

    )
}

export default Summarization

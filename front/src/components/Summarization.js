import React from 'react'
import Spinner from './Spinner'
function Summarization({ summary, fetchInProgress, message }) {
    return (
        <div className="item summarization">
            <div className="output">
                {fetchInProgress ? <Spinner /> : summary}
                {message ? message : ''}
            </div>

        </div>

    )
}

export default Summarization

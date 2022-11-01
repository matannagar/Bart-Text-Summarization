import React from 'react'
import Spinner from './Spinner'
function Summarization({ summary, fetchInProgress, error }) {
    return (
        <div className="item summarization">
            <div className="output">
                {error ? error : ''}
                {fetchInProgress ? <Spinner /> : summary}
            </div>

        </div>

    )
}

export default Summarization

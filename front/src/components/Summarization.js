import React from 'react'
import Spinner from './Spinner'
function Summarization({ result, fetchInProgress, error }) {
    return (
        <div className="item summarization">
            <div className="output">
                {error ? error : ''}
                {fetchInProgress ? <Spinner /> : result}
            </div>

        </div>

    )
}

export default Summarization

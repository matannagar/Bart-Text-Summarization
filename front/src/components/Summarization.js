import React from 'react'
import Spinner from './Spinner'
function Summarization({ result, fetchInProgress, error }) {
    return (
        <div className="item summarization">
            <div className="output">
                {error ? 'Please refresh the page and try again' : ''}
                {fetchInProgress ? <Spinner /> : result}
            </div>

        </div>

    )
}

export default Summarization

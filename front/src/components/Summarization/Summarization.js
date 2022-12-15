import React from 'react'
import Spinner from '../Spinner'

/**
 * Summarization component that displays a summary, optional message, and a loading spinner.
 *
 * @param {string} summary - The summary to display.
 * @param {boolean} fetchInProgress - Flag indicating whether a fetch is in progress.
 * @param {string} [message] - Optional message to display.
 */

export function Summarization({ summary, fetchInProgress, message }) {
    return (
        <div className="item summarization">
            <div className="output">
                {fetchInProgress ? <Spinner /> : summary}
                {message ? message : ''}
            </div>
        </div>
    )
}

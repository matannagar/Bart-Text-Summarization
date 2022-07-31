import React from 'react'

function LimitWords() {
    return (
        <div className="item limitwords">
            <input type="number" defaultValue="100" min="100" step="10" placeholder='Required Summarys max words...'/>
        </div>
    )
}

export default LimitWords

import React, { useState } from 'react'

function UrlBar({ setUrl }) {
    return (
        <div className='item url bar'>
            <input type='text'
                onChange={e => setUrl(e.target.value)}
                placeholder='Please enter URL here...' ></input>
        </div>
    )
}

export default UrlBar

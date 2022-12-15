import React from 'react'

function SaveButton({ text }) {
    const handleClick = () => {
        if (text) {
            const element = document.createElement('a');
            const file = new Blob([text], { type: 'text/plain' })
            element.href = URL.createObjectURL(file);
            element.download = 'mySummary.txt';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    return (
        <button onClick={handleClick}>Save</button>
    )
}

export default SaveButton

import React, { useEffect, useState } from 'react'

function History({ summary }) {
    const [item, setItem] = useState([])

    useEffect(() => {
        if (localStorage.getItem('items')) {
            const items = JSON.parse(localStorage.getItem('items'));
            const newItems = JSON.stringify([...items, summary])
            setItem([...items, summary])
            localStorage.setItem('items', newItems);
        } else {
            localStorage.setItem('items', JSON.stringify(summary));
        }
    }, [summary]);

    return (
        <div className='item history'>
            {item.map(function (sum, index) {
                if (sum !== '') return <li key={index}>{sum}</li>
            })}
        </div>
    )
}

export default History

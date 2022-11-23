import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import useModal from '../hooks/useModal';
function History({ summary }) {
    const [item, setItem] = useState([])
    const { modal, setModal, data, setData, toggleModal } = useModal()

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
        <div className='item'>
            <h2 id='top-padding'>History</h2>
            <div className='history'>
                {item.map(function (sum, index) {
                    if (sum !== '') return <li key={index} onClick={(event) => {
                        setData(event.currentTarget.textContent)
                        setModal(!modal)
                    }}>{sum}</li>
                })}
            </div>
            {modal && (<Modal toggleModal={toggleModal} data={data} />)}
        </div>
    )
}

export default History

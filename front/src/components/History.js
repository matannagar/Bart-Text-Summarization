import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import useModal from '../hooks/useModal';
function History({ summary }) {
    const [item, setItem] = useState([])
    const { modal, setModal, data, setData, toggleModal } = useModal()

    const truncate = function (str) {
        return str.length > 10 ? str.substring(0, 70) + '...' : str;
    }

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
                    if (sum !== '') return <li key={index} data-sum={sum} onClick={(event) => {
                        setData(event.target.getAttribute('data-sum'))
                        setModal(!modal)
                    }}>{truncate(sum)}</li>
                })}
            </div>
            {modal && (<Modal toggleModal={toggleModal} data={data} />)}
        </div>
    )
}

export default History

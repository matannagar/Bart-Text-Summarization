import React from 'react'
import SaveButton from '../SaveButton'
import './Modal.css'

export function Modal({ toggleModal, data }) {

    return (
        <div className="modal" onClick={toggleModal}>
            {/* <div className="overlay" onClick={toggleModal}></div> */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* <span className="close-modal" onClick={toggleModal}>&times;</span> */}
                <div className='information'>
                    <h4> {data ? data : 'No Data'}</h4>
                </div>
                <div className='footer'>
                    <SaveButton text={data} />
                </div>
            </div>
        </div>
    )
}

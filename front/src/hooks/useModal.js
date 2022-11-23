import { useState } from 'react'

function useModal() {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState('')
    const toggleModal = () => {
        setModal(!modal);
    }

    return { modal, setModal, data, setData, toggleModal }
}

export default useModal

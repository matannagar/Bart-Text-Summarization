import React, { useRef } from 'react'

function UploadButton({ handleChange }) {

    const hiddenFileInput = useRef(null)

    const handleClick = event => {
        hiddenFileInput.current.click()
    };


    return (
        <div className="item uploadButton">
            <button onClick={handleClick}>Upload File</button>
            <input type="file" name="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }} />
        </div>

    )
}

export default UploadButton

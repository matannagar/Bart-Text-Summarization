import React, { useRef } from 'react'

function UploadButton({ setFile }) {

    const hiddenFileInput = useRef(null)

    const handleClick = () => {
        hiddenFileInput.current.click()
    };


    return (
        <div className="item uploadButton">
            <button onClick={handleClick}>Upload File</button>
            <input type="file" name="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={hiddenFileInput}
                style={{ display: 'none' }} />
        </div>

    )
}

export default UploadButton

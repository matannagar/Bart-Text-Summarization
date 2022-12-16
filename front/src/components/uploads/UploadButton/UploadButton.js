import React, { useRef } from 'react'

export function UploadButton({ setFile }) {
    const hiddenFileInput = useRef(null)

    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    return (
        <div className="uploadButton">
            <button onClick={handleClick}>Upload File</button>
            <input type='file' name='file' accept='.pdf, .txt, .doc, .docx'
                onChange={(e) => setFile(e.target.files[0])}
                ref={hiddenFileInput}
                style={{ display: 'none' }} />
        </div>
    )
}

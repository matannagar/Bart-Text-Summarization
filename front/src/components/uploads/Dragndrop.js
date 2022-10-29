import React from 'react'
import { useDropzone } from 'react-dropzone'

function Dragndrop({ handleChange }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: "pdf/*",
        onDrop: (file) => {
            handleChange(file)
        }
    })

    return (
        <div className="item">
            <div className="dragndrop">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop file here</p>
                </div>
            </div>
        </div>
    )
}

export default Dragndrop

import React from 'react'
import { useDropzone } from 'react-dropzone'

function Dragndrop({ setFile }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'pdf/*',
        onDrop: (filesArray) => {
            console.log('File loaded via dropzone')
            setFile(filesArray[0])
        }
    })

    return (
        <div className="dragndrop">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop file here</p>
            </div>
        </div>
    )
}

export default Dragndrop

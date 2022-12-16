import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export function Dragndrop({ setFile, setMessage }) {
  const accept = {
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/pdf': ['.pdf'],
    'text/plain': ['.txt']
  }

  const onDrop = useCallback(filesArray => {
    console.log('File loaded via dropzone')
    filesArray[0] ? setFile(filesArray[0]) : setMessage('Wrong file type!')
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    onDrop: onDrop
  })

  return (
    <div className='dragndrop' {...getRootProps()}>
      <input accept=".doc, .txt, .pdf, .docx" {...getInputProps()} />
      <p>Drop file here</p>
    </div>
  )
}

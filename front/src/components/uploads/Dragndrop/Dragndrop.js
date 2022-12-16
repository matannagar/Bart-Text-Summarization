import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './Dragndrop.css'

/**
 * Dragndrop is a React component that provides a drag-and-drop interface for selecting a file.
 * The file is passed to the setFile function and a message is passed to the setMessage function.
 *
 * @param {object} props An object with the following properties:
 *                       - setFile: A function for setting the file.
 *                       - setMessage: A function for setting the message.
 *
 * @return {JSX} A JSX element representing the drag-and-drop interface.
 */
export function Dragndrop({ setFile, setMessage }) {
  /**
 * accept is an object that specifies the types of files that are accepted by the drag-and-drop interface.
 */
  const accept = {
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/pdf': ['.pdf'],
    'text/plain': ['.txt']
  }

  /**
 * onDrop is a callback function that is called when a file is dropped on the drag-and-drop interface.
 * It sets the file using the setFile function and sets the message using the setMessage function.
 */
  const onDrop = useCallback(filesArray => {
    console.log('File loaded via dropzone')
    filesArray[0] ? setFile(filesArray[0]) : setMessage('Wrong file type!')
  }, [])

  /**
   * getRootProps and getInputProps are functions that are returned by the useDropzone hook.
   * They provide the props for the root div element and the input element of the drag-and-drop interface.
   */
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

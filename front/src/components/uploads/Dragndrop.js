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

/*
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

function MyDragDropComponent() {
 const [{ isDragging }, drag] = useDrag({
   item: { type: 'my-item' },
   collect: monitor => ({
     isDragging: !!monitor.isDragging()
   })
 });

 const [, drop] = useDrop({
   accept: 'my-item',
   drop: () => console.log('Item was dropped')
 });

 return (
   <div ref={drop}>
     <div ref={drag}>
       Drag me!
     </div>
   </div>
 );
}
In this example, the MyDragDropComponent component uses the useDrag and useDrop hooks provided by the drag-and-drop library to implement the drag-and-drop behavior. The useDrag hook is used to make the component draggable, and the useDrop hook is used to make the component droppable and handle the drop event when a draggable item is dropped onto it.

For more information about using the drag-and-drop library in React, you can refer to the library's documentation: https://github.com/react-dnd/react-dnd.

*/

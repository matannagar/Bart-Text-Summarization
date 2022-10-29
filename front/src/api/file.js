import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: "/api/upload/file",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect} />
            <input type="submit" value="Upload File" />
        </form>
    )
};

export default Form;

import React, { useState } from 'react';
import axios from 'axios';

const UploadAndQuestionForm = () => {
    const [file, setFile] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Debug: log the response
            setDocumentId(response.data.id); // Ensure this sets the document ID correctly
            alert("File uploaded successfully. Document ID: " + response.data.id);
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            alert("File upload failed.");
        }
    };

    const handleQuestionSubmit = async () => {
        if (!documentId) {
            alert("Please upload a document first.");
            return;
        }

        if (!question) {
            alert("Please enter a question.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/question?document_id=${documentId}&question=${question}`);
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("There was an error processing the question!", error);
            alert("Error processing question.");
        }
    };

    return (
        <div className="upload-question-container">  {/* Added a container class */}
            <h1 className="title">planet (explain like I'm 5)</h1> {/* Added title and class */}
            <div className="upload-section"> {/* Added a section class */}
                <label htmlFor="upload-file">Upload PDF</label>
                <input type="file" accept="application/pdf" id="upload-file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div className="question-section"> {/* Added a section class */}
                <h2>Ask a Question</h2>
                <textarea
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Enter your question" 
                />
                <button onClick={handleQuestionSubmit}>Submit Question</button>
            </div>
            {answer && (
                <div>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default UploadAndQuestionForm;

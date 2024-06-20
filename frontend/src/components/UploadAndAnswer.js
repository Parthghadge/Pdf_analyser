import React, { useState } from 'react';
import axios from 'axios';
import img_01 from '../images/img_01.png'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

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
                        <Navbar className="bg-body-tertiary">
                            <Container>
                              <Navbar.Brand href="#home">
                                <img
                                  src={img_01}
                                  width="150px"
                                  height="75px"
                                  className="d-inline-block align-top"
                                  alt="AI Planet"
                                />
                              </Navbar.Brand>
                            </Container>
                        </Navbar>
                        <Container>
                            <h2>PDF Insights</h2>
                            <p>Upload your pdf now and ask questions on it to get valuable insights.</p>
                        </Container>
                        <Container>
                            <div className="upload-section" style={{'width':'fit-content', 'margin-bottom': '10px'}}> {/* Added a section class */}
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" accept="application/pdf" id="upload-file" onChange={handleFileChange} />
                                    </Form.Group>
                                    <Button variant="success" onClick={handleUpload}>Upload</Button>
                            </div>
                        </Container>

                <Container>
                    <div className="question-section" class="p-2 bg-light border"> {/* Added a section class */}
                        <Form.Group className="mb-3" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question">
                            <Form.Control placeholder="Please enter your question here" as="textarea" rows={3} />
                        </Form.Group>

                        <Button variant="success" onClick={handleQuestionSubmit}>Submit</Button>
                    </div>

                    {answer && (
                        <div class="p-2 bg-light border">
                            <h4>Your insights are ready</h4>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" rows={10}>
                                    {answer}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    )}

                </Container>
            </div>
    );
};

export default UploadAndQuestionForm;

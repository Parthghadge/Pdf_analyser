import React, { useState } from 'react';
import axios from 'axios';
import img_01 from '../images/img_01.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'; // Import Alert component from React Bootstrap

const UploadAndQuestionForm = () => {
    const [file, setFile] = useState(null);
    const [documentId, setDocumentId] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' }); // State to manage alerts

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setAnswer("");
        setDocumentId("");
    };

    const handleUpload = async () => {
        if (!file) {
            setAlert({ show: true, message: 'Please select a file to upload.', variant: 'warning' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setDocumentId(response.data.id);
            setAnswer("");
            setAlert({ show: true, message: `File uploaded successfully. Document ID: ${response.data.id}`, variant: 'success' });
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            setAlert({ show: true, message: 'File upload failed.', variant: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionSubmit = async () => {
        if (!documentId) {
            setAlert({ show: true, message: 'Please upload a document first.', variant: 'warning' });
            return;
        }

        if (!question) {
            setAlert({ show: true, message: 'Please enter a question.', variant: 'warning' });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:8000/question?document_id=${documentId}&question=${question}`);
            if (response.status !== 200) {
                setAlert({ show: true, message: response.data.answer, variant: 'danger' });
            } else {
                setAnswer(response.data.answer);
                setAlert({ show: true, message: 'Question processed successfully.', variant: 'success' });
            }
        } catch (error) {
            console.error('There was an error processing the question!', error);
            setAlert({ show: true, message: 'Error processing question.', variant: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-question-container">
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
            {alert.show && (
                    <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                        {alert.message}
                    </Alert>
                )}
            <Container>
                <h2>PDF Insights</h2>
                <p>Upload your pdf now and ask questions on it to get valuable insights.</p>
            </Container>
            <Container>
                <div className="upload-section" style={{ width: 'fit-content', marginBottom: '10px' }}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" accept="application/pdf" id="upload-file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="success" onClick={handleUpload} disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Upload'}
                    </Button>
                </div>
            </Container>

            <Container>
                <div className="question-section p-2 bg-light border">
                    <Form.Group className="mb-3">
                        <Form.Control
                            placeholder="Please enter your question here"
                            as="textarea"
                            rows={3}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="success" onClick={handleQuestionSubmit} disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
                    </Button>
                </div>

                {answer && (
                    <div className="p-2 bg-light border">
                        <h4>Your insights are ready</h4>
                        <Form.Group className="mb-3">
                            <Form.Control as="textarea" rows={10} readOnly value={answer} />
                        </Form.Group>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default UploadAndQuestionForm;

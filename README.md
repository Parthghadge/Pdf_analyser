# PDF Insights

PDF Insights is a web application that allows users to upload PDF documents and ask questions about the content. The application processes the PDF using Natural Language Processing (NLP) techniques to provide insightful answers.

## Features

- Upload PDF documents.
- Extract content from uploaded PDFs.
- Ask questions about the content of the uploaded PDF.
- Receive insightful answers based on NLP analysis of the PDF content.
- User-friendly interface with file upload, question submission, and answer display.
- Bootstrap-based styling for a modern, responsive UI.

## Technologies Used

- **Frontend:**
  - React
  - Bootstrap
  - Axios for HTTP requests

- **Backend:**
  - FastAPI
  - PyMuPDF for PDF content extraction
  - Huggingface Transformers for NLP
  - Uvicorn for ASGI server
  - Logging for monitoring and debugging

## Prerequisites

- Node.js and npm
- Python 3.8+
- FastAPI
- Uvicorn
- PyMuPDF
- Huggingface Transformers

## Installation

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pdf-insights.git
    cd pdf-insights/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Upload a PDF file by clicking the "Choose File" button and selecting a PDF from your computer.
3. Click the "Upload" button to upload the file to the server.
4. Enter a question related to the content of the uploaded PDF in the provided text area.
5. Click the "Submit" button to send the question to the server.
6. The server will process the question and return an insightful answer, which will be displayed on the webpage.

## API Endpoints

### Upload PDF

- **URL:** `/upload`
- **Method:** `POST`
- **Request:**
  - File: `multipart/form-data` with the PDF file
- **Response:**
  - `200 OK`: JSON object containing the document ID

### Ask Question

- **URL:** `/question`
- **Method:** `POST`
- **Request:**
  - Query parameters: `document_id`, `question`
- **Response:**
  - `200 OK`: JSON object containing the answer
  - `400 Bad Request`: JSON object with an error message


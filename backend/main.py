from fastapi import FastAPI, UploadFile, File, HTTPException
from backend.db.database import init_db
from backend.db import document_core, document_dao
from . import utils, processor

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this to specify allowed methods
    allow_headers=["*"],  # Adjust this to specify allowed headers
)

init_db()


@app.post("/upload", response_model=document_core.Document)
async def upload_pdf(file: UploadFile = File(...)):
    print(file)
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type")

    content_bytes = await file.read()  # Read the file content directly
    content = utils.extract_text_from_pdf(content_bytes)
    document = document_dao.create_document(filename=file.filename, content=content)
    return document


@app.post("/question")
async def ask_question(document_id: int, question: str):
    document = document_dao.get_document(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    answer = processor.process_question(document.content, question)
    return {"answer": answer}

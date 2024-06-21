from fastapi import FastAPI, UploadFile, File, HTTPException
from backend.db.database import init_db
from backend.db import document_core, document_dao
from . import utils, processor
from fastapi.middleware.cors import CORSMiddleware
from .logger import logger

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
    logger.info(f"Received upload request for file: {file.filename}")
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type")

    content_bytes = await file.read()
    content = utils.extract_text_from_pdf(content_bytes)
    document = document_dao.create_document(filename=file.filename, content=content)
    return document


@app.post("/question")
async def ask_question(document_id: int, question: str):
    logger.info(f"Received question on document: {document_id}")
    document = document_dao.get_document(document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    try:
        answer = processor.process_question(document.content, question)
        return {"answer": answer}
    except Exception as e:
        return {"answer": e}, 400

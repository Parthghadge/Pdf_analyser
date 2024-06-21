import fitz

from backend.logger import logger


def extract_text_from_pdf(pdf_bytes):
    logger.info("Extracting text from pdf")
    # Open the PDF document from byte data
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    # Iterate over pages and extract text
    text = ""
    for page in doc:
        text += page.get_text("text")  # Extract text from each page

    return text

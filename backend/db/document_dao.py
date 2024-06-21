from peewee import DoesNotExist
from .database import Document
from ..logger import logger


def get_document(document_id: int):
    try:
        return Document.get(Document.id == document_id)
    except DoesNotExist:
        return None


def create_document(filename: str, content: str):
    logger.info("Persisting contents of the fileZ")
    document = Document.create(filename=filename, content=content)
    return document

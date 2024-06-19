from peewee import DoesNotExist
from .database import Document


def get_document(document_id: int):
    try:
        return Document.get(Document.id == document_id)
    except DoesNotExist:
        return None


def create_document(filename: str, content: str):
    document = Document.create(filename=filename, content=content)
    return document

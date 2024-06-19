from pydantic import BaseModel
from datetime import datetime


class DocumentBase(BaseModel):
    filename: str
    content: str


class DocumentCreate(DocumentBase):
    pass


class Document(DocumentBase):
    id: int
    upload_date: datetime

    class Config:
        orm_mode = True

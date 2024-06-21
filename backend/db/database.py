from dotenv import load_dotenv
from peewee import Model, PostgresqlDatabase, CharField, DateTimeField, TextField
from datetime import datetime
import os

from backend.logger import logger

load_dotenv()

DATABASE = {
    'name': os.getenv('POSTGRES_DB', 'db'),
    'user': os.getenv('POSTGRES_USER', 'user'),
    'password': os.getenv('POSTGRES_PASSWORD', 'pwd'),
    'host': os.getenv('POSTGRES_HOST', 'localhost'),
    'port': os.getenv('POSTGRES_PORT', 5432),
}

db = PostgresqlDatabase(
    DATABASE['name'],
    user=DATABASE['user'],
    password=DATABASE['password'],
    host=DATABASE['host'],
    port=DATABASE['port'],
)


class BaseModel(Model):
    class Meta:
        database = db


class Document(BaseModel):
    filename = CharField()
    upload_date = DateTimeField(default=datetime.utcnow)
    content = TextField()


def init_db():
    logger.info("Initializing database")
    with db:
        db.create_tables([Document])

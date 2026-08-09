import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

class Config:
    APP_NAME = os.getenv("APP_NAME", "Массажная Студия")
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./massage_studio.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")

config = Config()

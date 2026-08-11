from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.auth import verify_admin
from app.config import config
from app.database import Base, engine, SessionLocal
from app.api import bookings_router, catalog_router
from app.views import views_router
from app.models.booking import Service, Master

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIST = BASE_DIR.parent / "tochka-site" / "dist"

app = FastAPI(
    title="Massage Studio Booking System",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static assets (used by the Jinja2 admin panel)
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

# Include Routers
app.include_router(views_router)
app.include_router(bookings_router)
app.include_router(catalog_router)

# API docs are sensitive (expose the full schema) — gate them behind admin auth
@app.get("/openapi.json", include_in_schema=False, dependencies=[Depends(verify_admin)])
def openapi_json():
    return get_openapi(title=app.title, version=app.version, routes=app.routes)

@app.get("/docs", include_in_schema=False, dependencies=[Depends(verify_admin)])
def swagger_docs():
    return get_swagger_ui_html(openapi_url="/openapi.json", title=f"{app.title} - Swagger UI")

@app.get("/redoc", include_in_schema=False, dependencies=[Depends(verify_admin)])
def redoc_docs():
    return get_redoc_html(openapi_url="/openapi.json", title=f"{app.title} - ReDoc")

# Serve the built React frontend (tochka-site) as the public site, if built
if FRONTEND_DIST.is_dir():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    # Insert initial demo data if database is empty
    db = SessionLocal()
    if db.query(Service).count() == 0:
        services = [
            Service(title="Расслабляющий массаж", description="Мягкие глубокие поглаживания и акупрессура для полного снятия ментального и физического напряжения.", duration_minutes=60, price=120.0),
            Service(title="Глубокотканный массаж", description="Интенсивная проработка фасций и глубоких мышц. Устраняет зажимы, триггерные точки и застарелую боль.", duration_minutes=60, price=140.0),
            Service(title="Восстановление спины и шеи", description="Прицельная терапия осевого скелета. Снимает синдром офисной шеи, гипертонус и головные боли напряжения.", duration_minutes=45, price=90.0),
            Service(title="Скульптурирующий массаж лица", description="Миофасциальный лифтинг-массаж лица, зоны декольте и шейно-воротниковой зоны.", duration_minutes=50, price=110.0),
            Service(title="Лимфодренажный массаж", description="Ритмичная мягкая техника для стимуляции лимфооттока, снятия отечности и детоксикации организма.", duration_minutes=60, price=130.0),
            Service(title="Авторский ритуал TOCH_KA", description="Комплексное погружение: релаксация, проработка глубоких мышц и ароматерапия натуральными маслами.", duration_minutes=90, price=190.0),
        ]
        db.add_all(services)

        m1 = Master(name="Анна Иванова", specialization="Мастер расслабляющего и спа-массажа", bio="Опыт 7 лет. Сертифицированный специалист по ароматерапии.")
        m2 = Master(name="Михаил Петров", specialization="Мастер спортивного и глубокотканного массажа", bio="Опыт 10 лет. Специалист по реабилитации и восстановлению.")
        db.add_all([m1, m2])
        db.commit()
    db.close()

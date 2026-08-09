from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.database import Base, engine, SessionLocal
from app.api import bookings_router
from app.views import views_router
from app.models.booking import Service, Master

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Massage Studio Booking System", version="1.0.0")

# Mount static assets
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

# Include Routers
app.include_router(views_router)
app.include_router(bookings_router)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    
    # Insert initial demo data if database is empty
    db = SessionLocal()
    if db.query(Service).count() == 0:
        s1 = Service(title="Классический массаж", description="Общий массаж тела для снятия усталости и расслабления мышц", duration_minutes=60, price=3500.0)
        s2 = Service(title="Спортивный массаж", description="Глубокая проработка мышц и связок для восстановительного процесса", duration_minutes=90, price=5000.0)
        s3 = Service(title="Аромамассаж", description="Релаксирующий массаж с премиальными эфирными маслами", duration_minutes=60, price=4000.0)
        db.add_all([s1, s2, s3])
        
        m1 = Master(name="Анна Иванова", specialization="Мастер расслабляющего и спа-массажа", bio="Опыт 7 лет. Сертифицированный специалист по ароматерапии.")
        m2 = Master(name="Михаил Петров", specialization="Мастер спортивного и глубокотканного массажа", bio="Опыт 10 лет. Специалист по реабилитации и восстановлению.")
        db.add_all([m1, m2])
        db.commit()
    db.close()

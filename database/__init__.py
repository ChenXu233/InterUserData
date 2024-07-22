from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

Base = declarative_base()

class UserData(Base):
    __tablename__ = 'user_data'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_uuid = Column(String, unique=True)
    user_data = Column(String)

class UserPosition(Base):
    __tablename__ = 'user_position'
    id = Column(Integer, primary_key=True, index=True)
    server_uuid = Column(String, unique=True)
    user_position = Column(String)

db_path = os.path.join(BASE_DIR, "test.db")

engine = create_engine('sqlite:///'+db_path)
DBSession = sessionmaker(bind=engine,autoflush=True)
Base.metadata.create_all(engine)

def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

class UserDataModel(BaseModel):
    user_uuid: str
    user_data: str
    
@app.post("/user_data", response_model=UserDataModel)
async def create_user_data(user_data: UserDataModel, db: Session = Depends(get_db)):
    print(user_data)
    db_user_data = UserData(user_uuid=user_data.user_uuid, user_data=user_data.user_data)
    db.add(db_user_data)
    db.commit()
    return db_user_data

@app.get("/user_data/{user_uuid}", response_model=UserDataModel)
async def get_user_data(user_uuid:str, db: Session = Depends(DBSession)):
    
    result = db.execute(select(UserData).where(UserData.user_uuid == user_uuid))
    return result.first()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException, Depends, status, Request, Header
from typing import Annotated
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, select
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, declarative_base
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

Base = declarative_base()

class PlayerData(Base):
    __tablename__ = 'Player_data'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    player_uuid = Column(String, unique=True)
    player_data = Column(String)

class PlayerPosition(Base):
    __tablename__ = 'Player_position'
    id = Column(Integer, primary_key=True, index=True)
    server_uuid = Column(String, unique=True)
    player_position = Column(String)

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

class PlayerDataModel(BaseModel):
    player_uuid: str
    player_data: str
    
@app.post("/Player_data", response_model=PlayerDataModel)
async def update_Player_data(player_data: PlayerDataModel, token: Annotated[str | None, Header()] = None, db: Session = Depends(get_db)):
    print(player_data)
    print(token)
    if (db_Player_data := db.query(PlayerData).filter(PlayerData.player_uuid == player_data.player_uuid)) and db.query(PlayerData).filter(PlayerData.player_uuid == player_data.player_uuid).all():
        db_Player_data.update({PlayerData.player_data:player_data.player_data})
    else:
        db_Player_data = PlayerData(player_uuid=player_data.player_uuid, Player_data=player_data.player_data)
        db.add(db_Player_data)
    db.commit()
    return db.query(PlayerData).filter(PlayerData.player_uuid == player_data.player_uuid).all()[0]

@app.get("/Player_data/{player_uuid}", response_model=PlayerDataModel)
async def get_Player_data(player_uuid:str, db: Session = Depends(get_db)):
    
    result = db.query(PlayerData).filter(PlayerData.player_uuid == player_uuid)
    return result.all()[0]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
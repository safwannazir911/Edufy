from sqlalchemy import Column, Integer, String
from db.connection import Base
from sqlalchemy.orm import relationship


class UsersModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    posts = relationship("PostsModel", back_populates="user")

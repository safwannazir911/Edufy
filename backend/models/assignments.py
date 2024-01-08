from sqlalchemy import Column, Integer, String, ForeignKey
from db.connection import Base
from sqlalchemy.orm import relationship


class AssignmentModel(Base):
    __tablename__ = "assignments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_name = Column(String)

# models/enrollments.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from db.connection import Base

class EnrollmentModel(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))

    # Define a relationship with the User and Course models 
    user = relationship("UsersModel", back_populates="enrollments")
    course = relationship("CourseModel", back_populates="enrollments")

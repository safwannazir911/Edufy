from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from db.connection import Base

# All active courses
class CourseModel(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)      # unique id of the course   
    title = Column(String, index=True, nullable=False)      # title of the course
    description = Column(Text)                              # short discription of the course
    teacher_id = Column(Integer, ForeignKey("users.id"), nullable=False)        # user (teacher) that has created the course

    teacher = relationship("UsersModel", back_populates="courses")   # populating the teacher field relation

    # relationship to link courses to their enrollments
    enrollments = relationship("EnrollmentModel", back_populates="course")


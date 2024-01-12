# services/courses_services.py
from sqlalchemy.orm import Session
from models.users import UsersModel
from schema.courses import CourseCreate, CourseUpdate, CourseList
from models.courses import CourseModel
from datetime import datetime

# @tabeed-h

# service to create a new course
def create_course(db: Session, user: UsersModel, course_create: CourseCreate):
    course = CourseModel(**course_create.dict(), teacher_id=user.id)
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

# service to return a course from the DB using course ID
def get_course(db: Session, course_id: int):
    return db.query(CourseModel).filter(CourseModel.id == course_id).first()

# service to return all the courses in the DB
def get_courses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(CourseModel).offset(skip).limit(limit).all()

# service to update a course using ID
def update_course(db: Session, course_id: int, course_update: CourseUpdate):
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if course:
        for key, value in course_update.dict(exclude_unset=True).items():
            setattr(course, key, value)
        db.commit()
        db.refresh(course)
    return course

# service to delete a course using ID
def delete_course(db: Session, course_id: int):
    course = db.query(CourseModel).filter(CourseModel.id == course_id).first()
    if course:
        db.delete(course)
        db.commit()
    return course

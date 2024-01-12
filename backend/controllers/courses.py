# controllers/courses_controller.py
from fastapi import HTTPException
from sqlalchemy.orm import Session
from services.courses import (
    create_course as create_course_service,
    get_course as get_course_service,
    get_courses as get_courses_service,
    update_course as update_course_service,
    delete_course as delete_course_service
)
from models.users import UsersModel
from schema.courses import Course, CourseCreate, CourseUpdate
from services.auth import get_current_user

def create_course(db: Session, user: UsersModel, course_create: CourseCreate):
    if user.role != "teacher":
        raise HTTPException(status_code=403, detail="Only teachers can create courses")
    return create_course_service(db, user, course_create)

def update_course(db: Session, current_user: UsersModel, course_id: int, course_update: CourseUpdate):
    course = get_course_service(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if current_user.role != "teacher" or current_user.id != course.teacher_id:
        raise HTTPException(status_code=403, detail="Only the teacher who created the course can update it")

    return update_course_service(db, course_id, course_update)

def get_course(db: Session, course_id: int):
    course = get_course_service(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

def get_courses(db: Session, skip: int = 0, limit: int = 10):
    return get_courses_service(db, skip=skip, limit=limit)

def delete_course(db: Session, current_user: UsersModel,course_id: int):
    course = get_course_service(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if current_user.role != "teacher" or current_user.id != course.teacher_id:
        raise HTTPException(status_code=403, detail="Only the teacher who created the course can Delete it")
    course = delete_course_service(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

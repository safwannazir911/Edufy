from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controllers import courses as courses_controller
from services.auth import get_current_user, oauth_schema
from db.connection import get_db
from schema.courses import Course, CourseCreate, CourseUpdate, CourseList
from models.users import UsersModel

# @tabeed-h
# defines router
router = APIRouter(
    prefix="/courses",
    tags=["courses"]
)

# route to create a new course
@router.post("/create", response_model=Course)
def create_course(course_create: CourseCreate, db: Session = Depends(get_db), user: UsersModel = Depends(get_current_user)):
    return courses_controller.create_course(db, user, course_create)

# route to get details of a particular course
@router.get("/get/{course_id}", response_model=Course)
def read_course(course_id: int, db: Session = Depends(get_db)):
    return courses_controller.get_course(db, course_id)

# route to get all the courses in the DB
@router.get("/all")
def read_courses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return courses_controller.get_courses(db, skip=skip, limit=limit)

# route to update a particular course with ID
@router.put("/update/{course_id}", response_model=Course)
def update_course(course_id: int, course_update: CourseUpdate,user: UsersModel = Depends(get_current_user), db: Session = Depends(get_db)):
    return courses_controller.update_course(db, user,course_id, course_update)

# route to delete a particular course with ID
@router.delete("/delete/{course_id}", response_model=Course)
def delete_course(course_id: int,user: UsersModel = Depends(get_current_user), db: Session = Depends(get_db)):
    return courses_controller.delete_course(db,user, course_id)

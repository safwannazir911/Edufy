
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.enrollment import enroll_user_in_course
from db.connection import get_db
from schema.enrollments import EnrollmentCreate, Enrollment
from services.auth import get_current_user
from models.users import UsersModel

router = APIRouter(
    prefix="/enrollments",
    tags=["enrollments"]
)

@router.post("/enroll", response_model=Enrollment)
def enroll_user(enrollment_create: EnrollmentCreate, db: Session = Depends(get_db), user: UsersModel = Depends(get_current_user)):
    return enroll_user_in_course(db,user,  enrollment_create)

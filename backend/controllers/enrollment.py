from fastapi import HTTPException
from sqlalchemy.orm import Session
from services.enrollment import create_enrollment
from schema.enrollments import EnrollmentCreate
from models.users import UsersModel

def enroll_user_in_course(db: Session, user: UsersModel, enrollment_create: EnrollmentCreate):
    return create_enrollment(db, user, enrollment_create)

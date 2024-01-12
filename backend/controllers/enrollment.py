from fastapi import HTTPException
from sqlalchemy.orm import Session
from services.enrollment import create_enrollment
from schema.enrollments import EnrollmentCreate

def enroll_user_in_course(db: Session, enrollment_create: EnrollmentCreate):
    return create_enrollment(db, enrollment_create)

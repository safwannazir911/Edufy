from sqlalchemy.orm import Session
from models.enrollments import EnrollmentModel
from schema.enrollments import EnrollmentCreate
from fastapi import HTTPException
from models.users import UsersModel
from models.courses import CourseModel

def create_enrollment(db: Session, user: UsersModel, enrollment_create: EnrollmentCreate):
    # Check if the user is a student
    if user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can enroll in courses")

    # Check if the user has already enrolled in the course
    existing_enrollment = db.query(EnrollmentModel).filter(
        EnrollmentModel.student_id == user.id,
        EnrollmentModel.course_id == enrollment_create.course_id
    ).first()

    if existing_enrollment:
        raise HTTPException(status_code=400, detail="User is already enrolled in the course")

    # Create a new enrollment
    enrollment = EnrollmentModel(**enrollment_create.dict(), student_id=user.id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

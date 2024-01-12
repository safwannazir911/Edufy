# schemas/enrollments.py
from pydantic import BaseModel

# schema for enrollment base
class EnrollmentBase(BaseModel):
    course_id: int


# schema for creating a new enrollment
class EnrollmentCreate(EnrollmentBase):
    pass


class Enrollment(EnrollmentBase):
    id: int

    class Config:
        orm_mode = True

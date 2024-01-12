from typing import List, Optional
from pydantic import BaseModel
from schema.users import UserDisplaySchema as User

# @tabeed-h
# define base schema for course
class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None

# schema to create a new course implement CourseBase
class CourseCreate(CourseBase):
    pass

# schema to update a already registered course implements CourseBase
class CourseUpdate(CourseBase):
    pass

# schema to return course with course id implements CourseBase
class Course(CourseBase):
    id: int

    class Config:
        orm_mode = True

# returns course with teacher details also 
class CourseWithInstructor(Course):
    teacher: Optional[User]

# returns the list of courses in db
class CourseList(BaseModel):
    items: List[Course]

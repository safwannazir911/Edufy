from pydantic import BaseModel, EmailStr
from typing import List
from enum import Enum


class UserRole(str, Enum):
    student = "student"
    teacher = "teacher"


class PostsList(BaseModel):
    title: str
    body: str
    rating: int

    class Config:
        orm_mode = True

class CourseList(BaseModel):
    title: str
    description: str



class RegisterUserSchema(BaseModel):
    role: UserRole
    name: str
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
                "role": "student",
                "name": "aasim",
                "email": "aasim@gmail.com",
                "password": "aasim123"
            }
        }


class UserDisplaySchema(BaseModel):
    email: str
    username: str
    posts: List[PostsList] = []
    courses: List[CourseList] = []      # added to make the list of courses of a teacher visible

    class Config:
        orm_mode = True

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

    class Config:
        orm_mode = True

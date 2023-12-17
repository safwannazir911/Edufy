from pydantic import BaseModel, EmailStr
from typing import List


# PostsLists getting consumed by users schema
class PostsList(BaseModel):
    title: str
    body: str
    rating: int

    class Config:
        orm_mode = True


class RegisterUserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
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

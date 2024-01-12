from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from models.users import UsersModel
from schema.users import RegisterUserSchema
from utils.password import Hash
from utils.error import raise_exception
from services import users as users_service, auth as auth_service
from db.connection import get_db

def create_user(user: RegisterUserSchema, db: Session = Depends(get_db)):

    existing_user_by_email = users_service.get_user_by_email_service(user.email, db)
    existing_user_by_username = users_service.get_user_by_username_service(user.name, db)

    if existing_user_by_email:
        raise raise_exception("User with this email already exists", 400)

    if existing_user_by_username:
        raise raise_exception("User with this username already exists", 400)


    user_model = UsersModel(
        role = user.role,
        email=user.email,
        username=user.name,
        password=Hash.hash_password(user.password)
    )

    data = users_service.create_user_service(user_model, db)
    return data


def login_user(form: OAuth2PasswordRequestForm, db: Session = Depends(get_db)):
    user_model = UsersModel(
        username=form.username,  
        password=form.password
    )

    um = users_service.get_user_by_username_service(user_model.username, db)

    if not um:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    if not Hash.verify_password(form.password, um.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")



    response = {
        "sub": um.email,
        "username": um.username,
        "user_id": um.id,
        "role": um.role
    }

    token = auth_service.create_access_token(response)
    return {
        "user": response,
        "access_token": token,
        "message": "Successfully logged in",
        "token_type": "bearer"
    }


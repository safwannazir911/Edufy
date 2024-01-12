from fastapi import APIRouter, Depends, UploadFile , File
from sqlalchemy.orm import Session
from db.connection import get_db
from typing import List

from schema.Assignment import AssignmentSchema
from controllers import assignment as assignment_controllers
from services.auth import get_current_user, oauth_schema
from models.users import UsersModel

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)


@router.post("/")
def create_post_routes(file: UploadFile = File(..., media_type="text/plain"), db: Session = Depends(get_db), user: UsersModel = Depends(get_current_user)):
    return assignment_controllers.upload_assignment(file,  db, user)
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from schema.Assignment import AssignmentSchema
from models.assignments import AssignmentModel
from models.users import UsersModel
import os

def upload_assignment( file, db: Session, user: UsersModel):
    # Save the file to the 'uploads' folder
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    # Set asign.file_name to the path where the file is saved
    asign = AssignmentModel(file_name=file_path)

    return {"filename": file.filename, "file_path": file_path}

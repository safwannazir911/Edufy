from pydantic import BaseModel


class AssignmentSchema(BaseModel):
    file_name : str

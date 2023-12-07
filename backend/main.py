from fastapi import FastAPI

from models.create_table import init_table
from routers import users, posts

app = FastAPI()

# Initialize table
init_table()

app.include_router(users.router)
app.include_router(posts.router)

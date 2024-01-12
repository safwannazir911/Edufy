from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.create_table import init_table
from routers import users, posts, assignment, courses, enrollment

app = FastAPI()

# Initialize table
init_table()

# Set up CORS
origins = ["*"]  # You can specify your frontend's URL instead of "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify the allowed HTTP methods
    allow_headers=["*"],  # You can specify the allowed HTTP headers
)

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(assignment.router)
app.include_router(courses.router)
app.include_router(enrollment.router)

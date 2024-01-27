from fastapi import FastAPI, WebSocket
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
connected_users = {}
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(user_id: str, websocket: WebSocket):
    await websocket.accept()

    # Store the WebSocket connection in the dictionary
    connected_users[user_id] = websocket

    try:
        while True:
            data = await websocket.receive_text()
            # Send the received data to the other user
            for user, user_ws in connected_users.items():
                if user != user_id:
                    await user_ws.send_text(data)
    except:
        # If a user disconnects, remove them from the dictionary
        del connected_users[user_id]
        await websocket.close()

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(assignment.router)
app.include_router(courses.router)
app.include_router(enrollment.router)

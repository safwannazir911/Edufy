from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.websockets import WebSocketDisconnect

from models.create_table import init_table
from routers import users, posts, assignment, courses, enrollment

from typing import Dict
import json

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

# WebSocket endpoint
connected_users: Dict[str, WebSocket] = {}
async def broadcast_user_list():
    connected_usernames = list(connected_users.keys())
    for username, ws in connected_users.items():
        try:
            # Sending the updated user list to all connected clients
            await ws.send_text(
                json.dumps({"type": "user_list", "users": connected_usernames})
            )
        except WebSocketDisconnect:
            # Remove disconnected users from the dictionary
            del connected_users[username]

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(user_id: str, websocket: WebSocket):
    await websocket.accept()
    connected_users[user_id] = websocket
    print(connected_users)

    try:
        await broadcast_user_list()
        while True:
            data = await websocket.receive_text()
            print(data)
           # Parse the received JSON data
            data_obj = json.loads(data)

            # Send the received data to the other user
            recipient = data_obj.get("recipient")

            if recipient in connected_users:
                recipient_ws = connected_users[recipient]
                await recipient_ws.send_text(data)
    except WebSocketDisconnect:
        # If a user disconnects, remove them from the dictionary
        if user_id in connected_users:
            del connected_users[user_id]
        await websocket.close()

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(assignment.router)
app.include_router(courses.router)
app.include_router(enrollment.router)
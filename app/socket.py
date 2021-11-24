from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://instagrand.herokuapp.com",
        "https://instagrand.herokuapp.com"
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle room-chat messages
@socketio.on("message")
def handle_chat(data):
    send({'id': data['id'], 'message': data['content'], "sender": data['sender']}, room=data['room'])

# handle join chat
@socketio.on('join')
def join(data):
    join_room(data['room'])

# handle leave char
@socketio.on("leave")
def leave(data):
    leave_room(data['room'])

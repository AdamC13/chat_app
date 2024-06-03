from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit


app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret-key'

socketio = SocketIO(app)

messages = []
messagesB = []


@app.route('/')
def index():
    return render_template('join_room.html')

# @app.route('/roomA')
# def join_room():
#     return render_template('join_room.html')


@socketio.on('connect')
def handle_connect():
    print('Client has connected')
    emit('initial_messages', messages)


@socketio.on('disconnect')
def handle_disconnect():
    print('Client has disconnected')


@socketio.on('message')
def handle_message(data):
    print('The handle message received:', data, type(data))
    if isinstance(data, dict) and 'name' in data:
        send(f"Hello from the server {data['name']}")
    else:
        send('Hola')


@socketio.on('custom_test_event')
def handle_cusom(data):
    print('Server handle custom received:', data)
    emit('another_event', "I am ready for lunch!")


@socketio.on('send_chat_message')
def handle_chat_message(data):
    # Get the username and message from the data object
    username = data.get('username')
    message = data.get('message')
    # Build the message
    output = f"<b>{username}</b>: {message}"
    # Append the output to the messages list
    messages.append(output)
    send(output, broadcast=True)
    
@socketio.on('send_chat_messageB')
def handle_chat_message(data):
    # Get the username and message from the data object
    username = data.get('username')
    message = data.get('message')
    # Build the message
    output = [f"<b>{username}</b>: {message}"]
    # Append the output to the messages list
    messagesB.append(output)
    send(output, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, debug=True)

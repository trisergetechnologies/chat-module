import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addMessage, setMessages } from '../redux/chatSlice';
import { getChatHistory, sendMessage } from '../services/api';

const socket = io('http://localhost:5000');

const ChatBox = ({ selectedUser }) => {
  const { user, token } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedUser) {
      getChatHistory(selectedUser._id, token).then(({ data }) => dispatch(setMessages(data)));
    }

    socket.on('receiveMessage', (data) => {
      dispatch(addMessage(data));
    });
  }, [selectedUser, dispatch, token]);

  const handleSend = async () => {
    const newMessage = { sender: user._id, receiverId: selectedUser._id, content: message };
    await sendMessage(newMessage, token);
    socket.emit('sendMessage', newMessage);
    dispatch(addMessage(newMessage));
    setMessage('');
  };

  return (
    <div>
      <h2>Chat with {selectedUser?.username}</h2>
      <div>{messages.map((msg, index) => <p key={index}>{msg.content}</p>)}</div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;

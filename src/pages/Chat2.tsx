import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config/configStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../supabase';
import { Tables } from '../supabase/database.types';

const Chat2 = () => {
  const [rooms, setRooms] = useState<Tables<'chat_rooms'>[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Tables<'chat_rooms'> | null>(null);
  const [currentRoomMessages, setCurrentRoomMessages] = useState<Tables<'chat_messages'>[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputMessage, setInputMessage] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  // console.log('user', user);

  const getRooms = async () => {
    const { data: rooms } = await supabase.from('chat_rooms').select();
    if (rooms) setRooms(rooms);
  };

  const handleCreateRoom = async () => {
    const { data } = await supabase.from('chat_rooms').insert({}).select().single();
    console.log(data);
    if (!data) return;
    setRooms((current) => [...current, data]);
  };

  const handleSubmitCreateMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = inputMessage.trim();
    if (content.length < 1) return;
    if (!currentRoom) return console.error('채팅방을 찾을 수 없습니다.');
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: currentRoom.room_id,
        content: content,
      })
      .select()
      .single();
    if (error) return console.error(error);
    if (!data) return console.error('생성된 메시지를 가져올 수 없습니다.');
    // setCurrentRoomMessages((current) => [...current, data]);
  };

  const handleChangeRoom = async (room_id: string) => {
    const { data: room, error } = await supabase.from('chat_rooms').select().eq('room_id', room_id).single();
    const { data: roomMessages, error: roomMessagesError } = await supabase.from('chat_messages').select().eq('room_id', room_id).order('created_at', { ascending: true });
    if (error || !room || roomMessagesError) return;
    setCurrentRoom(room);
    setCurrentRoomMessages(roomMessages);
    setSearchParams({ room_id });
  };

  const handleAddMessage = useCallback(async (newMessage: Tables<'chat_messages'>) => {
    // if (!currentRoomMessages.find((message) => message.message_id === newMessage.message_id)) {
    // }
    setCurrentRoomMessages((current) => [...current, newMessage]);
  }, []);

  useEffect(() => {
    console.log('user', user);
    if (!user) return navigate('/signin');
    getRooms();
  }, [user, navigate]);

  useEffect(() => {
    console.log('subscription');
    if (!currentRoom) return;
    const subscription = supabase
      .channel('any')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${currentRoom.room_id}` }, (payload) => {
        console.log('Change received!', payload);
        if (!currentRoom) return;
        const newMessage = payload.new as Tables<'chat_messages'>;
        if (currentRoom.room_id !== newMessage.room_id) return;
        handleAddMessage(newMessage);
      })
      .subscribe();
    console.log('sub', subscription);
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentRoom, handleAddMessage]);

  return (
    <div>
      {/* chat room list */}
      <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Current Chat Room: {currentRoom?.room_id}</h2>

      <h4>Chat Room List</h4>
      <ul>
        {rooms?.map((room) => (
          <li key={room.room_id}>
            {room.room_id}
            <button onClick={() => handleChangeRoom(room.room_id)}>채팅방으로 들어가기</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateRoom}>Create Room</button>
      {/* chat room */}
      <div style={{ height: '500px', width: '500px', border: '1px solid red' }}>
        {currentRoom ? (
          <div>
            <form onSubmit={handleSubmitCreateMessage}>
              <h4>Chat Room</h4>
              <ul>
                {currentRoomMessages.map((message) => (
                  <li key={message.message_id}>
                    <span>{message.content}</span>
                  </li>
                ))}
              </ul>
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div>
            <h4>Select a chat room to start chatting</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat2;

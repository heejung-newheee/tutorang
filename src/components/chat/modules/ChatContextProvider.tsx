import { RealtimeChannel } from '@supabase/supabase-js';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getChatRoom, getJoinedChatRooms, getMessagesInChatRoom, getUserProfile } from '../../../api/chat';
import supabase from '../../../supabase';
import { RoomType, RoomWithLastMessageType, Tables } from '../../../supabase/database.types';

type ChatContextType = {
  chatRoomList: RoomWithLastMessageType[];
  chatRoom: RoomType | null;
  chatMessages: Tables<'chat_messages'>[];
  setChatRoomList: React.Dispatch<React.SetStateAction<RoomWithLastMessageType[]>>;
  setChatRoom: React.Dispatch<React.SetStateAction<RoomType | null>>;
  setChatMessages: React.Dispatch<React.SetStateAction<Tables<'chat_messages'>[]>>;
};

export const ChatContext = createContext<ChatContextType>({
  chatRoomList: [],
  chatRoom: null,
  chatMessages: [],
  setChatRoomList: () => {},
  setChatRoom: () => {},
  setChatMessages: () => {},
});

const ChatContextProvider = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const [chatRoomList, setChatRoomList] = useState<RoomWithLastMessageType[]>([]);
  const [chatRoom, setChatRoom] = useState<RoomType | null>(null);
  const [chatMessages, setChatMessages] = useState<Tables<'chat_messages'>[]>([]);
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get('room_id');

  console.log(chatRoomList, 'chatRoomList', chatRoom, 'chatRoom');
  const chatRoomIdRef = useRef<string | null>(null);
  const chatRoomListIdsRef = useRef<string[]>([]);
  console.log(chatRoomIdRef, 'chatRoomIdRef', chatRoomListIdsRef, 'chatRoomListIdsRef');

  const messageSubscriptionRef = useRef<RealtimeChannel | null>(null);
  const participantSubscriptionRef = useRef<RealtimeChannel | null>(null);

  console.log(messageSubscriptionRef, 'messageSubscriptionRef', participantSubscriptionRef, 'participantSubscriptionRef');

  const handleGetChatRooms = useCallback(async () => {
    const chatRooms = (await getJoinedChatRooms()) as RoomWithLastMessageType[];
    if (chatRooms && chatRooms.length > 0) {
      setChatRoomList(chatRooms);
    }
  }, [setChatRoomList]);

  const handleGetMessages = useCallback(async () => {
    if (!room_id) {
      setChatRoom(null);
      setChatMessages([]);
      return;
    }

    try {
      const room = (await getChatRoom(room_id)) as RoomType;
      const messages = await getMessagesInChatRoom(room_id);
      if (!room) return;
      setChatRoom(room);
      setChatMessages(messages);
    } catch (err) {
      console.error(err);
    }
  }, [setChatMessages, room_id]);

  useEffect(() => {
    handleGetMessages();
  }, [handleGetMessages]);

  useEffect(() => {
    handleGetChatRooms();
  }, [handleGetChatRooms]);

  useEffect(() => {}, [room_id]);

  useEffect(() => {
    if (!chatRoom) return;
    chatRoomIdRef.current = chatRoom.room_id;
  }, [chatRoom]);

  useEffect(() => {
    if (chatRoomList.length === chatRoomListIdsRef.current.length) return;
    chatRoomListIdsRef.current = chatRoomList.map((room) => room.room_id);
  }, [chatRoomList]);

  useEffect(() => {
    messageSubscriptionRef.current = supabase
      .channel(`message_channel_${userId}}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          const newMessage = payload.new as Tables<'chat_messages'>;
          if (chatRoomIdRef.current === newMessage.room_id) {
            setChatMessages((messages) => {
              if (!messages.find((message) => message.message_id === newMessage.message_id)) {
                return [...messages, newMessage];
              }
              return messages;
            });
          }

          setChatRoomList((roomList) => {
            const newRoomList = [...roomList];
            const roomIndex = newRoomList.findIndex((room) => room.room_id === newMessage.room_id);
            if (roomIndex === -1) return newRoomList;
            newRoomList[roomIndex] = { ...newRoomList[roomIndex], last_message: [newMessage] };
            return newRoomList;
          });
        },
      )
      .subscribe();

    return () => {
      if (messageSubscriptionRef.current) supabase.removeChannel(messageSubscriptionRef.current);
    };
  }, [userId]);

  useEffect(() => {
    participantSubscriptionRef.current = supabase
      .channel(`participant_channel_${userId}}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_room_participants',
        },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const newParticipant = payload.new as Tables<'chat_room_participants'>;
            if (newParticipant.user_id === userId) {
              try {
                const chatRoom = (await getChatRoom(newParticipant.room_id)) as RoomWithLastMessageType;
                if (chatRoom) setChatRoomList((roomList) => [chatRoom, ...roomList]);
              } catch (err) {
                console.error(err);
              }
            } else {
              try {
                const profile = await getUserProfile(newParticipant.user_id);
                setChatRoomList((roomList) => {
                  const newRoomList = [...roomList];
                  const roomIndex = roomList.findIndex((room) => room.room_id === newParticipant.room_id);
                  if (roomIndex === -1) return roomList;
                  newRoomList[roomIndex] = { ...newRoomList[roomIndex], chat_room_participants: [...newRoomList[roomIndex].chat_room_participants, { ...newParticipant, profiles: profile }] };
                  return newRoomList;
                });
              } catch (err) {
                console.error(err);
              }
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedParticipant = payload.old as Tables<'chat_room_participants'>;

            if (deletedParticipant.user_id === userId) {
              if (chatRoomIdRef.current && chatRoomIdRef.current === deletedParticipant.room_id) {
                setChatRoom(null);
                setChatMessages([]);
              }
              setChatRoomList((roomList) => roomList.filter((room) => room.room_id !== deletedParticipant.room_id));
            } else {
              setChatRoom((chatRoom) => {
                if (!chatRoom || !chatRoom.chat_room_participants) return chatRoom;
                const newChatRoom = { ...chatRoom };
                newChatRoom.chat_room_participants = newChatRoom.chat_room_participants.filter((participant) => participant.user_id !== deletedParticipant.user_id);
                return newChatRoom;
              });

              setChatRoomList((roomList) => {
                const newRoomList = [...roomList];
                const roomIndex = roomList.findIndex((room) => room.room_id === deletedParticipant.room_id);
                if (roomIndex === -1) return roomList;
                newRoomList[roomIndex] = { ...newRoomList[roomIndex], chat_room_participants: newRoomList[roomIndex].chat_room_participants.filter((participant) => participant.user_id !== deletedParticipant.user_id) };
                return newRoomList;
              });
            }
          }
        },
      )
      .subscribe();

    return () => {
      if (participantSubscriptionRef.current) supabase.removeChannel(participantSubscriptionRef.current);
    };
  }, [userId]);

  return (
    <ChatContext.Provider
      value={{
        chatRoomList,
        setChatRoomList,
        chatRoom,
        setChatRoom,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;

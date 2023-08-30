import supabase from '../supabase';

export const createChatRoom = async () => {
  const { data, error } = await supabase.from('chat_rooms').insert({}).select().single();
  if (error) throw error;
  return data;
};

export const inviteChatRoom = async (room_id: string, invitee_id: string) => {
  if (!room_id || !invitee_id) throw new Error('잘못된 인자값');
  const { error } = await supabase.from('chat_room_participants').insert({
    room_id: room_id,
    user_id: invitee_id,
  });
  if (error) throw error;
};

export const getChatRoomWithTutor = async (tutor_Id: string) => {
  if (!tutor_Id) throw new Error('잘못된 인자값');
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!data.session) throw new Error('사용자 세션을 찾을 수 없습니다');

  const user_id = data.session.user.id;
  const { data: rooms, error } = await supabase.rpc('get_two_person_chat_room', { user1_id: user_id, user2_id: tutor_Id });
  if (error) throw error;
  return rooms;
};

export const getJoinedChatRooms = async () => {
  const { data: rooms, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      *,
      chat_room_participants!inner (*,
        profiles(*)),
      last_message:chat_messages(*)
    `,
    )
    .order('created_at', { foreignTable: 'chat_messages', ascending: false })
    .limit(1, { foreignTable: 'chat_messages' });
  if (error) throw error;
  return rooms;
};

export const getChatRoom = async (room_id: string) => {
  const { data: rooms, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      *,
      chat_room_participants!inner (*,
        profiles(*)),
      last_message:chat_messages(*)
    `,
    )
    .filter('room_id', 'eq', room_id)
    .order('created_at', { foreignTable: 'chat_messages', ascending: false })
    .limit(1, { foreignTable: 'chat_messages' })
    .single();

  if (error) throw error;
  return rooms;
};

export const getChatRoomOnly = async (room_id: string) => {
  const { data: room, error } = await supabase.from('chat_rooms').select().eq('room_id', room_id).single();
  if (error) throw error;
  return room;
};

export const getChatWithUserAndMessages = async (room_id: string) => {
  const { data: roomData, error } = await supabase
    .from('chat_rooms')
    .select(
      `
      *,
      chat_room_participants(*),
      chat_messages(*)
      `,
    )
    .eq('room_id', room_id)
    .single();
  if (error) throw error;
  return roomData;
};

export const leaveChatRoom = async (room_id: string) => {
  const { error } = await supabase.from('chat_room_participants').delete().eq('room_id', room_id);
  if (error) throw error;
};

export const getMessagesInChatRoom = async (room_id: string) => {
  const { data: messages, error } = await supabase.from('chat_messages').select().eq('room_id', room_id).order('created_at').limit(100);
  if (error) throw error;
  return messages;
};

export const isUserInChatRoom = async (room_id: string) => {
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!data.session) throw new Error('사용자 세션을 찾을 수 없습니다');

  const user_id = data.session.user.id;

  const { data: count, error } = await supabase.from('chat_room_participants').select().eq('room_id', room_id).eq('user_id', user_id).limit(1).single();
  if (error) throw error;
  return !!count;
};

export const getUserProfile = async (user_id: string) => {
  const { data, error } = await supabase.from('profiles').select().eq('id', user_id).limit(1).single();
  if (error) throw error;
  return data;
};

export const sendTextMessage = async (room_id: string, message: string) => {
  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    content: message,
  });
  if (error) throw error;
};

const TUTORING_MESSAGE = {
  request: '튜터링을 요청했습니다',
  accept: '튜터링을 수락했습니다',
  reject: '튜터링을 거절했습니다',
};

export const sendTutoringMessage = async (room_id: string, type: 'request' | 'accept' | 'reject') => {
  const message = TUTORING_MESSAGE[type];
  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    type,
    content: message,
  });
  if (error) throw error;
};

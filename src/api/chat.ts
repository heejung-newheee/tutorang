import { v4 } from 'uuid';
import supabase from '../supabase';
import { STUDENT_MESSAGE, TUTOR_MESSAGE } from '../constants/chat.constant';

type TutorType = 'pending' | 'reject';
type StudentType = 'request' | 'accept' | 'reject';

export type ImageDataType = {
  imageUrl: string;
};

export type LocationDataType = {
  name: string;
  latitude: number;
  longitude: number;
};

/**
 * 새로운 채팅방을 생성합니다.
 */
export const createChatRoom = async () => {
  const { data, error } = await supabase.from('chat_rooms').insert({}).select().single();
  if (error) throw error;
  return data;
};

/**
 * 채팅방에 참여자를 추가합니다.
 */
export const inviteChatRoom = async (room_id: string, invitee_id: string) => {
  if (!room_id || !invitee_id) throw new Error('잘못된 인자값');
  const { error } = await supabase.from('chat_room_participants').insert({
    room_id: room_id,
    user_id: invitee_id,
  });
  if (error) throw error;
};

/**
 * 두 사람만이 속한 1:1 채팅방을 가져옵니다.
 */
export const getChatRoomOnlyTwoPerson = async (user1_id: string, user2_id: string) => {
  if (!user1_id || !user2_id) throw new Error('잘못된 인자값');

  const { data: rooms, error } = await supabase.rpc('get_two_person_chat_room', { user1_id, user2_id });
  if (error) throw error;
  return rooms;
};

/**
 * 사용자가 속한 모든 채팅방 목록을 가져옵니다.
 */
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

/**
 * 해당 채팅방의 정보를 가져옵니다.
 */
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

/**
 * 채팅방을 나갑니다.
 */
export const leaveChatRoom = async (room_id: string) => {
  const { error } = await supabase.from('chat_room_participants').delete().eq('room_id', room_id);
  if (error) throw error;
};

/**
 * 채팅방의 메시지 목록 최대 100개를 가져옵니다.
 */
export const getMessagesInChatRoom = async (room_id: string) => {
  const { data: messages, error } = await supabase.from('chat_messages').select().eq('room_id', room_id).order('created_at').limit(100);
  if (error) throw error;
  return messages;
};

/**
 * 채팅방에 사용자가 속해있는지 확인합니다.
 */
export const isUserInChatRoom = async (room_id: string) => {
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!data.session) throw new Error('사용자 세션을 찾을 수 없습니다');

  const user_id = data.session.user.id;

  const { data: count, error } = await supabase.from('chat_room_participants').select().eq('room_id', room_id).eq('user_id', user_id).limit(1).single();
  if (error) throw error;
  return !!count;
};

/**
 * 1:1 채팅방이 있으면 반환하고 없으면 만들고 초대 후 반환합니다.
 */
export const getOrCreatePrivateChatRoom = async (target_user_id: string) => {
  if (!target_user_id) throw new Error('잘못된 인자값');
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!data.session) throw new Error('사용자 세션을 찾을 수 없습니다');

  const user_id = data.session.user.id;

  const { data: rooms, error } = await supabase.rpc('get_two_person_chat_room', { user1_id: user_id, user2_id: target_user_id });
  if (error) throw error;

  if (rooms && rooms.length > 0) return rooms[0];

  const newRoom = await createChatRoom();
  await inviteChatRoom(newRoom.room_id, target_user_id);
  return newRoom;
};

/**
 * 채팅방에 텍스트 메시지를 전송합니다.
 */
export const sendTextMessage = async (room_id: string, message: string) => {
  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    content: message,
  });
  if (error) throw error;
};

/**
 * 채팅방에 튜터가 튜터링 관련 메시지를 전송합니다.
 */
export const sendTutorMessage = async (room_id: string, type: TutorType) => {
  const message = TUTOR_MESSAGE[type];
  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    type,
    content: message,
  });
  if (error) throw error;
};

/**
 * 채팅방에 학생이 튜터링 관련 메시지를 전송합니다.
 */
export const sendStudentMessage = async (room_id: string, type: StudentType) => {
  const message = STUDENT_MESSAGE[type];
  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    type,
    content: message,
  });
  if (error) throw error;
};

/**
 * 채팅방에 이미지 메시지를 전송합니다.
 */
export const sendImageMessage = async (room_id: string, image_file: File) => {
  const fileType = image_file.type.includes('/') ? image_file.type.split('/')[1] : image_file.type;
  const fileName = `${v4()}.${fileType}`;

  const imageUploadResult = await supabase.storage.from('chat').upload(`images/${fileName}`, image_file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (imageUploadResult.error) throw new Error('이미지 업로드에 실패했습니다.');

  const getPublicUrlResult = supabase.storage.from('chat').getPublicUrl(`images/${fileName}`);

  const imagUrl = getPublicUrlResult.data.publicUrl;
  if (!imagUrl) throw new Error('이미지 주소를 가져올 수 없습니다.');

  const { error } = await supabase.from('chat_messages').insert({
    room_id: room_id,
    type: 'image',
    data: { imageUrl: imagUrl },
    content: '이미지',
  });

  if (error) throw error;
};

/**
 * 채팅방에 위치 메시지를 전송합니다.
 */
export const sendLocationMessage = async (room_id: string, location: LocationDataType) => {
  if (!room_id) return;
  const { error } = await supabase.from('chat_messages').insert({
    room_id,
    type: 'location',
    data: location,
    content: '위치',
  });
  if (error) throw error;
};

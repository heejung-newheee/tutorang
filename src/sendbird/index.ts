import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule, SendbirdGroupChat, GroupChannelCreateParams } from '@sendbird/chat/groupChannel';
const appId = import.meta.env.VITE_SANDBIRD_APP_ID;

const sendbird = SendbirdChat.init({
  appId: appId,
  modules: [new GroupChannelModule()],
}) as SendbirdGroupChat;

export default sendbird;

const getGroupChannel = async (studentId: string, tutorId: string) => {
  const params: GroupChannelCreateParams = {
    invitedUserIds: [studentId, tutorId],
    operatorUserIds: [studentId, tutorId],
    isDistinct: true,
  };
  const channel = await sendbird.groupChannel.createChannel(params);
  return channel;
};

export const getGroupChannelUrl = async (studentId: string, tutorId: string) => {
  try {
    await sendbird.connect(studentId);
  } catch (err) {
    console.error(err);
  }
  let channel;
  try {
    channel = await getGroupChannel(studentId, tutorId);
  } catch (err) {
    console.error(err);
  }
  if (!channel) throw new Error('채널을 가져올 수 없습니다.');
  return channel.url;
};

/**
 * 학생이 튜터에게 튜터링 요청 메시지를 보낸다.
 * @function sendRequestTutoringMessage
 * @param {string} studentId 튜터링을 요청하는 학생의 id
 * @param {tutorId} tutorId 튜터링을 요청받는 튜터의 id
 * @returns void
 */
export const sendRequestTutoringMessage = async (studentId: string, tutorId: string) => {
  try {
    await sendbird.connect(studentId);
  } catch (err) {
    console.error(err);
  }

  const channel = await getGroupChannel(studentId, tutorId);
  console.log(studentId, tutorId);
  console.log('channel', channel);
  if (!channel) throw Error('채널 생성 에러');
  const messageParams = {
    message: '매칭 요청입니다.',
    customType: 'request',
    data: studentId,
  };
  channel
    .sendUserMessage(messageParams)
    .onPending(() => {
      console.log('튜터링 요청 메시지를 보내는 중입니다.');
    })
    .onFailed(async (error, message) => {
      console.error(error, message);
      alert('튜터링 요청 메시지를 보내기에 실패했습니다.');
      await sendbird.disconnect();
    })
    .onSucceeded(async () => {
      alert('튜터링 요청 메시지를 성공적으로 보냈습니다.');
      await sendbird.disconnect();
    });
};

/**
 * 튜터가 학생에게 튜터링 요청에 대한 응답 메시지를 보낸다.
 * @function sendResponseTutoringMessage
 * @param {string} studentId 튜터링을 요청한 학생 id
 * @param {tutorId} tutorId 튜터링을 요청받은 튜터 id
 * @param {responseType} responseType 튜터링 요청에 대한 수락 또는 거절 키워드
 * @returns void
 */
export const sendResponseTutoringMessage = async (studentId: string, tutorId: string, responseType: 'accept' | 'reject') => {
  try {
    await sendbird.connect(tutorId);
  } catch (err) {
    console.error(err);
  }

  const channel = await getGroupChannel(studentId, tutorId);
  console.log(studentId, tutorId);
  console.log('channel', channel);
  if (!channel) throw Error('채널 생성 에러');
  const messageParams = {
    message: `매칭 요청에 대한 ${responseType === 'accept' ? '수락' : '거절'}응답 입니다.`,
    customType: responseType,
    data: studentId,
  };
  channel
    .sendUserMessage(messageParams)
    .onPending(() => {
      alert(`튜터링 요청에 대한 ${responseType === 'accept' ? '수락' : '거절'} 메시지를 보내는 중입니다.`);
    })
    .onFailed(async (error, message) => {
      console.error(error, message);
      alert('튜터링 응답 메시지 보내기에 실패했습니다.');
      await sendbird.disconnect();
    })
    .onSucceeded(async () => {
      alert(`튜터링 요청에 대한 ${responseType === 'accept' ? '수락' : '거절'} 메시지를 성공적으로 보냈습니다.`);
      await sendbird.disconnect();
    });
};

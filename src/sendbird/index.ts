import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule, SendbirdGroupChat, GroupChannelCreateParams } from '@sendbird/chat/groupChannel';
const appId = import.meta.env.VITE_SANDBIRD_APP_ID;

const sendbird = SendbirdChat.init({
  appId: appId,
  modules: [new GroupChannelModule()],
}) as SendbirdGroupChat;

export default sendbird;

export const sendRequestCustomMessage = async (studentId: string, tutorId: string) => {
  const params: GroupChannelCreateParams = {
    invitedUserIds: [studentId, tutorId],
    operatorUserIds: [studentId, tutorId],
    isDistinct: true,
  };
  let user;
  try {
    user = await sendbird.connect(studentId);
  } catch (err) {
    console.error(err);
  }
  console.log('user', user);
  const channel = await sendbird.groupChannel.createChannel(params);
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
      alert('보내는 중입니다.');
    })
    .onFailed(async (error, message) => {
      console.error(error, message);
      alert('메시지 보내기에 실패했습니다.');
      await sendbird.disconnect();
    })
    .onSucceeded(async () => {
      alert('성공적으로 보냈습니다.');
      await sendbird.disconnect();
    });
};

// export const sendRequestCustomMessage = async (studentId: string, channel: GroupChannel) => {
//   console.log(studentId);
//   const user = await sendbird.connect(studentId);
//   console.log('user', user);

//   await sendbird.disconnect();
// };

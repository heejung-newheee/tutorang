import { sendBirdSelectors, useSendbirdStateContext } from '@sendbird/uikit-react';

type HeaderType = {
  channelUrl: string;
  userId: string;
  onClose: (() => void) | null;
};

const SendBirdChannelHeader = ({ channelUrl, userId, onClose }: HeaderType) => {
  const globalStore = useSendbirdStateContext();
  // const sdkInstance = sendBirdSelectors.getSdk(globalStore);
  const sendMessage = sendBirdSelectors.getSendUserMessage(globalStore);
  const getGroupChannel = sendBirdSelectors.getGetGroupChannel(globalStore);

  const handleSendMessage = async () => {
    const confirm = window.confirm('매칭 요청을 보낼까요?');
    if (!confirm) return;
    const channelToSend = await getGroupChannel(channelUrl);
    const params = {
      message: '매칭 요청입니다.',
      customType: 'request',
      data: userId,
    };
    sendMessage(channelToSend, params)
      .onPending(() => {
        console.log('Message sent: pending');
      })
      .onSucceeded(() => {
        console.log('Message sent: success');
      })
      .onFailed(() => {
        console.error('Message sent: error');
      });
  };
  return (
    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      {typeof onClose === 'function' && <button onClick={() => onClose()}>뒤로 가기</button>}
      <div>채널헤더</div>
      <button onClick={() => handleSendMessage()} style={{ border: '1px solid black' }}>
        요청 보내기
      </button>
    </div>
  );
};

export default SendBirdChannelHeader;

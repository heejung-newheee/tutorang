import { Channel, ChannelList, SendBirdProvider, sendBirdSelectors, useSendbirdStateContext } from '@sendbird/uikit-react';
import React, { useEffect, useMemo, useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';
import { ClientUserMessage, EveryMessage, RenderChannelPreviewProps } from 'SendbirdUIKitGlobal';
import './style.css';
import { Link } from 'react-router-dom';

const APP_ID = import.meta.env.VITE_SANDBIRD_APP_ID;

const SendbirdChat = ({ channel_url, userId }: { channel_url: string; userId: string }) => {
  const [currentChannelUrl, setCurrentChannelUrl] = useState(channel_url);
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [queries] = useState({
    channelListQuery: {
      includeEmpty: true,
    },
  });
  // console.log(channel_url, userId);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div style={{ height: '500px', width: '100%', display: 'flex', position: 'relative' }}>
      <SendBirdProvider appId={APP_ID} userId={userId}>
        <>
          {!(isMobile && isOpen) ? (
            <ChannelList
              renderHeader={() => <h1 style={{ width: '300px' }}>Chat Header</h1>}
              onChannelSelect={(channel) => {
                if (channel?.url) {
                  setCurrentChannelUrl(channel.url);
                  setOpen(true);
                  // console.log(channel?.url);
                }
              }}
              disableAutoSelect={true}
              queries={queries}
              renderChannelPreview={({ channel, onLeaveChannel }: RenderChannelPreviewProps) => {
                return <CustomizedChannelListPreviewItem userId={userId} channel={channel} onLeaveChannel={onLeaveChannel} currentChannelUrl={currentChannelUrl} setCurrentChannelUrl={setCurrentChannelUrl} />;
              }}
            />
          ) : null}
          {!(isMobile && !isOpen) ? (
            <Channel
              channelUrl={currentChannelUrl}
              renderChannelHeader={() => (
                <CustomChannelHeader
                  channelUrl={currentChannelUrl}
                  userId={userId}
                  onClose={
                    isMobile
                      ? function () {
                          setOpen(false);
                        }
                      : null
                  }
                />
              )}
              onChatHeaderActionClick={(event) => console.log(event)}
              // renderUserProfile={(user) => {
              //   console.log(user);
              //   return <div>abcdef</div>;
              // }}
              // disableUserProfile={true}
              renderMessage={(props) => {
                if (!props.message.customType) return null;
                if (props.message.customType === 'request') {
                  const message = props.message as ClientUserMessage;
                  const { nickname } = message.sender;
                  return (
                    <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#ffc1b0' }}>
                      {nickname}님으로 부터 튜터링 요청을 받았습니다.
                      <Link to={'/mypage'} style={{ fontWeight: '700' }}>
                        마이페이지에서 확인하기
                      </Link>
                    </div>
                  );
                }
              }}
            />
          ) : null}
        </>
      </SendBirdProvider>
    </div>
  );
};

export default SendbirdChat;

const CustomizedChannelListPreviewItem = (props) => {
  const { userId, channel, onLeaveChannel, currentChannelUrl, setCurrentChannelUrl } = props;

  const { name: channelName } = channel;
  const { lastMessage } = channel;

  const [openLeaveChannel, setOpenLeaveChannel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isCurrentChannel = useMemo(() => {
    return channel.url === currentChannelUrl;
  }, [currentChannelUrl, channel.url]);

  const { members } = channel;
  const membersExcludingMe = members.filter((member) => member.userId !== userId);

  const [firstMember] = membersExcludingMe;

  const slicedMessage = lastMessage ? (lastMessage.messageType === 'admin' || lastMessage.messageType === 'user') && (lastMessage.message.length < 10 ? lastMessage.message : lastMessage.message.slice(0, 10) + '...') : '';
  const containerStyle = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: isCurrentChannel ? '#ffdfdf' : '#fff',
  };
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>{firstMember && firstMember.nickname}</h3>
          <p style={{ color: '#727272', height: '20px', whiteSpace: 'nowrap' }}>{slicedMessage}</p>
        </div>
        <div>
          <img src={firstMember?.profileUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
};

type HeaderType = {
  channelUrl: string;
  userId: string;
  onClose: (() => void) | null;
};

const CustomChannelHeader = ({ channelUrl, userId, onClose }: HeaderType) => {
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
      .onPending((pendingMessage) => {
        alert('Message sent: pending');
      })
      .onSucceeded((message) => {
        alert('Message sent: success');
      })
      .onFailed((error) => {
        alert(error);
      });
  };
  return (
    <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      {typeof onClose === 'function' && <button onClick={() => onClose()}>뒤로 가기</button>}
      <button onClick={() => handleSendMessage()} style={{ border: '1px solid black' }}>
        요청 보내기
      </button>
    </div>
  );
};

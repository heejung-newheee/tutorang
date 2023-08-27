import { Channel, ChannelList, SendBirdProvider } from '@sendbird/uikit-react';
import { useEffect, useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';
import { RenderChannelPreviewProps } from 'SendbirdUIKitGlobal';
import './sendBirdGlobalStyle.css';
import SendBirdChannelHeader from './modules/SendBirdChannelHeader';
import SendBirdChannelListPreviewItem from './modules/SendBirdChannelListPreviewItem';
import SendBirdRenderMessage from './modules/SendBirdRenderMessage';
import SendBirdChannelListHeader from './modules/SendBirdChannelListHeader';

const APP_ID = import.meta.env.VITE_SANDBIRD_APP_ID;

type SendBirdChatTypes = {
  channel_url: string;
  userId: string;
};

const SendBirdChat = ({ channel_url, userId }: SendBirdChatTypes) => {
  const [currentChannelUrl, setCurrentChannelUrl] = useState(channel_url);
  const [isOpen, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [queries] = useState({
    channelListQuery: {
      includeEmpty: true,
    },
  });
  // console.log(channel_url, userId);

  const handleCloseChannel = () => {
    setOpen(false);
    setCurrentChannelUrl('');
  };

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
              renderHeader={() => <SendBirdChannelListHeader />}
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
                return <SendBirdChannelListPreviewItem userId={userId} channel={channel} onLeaveChannel={onLeaveChannel} currentChannelUrl={currentChannelUrl} setCurrentChannelUrl={setCurrentChannelUrl} />;
              }}
            />
          ) : null}
          {!(isMobile && !isOpen) ? (
            <Channel
              channelUrl={currentChannelUrl}
              renderChannelHeader={() => <SendBirdChannelHeader channelUrl={currentChannelUrl} userId={userId} onClose={isMobile ? () => handleCloseChannel() : null} />}
              onChatHeaderActionClick={(event) => console.log(event)}
              renderMessage={(props) => <SendBirdRenderMessage {...props} />}
            />
          ) : null}
        </>
      </SendBirdProvider>
    </div>
  );
};

export default SendBirdChat;

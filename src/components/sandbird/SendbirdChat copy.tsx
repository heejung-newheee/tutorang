import { Channel, ChannelList, SendBirdProvider } from '@sendbird/uikit-react';
import React, { useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';

const APP_ID = import.meta.env.VITE_SANDBIRD_APP_ID;

const SendbirdChat = ({ channel_url, userId }: { channel_url: string; userId: string }) => {
  const [currentChannelUrl, setCurrentChannelUrl] = useState(channel_url);
  const [queries] = useState({
    channelListQuery: {
      includeEmpty: true,
    },
  });
  console.log(channel_url, userId);
  return (
    <div style={{ height: '500px', width: '600px', display: 'flex' }}>
      <SendBirdProvider appId={APP_ID} userId={userId}>
        <>
          <ChannelList
            // renderHeader={() => <div>My Header</div>}
            onChannelSelect={(channel) => {
              if (channel?.url) {
                setCurrentChannelUrl(channel.url);
                console.log(channel?.url);
              }
            }}
            disableAutoSelect={true}
            queries={queries}
          />
          <Channel channelUrl={currentChannelUrl} />
        </>
      </SendBirdProvider>
    </div>
  );
};

export default SendbirdChat;

import { RenderChannelPreviewProps } from 'SendbirdUIKitGlobal';
import { useState, useMemo } from 'react';

type ItemProps = {
  userId: string;
  currentChannelUrl: string;
  setCurrentChannelUrl: React.Dispatch<React.SetStateAction<string>>;
} & RenderChannelPreviewProps;

const SendBirdChannelListPreviewItem = (props: ItemProps) => {
  const { userId, channel, currentChannelUrl } = props;
  console.log('channel', channel);
  const { lastMessage } = channel;

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

export default SendBirdChannelListPreviewItem;

import { ClientUserMessage, RenderMessageProps } from 'SendbirdUIKitGlobal';
import { Link } from 'react-router-dom';

const SendBirdRenderMessage = (props: RenderMessageProps) => {
  if (!props.message.customType) return null;
  if (props.message.customType === 'request') {
    const message = props.message as ClientUserMessage;
    const { nickname } = message.sender;
    return (
      <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#ffc1b0', margin: '6px' }}>
        {nickname}님으로 부터 튜터링 요청을 받았습니다.
        <Link to={'/mypage'} style={{ fontWeight: '700' }}>
          마이페이지에서 확인하기
        </Link>
      </div>
    );
  }
  if (['accept', 'reject'].includes(props.message.customType)) {
    const message = props.message as ClientUserMessage;
    const { nickname } = message.sender;
    return (
      <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: props.message.customType === 'accept' ? '#003ce2' : '#b10101', color: '#ffffff', margin: '6px' }}>
        {nickname}님이 튜터링 요청을 {props.message.customType === 'accept' ? '수락' : '거절'}하였습니다.
        <Link to={'/mypage'} style={{ fontWeight: '700' }}>
          마이페이지에서 확인하기
        </Link>
      </div>
    );
  }
};

export default SendBirdRenderMessage;

import { useDispatch, useSelector } from 'react-redux';
import YouTube, { YouTubeProps } from 'react-youtube';
import { styled } from 'styled-components';
import { close } from '../../../assets';
import { Container } from '../../../components/review/reviewForm/ReviewForm.styled';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
const opts: YouTubeProps['opts'] = {
  height: '390',
  width: '640',
  playerVars: {
    fs: 1,
    controls: 0,
    playsinline: 0,
    enablejsapi: 0,
    modestbranding: 1,
    disablekb: 1,
    autohide: 1,
    autoplay: 0,
    loop: 0,
    volume: 0,
    iv_load_policy: 3,
    origin: window.location.origin,
    widget_referrer: window.location.href,
  },
};

const YoutubeModal = () => {
  const dispatch = useDispatch();
  const { targetId: id } = useSelector((state: RootState) => state.modal);
  if (!id) return;
  const handleClose = () => {
    dispatch(closeModal());
  };
  const onPlayerReady: YouTubeProps['onReady'] = (e) => {
    e.target.pauseVideo();
  };

  return (
    <Container>
      <div>
        <CloseBtn onClick={handleClose}>
          <img src={close} alt="close button" />
        </CloseBtn>
        <YouTube videoId={id as string} opts={opts} onReady={onPlayerReady} />
      </div>
    </Container>
  );
};

export default YoutubeModal;
const CloseBtn = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #ffffff7f;
  padding: 5px;
  margin-bottom: 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  img {
    height: 100%;
  }
`;

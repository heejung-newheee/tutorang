import { Container } from '../Form/reviewForm/ReviewForm.styled';
import YouTube, { YouTubeProps } from 'react-youtube';
import { closeModal } from '../../redux/modules';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
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
      <button onClick={handleClose}>닫기</button>
      <YouTube videoId={id as string} opts={opts} onReady={onPlayerReady} />
    </Container>
  );
};

export default YoutubeModal;

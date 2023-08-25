import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule, SendbirdGroupChat } from '@sendbird/chat/groupChannel';
const appId = import.meta.env.VITE_SANDBIRD_APP_ID;

const sendbird = SendbirdChat.init({
  appId: appId,
  modules: [new GroupChannelModule()],
}) as SendbirdGroupChat;

export default sendbird;

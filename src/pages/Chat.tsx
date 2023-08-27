import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from '../supabase';
import SendbirdChat from '../components/sandbird/SendbirdChat';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const channel_url = searchParams.get('channel_url');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (!session) return <div>Need Login</div>;
  return <SendbirdChat channel_url={channel_url || ''} userId={session?.user.id} />;
};

export default Chat;

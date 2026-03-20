import { getCookie } from '@/utils/cookie-handler';
import { redirect } from 'next/navigation';

const MePage = async () => {
  const token = await getCookie('token');
  if (token) {
    redirect('/admin');
  }
  redirect('/auth');
};

export default MePage;

import { getUserInfo } from '@/services/users';

export default async function AuthLoader() {
  const res = await getUserInfo();
  if (res && res.resume) {
    const { resume } = res;
    if (resume && resume._id) {
      return resume;
    }
  }
  return {};
}

import { getUserInfo } from '@/services/users';

export default async function AuthLoader() {
  const { resume } = await getUserInfo();
  if (resume && resume._id) {
    return resume;
  } else {
    return {};
  }
}

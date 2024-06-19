import { add } from '@services/visits';
import md5 from 'md5';

const getFingerPrint = async () => {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = md5(Math.random().toString(36));
    localStorage.setItem('visitorId', visitorId);
  }
  add({ visitorId });
};
getFingerPrint();

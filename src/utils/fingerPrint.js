import fpPromise from '@fingerprintjs/fingerprintjs';
import { add } from '@services/visits';

const getFingerPrint = async () => {
  const fp = await fpPromise.load();
  const result = await fp.get();
  add({ visitorId: result.visitorId });
};
getFingerPrint();

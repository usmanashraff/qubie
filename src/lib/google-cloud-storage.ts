import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(process.cwd(), 'src/google/qubie-450415-10d171618992.json'),
  projectId: 'qubie-450415',
});

const bucket = storage.bucket('qubie');

export { storage, bucket };
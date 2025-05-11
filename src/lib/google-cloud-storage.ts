import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME || 'qubie');

export { storage, bucket };
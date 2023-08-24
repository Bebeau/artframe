import config from '../config/config.js';
import { GetObjectCommand, S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let client = new S3Client({
  region: 'us-west-2',
  credentials: {
    accessKeyId: config.aws.access_key,
    secretAccessKey: config.aws.secret_key,
  },
  SSECustomerAlgorithm: 'AES256',
});

class ArtworkUtils {
  static async getRandomKeyFromBucketList() {
    const list = new ListObjectsCommand({
      Bucket: config.aws.bucket
    });
    const response = await client.send(list);
    const length = response.Contents.length;
    const random =  Math.floor(Math.random() * (length - 1 + 1) + 1);
    const file = response.Contents[random].Key;
    return file;
  }
	static async getS3File() {
    const command = new GetObjectCommand({
      Bucket: config.aws.bucket,
			Key: await ArtworkUtils.getRandomKeyFromBucketList()
    });
    
		try {
      const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 });
      return signedUrl;
    } catch (err) {
      console.error(err);
      return err;
    }
	}
}

export default ArtworkUtils;
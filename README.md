## Digital Art Frame
I created this app as a DIY to run on a [Raspberry Pi](https://www.raspberrypi.com/) to turn our TV into a digital art frame.

Using AWS credentials, the app pulls a random image from an Amazon AWS S3 bucket every 12 hours to display. Whenever the selection function is triggered, it pulls a list of items in the bucket and randomly selects the item from there. Meaning, you are able to seamlessly add/remove images to the S3 bucket without interrupting the selection.

### Setup
Clone this repo and create a file `config/config.js`. Add the AWS credentials to the file.

```
var config = {
  aws: {
    bucket: NAME_OF_S3_BUCKET,
    access_key: AWS_ACCESS_KEY_GOES_HERE,
    secret_key: AWS_SECRET_KEY_GOES_HERE
  }
};

export default config;
```

If you are not familiar with AWS, you need to create a user from the Identity and Access Management (IAM) screen and [create a policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html). The created user must have access to S3 Object Lambda to pull the images from the bucket.
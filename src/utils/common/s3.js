const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { ServerConfig } = require("../../config");
const { AWS_REGION, AWS_ACCESS_ID, AWS_SECRET_KEY, BUCKET_NAME } = ServerConfig;

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_ID,
        secretAccessKey: AWS_SECRET_KEY,
    },
});

const uploadImagebaseToS3 = async (base64, keyName) => {
    // Decode the base64 data into a buffer
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const type = base64.split(";")[0].split("/")[1];

    await s3Client.send(
        new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: keyName,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        })
    );
    return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${keyName}`;
};

const deleteImageFromS3 = async (keyName) => {
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: keyName,
        })
    );
};

module.exports = { uploadImagebaseToS3, deleteImageFromS3 };

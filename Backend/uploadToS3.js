const s3 = require('./awsConfig');

const uploadFile = (file, callback) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    s3.upload(params, (error, data) => {
        if (error) {
            console.error('Error uploading file:', error);
            return callback(error, null);
        }
        console.log('File uploaded successfully:', data);
        callback(null, data.Location);
    });
};

module.exports = uploadFile;

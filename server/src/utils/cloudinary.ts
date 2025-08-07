import cloudinary from "../config/cloudinary.config.js";

const uploadToCloudinary = (fileBuffer: Buffer, fileName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: fileName, folder: "moviePosters" },
        (err, result) => {
          if (err || !result) {
            return reject(err);
          }

          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

export default uploadToCloudinary;

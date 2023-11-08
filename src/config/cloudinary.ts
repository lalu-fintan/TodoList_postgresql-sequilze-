import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: "danz8ugpr",
  api_key: "624757829732576",
  api_secret: "NFgeEY54D0irV_uTQXzmtPmSmaw",
});

export default cloudinary;

// export const cloudinaryUploadImg = async (fileToUploads: any) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(fileToUploads, (result: any) => {
//       resolve(
//         {
//           url: result.secure_url,
//           asset_id: result.asset_id,
//           public_id: result.public_id,
//         }
//         // {
//         //   resource_type: "auto",
//         // }
//       );
//     });
//   });
// };

export const uploadImage = async (image: any, folder: string) => {
  const images = await cloudinary.uploader.upload(image, {
    folder: folder,
  });
  console.log(images.secure_url);
  return images;
};

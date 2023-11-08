"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
require("dotenv/config");
cloudinary_1.v2.config({
    cloud_name: "danz8ugpr",
    api_key: "624757829732576",
    api_secret: "NFgeEY54D0irV_uTQXzmtPmSmaw",
});
exports.default = cloudinary_1.v2;
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
const uploadImage = (image, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield cloudinary_1.v2.uploader.upload(image, {
        folder: folder,
    });
    console.log(images.secure_url);
    return images;
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=cloudinary.js.map
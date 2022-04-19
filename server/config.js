const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        MONGODB_URL: process.env.MONGODB_URL,
        ZALO_APP_ID: process.env.ZALO_APP_ID,
        MINI_APP_ID: process.env.MINI_APP_ID,
        OA_TOKEN: process.env.OA_TOKEN,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    production: {
        MONGODB_URL: process.env.MONGODB_URL,
        ZALO_APP_ID: process.env.ZALO_APP_ID,
        MINI_APP_ID: process.env.MINI_APP_ID,
        OA_TOKEN: process.env.OA_TOKEN,
        CLOUD_NAME: process.env.CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
}

module.exports = config[env];
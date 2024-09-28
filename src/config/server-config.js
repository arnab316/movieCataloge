import dotenv from 'dotenv'

dotenv.config()
export const config= {
    PORT: process.env.PORT || 3000,
    REDIS_HOST: process.env.REDIS_HOST ,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USER: process.env.REDIS_USER ,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_URL: process.env.REDIS_URL,
};
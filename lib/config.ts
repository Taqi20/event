import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiry: process.env.JWT_EXPIRE_TIME || '7d',
    saltRounds: Number(process.env.SALT_ROUND) || 10,
    frontEndURL: process.env.FRONTEND_URL || 'http://localhost:3000',
    dbUrl: process.env.DATABASE_URL!,
};

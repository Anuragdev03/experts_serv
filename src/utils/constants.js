import dontenv from "dotenv";
dontenv.config()

export const envVar = {
    dbUrl: process.env.POSTGRES_URL,
    port: process.env.PORT,
    pgUser: process.env.POSTGRES_USER,
    pgPassword: process.env.POSTGRES_PASSWORD,
    pgdb: process.env.POSTGRES_DATABASE,
    pgHost: process.env.POSTGRES_HOST,
    pgPort: process.env.POSTGRES_PORT,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    mailjetPublic: process.env.MAILJET_APIKEY,
    mailjetPrivate: process.env.MAILJET_SECRETKEY
}
const{
    PORT,
    Env,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default{
    port: PORT,
    host:DB_HOST,
    database:DB_NAME,
    user: DB_USER,
    passwrd: DB_PASSWORD,
    pepper : BCRYPT_PASSWORD,
    salt:SALT_ROUNDS,
    TOKEN_SECRET: TOKEN_SECRET,

}
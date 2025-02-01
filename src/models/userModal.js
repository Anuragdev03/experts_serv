import { qb, query } from "../plugins/db.js";
import { hashPasswordInWorker } from "../utils/utilities.js";


export async function createNewUsers(arg) {
    const {
        name,
        user_name,
        email,
        password,
        mobile_number,
        role,
        created_at
    } = arg;
    const encryptedPassword = await hashPasswordInWorker(password, 10)
    const qText = `INSERT INTO users(name, user_name, email, password, mobile_number, role, created_at) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING email, id, name, user_name`;
    const values = [name, user_name, email, encryptedPassword, mobile_number, role, created_at]

    const res = await query(qText, values);
    return res
}

export async function checkIfUserExist(user_name, email) {
    const result = await qb.query("SELECT 1 FROM users WHERE email = $1", [email]);
    const isUserNameExists = await qb.query("SELECT 1 FROM users WHERE user_name = $1", [user_name]);
    return {
        email: result?.rowCount > 0,
        user_name: isUserNameExists?.rowCount > 0
    }
}

export async function isEmailExists(email) {
    const result = await qb.query("SELECT * FROM users WHERE email = $1", [email]);
    return {exists: result?.rowCount > 0, data: result?.rows}
}

export async function isMobileNumberExists(mobile) {
    const result = await qb.query("SELECT * FROM users WHERE mobile_number = $1", [mobile]);
    return {exists: result?.rowCount > 0, data: result?.rows}
}

export async function updateExpertPassword(password, email) {
    console.log(password)
    const sqlQuery = `UPDATE users SET password = $1, updated_at = $2 WHERE email = $3 RETURNING email`;

    const res = await query(sqlQuery, [password, new Date(), email]);

    return res;
}
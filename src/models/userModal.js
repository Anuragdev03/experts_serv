import { qb, query } from "../plugins/db.js";
import { checkTruthyValues } from "../utils/areAllTruthy.js";
import { hashPasswordInWorker } from "../utils/utilities.js";


export async function createNewUsers(arg) {
    const {
        name,
        user_name,
        email,
        password,
        address,
        city,
        state,
        country,
        pincode,
        lat,
        lng,
        job_ids,
        mobile_number,
        whatsapp_number,
        role,
        created_at
    } = arg;
    const encryptedPassword = await hashPasswordInWorker(password, 10)
    const qText = `INSERT INTO users(name, user_name, email, password, address, city, state, country, pincode, lat, lng, job_ids, mobile_number, whatsapp_number, role, created_at) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING email, id, name, user_name`;
    const values = [name, user_name, email, encryptedPassword, address, city, state, country, pincode, lat, lng, job_ids, mobile_number, whatsapp_number, role, created_at]

    const res = await query(qText, values);
    return res
}

export async function checkIfUserExist(user_name, email) {
    const result = await qb.query("SELECT 1 FROM users WHERE email = $1", [email]);
    const isUserNameEsixts = await qb.query("SELECT 1 FROM users WHERE user_name = $1", [user_name]);
    return {
        email: result?.rowCount > 0,
        user_name: isUserNameEsixts?.rowCount > 0
    }
}

export async function isEmailExists(email) {
    const result = await qb.query("SELECT * FROM users WHERE email = $1", [email]);
    return {exists: result?.rowCount > 0, data: result?.rows}
}
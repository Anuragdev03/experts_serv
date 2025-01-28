import { query } from "../plugins/db.js";

export async function storeOtp(uid, otp, created_at, expiry_time) {
    const sqlQuery = `INSERT INTO otps(uid, otp, created_at, expiry_time) VALUES($1, $2, $3, $4)`;
    
    const res = await query(sqlQuery, [uid, otp, created_at, expiry_time]);

    return res;
}

export async function checkOtpExists(uid) {
    const sqlQuery = `SELECT * FROM otps WHERE uid = $1`;

    const res = await query(sqlQuery, [uid]);

    return res;
}

export async function updateOtp(otp, created_at, expiry_time, uid) {
    const sqlQuery = `UPDATE otps SET otp = $1, created_at = $2, expiry_time = $3 WHERE uid = $4`;
    
    const res = await query(sqlQuery, [otp, created_at, expiry_time, uid]);

    return res;
}

export async function getOtpData(uid) {
    const sqlQuery = `SELECT * FROM otps WHERE uid = $1`;
    
    const res = await query(sqlQuery, [uid]);

    return res;
}

export async function deleteOtpData(id) {
    const sqlQuery = `DELETE FROM otps WHERE id = $1`;

    const res = await query(sqlQuery, [id]);

    return res;
}
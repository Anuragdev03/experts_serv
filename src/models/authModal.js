import { query } from "../plugins/db.js";


export async function storeRefreshToken(token, id) {


    const now = new Date()
    // const qText = `INSERT INTO auth(uid, refresh_token, created_at) VALUES($1, $2, $3)`;
    const qText = `INSERT INTO auth(uid, refresh_token, created_at) 
    VALUES($1, $2, $3) 
    ON CONFLICT (uid)
    DO UPDATE
        SET refresh_token = $2
    `
    ;
    const qText2 = `UPDATE auth SET updated_at = $1 WHERE uid = $2`;
    const value2 = [now, id];
    const values = [id, token, now];

    const res = await query(qText, values);
    query(qText2, value2);
    return res;
}

export async function getRefreshTokenOfUser(uid) {
    const qText = `SELECT refresh_token FROM auth WHERE uid = $1`;
    const values = [uid];
    const res = await query(qText, values);
    return res;
}
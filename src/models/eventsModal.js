import { query } from "../plugins/db.js";


export async function createEventData(arg) {

    const sqlQuery = `INSERT INTO events(uid, title, start_date, end_date, description, link, all_day)
    VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`;
    const values = [arg?.uid, arg?.title, arg?.start_date, arg?.end_date, arg?.description, arg?.link, arg?.all_day];

    const res = await query(sqlQuery, values);
    return res;
}

export async function getEventList(uid, start, end) {
    const sqlQuery = `SELECT * FROM events WHERE uid = $1 AND start_date BETWEEN $2 AND $3`;
    const res = await query(sqlQuery, [uid, start, end]);

    return res
}
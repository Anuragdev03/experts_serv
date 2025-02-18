import { query } from "../plugins/db.js";

export async function addResponse(payload) {
    const sqlQuery = `INSERT INTO expert_response(uid, tracking_link, available_date, response_message, status, created_at)
    VALUES($1,$2,$3,$4,$5,$6) RETURNING id`;
    const values = [payload.uid, payload.tracking_link, payload.available_date, payload.response_message, payload.status, new Date()];

    const res = await query(sqlQuery, values);
    return res
}

export async function getExpertResponseByUrl(url) {
    const sqlQuery = `SELECT * FROM expert_response WHERE tracking_link = $1`;

    const res = await query(sqlQuery, [url]);
    return res;
}

export async function isValidExpertUrl(uid, url) {
    const sqlQuery = `SELECT id FROM expert_response WHERE uid = $1 AND tracking_link = $2`;
    const res = await query(sqlQuery, [uid, url]);
    return res;
}

export async function updateExpertRes(payload) {
    let sqlQuery = `UPDATE expert_response SET`
    let index = 1;
    let values = [];

    if(payload?.available_date) {
        sqlQuery += ` available_date = $${index},`;
        index++;
        values.push(payload?.available_date)
    }

    if(payload?.message) {
        sqlQuery += ` response_message = $${index},`;
        index++;
        values.push(payload?.message);
    }

    if(payload?.status) {
        sqlQuery += ` status = $${index},`;
        index++;
        values.push(payload?.status);
    }

    sqlQuery += ` updated_at = $${index}`;
    values.push(new Date());
    index ++;

    sqlQuery += ` WHERE tracking_link = $${index} RETURNING id`;
    values.push(payload.tracking_link);

    const res = await query(sqlQuery, values);
    return res;
}
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

export async function updateEvent(uid, payload) {
    let sqlQuery = `UPDATE events SET`
    let values = [];
    let index = 1;
    if(!payload?.id) return null;

    if(payload?.title) {
        sqlQuery += ` title = $${index},`;
        index++;
        values.push(payload.title)
    }
    if(payload?.start_date) {
        sqlQuery += ` start_date = $${index},`;
        index++;
        values.push(payload?.start_date)
    }
    if(payload?.end_date) {
        sqlQuery += ` end_date = $${index},`;
        index++;
        values.push(payload?.end_date);
    }
    if(payload?.description) {
        sqlQuery += ` description = $${index},`;
        index++;
        values.push(payload?.description);
    }
    if(payload?.link) {
        sqlQuery += ` link = $${index},`;
        index++;
        values.push(payload?.link);
    }

    sqlQuery += ` all_day = $${index}`;
    values.push(payload?.all_day);
    index++;

    sqlQuery += ` WHERE id = $${index}`;
    values.push(payload?.id);
    index++;

    sqlQuery += ` AND uid = $${index} RETURNING id`;
    values.push(uid);
    
    const res = await query(sqlQuery, values);
    return res
}

export async function deleteEvent(uid, eventId) {
    const sqlQuery = `DELETE FROM events WHERE uid = $1 AND id = $2 RETURNING id`;
    const res = await query(sqlQuery, [uid, eventId]);
    return res;
}
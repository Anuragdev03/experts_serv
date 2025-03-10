import { query } from "../plugins/db.js";


export async function sendNotification(uid, message) {
    const sqlQuery = `INSERT INTO notification(uid, message, created_at)
    VALUES($1, $2, $3)`;

    const res = await query(sqlQuery, [uid, message, new Date()]);

    return res
}

export async function getNotificationCount(uid) {
    const sqlQuery = `SELECT COUNT(*) FROM notification WHERE uid = $1 AND is_read IS false`;

    const res = await query(sqlQuery, [uid]);

    return res;
}

export async function getNotificationList(uid) {
    const sqlQuery = `SELECT * FROM notification WHERE uid = $1`;
    const res = await query(sqlQuery, [uid]);

    return res;
}

export async function maskAsRead(uid, id) {
    const sqlQuery = `UPDATE notification SET is_read = $1 WHERE uid = $2 AND id = $3`;
    const res = await query(sqlQuery, [true, uid, id]);
    return res;
}

export async function markAllAsRead(uid) {
    const sqlQuery = `UPDATE notification SET is_read = $1 WHERE uid = $2`;
    const res = await query(sqlQuery, [true, uid]);

    return res;
}
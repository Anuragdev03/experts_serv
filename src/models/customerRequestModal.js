import { query } from "../plugins/db.js";


export async function addCustomerRequest(data) {
    const sqlQuery = `INSERT INTO customer_request(uid, tracking_link, customer_name, customer_email, customer_phone, message, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING tracking_link`;
    const values = [data.uid, data.tracking_link, data.customer_name, data.customer_email, data.customer_phone, data.message, new Date()];

    const res = await query(sqlQuery, values);
    return res;
}

export async function requestCount(uid, status) {
    const sqlQuery = `SELECT COUNT(*) FROM customer_request WHERE uid = $1 AND status = $2`;
    const res = await query(sqlQuery, [uid, status]);
    return res;
}
import { query } from "../plugins/db.js";

export async function createTask(payload) {
    const sqlQuery = `INSERT INTO tasks(uid, title, description, due_date, priority, status, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const values = [payload?.uid, payload?.title, payload?.description, payload?.due_date, payload?.priority, payload?.status, new Date()];
    const res = await query(sqlQuery, values);

    return res;
}

export async function deleteTask(uid, taskId) {
    const sqlQuery = `DELETE FROM tasks WHERE uid = $1 AND id = $2 RETURNING id`;
    const res = await query(sqlQuery, [uid, taskId]);
    return res;
}

export async function updateTask(payload) {
    let sqlQuery = `UPDATE tasks SET`;
    let index = 1;
    let values = [];

    if(!payload.id) return;

    if(payload?.title) {
        sqlQuery += ` title = $${index},`;
        index++;
        values.push(payload.title)
    }

    if(payload?.description) {
        sqlQuery += ` description = $${index},`;
        index++;
        values.push(payload.description);
    }
    if(payload?.due_date) {
        sqlQuery += ` due_date = $${index},`;
        index++;
        values.push(payload?.due_date);
    }
    if(payload?.priority) {
        sqlQuery += ` priority = $${index},`;
        index++;
        values.push(payload?.priority);
    }
    if(payload?.status) {
        sqlQuery += ` status = $${index},`;
        index++;
        values.push(payload?.status);
    }
    sqlQuery += ` updated_at = $${index}`;
    index++;
    values.push(new Date());

    sqlQuery += ` WHERE uid = $${index}`;
    index++;
    values.push(payload?.uid);

    sqlQuery += ` AND id = $${index} RETURNING id`;
    index++;
    values.push(payload.id);

    const res = await query(sqlQuery, values);
    return res;
}
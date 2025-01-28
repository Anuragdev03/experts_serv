import { query } from "../plugins/db.js";

export async function getExpertList(sqlQuery, values) {
    const res = await query(sqlQuery, values);

    return res;
}
import { query } from "../plugins/db.js";


export async function getCountries(keyword) {
    const sqlQuery = `SELECT id, name FROM countries WHERE name ILIKE $1`;
    
    const res = await query(sqlQuery, [`%${keyword}%`]);

    return res;
}
import { query } from "../plugins/db.js"

export async function getJobsList(keyword) {
    let sqlQuery = `SELECT * FROM jobs WHERE deleted_at IS NULL`;
    if(keyword) {
        
    }
    let res;
    if(keyword) {
        sqlQuery += ` AND name ILIKE $1`;
        res = await query(sqlQuery, [`%${keyword}%`]); 
    } else {
        res = await query(sqlQuery);
    }
    return res;
}
import { query } from "../plugins/db.js";


export async function getCountries(keyword) {
    const sqlQuery = `SELECT id, name FROM countries WHERE name ILIKE $1`;
    
    const res = await query(sqlQuery, [`%${keyword}%`]);

    return res;
}

export async function getStates(countryId, state) {
    const sqlQuery =  `SELECT id, name FROM states WHERE country_id = $1 AND name ILIKE $2`;

    const res = await query(sqlQuery, [countryId, `%${state}%`]);

    return res;
}
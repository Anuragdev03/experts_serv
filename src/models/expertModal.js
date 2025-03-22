import { query } from "../plugins/db.js";
import cache from "../cache/cache.js";

export async function getExpertList(sqlQuery, values) {
    const cacheKey = JSON.stringify({ sqlQuery, values });
    const isDataInCache = cache.get(cacheKey);
    if(isDataInCache) {
        return isDataInCache;
    }
    const res = await query(sqlQuery, values);
    cache.set(cacheKey, res);
    return res;
}

export async function getTotalExpertsCount(sqlQuery, values) {
    const cacheKey = JSON.stringify({ sqlQuery, values });
    const isDataInCache = cache.get(cacheKey);
    if(isDataInCache) {
        return isDataInCache;
    }
    const res = await query(sqlQuery, values);
    cache.set(cacheKey, res);
    return res;
}

export async function getExpertDetails(id) {
    const sqlQuery = `SELECT u.*, STRING_AGG(j.name, ', ') AS job_names FROM users u  LEFT JOIN jobs j ON j.id = ANY(u.job_ids) WHERE u.id = $1 GROUP BY u.id`;
    const res = await query(sqlQuery, [id]);
    return res
}

export async function updateExpertProfileStatus(uid, status) {
    const sqlQuery = `UPDATE users SET show_profile = $1 WHERE id = $2 RETURNING show_profile`;
    const res = await query(sqlQuery, [status, uid]);
    return res;
}

export async function updateExpertPassword(uid, password) {
    const sqlQuery = `UPDATE users SET password = $1 WHERE id = $2 RETURNING id`;
    const res = await query(sqlQuery, [password, uid]);
    return res;
}
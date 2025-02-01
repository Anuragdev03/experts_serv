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
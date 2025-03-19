import { query } from "../plugins/db.js";


export async function createPublicProfile(data) {
    const sqlQuery = `INSERT INTO public_profile(uid, profile_url, tags, website, description, created_at)
    VALUES($1,$2,$3,$4,$5,$6)`;
    const values = [data.uid, data?.profile_url, data?.tags, data?.website, data?.description, data?.created_at]
    const res = await query(sqlQuery, values);
    return res;
}

export async function checkProfileDataExists(id) {
    const sqlQuery = `SELECT EXISTS(SELECT 1 FROM public_profile WHERE uid = $1);`;
    const res = await query(sqlQuery, [id]);

    return res
}

export async function updatePublicProfile(data) {
    let sqlQuery = `UPDATE public_profile SET`;
    let index = 1;
    const values = [];
    if(data?.tags) {
        sqlQuery += ` tags = $${index},`;
        index++;
        values.push(data?.tags);
    }
    if(data?.website) {
        sqlQuery += ` website = $${index},`;
        index++;
        values.push(data?.website);
    }
    if(data?.description) {
        sqlQuery += ` description = $${index},`;
        index++;
        values.push(data?.description);
    }
    sqlQuery += ` updated_at = $${index}`;
    values.push(new Date());
    index++;

    if(data?.uid) {
        sqlQuery += ` WHERE uid = $${index} RETURNING uid`;
        values.push(data.uid)
    }

    const res = await query(sqlQuery, values);
    return res;
}

export async function getPublicProfileDetails(id) {
    const sqlQuery = `SELECT * FROM public_profile WHERE uid = $1 AND deleted_at IS NULL`;

    const res =await query(sqlQuery, [id]);
    return res;
}
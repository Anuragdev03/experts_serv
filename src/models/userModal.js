import { qb, query } from "../plugins/db.js";
import { hashPasswordInWorker } from "../utils/utilities.js";


export async function createNewUsers(arg) {
    const {
        name,
        user_name,
        email,
        password,
        mobile_number,
        role,
        created_at
    } = arg;
    const encryptedPassword = await hashPasswordInWorker(password, 10)
    const qText = `INSERT INTO users(name, user_name, email, password, mobile_number, role, created_at) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING email, id, name, user_name`;
    const values = [name, user_name, email, encryptedPassword, mobile_number, role, created_at]

    const res = await query(qText, values);
    return res
}

export async function checkIfUserExist(user_name, email) {
    const result = await qb.query("SELECT 1 FROM users WHERE email = $1", [email]);
    const isUserNameExists = await qb.query("SELECT 1 FROM users WHERE user_name = $1", [user_name]);
    return {
        email: result?.rowCount > 0,
        user_name: isUserNameExists?.rowCount > 0
    }
}

export async function isEmailExists(email) {
    const result = await qb.query("SELECT * FROM users WHERE email = $1", [email]);
    return {exists: result?.rowCount > 0, data: result?.rows}
}

export async function isMobileNumberExists(mobile) {
    const result = await qb.query("SELECT * FROM users WHERE mobile_number = $1", [mobile]);
    return {exists: result?.rowCount > 0, data: result?.rows}
}

export async function updateExpertPassword(password, email) {
    const sqlQuery = `UPDATE users SET password = $1, updated_at = $2 WHERE email = $3 RETURNING email`;

    const res = await query(sqlQuery, [password, new Date(), email]);

    return res;
}


export async function updateUser(userObj) {
    try {
        let sqlQuery = `UPDATE users SET`;
        let index = 1;
        const values = [];

        if(userObj?.name) {
            sqlQuery += ` name = $${index},`;
            index++;
            values.push(userObj?.name);
        }
        if(userObj?.address) {
            sqlQuery += ` address = $${index},`;
            index++;
            values.push(userObj?.address);
        }
        if(userObj?.city) {
            sqlQuery += ` city = $${index},`;
            index++
            values.push(userObj?.city);
        }
        if(userObj?.state) {
            sqlQuery += ` state = $${index},`;
            index++;
            values.push(userObj?.state);
        }
        if(userObj?.country) {
            sqlQuery += ` country = $${index},`;
            index++;
            values.push(userObj?.country);
        }
        if(userObj?.pincode) {
            sqlQuery += ` pincode = $${index},`;
            index++;
            values.push(userObj?.pincode);
        }
        if(userObj?.lat) {
            sqlQuery += ` lat = $${index},`;
            index++;
            values.push(userObj?.lat);
        }
        if(userObj?.lng) {
            sqlQuery += ` lng = $${index},`;
            index++
            values.push(userObj?.lng);
        }
        if(userObj?.job_ids) {
            sqlQuery += ` job_ids = $${index},`;
            index++;
            values.push(userObj?.job_ids);
        }
        if(userObj?.whatsapp_number) {
            sqlQuery += ` whatsapp_number = $${index},`;
            index++;
            values.push(userObj?.whatsapp_number);
        }

        sqlQuery += ` updated_at = $${index}`;
        values.push(new Date());
        index++;

        if(userObj?.id) {
            sqlQuery += ` WHERE id = $${index} RETURNING id`;
            values.push(userObj?.id)
        }

        const res = await query(sqlQuery, values);
        return res

    } catch(err) {
        console.log(err)
    }
}

export async function getUserIdByUserName(userName) {
    const sqlQuery = `SELECT id FROM users WHERE user_name = $1`;
    const res = await query(sqlQuery, [userName]);

    return res;
}

export async function deleteExpertAccount(uid) {
    const sqlQuery = `DELETE from users WHERE id = $1 RETURNING id`;
    const res = await query(sqlQuery, [uid]);
    return res;
}

export async function getPasswordByUid(uid) {
    const sqlQuery = `SELECT password FROM users WHERE id = $1`;
    const res = await query(sqlQuery, [uid]);
    return res;
}
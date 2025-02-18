import { query } from "../../plugins/db.js";


export async function getCustomerList(req, reply) {
    const uid = req.userId;
    const params = req.query;
    const page = params?.page;
    const limit = 15;
    const offset = (page - 1) * limit;
    const sort = params.sort || "ASC";
    const status = params.status;
    try {
        let index = 1;
        let sqlQuery = `SELECT * FROM customer_request WHERE uid =$${index}`;
        index++;
        let values = [uid];

        if(status) {
            sqlQuery += ` AND status = $${index}`;
            index++;
            values.push(status);
        }

        sqlQuery += ` ORDER BY created_at ${sort} LIMIT $${index}`;
        values.push(limit)
        index++;
        if (offset) {
            sqlQuery += ` OFFSET $${index}`;
            values.push(offset)
        }

        let countQuery = `SELECT COUNT(*) FROM customer_request WHERE uid = $1`;
        let countValues = [uid];
        if(status) {
            countQuery += ` AND status = $2`;
            countValues.push(status)
        }
        const countRes = await query(countQuery, countValues);
        const res = await query(sqlQuery, values);
        if (res.rowCount > 0) {
            return reply.code(200).send({ message: "Success", data: res.rows, totalCount: countRes.rows[0].count })
        } else {
            return reply.code(400).send({ message: "No data found" });
        }
    } catch (err) {
        console.log(err)
        return reply.code(400).send({ message: "Something went wrong" })
    }
}
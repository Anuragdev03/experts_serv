import { query } from "../../plugins/db.js";


export async function tasklistController(req, reply) {
    console.log(req.query)
    const uid = req.userId;
    const params = req.query
    try {
        const page = params?.page;
        const limit = 15;
        const offset = (page - 1) * limit;
        const sort = params.sort || "ASC";
        const status = params.status;
        const priority = params.priority;

        let index = 1;
        let values = [];
        let sqlQuery = `SELECT * FROM tasks WHERE uid = $${index}`;
        index++;
        values.push(uid);

        if (status) {
            sqlQuery += ` AND status = $${index}`;
            index++;
            values.push(status);
        }

        if(priority) {
            sqlQuery +=` AND priority = $${index}`;
            index++;
            values.push(priority);
        }
        // ================ To get count =================
        let countQuery = `SELECT COUNT(*) AS total_count FROM (${sqlQuery}) as subquery;`;
        const countRes = await query(countQuery, values);
        // ================ To get count =================

        sqlQuery += ` ORDER BY created_at ${sort} LIMIT $${index}`;
        values.push(limit);
        index++;
        if (offset) {
            sqlQuery += ` OFFSET $${index}`;
            values.push(offset)
        }

        const res = await query(sqlQuery, values);
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", data: res?.rows, totalCount: countRes.rows[0]?.total_count})
        } else {
            return reply.code(400).send({ message: "No data found" })
        }
    } catch (err) {
        console.log(err)
        return reply.code(400).send({ message: "Something went wrong" })
    }
}
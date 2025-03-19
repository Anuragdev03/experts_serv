import { getNotificationList } from "../../models/notificationModal.js";
import { query } from "../../plugins/db.js";


export async function notificationListController(req, reply) {
    const uid = req.userId;
    const params = req.query

    try {

        const page = params?.page;
        const limit = 15;
        const offset = (page - 1) * limit;
        const sort = params.sort || "DESC";

        let index = 1;
        let values = []
        let sqlQuery =`SELECT * FROM notification WHERE uid = $${index}`;
        values.push(uid);
        index++;

        sqlQuery += ` ORDER BY created_at ${sort} LIMIT $${index}`;
        values.push(limit)
        index++;

        if(offset) {
            sqlQuery += ` OFFSET $${index}`
            values.push(offset);
        }

        const res = await query(sqlQuery, values);
        const countQuery = `SELECT COUNT(*) FROM notification WHERE uid = $1`;

        const countRes = await query(countQuery, [uid]);
        if (res?.rowCount) {
            return reply.code(200).send({ message: "Success", data: res.rows, totalCount: countRes.rows[0].count })
        } else {
            return reply.code(400).send({ message: "No Data Found" })
        }
    } catch (err) {
        return reply.code(400).send({ message: "Something went wrong" })
    }
}
import { query } from "../plugins/db.js";



export async function viewExpertProfileController(req, reply) {
    let url = req.query?.url;

    if (!url) return reply.code(400).send({ message: "Data not found" });
    try {

        let sqlQuery = `SELECT
                        p.website,
                        p.description,
                        u.user_name,
                        u.name,
                        u.city,
                        u.state,
                        u.country,
                        u.lat,
                        u.lng,
                        ARRAY_AGG(j.name) as job_names
                    FROM
                        public_profile p
                    JOIN users u ON u.id = p.uid
                    JOIN LATERAL(
                        SELECT j.id, j.name
                        FROM jobs j
                        WHERE j.id = ANY(u.job_ids)
                    ) j ON true
                    WHERE profile_url = $1
                    GROUP BY p.website, p.description, u.user_name, u.name, u.city, u.state, u.country, u.lat, u.lng;
                `

        const res = await query(sqlQuery, [url]);
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", data: res.rows[0]})
        } else {
            return reply.code(400).send({message: "No data found"})
        }
    } catch (err) {
        return reply.code(400).send({message: "Something went wrong please try again."})
    }
}
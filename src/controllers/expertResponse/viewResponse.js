import { getExpertResponseByUrl } from "../../models/expertResponse.js";


export async function viewExpertResponse(req, reply) {
    const query = req.query;
    try {
        if(!query.url) {
            return reply.code(400).send({message: "Something went wrong"})
        }

        const res = await getExpertResponseByUrl(query.url);
        console.log(res.rows[0]);
        if(res.rowCount) {
            return reply.code(200).send({message: "Success", data: res.rows[0]})
        } else {
            return reply.code(400).send({message: "No data found!"})
        }
    } catch(err) {
        console.log(err)
        return reply.code(400).send({message: "Something went wrong"})
    }
}
import { getPublicProfileDetails } from "../models/publicProfileModal.js";


export async function getPublicProfileController(req, reply) {
    const uid = req?.userId;
    try {
        const res = await getPublicProfileDetails(uid);
        if(res.rowCount < 1) {
            return reply.code(404).send({message: "No data found"})
        }
        const data = res.rows[0]
        let payload = {};
        if(data?.tags) {
            let tags = data.tags.toString();
            payload = {...payload, tags}
        }
        if(data?.description) {
            payload = {...payload, description: data?.description}
        }
        if(data?.website) {
            payload = {...payload, website: data.website}
        }
        if(data?.profile_url) {
            payload = {...payload, profile_url: data.profile_url}
        }
        return reply.code(200).send({message: "Success", data: payload})
    } catch(err) {
        console.log(err);
        return reply.code(400).send({message: "Something went wrong"});
    }
}
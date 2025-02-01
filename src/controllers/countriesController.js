import { getCountries } from "../models/locationModal.js";


export async function countriesController(req, reply) {
    
    const keyword = req?.params?.name;

    try {
        if(!keyword) {
            return reply.code(400).send({ message: "No Data found" })
        }

        const result = await getCountries(keyword);
        return reply.code(200).send({message: "Success", data: result?.rows})
    } catch(err) {
        reply.code(400).send({ message: "Something went wrong" })
    }
}
import { getCountries, getStates } from "../models/locationModal.js";


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

export async function statesController(req, reply) {
    const query = req.query;
    const countryId = req.query.countryId
    const state = req.query?.state;

    if(!countryId) {
        return reply.code(400).send({message: "Country id is required to fetch states"});
    }

    if(!state) {
        return reply.code(400).send({message: "State keyword is required"});
    }

    try {
        const result = await getStates(countryId, state);
        return reply.code(200).send({message: "Success", data: result?.rows})
    } catch(err) {
        return reply.code(400).send({ message: "Something went wrong"})
    }
}
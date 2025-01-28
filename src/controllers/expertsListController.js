import { getExpertList } from "../models/expertModal.js";


export async function expertsListController(req, reply) {
    // console.log(req.query)
    const query = req?.query;
    try {
        const page = query?.page;
        const limit = query?.limit;
        const offset = (page - 1) * limit;
        
        const city = query?.city;
        const state = query?.state;
        const country = query?.country;
        const keyword = query?.searchKey;
        const job_ids = query.job_ids?.split(",");

        // Query building
        let sqlQuery = `SELECT * FROM users WHERE 1=1`;
        let values = [];
        let index = 1;

        sqlQuery += ` AND role = $${index}`;
        values.push("expert")
        index++

        // To filter by city
        if(city) {
            sqlQuery += ` AND city = $${index}`;
            values.push(city)
            index++;
        }
        // To filter by state
        if(state) {
            sqlQuery += ` AND state = $${index}`;
            values.push(state);
            index++
        }
        // To filter by country
        if(country) {
            sqlQuery += ` AND country = $${index}`;
            values.push(country);
            index++;
        }
        // To filter by keyword
        if(keyword) {
            sqlQuery += ` AND name ILIKE $${index}`;
            values.push(`%${keyword}%`);
            index++;
        }
        // To filter by jobids
        if(job_ids) {
            sqlQuery += ` AND job_ids && $${index}::INTEGER[]`;
            values.push(job_ids);
            index++;
        }


        if(limit) {
            sqlQuery += ` ORDER BY id LIMIT $${index}`;
            values.push(limit);
            index++;
        }

        if(offset) {
            sqlQuery += ` OFFSET $${index}`;
            values.push(offset)
        }
        
        const result = await getExpertList(sqlQuery, values);
        console.log(result?.rows, "=====result ====");
    } catch(err) {
        console.log(err);
        reply.code(400).send({message: "something went wrong"})
    }

    reply.send({message: "Success"})
}
import { getExpertList } from "../models/expertModal.js";


export async function expertsListController(req, reply) {
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
        let sqlQuery = `SELECT u.*, STRING_AGG(j.name, ', ') AS job_names, COUNT(*) OVER() AS total_count FROM users u LEFT JOIN jobs j ON j.id = ANY(u.job_ids) WHERE 1=1`;

        let values = [];
        let index = 1;

        sqlQuery += ` AND u.role = $${index} AND u.deleted_at IS NULL`;
        values.push("expert")
        index++

        // To filter by city
        if(city) {
            sqlQuery += ` AND u.city = $${index}`; // If we declare the table name with key something like "user u" the we have to use the u in every other place like "u.city"
            values.push(city)
            index++;
        }
        // To filter by state
        if(state) {
            sqlQuery += ` AND u.state = $${index}`;
            values.push(state);
            index++
        }
        // To filter by country
        if(country) {
            sqlQuery += ` AND u.country = $${index}`;
            values.push(country);
            index++;
        }
        // To filter by keyword
        if(keyword) {
            sqlQuery += ` AND u.name ILIKE $${index}`;
            values.push(`%${keyword}%`);
            index++;
        }
        // To filter by jobids
        if(job_ids) {
            sqlQuery += ` AND u.job_ids && $${index}::INTEGER[]`;
            values.push(job_ids);
            index++;
        }

        sqlQuery += ` GROUP BY u.id`; // Group by Offset order by should be after the WHERE


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
        console.log(result.rows)
        const totalCount = result.rows[0]?.total_count ? result.rows[0]?.total_count : result.rowCount;
        reply.send({message: "Success", data: result?.rows, currentPage: page, totalCount, limit});

    } catch(err) {
        console.log(err);
        reply.code(400).send({message: "something went wrong"})
    }

}
import { getExpertList, getTotalExpertsCount } from "../models/expertModal.js";


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

        const distance = query?.distance;
        const lat = query?.lat;
        const lng = query?.lng;
        

        // Query building
        let sqlQuery = `SELECT u.*, STRING_AGG(j.name, ', ') AS job_names, COUNT(*) OVER() AS total_count FROM users u LEFT JOIN jobs j ON j.id = ANY(u.job_ids) WHERE 1=1`;
        let countQuery = `SELECT COUNT(*) AS total_count FROM users WHERE 1=1`

        let values = [];
        let countValues = [];
        let index = 1;
        let countIndex = 1;

        sqlQuery += ` AND u.role = $${index} AND u.deleted_at IS NULL`;
        values.push("expert")
        index++

        countQuery += ` AND role = $${countIndex} AND deleted_at IS NULL`;
        countValues.push("expert");
        countIndex++;

        // To filter by city
        if(city) {
            sqlQuery += ` AND u.city = $${index}`; // If we declare the table name with key something like "user u" the we have to use the u in every other place like "u.city"
            values.push(city)
            index++;


            countQuery += ` AND city = $${countIndex}`;
            countValues.push(city);
            countIndex++;
        }
        // To filter by state
        if(state) {
            sqlQuery += ` AND u.state ILIKE $${index}`;
            values.push(state);
            index++


            countQuery += ` AND state ILIKE $${countIndex}`;
            countValues.push(state);
            countIndex++;
        }
        // To filter by country
        if(country) {
            sqlQuery += ` AND u.country ILIKE $${index}`;
            values.push(country);
            index++;

            countQuery += ` AND country ILIKE $${countIndex}`;
            countValues.push(country);
            countIndex++;   
        }
        // To filter by keyword
        if(keyword) {
            sqlQuery += ` AND u.name ILIKE $${index}`;
            values.push(`%${keyword}%`);
            index++;

            countQuery += ` AND name ILIKE $${countIndex}`;
            countValues.push(keyword);
            countIndex++;   
        }
        // To filter by jobids
        if(job_ids) {
            sqlQuery += ` AND u.job_ids && $${index}::INTEGER[]`;
            values.push(job_ids);
            index++;

            countQuery += ` AND job_ids && $${countIndex}::INTEGER[]`;
            countValues.push(job_ids);
            countIndex++; 
        }

        if(distance && lat && lng) {
            sqlQuery += ` AND ST_DistanceSphere(ST_MakePoint(u.lat::float, u.lng::float), ST_MakePoint($${index}, $${++index})) <= $${++index}`;
            values.push(lat);
            values.push(lng);
            values.push(distance*1000);
            index++;


            countQuery += ` AND ST_DistanceSphere(ST_MakePoint(lat::float, lng::float), ST_MakePoint($${countIndex}, $${++countIndex})) <= $${++countIndex}`;
            countValues.push(lat);
            countValues.push(lng);
            countValues.push(distance*1000);
            countIndex++;
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
        // Get total count
        const countRes = await getTotalExpertsCount(countQuery, countValues);
        const result = await getExpertList(sqlQuery, values);
        const totalCount = countRes.rows[0].total_count;
        reply.send({message: "Success", data: result?.rows, currentPage: page, totalCount, limit});

    } catch(err) {
        console.log(err);
        reply.code(400).send({message: "something went wrong"})
    }

}
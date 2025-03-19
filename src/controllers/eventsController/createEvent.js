import { createEventData } from "../../models/eventsModal.js"

export async function createEventController(req, reply) {
    const uid = req?.userId;
    const body = req.body;
    
    try {
        let payload = { uid: uid, title: body.title, start_date: body.start_date, end_date: body?.end_date };

        if(body?.all_day) {
            payload = {...payload, all_day: body.all_day}
        }
        if(body?.description) {
            payload = {...payload, description: body?.description}
        }
        if(body?.link) {
            payload = {...payload, link: body?.link}
        }

        // Results
        const res = await createEventData(payload);
        if(res.rows[0]?.id) {
            return reply.code(200).send({message: "Event created successfully"});
        } else {
            return reply.code(400).send({message: "Something went wrong "})
        }
    } catch(err) {
        return reply.code(400).send({message: "Something went wrong "});
    }
}
import { updateEvent } from "../../models/eventsModal.js";


export async function updateEventController(req, reply) {
    const uid = req.userId;
    const body = req.body
    console.log(uid);
    try {
        let payload = { id: body.id };
        if(body?.title) {
            payload = {...payload, title: body.title }
        }
        if(body?.start_date) {
            payload = { ...payload, start_date: body.start_date }
        }
        if(body?.end_date) {
            payload = { ...payload, end_date: body.end_date }
        }
        if(body?.description) {
            payload = { ... payload, description: body.description }
        }
        if(body?.link) {
            payload = {...payload, link: body?.link }
        }
        if(body?.all_day !== undefined && body?.all_day !== null) {
            if(typeof body?.all_day == "boolean") {
                payload = {...payload, all_day: body.all_day}
            }
        }
        const res = await updateEvent(uid, payload);
        if(res?.rows[0]?.id) {
            return reply.code(200).send({ message: "Event updated successfully" })
        } else {
            return reply.code(400).send({ message: "Something went wrong!"})
        }
    } catch(err) {
        return reply.code(400).send({ message: "Something went wrong!"})
    }
}
import { deleteEvent } from "../../models/eventsModal.js";


export async function deleteEventController(req, reply) {
    const uid = req.userId;
    const eventId = req.params.id;

    try {
        if(!eventId) {
            return reply.code(400).send({ message: "Something went wrong "})
        }

        const res = await deleteEvent(uid, eventId);
        if(res?.rows[0]?.id) {
            return reply.code(200).send({message: "Event deleted successfully"});
        } else {
            return reply.code(400).send({ message: "Something went wrong "})
        }
    } catch(err) {
        return reply.code(400).send({ message: "Something went wrong "})
    }
}
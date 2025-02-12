
import { nanoid } from "nanoid";
import { checkProfileDataExists, createPublicProfile, updatePublicProfile } from "../models/publicProfileModal.js";
import {cleanHtml} from "../utils/sanitizeHtml.js";

export async function publicProfileController(req, reply) {
    const userId = req.userId || 17;
    try {
        const body = req.body;
        const profile_url = nanoid(8);
        let payload = {
            uid: userId,
            profile_url,
            created_at: new Date()
        }
        if(body?.tags) {
            payload = {...payload, tags: body?.tags.split(",")}
        }
        if(body?.website) {
            payload = {...payload, website: body?.website}
        }
        if(body?.description) {
            const sanitizedHtml = cleanHtml(body?.description)
            payload = {...payload, description: sanitizedHtml}
        }

        // Check the data exists
        const isExists = await checkProfileDataExists(userId);
        if(isExists?.rows[0].exists !== false) {
            const res = await updatePublicProfile(payload)
            if(res.rowCount) {
                return reply.code(200).send({message: "Profile updated successfully"})
            }

        } else {
            const res = await createPublicProfile(payload);
            if(res.rowCount) {
                return reply.code(200).send({message: "Profile updated successfully"})
            }
        }


    } catch(err) {
        console.log(err);
        return reply.code(400).send({message: "something went wrong"})
    }
}
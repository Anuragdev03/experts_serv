import { checkIfUserExist, createNewUsers } from "../models/userModal.js";
import { isValidEmail } from "../utils/utilities.js";


export async function registerationController(req, reply) {
    const body = req?.body;

    console.log(body.role)

    // Checking for errors
    const validEmail = isValidEmail(body?.email);
    console.log(validEmail, "============ is valid email ===========")

    if(!validEmail) {
        reply.code(400).send({message: "Invalid Email!"})
    }

    const isUserExists =  await checkIfUserExist(body?.user_name, body?.email);

    if(isUserExists?.email) {
        reply.code(400).send({message: "Email already exists"})
    }

    if(isUserExists?.user_name) {
        reply.code(400).send({ message: "User name already exists" })
    }

    if(body?.role !== "expert") {
        reply.code(400).send("Something went wrong!")
    }

    const created_at = new Date()
    const queryObj = {...body, created_at };
    const res = await createNewUsers(queryObj);
    try {
        if(res?.rows[0]?.email) {
            reply.code(200).send({message: "Registeration successful", data: res?.rows[0]})
        }
        
    } catch(err) {
        reply.code(400).send({message: "Something went wrong please try again"})
    }

}
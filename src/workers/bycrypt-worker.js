import { parentPort, workerData } from "worker_threads";
import bcrypt from "bcrypt"

(async () => {
  try {
    const { password, saltRounds } = workerData; // Get data passed from main thread
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    parentPort.postMessage(hashedPassword); // Send the hashed password back to the main thread
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
})();

import { parentPort, workerData } from "worker_threads";
import bcrypt from "bcrypt"

(async () => {
    try {
      const { plainPassword, hashedPassword } = workerData; // Get data from main thread
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare passwords
      parentPort.postMessage(isMatch); // Send result back to the main thread
    } catch (err) {
      parentPort.postMessage({ error: err.message });
    }
  })();
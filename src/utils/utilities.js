import { Worker } from "worker_threads"
import path from "path"
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";
import { envVar } from "./constants.js";

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export function hashPasswordInWorker(password, saltRounds) {
  const currentPath = fileURLToPath(import.meta.url)
  let wrokerJsPath = path.join(currentPath, '../../workers', 'bycrypt-worker.js')

  return new Promise((resolve, reject) => {
    const worker = new Worker(wrokerJsPath, {
      workerData: { password, saltRounds },
    });

    worker.on('message', resolve); // Listen for messages from the worker
    worker.on('error', reject); // Handle errors
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export function comparePasswordsInWorker(plainPassword, hashedPassword) {
  const currentPath = fileURLToPath(import.meta.url)
  let wrokerJsPath = path.join(currentPath, '../../workers', 'compare-password-worker.js')
  return new Promise((resolve, reject) => {
    const worker = new Worker(wrokerJsPath, {
      workerData: { plainPassword, hashedPassword },
    });

    worker.on('message', resolve); // Receive result from the worker
    worker.on('error', reject); // Handle worker errors
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export const generateAccessToken = (user) => {
  return jwt.sign(user, envVar.accessTokenSecret, { expiresIn: "20m" });
};

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, envVar.refreshTokenSecret, { expiresIn: "7d" });
  return refreshToken;
};

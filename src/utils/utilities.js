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
  let workerJsPath = path.join(currentPath, '../../workers', 'bycrypt-worker.js')

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerJsPath, {
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

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, envVar.accessTokenSecret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      let expTime = new Date(error.expiredAt);
      let currDate = new Date();
      let diff = currDate - expTime;
      let diffInDays = Math.floor(diff / (1000*60*60*24))
      if(diffInDays > 7) {
        return { valid: false, error: 'Login again' }
      }
      return { valid: false, error: 'Token has expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { valid: false, error: 'Invalid token' };
    } else if (error.name === 'NotBeforeError') {
      return { valid: false, error: 'Token not active yet' };
    } else {
      return { valid: false, error: 'Token verification failed' };
    }
  }
}

export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, envVar.refreshTokenSecret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    if (error.name === 'TokenExpiredError') {
      return { valid: false, error: 'Token has expired' };
    } else if (error.name === 'JsonWebTokenError') {
      return { valid: false, error: 'Invalid token' };
    } else if (error.name === 'NotBeforeError') {
      return { valid: false, error: 'Token not active yet' };
    } else {
      return { valid: false, error: 'Token verification failed' };
    }
  }
}


export function generateOTP(length = 6) {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits[randomIndex];
  }

  return OTP;
}

export function isOtpExpired(expirationTime) {
  const now = new Date();

  const expiryDate = new Date(expirationTime);

  return now > expiryDate;
}
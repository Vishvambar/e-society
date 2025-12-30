import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://vishvambarudavant96:YkNfIvvHrqXc67Mn@cluster0.hppib6y.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0';
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/society-management';

console.log('Attempting to connect to:', MONGODB_URI);

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if not connected
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

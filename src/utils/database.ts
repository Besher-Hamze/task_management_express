import mongoose from 'mongoose';

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

export default connectDB;

import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  token: String,
});

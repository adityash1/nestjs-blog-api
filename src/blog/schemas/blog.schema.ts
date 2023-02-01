import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_by: String,
  created_on: { type: Date, default: Date.now },
});

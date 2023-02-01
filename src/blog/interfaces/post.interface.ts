import { Document } from 'mongoose';

export interface Post extends Document {
  readonly title: string;
  readonly description: string;
  readonly created_by: string;
  readonly created_on: Date;
}

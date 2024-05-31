import { Schema, model, models, Document } from 'mongoose';
import { UserType } from '@models/user'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export interface PromptType extends Document {
  _id: string;
  creator: UserType;
  prompt: string;
  tag: string;
}

export default Prompt;
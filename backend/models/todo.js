import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: String,
}, { timestamps: true });

export default mongoose.model('Todo', TodoSchema)

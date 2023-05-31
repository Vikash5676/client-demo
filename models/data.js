import { Schema, model, models } from 'mongoose';

const DataSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: String,
    required: [true, 'item is required.'],
  },
});

const Item = models.Item || model('Item', DataSchema);

export default Item;
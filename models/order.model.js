import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      price: { type: Number, default: 0 },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

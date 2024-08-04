import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutModal = ({ tickets, subtotal, onClose, event }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      if (!name || !email || !phone) {
        toast.error('Please fill in all fields.');
        return;
      }
      
      const orderData = {
        name,
        email,
        phone,
        tickets,
        eventId: event._id,
        subtotal,
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.status === 200) {
        toast.success('Order placed successfully!');
        onClose();
      } else {
        toast.error('Failed to place order.');
      }
    } catch (error) {
      toast.error('An error occurred while placing the order.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg flex w-[841px] h-fit">
        <div className="w-1/2 pr-4 border-r">
          <h2 className="font-semibold text-xl mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-6">Enter details of your event to get it successfully</p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-3"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg p-3"
            />
          </form>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
          <p className="text-gray-600 mb-6">Your ticket type determines what you have access to</p>
          <div className="mb-4">
            {Object.entries(tickets).map(([ticketName, count]) => (
              <div key={ticketName} className="flex justify-between mb-2">
                <span>{count} x {ticketName}</span>
                <span>₦ {count * event.tickets.find(ticket => ticket.name === ticketName).price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>₦ {subtotal}</span>
          </div>
          <button
            onClick={handleOrder}
            className={`mt-6 w-full py-3 text-white rounded-lg ${loading ? 'bg-violet-400' : 'bg-violet-600'}`}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Order tickets'}
          </button>
          <button
            onClick={onClose}
            className="mt-4 w-full py-3 bg-gray-200 text-gray-800 rounded-lg"
          >Close</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

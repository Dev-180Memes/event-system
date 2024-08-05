import React, { useState, useEffect } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Card from '@/components/Card';
import withAuth from '@/components/hoc/withAuth';
import decodeToken from '@/utils/decodeToken';
import axios from 'axios';
import toast from 'react-hot-toast';
import TicketsSoldChart from '@/components/TicketsSoldChart';

function formatNumber(value) {
  if (parseInt(value) >= 1000000) {
    return (parseInt(value) / 1000000).toFixed(1) + 'M'; // Converts to millions
  } else if (parseInt(value) >= 1000) {
    return (parseInt(value) / 1000).toFixed(1) + 'K'; // Converts to thousands
  } else {
    return parseInt(value).toString(); // Returns the number as is if it's less than 1000
  }
}

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [totalTicketsSold, setTotalTicketsSold] = useState(0);
  const [thisMonthTicketsSold, setThisMonthTicketsSold] = useState(0);
  const [ticketSoldPercentage, setTicketSoldPercentage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { userId } = decodeToken(token);

      const fetchEvents = async () => {
        try {
          const response = await axios.get(`/api/events/user/${userId}`);
          setEvents(response.data);
        } catch (error) {
          console.error(error); 
          toast.error('Error fetching events');
        }
      }

      const fetchDashDetails = async () => {
        try {
          const response = await axios.get(`/api/tickets/total`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data)
          setTotalTicketsSold(response.data.totalTicketsSold);
          setThisMonthTicketsSold(response.data.thisMonthTicketsSold)
          setTicketSoldPercentage(parseInt(response.data.percentIncrease))
        } catch (error) {
          console.error(error);
          toast.error('Error fetching dashboard details');
        }
      };

      fetchEvents();

      fetchDashDetails();
    }

    
  }, []);

  return (
    <Layout>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-3xl text-gray-900">Dashboard</h2>
          <p className="font-normal text-base text-gray-600">Monitor key metrics and stay on top of your event performance.</p>
        </div>
        <div className="w-full flex flex-row gap-6">
          <Card 
            icon={'calendar'}
            heading={'Total Events'}
            value={formatNumber(events.length)}
          />
          <Card 
            heading={'Total tickets sold'}
            value={formatNumber(totalTicketsSold)}
            increase={ticketSoldPercentage}
          />
          <Card 
            heading={"Month's Tickets Sold"}
            value={formatNumber(thisMonthTicketsSold)}
            increase={ticketSoldPercentage}
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full pb-2 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900">Tickets sold over time</h3>
          </div>
          <div className="w-full">
            <TicketsSoldChart />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(Dashboard);

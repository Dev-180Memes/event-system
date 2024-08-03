import React from 'react';
import Layout from '@/components/Dashboard/Layout';
import Card from '@/components/Card';
import withAuth from '@/components/hoc/withAuth';

const Dashboard = () => {
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
            value={'39'}
            increase={'100'}
          />
          <Card 
            heading={'Total tickets sold'}
            value={'26.4K'}
            increase={'100'}
          />
          <Card 
            heading={"Month's Tickets Sold"}
            value={'1.78K'}
            increase={'100'}
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full pb-2 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900">Tickets sold over time</h3>
          </div>
          <div className="w-full">
            TODO: Bar Chart showing Ticket Sales
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(Dashboard);

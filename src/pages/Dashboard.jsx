import React from 'react';
import Navbar from '../components/Navbar';
import CarTable from '../components/CarManagement';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Liste des voitures</h1>
        <CarTable />
      </div>
    </>
  );
};

export default Dashboard;

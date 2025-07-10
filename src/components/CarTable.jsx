import React, { useState } from 'react';

const CarTable = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      marque: 'Toyota',
      modele: 'Yaris',
      prix: '250 MAD/jour',
      image: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/car-1869803_1280.jpg',
    },
    {
      id: 2,
      marque: 'Renault',
      modele: 'Clio',
      prix: '280 MAD/jour',
      image: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/renault-1955726_1280.jpg',
    },
  ]);

  return (
    <div className="bg-white rounded shadow p-4">
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Ajouter voiture
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Image</th>
            <th className="p-2">Marque</th>
            <th className="p-2">Modèle</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="text-center border-t">
              <td className="p-2">
                <img
                  src={car.image}
                  alt={`${car.marque} ${car.modele}`}
                  className="w-20 h-12 object-cover mx-auto rounded"
                />
              </td>
              <td className="p-2">{car.marque}</td>
              <td className="p-2">{car.modele}</td>
              <td className="p-2">{car.prix}</td>
              <td className="p-2 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Consulter
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Modifier
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;

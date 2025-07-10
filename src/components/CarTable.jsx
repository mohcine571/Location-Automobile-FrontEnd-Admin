import React, { useState, useEffect } from 'react';

const CarFormModal = ({ isOpen, onClose, onSave, existingCar }) => {
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (existingCar) {
      setMarque(existingCar.marque);
      setModele(existingCar.modele);
      setPrix(existingCar.prix);
      setImage(existingCar.image);
    } else {
      setMarque('');
      setModele('');
      setPrix('');
      setImage('');
    }
  }, [existingCar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = { 
      ...existingCar, // conserver id si modification
      marque, 
      modele, 
      prix, 
      image 
    };
    onSave(carData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {existingCar ? 'Modifier la voiture' : 'Ajouter une voiture'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Marque"
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Modèle"
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Prix (ex: 300 MAD/jour)"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

  // Etat modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // voiture à modifier

  // Ouvre modal pour ajout
  const openAddModal = () => {
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  // Ouvre modal pour modification
  const openEditModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Ferme modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  // Sauvegarde voiture (ajout ou modif)
  const handleSaveCar = (carData) => {
    if (carData.id) {
      // modification : mettre à jour dans la liste
      setCars((prev) =>
        prev.map((c) => (c.id === carData.id ? carData : c))
      );
    } else {
      // ajout : générer un id et ajouter
      const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
      setCars((prev) => [...prev, { ...carData, id: newId }]);
    }
  };

  // Supprimer voiture
  const handleDeleteCar = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette voiture ?')) {
      setCars((prev) => prev.filter((car) => car.id !== id));
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <button
        onClick={openAddModal}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
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
                <button
                  onClick={() => alert(`Consulter : ${car.marque} ${car.modele}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Consulter
                </button>
                <button
                  onClick={() => openEditModal(car)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      <CarFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCar}
        existingCar={selectedCar}
      />
    </div>
  );
};

export default CarTable;

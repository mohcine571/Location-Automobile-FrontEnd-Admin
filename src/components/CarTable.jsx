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
      ...existingCar, // conserve l'id si modification
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-full overflow-auto">
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
      marque: 'Peugeot',
      modele: '208',
      prix: '320 MAD/jour',
      image: 'https://www.peugeot.ma/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_ALLUREEV_M.jpg?imwidth=768',
    },
    {
      id: 2,
      marque: 'Hyundai',
      modele: 'Accent',
      prix: '300 MAD/jour',
      image: 'https://edc.web7msserver.com/wp-content/uploads/2024/03/accent3.jpg',
    },
    {
      id: 3,
      marque: 'Renault',
      modele: 'Kangoo',
      prix: '350 MAD/jour',
      image: 'https://autoactu.ma/wp-content/uploads/2023/09/unnamed-4.png',
    },
    {
      id: 4,
      marque: 'Renault',
      modele: 'Clio IV',
      prix: '280 MAD/jour',
      image: 'https://www.largus.fr/images/2023-12/Renault-Clio-Esprit-Alpine-2023-bd.jpg',
    },
    {
      id: 5,
      marque: 'Dacia',
      modele: 'Sandero Streetway',
      prix: '260 MAD/jour',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHL6hFq7UC5ctMJ9oikwf9e06aBj80qrpqw&s',
    },
    {
      id: 6,
      marque: 'Dacia',
      modele: 'Logan',
      prix: '270 MAD/jour',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzapMxQlmIYMfDpozIhoDxBIDn62_Gmn0xcw&s',
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
    <div className="bg-white rounded shadow p-4 max-w-7xl mx-auto mt-8">
      <button
        onClick={openAddModal}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ajouter voiture
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Marque</th>
              <th className="p-2 border border-gray-300">Modèle</th>
              <th className="p-2 border border-gray-300">Prix</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="text-center border-t border-gray-300">
                <td className="p-2">
                  <img
                    src={car.image}
                    alt={`${car.marque} ${car.modele}`}
                    className="w-24 h-16 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-2">{car.marque}</td>
                <td className="p-2">{car.modele}</td>
                <td className="p-2">{car.prix}</td>
                <td className="p-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => alert(`Consulter : ${car.marque} ${car.modele}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Consulter
                  </button>
                  <button
                    onClick={() => openEditModal(car)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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

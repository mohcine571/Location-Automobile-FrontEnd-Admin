import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';

const CarFormModal = ({ isOpen, onClose, onSave, existingCar }) => {
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [prix, setPrix] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (existingCar) {
      setMarque(existingCar.marque);
      setModele(existingCar.modele);
      setPrix(existingCar.prix);
      setImages(existingCar.images || (existingCar.image ? [existingCar.image] : []));
    } else {
      setMarque('');
      setModele('');
      setPrix('');
      setImages([]);
    }
  }, [existingCar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = { 
      ...existingCar,
      marque, 
      modele, 
      prix, 
      images,
      image: images[0] || ''
    };
    onSave(carData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-full overflow-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          {existingCar ? 'Modifier la voiture' : 'Ajouter une voiture'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Marque*</label>
            <input
              type="text"
              placeholder="Peugeot, Renault, etc."
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Modèle*</label>
            <input
              type="text"
              placeholder="208, Clio, etc."
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Prix*</label>
            <input
              type="text"
              placeholder="300 MAD/jour"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Images de la voiture</label>
            <ImageUploader 
              onImageSelect={setImages} 
              initialImages={images} 
            />
            {images.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">{images.length} image(s) sélectionnée(s)</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
      images: ['https://www.peugeot.ma/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_ALLUREEV_M.jpg?imwidth=768']
    },
    {
      id: 2,
      marque: 'Hyundai',
      modele: 'Accent',
      prix: '300 MAD/jour',
      image: 'https://edc.web7msserver.com/wp-content/uploads/2024/03/accent3.jpg',
      images: ['https://edc.web7msserver.com/wp-content/uploads/2024/03/accent3.jpg']
    },
    {
      id: 3,
      marque: 'Renault',
      modele: 'Kangoo',
      prix: '350 MAD/jour',
      image: 'https://autoactu.ma/wp-content/uploads/2023/09/unnamed-4.png',
      images: ['https://autoactu.ma/wp-content/uploads/2023/09/unnamed-4.png']
    },
    {
      id: 4,
      marque: 'Renault',
      modele: 'Clio IV',
      prix: '280 MAD/jour',
      image: 'https://www.largus.fr/images/2023-12/Renault-Clio-Esprit-Alpine-2023-bd.jpg',
      images: ['https://www.largus.fr/images/2023-12/Renault-Clio-Esprit-Alpine-2023-bd.jpg']
    },
    {
      id: 5,
      marque: 'Dacia',
      modele: 'Sandero Streetway',
      prix: '260 MAD/jour',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHL6hFq7UC5ctMJ9oikwf9e06aBj80qrpqw&s',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHL6hFq7UC5ctMJ9oikwf9e06aBj80qrpqw&s']
    },
    {
      id: 6,
      marque: 'Dacia',
      modele: 'Logan',
      prix: '270 MAD/jour',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzapMxQlmIYMfDpozIhoDxBIDn62_Gmn0xcw&s',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzapMxQlmIYMfDpozIhoDxBIDn62_Gmn0xcw&s']
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openAddModal = () => {
    setSelectedCar(null);
    setIsModalOpen(true);
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleSaveCar = (carData) => {
    if (carData.id) {
      setCars(prev => prev.map(c => c.id === carData.id ? carData : c));
    } else {
      const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
      setCars(prev => [...prev, { ...carData, id: newId }]);
    }
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette voiture ?')) {
      setCars(prev => prev.filter(car => car.id !== id));
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 max-w-7xl mx-auto mt-8">
      <button
        onClick={openAddModal}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        Ajouter voiture
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
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
              <tr key={car.id} className="text-center border-t border-gray-300 hover:bg-gray-50">
                <td className="p-2">
                  <img
                    src={car.image}
                    alt={`${car.marque} ${car.modele}`}
                    className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-2">{car.marque}</td>
                <td className="p-2">{car.modele}</td>
                <td className="p-2">{car.prix}</td>
                <td className="p-2 space-x-1 sm:space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => alert(`Consulter : ${car.marque} ${car.modele}`)}
                    className="bg-blue-500 text-white px-2 py-1 sm:px-3 rounded hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                  >
                    Consulter
                  </button>
                  <button
                    onClick={() => openEditModal(car)}
                    className="bg-yellow-500 text-white px-2 py-1 sm:px-3 rounded hover:bg-yellow-600 transition-colors text-xs sm:text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
                    className="bg-red-600 text-white px-2 py-1 sm:px-3 rounded hover:bg-red-700 transition-colors text-xs sm:text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
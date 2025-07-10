// import React, { useState, useEffect } from 'react';

// const CarFormModal = ({ isOpen, onClose, onSave, existingCar }) => {
//   const [marque, setMarque] = useState('');
//   const [modele, setModele] = useState('');
//   const [prix, setPrix] = useState('');
//   const [image, setImage] = useState('');

//   useEffect(() => {
//     if (existingCar) {
//       setMarque(existingCar.marque);
//       setModele(existingCar.modele);
//       setPrix(existingCar.prix);
//       setImage(existingCar.image);
//     } else {
//       setMarque('');
//       setModele('');
//       setPrix('');
//       setImage('');
//     }
//   }, [existingCar]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const carData = { marque, modele, prix, image };
//     onSave(carData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-4">
//           {existingCar ? 'Modifier la voiture' : 'Ajouter une voiture'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Marque"
//             value={marque}
//             onChange={(e) => setMarque(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Modèle"
//             value={modele}
//             onChange={(e) => setModele(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Prix (ex: 300 MAD/jour)"
//             value={prix}
//             onChange={(e) => setPrix(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="URL de l'image"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CarFormModal;

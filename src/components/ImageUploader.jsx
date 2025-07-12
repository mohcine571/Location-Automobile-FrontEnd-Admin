import React, { useState, useEffect, useRef } from 'react';

const ImageUploader = ({ onImageSelect, initialImages = [] }) => {
  const [images, setImages] = useState(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Galerie d'images prédéfinies
  const galleryImages = [
    'https://www.peugeot.ma/content/dam/peugeot/master/b2c/our-range/showroom/208/2023-10-new-208/mobile/208_ALLUREEV_M.jpg?imwidth=768',
    'https://edc.web7msserver.com/wp-content/uploads/2024/03/accent3.jpg',
    'https://autoactu.ma/wp-content/uploads/2023/09/unnamed-4.png',
    'https://www.largus.fr/images/2023-12/Renault-Clio-Esprit-Alpine-2023-bd.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIHL6hFq7UC5ctMJ9oikwf9e06aBj80qrpqw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzapMxQlmIYMfDpozIhoDxBIDn62_Gmn0xcw&s'
  ];

  // Gestion du drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // Gestion de la sélection de fichiers
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
      e.target.value = null;
    }
  };

  // Traitement des fichiers images
  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter(file => file.type.match('image.*'));
    
    if (fileArray.length === 0) {
      alert('Veuillez sélectionner uniquement des fichiers image');
      return;
    }

    const newImages = [];
    let loadedCount = 0;

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        loadedCount++;
        
        if (loadedCount === fileArray.length) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
          onImageSelect(updatedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Sélection depuis la galerie
  const handleGallerySelect = (img) => {
    const updatedImages = [...images, img];
    setImages(updatedImages);
    onImageSelect(updatedImages);
  };

  // Suppression d'une image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImageSelect(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Zone de drag and drop */}
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img 
                  src={img} 
                  alt={`Preview ${index}`} 
                  className="h-24 w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            <div className="relative h-24 w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer">
              <span className="text-gray-500">+ Ajouter</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">
            Glissez-déposez des images ici ou cliquez pour sélectionner
          </p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          multiple
        />
      </div>

      {/* Galerie d'images prédéfinies */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Ou choisir depuis notre galerie :</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {galleryImages.map((img, index) => (
            <div 
              key={index} 
              className="cursor-pointer"
              onClick={() => handleGallerySelect(img)}
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="h-16 w-full object-cover rounded border border-gray-200 hover:border-blue-500 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
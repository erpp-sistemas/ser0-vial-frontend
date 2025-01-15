import React, { useState } from "react";
import Viewer from "react-viewer";

const ImageViewer = ({ photos, open, onClose }) => {
  const [visible, setVisible] = useState(open);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cerrar el modal
  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  // Maneja la navegación entre las imágenes
  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      {photos && photos.length > 0 && (
        <div className="relative">
          <Viewer
            zIndex={1000000}
            visible={visible}
            onClose={handleClose}
            images={photos.map((photo) => ({
              src: photo.url,
              alt: `Foto ${photos.indexOf(photo) + 1}`,
              preload: true,
            }))}
            activeIndex={currentIndex}
            onChange={handleChange}
            zoomSpeed={0.1}
            scalable={true}
            rotatable={true}
            loop={true}
            noImgDetails={true}
            className="max-w-4xl max-h-[80vh] mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageViewer;

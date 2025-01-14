import React from "react";
import { Modal, Fade } from "@mui/material";

const LoadingModal = ({ open, message }) => {
  return (
    <Modal
      open={open}
      sx={{
        zIndex: 130001, // Ajusta el valor de zIndex según lo necesites
      }}
    >
      <Fade in={open} timeout={500}>
        <div
           style={{
            display: "flex",
            flexDirection: "column", // Asegura el apilamiento en columna
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "1rem",
          }}
          className="text-primary"
          aria-busy="true"
          aria-live="assertive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8em"
            height="8em"
            viewBox="0 0 24 24"
          >
            <rect width="7.33" height="7.33" x="1" y="1" fill="currentColor">
              <animate
                id="IconifyId19428d4955bdc9e39222"
                attributeName="x"
                begin="0;IconifyId19428d4955bdc9e39223.end+0.2s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="y"
                begin="0;IconifyId19428d4955bdc9e39223.end+0.2s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="width"
                begin="0;IconifyId19428d4955bdc9e39223.end+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="0;IconifyId19428d4955bdc9e39223.end+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor">
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor">
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.1s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="15.66"
              y="1"
              fill="currentColor"
            >
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="8.33"
              y="8.33"
              fill="currentColor"
            >
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="1"
              y="15.66"
              fill="currentColor"
            >
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="1;4;1"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.2s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="15.66"
              y="8.33"
              fill="currentColor"
            >
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="8.33"
              y="15.66"
              fill="currentColor"
            >
              <animate
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="8.33;11.33;8.33"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.3s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
            <rect
              width="7.33"
              height="7.33"
              x="15.66"
              y="15.66"
              fill="currentColor"
            >
              <animate
                id="IconifyId19428d4955bdc9e39223"
                attributeName="x"
                begin="IconifyId19428d4955bdc9e39222.begin+0.4s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="y"
                begin="IconifyId19428d4955bdc9e39222.begin+0.4s"
                dur="0.6s"
                values="15.66;18.66;15.66"
              />
              <animate
                attributeName="width"
                begin="IconifyId19428d4955bdc9e39222.begin+0.4s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
              <animate
                attributeName="height"
                begin="IconifyId19428d4955bdc9e39222.begin+0.4s"
                dur="0.6s"
                values="7.33;1.33;7.33"
              />
            </rect>
          </svg>
          {message && (
            <span
              id="loading-message"
              className="text-primary font-semibold"
              style={{
                marginTop: "1rem", // Espacio entre el SVG y el mensaje
                fontSize: "1.2rem", // Ajusta el tamaño de fuente si es necesario
                textAlign: "center", // Centra el texto
              }}
            >
              {message}
            </span>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default LoadingModal;

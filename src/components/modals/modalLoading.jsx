import React from "react";
import { Modal, Fade } from "@mui/material";
import Lottie from 'lottie-react'
import loading from '../../../public/loading_4.json'

const LoadingModal = ({ open }) => {
  return (
    <Modal open={open} sx={{
        zIndex: 130001, // Ajusta el valor de zIndex según lo necesites
      }}>
      <Fade in={open} timeout={500}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Lottie animationData={loading} style={{ width: '30%', margin: '0 auto' }} />
        </div>
      </Fade>
    </Modal>
  );
};

export default LoadingModal;
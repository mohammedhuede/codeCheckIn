import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Toaster({ show, message, setToasterData }) {
  return (
    <>
    <div className='toast-block'>
      <Toast
        onClose={() => setToasterData({ show: false, message: "" })}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header className="alert-success">
          <CheckCircleIcon className="mr-8"></CheckCircleIcon>
          <p className="me-auto">{message}</p>
        </Toast.Header>
      </Toast>
      </div>
    </>
  );
}

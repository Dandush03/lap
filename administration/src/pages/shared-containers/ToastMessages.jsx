import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessages = () => {
  const toastify = useSelector((state) => state.toastMessage);

  useEffect(() => {
    if (!toastify?.type) return;

    toast[toastify.type](toastify.message);
  }, [toastify]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ToastMessages;

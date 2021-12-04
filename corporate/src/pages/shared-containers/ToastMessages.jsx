import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--info {
    background-color: #000000b5;
  }
  .Toastify__toast--error {}
  .Toastify__toast--warning {}
  .Toastify__toast--success {}
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;

const ToastMessages = () => {
  const toastify = useSelector((state) => state.toastMessage);
  const i18n = useSelector((state) => state.i18n);

  useEffect(() => {
    if (!toastify?.type) return;

    switch (toastify.type) {
      case 'error': {
        const fatalError = i18n.toast.fatal_error.message;
        toast.error(toastify?.message || fatalError);
        break;
      }
      default:
        toast[toastify.type](toastify.message);
    }
  }, [toastify]);

  return (
    <>
      <StyledToastContainer
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

import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  return toast.success(message, {
    style: {
      background: "rgb(16, 24, 20)", 
      color: "rgb(167, 243, 208)", 
      border: "1px solid rgb(52, 211, 153)", 
    },
    iconTheme: {
      primary: "rgb(52, 211, 153)", 
      secondary: "rgb(16, 24, 20)", 
    },
    duration: 1000,
  });
};

export const toastError = (message) => {
  return toast.error(message, {
    style: {
      background: "rgb(16, 24, 20)", 
      color: "rgb(252, 165, 165)", 
      border: "1px solid rgb(239, 68, 68)", 
    },
    iconTheme: {
      primary: "rgb(239, 68, 68)", 
      secondary: "rgb(16, 24, 20)", 
    },
    duration: 1000,
  });
};

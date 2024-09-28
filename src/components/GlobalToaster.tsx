import { Toaster } from "react-hot-toast";

export const toastOptions = {
  duration: 3000,
  position: "bottom-right" as const,
  style: {
    background: "#2463EB",
    color: "#ffffff",
  },
  iconTheme: {
    primary: "#ffffff",
    secondary: "#2463EB",
  },
};

const GlobalToaster = () => {
  return <Toaster toastOptions={toastOptions} />;
};

export default GlobalToaster;

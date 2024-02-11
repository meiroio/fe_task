import { Snackbar, SnackbarContent } from "@mui/material";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type toastType = "Success" | "Error";

type ToastInfo = {
  type: toastType;
  message: string;
  isOpen: boolean;
};

const ToastContext = createContext<{
  toastInfo: ToastInfo;
  setToastInfo: Dispatch<SetStateAction<ToastInfo>>;
} | null>(null);

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    type: "Success",
    message: "",
    isOpen: false,
  });
  //unmount the toast message after 2 sec
  useEffect(() => {
    if (toastInfo.isOpen) {
      setTimeout(
        () => setToastInfo((toastInfo) => ({ ...toastInfo, isOpen: false })),
        2000
      );
    }
  }, [toastInfo.isOpen]);

  return (
    <ToastContext.Provider value={{ toastInfo, setToastInfo }}>
      <Toast
        isOpen={toastInfo.isOpen}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      {children}
    </ToastContext.Provider>
  );
};

//TODO ... implement some Toast stack for multiple toast events
const Toast = ({
  isOpen,
  type,
  message,
}: {
  isOpen: boolean;
  type: toastType;
  message: string;
}) => {
  return (
    <Snackbar open={isOpen}>
      <SnackbarContent
        style={{ backgroundColor: "white" }}
        message={
          <span style={{ color: type === "Error" ? "red" : "green" }}>
            {message}
          </span>
        }
      />
    </Snackbar>
  );
};

// lets consume the Toast context
export const useToastMessage = () => {
  const toastContext = useContext(ToastContext);
  if (toastContext === null) {
    throw new Error("toast Message Error");
  }
  return { ...toastContext };
};

export default ToastContextProvider;

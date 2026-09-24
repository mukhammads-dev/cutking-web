import Swal from "sweetalert2";
import { Messages } from "./config";

const BRAND = "#FF5A5A";

export const sweetErrorHandling = async (err: unknown): Promise<void> => {
  const anyErr = err as {
    response?: { data?: { message?: string } };
    message?: string;
  };
  const message =
    anyErr?.response?.data?.message ?? anyErr?.message ?? Messages.error1;

  await Swal.fire({
    icon: "error",
    text: message,
    confirmButtonColor: BRAND,
    confirmButtonText: "Close",
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration = 2000
): Promise<void> => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
    toast: true,
    timerProgressBar: true,
  });
};

export const sweetTopSmallSuccessAlert = (msg: string, duration = 1600): void => {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  })
    .fire({ icon: "success", title: msg })
    .then();
};

export const sweetTopInfoAlert = (msg: string, duration = 2200): void => {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  })
    .fire({ icon: "info", title: msg })
    .then();
};

export const sweetConfirm = async (
  title: string,
  confirmText = "Yes",
  cancelText = "Cancel"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: BRAND,
    cancelButtonColor: "#79746C",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
  return result.isConfirmed;
};

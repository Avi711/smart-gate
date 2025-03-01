export const TOAST_STYLES = {
  success: {
    style: {
      backgroundColor: "rgb(240 253 244)",
      border: "1px solid rgb(187 247 208)",
      color: "rgb(22 101 52)",
    },
    className: "[&>div]:text-green-800",
  },
  error: {
    style: {
      backgroundColor: "rgb(254 242 242)",
      border: "1px solid rgb(254 202 202)",
      color: "rgb(153 27 27)",
    },
    className: "[&>div]:text-red-800",
  },
} as const;

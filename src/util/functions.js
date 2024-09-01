import clsx from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

/** change input from password to text */
export const eyeShowHide = (setShow) => {
  let passType = document.querySelector("#passInput").type;
  if (passType === "text") {
    document.querySelector("#passInput").type = "password";
    return setShow(false);
  }
  document.querySelector("#passInput").type = "text";
  setShow(true);
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** appear error handler */
export const errorHandler = (err) => {
  toast.info(err, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/** appear success handler */
export const successHandler = (data) => {
  toast.success(data, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/** return how much time has passed since date */
export const unitTimeToCreatedTimeHelper = (unix) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds
  const unixTime = Math.floor(unix / 1000);
  const timeElapsed = currentTime - unixTime;
  if (timeElapsed < 60) {
    return `${timeElapsed}s`; // Seconds
  } else if (timeElapsed < 3600) {
    return `${Math.floor(timeElapsed / 60)} minute ago`; // Minutes
  } else if (timeElapsed < 86400) {
    return `${Math.floor(timeElapsed / 3600)} hours ago`; // Hours
  } else if (timeElapsed < 2592000) {
    return `${Math.floor(timeElapsed / 86400)} days ago`; // Days
  } else if (timeElapsed < 31536000) {
    return `${Math.floor(timeElapsed / 2592000)} months ago`; // Months
  } else {
    return `${Math.floor(timeElapsed / 31536000)} years ago`; // Years
  }
};

/** check if post available by date  */
export const checkIfPostAvailableHelper = (date) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const unixTime = new Date(date).getTime() / 1000;

  if (unixTime < currentTime) {
    return true;
  }
  return false;
};

/** return left time to the date  */
export const availableTimeStampHelper = (date) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds
  const unixTime = new Date(date).getTime() / 1000;

  const timeElapsed = switchTimeStampToFeatureResult(currentTime - unixTime);

  if (timeElapsed < 60) {
    return `${timeElapsed}s`; // Seconds
  } else if (timeElapsed < 3600) {
    return `${Math.floor(timeElapsed / 60)} minute`; // Minutes
  } else if (timeElapsed < 86400) {
    return `${Math.floor(timeElapsed / 3600)} hours`; // Hours
  } else if (timeElapsed < 2592000) {
    return `${Math.floor(timeElapsed / 86400)} days`; // Days
  } else if (timeElapsed < 31536000) {
    return `${Math.floor(timeElapsed / 2592000)} months`; // Months
  } else {
    return `${Math.floor(timeElapsed / 31536000)} years`; // Years
  }
};

/** switch navigate number */
const switchTimeStampToFeatureResult = (unix) => {
  return unix * -1;
};

/** copy text to clipboard */
export const copyTextToClipboard = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};
/** check if text is on hebrew */
export const contains_heb = (str) => {
  return /[\u0590-\u05FF]/.test(str);
};

/** random hex color */
export const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

/** return array of hex colors */
export const randomSetOfColors = (num) => Array.from({ length: num }, () => randomColor());

/** Check if number is not defined. */
export const isNumberEmpty = (number) => number === undefined || number === null || number < 1;

export const isArrayEmpty = (arr) => arr === undefined || arr === null || arr.length === 0;

export function dateToString(date) {
  date = new Date(date)
  if (!date) {
    return '';
  } else {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

import { toast } from "react-toastify";

export const eyeShowHide = (setShow) => {
    let passType = document.querySelector("#passInput").type;
    if (passType === "text") {
        document.querySelector("#passInput").type = "password";
        return setShow(false);
    }
    document.querySelector("#passInput").type = "text";
    setShow(true);
};
export const errorHandler = (err) => {
    toast.info(err, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};
export const successHandler = (data) => {
    toast.success(data, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
};

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

export const checkIfPostAvailableHelper = (date) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const unixTime = new Date(date).getTime() / 1000;

    if (unixTime < currentTime) {
        return true;
    }
    return false;
};

export const availableTimeStampHelper = (date) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds
    const unixTime = new Date(date).getTime() / 1000;
    
    const timeElapsed = switchTimeStampToFeatureResult(currentTime - unixTime);

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

const switchTimeStampToFeatureResult = (unix) => {
    return unix * (-1);
};

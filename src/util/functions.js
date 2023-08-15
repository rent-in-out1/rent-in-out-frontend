export const utilFunctionUnitTimeToCreatedTime = (unix) => {
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
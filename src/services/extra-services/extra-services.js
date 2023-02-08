import {toast} from "react-toastify"

export const eyeShowHide = (setShow) => {
    let passType = document.querySelector("#passInput").type
    if (passType === "text") {
        document.querySelector("#passInput").type = "password";
        return setShow(false)
    }
    document.querySelector("#passInput").type = "text"
    setShow(true)
}
export const errorHandler = (err) => {
    toast.info(err, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}
export const successHandler = (data) => {
    toast.success(data, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    })
}
import { useState,useEffect } from "react";

export function useScroll(offsetY = 0){
  const [endScreen,setEndScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll",onScroll);
    // כמו מחזור componentwillunmount
    return () => {
      // יבטל את האזנה לאירוע כדי 
      // שלא יהיו כפילויות שעוברים בין דפים
      window.removeEventListener("scroll",onScroll);
    }
  },[])

  const onScroll = () => {
    // מחזיר לנו את גובה החלון
    let windowHeight = window.innerHeight;
    // מחזיר את נקודת הוואי העליון שהחלון נמצא בה מבחינת גלילה, שניהיה הכי למעלה נקבל 0
    let scrollTop = document.documentElement.scrollTop;

    // יחזיר את גובה כל המסמך
    let docHeight = document.documentElement.offsetHeight;
    console.log("Scroll",windowHeight,scrollTop,docHeight)

    // -offsetY -> כדי שנוכל להגדיר כמה פיקסלים לפני 
    // שנגיע לסוף יציג כבר סוף עמוד
    if(Math.ceil(windowHeight + scrollTop) >= docHeight - offsetY){
      // alert("end of page")
      setEndScreen(true)
    }
  }

  const endScreenFalse = () => {
    setEndScreen(false)
  }

  return [endScreen,endScreenFalse];

}
export const getButtonsProps = (setDisplay, closeUploadSection, handleUpload, isDisable) => ([
  [
    {
      handleClick: () => {
        setDisplay(false);
      },
      className:
        "flex-shrink-0 border-transparent py-2 border-4 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-blue-400 hover:text-blue-700 rounded-xl",
      type: "button",
      text: "Back",
    },
  ],
  [
    {
      className:
        "flex-shrink-0 border-transparent py-2 border-4 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-blue-400 hover:text-blue-700 rounded-xl",
      type: "button",
      handleClick: () => closeUploadSection(),
      text: "Cancel",
    },
    {
      handleClick: () => {
        handleUpload();
      },
      disabled: isDisable,
      className:
        "flex-shrink-0 border-transparent hover:border-transparent active:border-transparent bg-blue-400 hover:bg-blue-700 px-6 md:px-8 md:py-2 text-sm md:text-base cursor-pointer text-white rounded-xl disabled:cursor-not-allowed disabled:text disabled:hover:bg-blue-400",
      type: "submit",
      text: "Uplaod",
    },
  ],
])
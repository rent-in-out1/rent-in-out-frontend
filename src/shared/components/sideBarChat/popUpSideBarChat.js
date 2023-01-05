import React from "react";
import SideBarChat from "./sideBarChat";
import PopUPModel from "./../../UI/popup/registerModel";
import { onInboxToggle } from "../../../redux/features/toggleSlice";
import { Wrapper } from './../../../assets/styles/wrappers/popUpSideBarChat';

const PopUpSideBarChat = () => {
  return (
    <PopUPModel action={onInboxToggle}>
      <Wrapper>
        <SideBarChat/>
      </Wrapper>
    </PopUPModel>
  );
};

export default PopUpSideBarChat;

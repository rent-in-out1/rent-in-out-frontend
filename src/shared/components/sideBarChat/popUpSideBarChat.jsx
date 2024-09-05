import React from 'react';
import { Wrapper } from '../../../assets/styles/wrappers/popUpSideBarChat';
import { onInboxToggle } from '../../../redux/features/toggleSlice';
import PopUPModel from '../../UI/popup/popUpModel';
import SideBarChat from './sideBarChat';

const PopUpSideBarChat = () => {
	return (
		<PopUPModel action={onInboxToggle}>
			<Wrapper>
				<SideBarChat />
			</Wrapper>
		</PopUPModel>
	);
};

export default PopUpSideBarChat;

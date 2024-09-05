type messageObj = {
	sender: string;
	userName: string;
	message: string;
};

export interface IMessageModel {
	ownerName: string;
	ownerImg: string;
	userName: string;
	userImg: string;
	roomID: string;
	creatorID: string;
	userID: string;
	messagesArr: messageObj;
}

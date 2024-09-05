import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import FillChat from '../../../assets/icons/fillChat';
import { onInboxClose } from '../../../redux/features/toggleSlice';
import { getUserInbox } from '../../../redux/features/userSlice';
import UserSingleChat from './userSingleChat/userSingleChat';
import Inbox from '../../../assets/icons/inbox';

const SideBarChat = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const { user, inbox } = useSelector((state) => state.userSlice);

	useEffect(() => {
		dispatch(getUserInbox());
	}, []);

	return (
		<div className='lg:w-3/12 xl:w-2/12 p-1 top-16 -right-1 lg:fixed'>
			<div className='overflow-y-auto py-4 w-full mt-4 text-center px-2 bg-white lg:shadow-xl rounded'>
				<h3 className='flex items-center justify-center'>
					<Inbox width={30} /> <span className='pr-1 font-semibold text-3xl'>Inbox</span>
				</h3>

				<hr />
				{/* all users with last chat here */}
				<div className='min-h-[120px] flex items-center pt-2'>
					{inbox.length > 0 ? (
						<div className='w-full'>
							<div className='dropdown rounded'>
								{inbox?.map((msg) => (
									<div
										className='overflow-hidden'
										key={msg.roomID}
										onClick={() => {
											user.role === 'admin'
												? nav(`/admin/chat/${msg.roomID}/${msg.creatorID}`)
												: nav(`/chat/${msg.roomID}/${msg.creatorID}`);
											dispatch(onInboxClose());
										}}
									>
										<UserSingleChat msg={msg} />
									</div>
								))}
							</div>
						</div>
					) : (
						<div className='w-full text-sm text-center rounded py-1'>
							<span className='w-100 flex justify-center mb-3'>
								<FillChat width={50} height={40} color='#6B7280' />
							</span>
							<div className='font-bold'>No Messages</div>
							<span>Looks like your inbox is empty</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBarChat;

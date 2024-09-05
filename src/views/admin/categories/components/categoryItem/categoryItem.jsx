import React, { useRef, useState } from 'react';
import { BsHammer, BsTrash } from 'react-icons/bs';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteCategory, editCategory } from '../../../../../redux/features/categorieSlice';

const CategoryItem = ({ item, setIsChange }) => {
	const dispatch = useDispatch();
	const infoRef = useRef();
	const nameRef = useRef();
	const urlRef = useRef();
	const category = item;
	const [onEdit, setOnEdit] = useState(false);
	const [editData, setEditData] = useState({});
	return (
		<tr>
			<td>
				{!onEdit ? (
					<p className='text-gray-900 whitespace-no-wrap'>{category?.name}</p>
				) : (
					/* title input */
					<div className='w-full mb-2 md:mb-0 flex justify-center'>
						<input
							onChange={() => {
								setEditData({
									name: nameRef.current.value,
									url_name: urlRef.current.value,
									info: infoRef.current.value,
								});
							}}
							ref={nameRef}
							defaultValue={category?.name}
							type='text'
							max='25'
							min='2'
						/>
					</div>
				)}
			</td>
			<td>
				{!onEdit ? (
					<p className='text-gray-900 whitespace-no-wrap'>{category?.url_name}</p>
				) : (
					/* url name input */
					<div className='w-full mb-2 md:mb-0 flex justify-center'>
						<input
							onChange={() => {
								setEditData({
									name: nameRef.current.value,
									url_name: urlRef.current.value,
									info: infoRef.current.value,
								});
							}}
							ref={urlRef}
							disabled
							defaultValue={category?.url_name}
							type='text'
							max='25'
							min='2'
						/>
					</div>
				)}
			</td>
			<td>
				<p className='text-gray-900 whitespace-no-wrap'>
					{category?.creator_id?.fullName?.firstName} {category?.creator_id?.fullName?.lastName}
				</p>
			</td>
			<td>
				{!onEdit ? (
					<p className='text-gray-900 whitespace-no-wrap'>{category?.info}</p>
				) : (
					/* info input */
					<div className='w-full mb-2 md:mb-0 flex justify-center'>
						<input
							onChange={() => {
								setEditData({
									name: nameRef.current.value,
									url_name: urlRef.current.value,
									info: infoRef.current.value,
								});
							}}
							ref={infoRef}
							defaultValue={category?.info}
							type='text'
							max='99'
							min='2'
						/>
					</div>
				)}
			</td>
			<td>
				<p className='text-gray-900 whitespace-no-wrap'>
					{new Date(category?.craetedAt).toLocaleDateString()} {new Date(category?.craetedAt).toLocaleTimeString()}
				</p>
			</td>
			<td>
				<p className='text-gray-900 whitespace-no-wrap'>
					{new Date(category?.updatedAt).toLocaleDateString()} {new Date(category?.updatedAt).toLocaleTimeString()}
				</p>
			</td>
			{!onEdit ? (
				<td>
					<span
						onClick={() => {
							setOnEdit(true);
						}}
						className='btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900'
					>
						<span aria-hidden className={'absolute inset-0 bg-blue-200 opacity-50 rounded-full'}></span>
						<span className='relative'>
							<BsHammer
								onClick={() => {
									setOnEdit(true);
								}}
							/>
						</span>
					</span>
				</td>
			) : (
				<td>
					<span className='relative'>
						<span className='absolute -bottom-4 -left-3 '>
							<span className='btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-green-900 '>
								<FaCheckCircle
									className='mx-2 absolute left-3 bottom-0 inset-0 opacity-50 rounded-full'
									onClick={() => {
										dispatch(editCategory({ id: category._id, name: category?._id, editData, setOnEdit }));
										setIsChange(true);
									}}
								/>
							</span>
						</span>
						<span className='absolute -bottom-4 -left-3'>
							<span>
								<span className='btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-red-900'>
									<FaBan
										onClick={() => {
											if (window.confirm('Are you sure you want to discard changes?')) setOnEdit(false);
											setIsChange(true);
										}}
										className='absolute -left-4 -bottom-0 inset-0  opacity-50 rounded-full'
									/>
								</span>
							</span>
						</span>
					</span>
				</td>
			)}
			<td>
				<p className='text-gray-900 whitespace-no-wrap'>
					{category?.editor_id?.fullName?.firstName} {category?.editor_id?.fullName?.lastName}
				</p>
			</td>
			<td>
				<span
					onClick={() => {
						dispatch(deleteCategory({ id: category._id, name: category.name }));
						setIsChange(true);
					}}
					className='btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900'
				>
					<span aria-hidden className={'absolute inset-0 bg-red-200 opacity-50 rounded-full'}></span>
					<span className='relative'>
						<BsTrash />
					</span>
				</span>
			</td>
		</tr>
	);
};

export default CategoryItem;

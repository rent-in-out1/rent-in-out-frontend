import React, { useRef, useState } from 'react';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../../../redux/features/categorieSlice.js';
import { errorHandler, successHandler } from '../../../../../util/functions';

const CategoryForm = ({ setIsChange, setOnAdd }) => {
	const dispatch = useDispatch();
	const infoRef = useRef();
	const nameRef = useRef();
	const urlRef = useRef();
	const [addData, setAddData] = useState({});
	const addNewCategory = async () => {
		if (addData && addData.name && addData.url_name && addData.info) {
			dispatch(addCategory(addData));
			setIsChange(true);
			setOnAdd(false);
			successHandler('Added new category successfully');
		} else {
			errorHandler('Please fill in all fields');
		}
	};

	return (
		<tr>
			<td>
				<div className='w-full mb-1 md:mb-0 flex justify-center'>
					<input
						onChange={() => {
							setAddData({
								name: nameRef.current.value,
								url_name: urlRef.current.value,
								info: infoRef.current.value,
							});
						}}
						ref={nameRef}
						type='text'
						max='25'
						min='2'
						placeholder='Category Name'
					/>
				</div>
			</td>
			<td>
				<div className='w-full mb-1 md:mb-0 flex justify-center'>
					<input
						onChange={() => {
							setAddData({
								name: nameRef.current.value,
								url_name: urlRef.current.value,
								info: infoRef.current.value,
							});
						}}
						ref={urlRef}
						type='text'
						max='25'
						min='2'
						placeholder='Category URL name'
					/>
				</div>
			</td>
			<td>
				<p>-</p>
			</td>
			<td>
				<div className='w-full mb-1 md:mb-0 flex justify-center'>
					<input
						onChange={() => {
							setAddData({
								name: nameRef.current.value,
								url_name: urlRef.current.value,
								info: infoRef.current.value,
							});
						}}
						ref={infoRef}
						type='text'
						max='25'
						min='2'
						placeholder='Category Info'
					/>
				</div>
			</td>
			<td>
				<p>-</p>
			</td>
			<td>
				<p>-</p>
			</td>
			<td>
				<p>-</p>
			</td>
			<td>
				<p>-</p>
			</td>
			<td>
				<span className='relative'>
					<span className='absolute -bottom-4 -left-3 '>
						<span className='btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-green-900 '>
							<FaCheckCircle
								className='mx-2 absolute left-3 bottom-0 inset-0 opacity-50 rounded-full'
								onClick={async () => {
									addNewCategory();
								}}
							/>
						</span>
					</span>
					<span className='absolute -bottom-4 -left-3'>
						<span>
							<span className='btn text-xl text-blue-300 relative cursor-pointer inline-block p-2 font-semibold leading-tight hover:text-red-900'>
								<FaBan
									onClick={() => {
										setOnAdd(false);
										setAddData({});
									}}
									className='absolute -left-4 -bottom-0 inset-0  opacity-50 rounded-full'
								/>
							</span>
						</span>
					</span>
				</span>
			</td>
		</tr>
	);
};

export default CategoryForm;

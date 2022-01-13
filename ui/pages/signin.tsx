import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import React, { ChangeEventHandler } from 'react';

const Signin = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			username: '',
			password: '',
		},
		validationSchema: yup.object().shape({
			username: yup.string().required('Required'),
			password: yup.string().required('Required').min(8, 'Too short'),
		}),
		onSubmit: async values => {
			axios
				.post('/api/auth/signin', values)
				.then(response => {})
				.catch(error => {
					console.log('error', error);
				});
		},
	});

	const inputKeys = ['username', 'password'];
	const inputs = {
		username: {
			label: 'Username',
		},
		password: {
			label: 'Password',
			type: 'password',
		},
	};

	return (
		<div className="container flex h-full w-full">
			<form
				onSubmit={formik.handleSubmit}
				className="bg-gray-50 p-10 rounded-lg absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4 w-9/12 lg:w-800"
			>
				{inputKeys.map((key, index) => {
					const error = formik.touched[key] && formik.errors[key];
					return (
						<div key={index} className="py-4">
							<p
								className={`mb-2${
									error ? ' text-red-400' : ''
								}`}
							>
								{inputs[key].label}
								{error && ` (${formik.errors[key]})`}
							</p>
							<input
								onChange={formik.handleChange}
								name={key}
								value={formik.values[key]}
								className={`shadow border border-gray-100 py-1 px-2 rounded w-full${
									error ? ' border-red-400' : ''
								}`}
								type={inputs[key].type}
							/>
						</div>
					);
				})}

				<button className="bg-gray-800 text-gray-50 w-full mt-4 p-2 rounded">
					Signin
				</button>
			</form>
		</div>
	);
};

export default Signin;

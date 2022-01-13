import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Signin = () => {
	const [emailOk, setEmailOK] = useState(false);
	const [usernameOk, setUsernameOK] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			username: '',
			password: '',
		},
		validationSchema: yup.object().shape({
			email: yup.string().required('Required').email('Invalid email'),
			firstName: yup.string().required('Required'),
			lastName: yup.string().required('Required'),
			username: yup.string().required('Required'),
			password: yup.string().required('Required').min(8, 'Too short'),
		}),
		onSubmit: async values => {
			if (!emailOk || !usernameOk) {
				return;
			}

			axios
				.post('/api/auth/signup', values)
				.then(response => {
					console.log('response', response);
				})
				.catch(error => {
					console.log('error', error);
				});
		},
	});

	const onBlurEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		axios
			.post('/api/is-email-available', { email: value })
			.then(response => {
				setEmailOK(response.data.result);
			})
			.catch(error => {
				console.log('error', error);
			});
		formik.handleChange(e);
	};

	const onBlurUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		axios
			.post('/api/is-username-available', { username: value })
			.then(response => {
				setUsernameOK(response.data.result);
			})
			.catch(error => {
				console.log('error', error);
			});
		formik.handleChange(e);
	};

	const inputKeys = [
		'firstName',
		'lastName',
		'email',
		'username',
		'password',
	];
	const inputs = {
		firstName: {
			label: 'First Name',
		},
		lastName: {
			label: 'Last Name',
		},
		email: {
			label: 'Email',
			onBlur: onBlurEmail,
		},
		username: {
			label: 'Username',
			onBlur: onBlurUsername,
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
								onBlur={
									'onBlur' in inputs[key]
										? inputs[key].onBlur
										: null
								}
								name={key}
								value={formik.values[key]}
								className={`shadow border border-gray-100 py-1 px-2 rounded w-full${
									error ? ' border-red-400' : ''
								}`}
								type={
									'type' in inputs[key]
										? inputs[key].type
										: null
								}
							/>
						</div>
					);
				})}

				<button className="bg-gray-800 text-gray-50 w-full mt-4 p-2 rounded">
					Create Account
				</button>
			</form>
		</div>
	);
};

export default Signin;

import { useState } from 'react'
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";

import '../App.css'

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import EmailIcon from '../assets/email-icon.svg'
import PasswordIcon from '../assets/lock-icon.svg'
import UserIcon from '../assets/user-icon.svg'

// Components
import { Input } from "../components/Input";
import { Button } from '../components/Button'

//Function
import { signOut } from '../context/auth'

// Form schema
const schema = yup
	.object({
		email: yup
			.string()
			.email("Insira um email válido")
			.required("Campo email é obrigatório"),
		password: yup.string().required("Campo senha é obrigatório"),
		name: yup.string().required("Campo nome é obrigatório"),
	})
	.required();

export function Dashboard() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();

	// Hooks
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async ({ name, email, password }) => {
		const user = await signOut({ name, email, password, setError });
		console.log(user);

		if (user.status === 200) {
			history.push('list');
		}
	};

	return (
		<div className='container'>
			<div>
				Made by Victor and Marlon
			</div>
			<h1>Dev + Web</h1>
			<div className="card">
				<div>
					<form className="login__form" onSubmit={handleSubmit(onSubmit)}>
						<Input
							placeholder="Digite seu nome"
							name="name"
							type="text"
							leftElement={<img src={UserIcon} alt="User icon" />}
							required
							isErrored={!!errors.name}
							errorMessage={errors.name?.message}
							register={register}
						/>
						<Input
							placeholder="Digite seu email"
							name="email"
							type="email"
							leftElement={<img src={EmailIcon} alt="User icon" />}
							required
							isErrored={!!errors.email}
							errorMessage={errors.email?.message}
							register={register}
						/>
						<Input.Password
							placeholder="Digite sua senha"
							name="password"
							leftElement={<img src={PasswordIcon} alt="User icon" />}
							required
							isErrored={!!errors.password}
							errorMessage={errors.password?.message}
							register={register}
						/>
						<div className='flex-align'>
							<Button type="submit" isLoading={loading} >
								Cadastrar
							</Button>
							{error !== null ? (
								<span style={{ color: '#df9292' }}>{error}</span>
							) : null}
						</div>
					</form>

				</div>
			</div>
			<a onClick={() => history.push('/list')} style={{ cursor: 'pointer' }}>
				GO TO LIST
			</a>
			<p className="read-the-docs">
				Click <a href="">here</a> to see github repository
			</p>
		</div>
	)
}
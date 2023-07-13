import { useState, useEffect } from 'react'
import '../App.css'
import { useHistory } from "react-router-dom";

import api from '../services/api';

import Avatar from "react-avatar";
import CloseIcon from '../assets/close-icon.svg'
import ArrowLeftIcon from '../assets/arrow-left-icon.svg'

export function List() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);

	const history = useHistory();

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			await api.get('users').then(res => {
				setUsers(res.data);
				console.log(res);
				setLoading(false)
			})
		}
		fetchData();
	}, [])

	async function deleteUser(id) {
		await api.delete(`users/${id}`).then(res => {
			if (res.status === 200) {
				const newUsers = users.filter(user => user.id !== id);

				setUsers(newUsers);
			}
		})
	}

	return (
		<div className='container'>
			<div className="go-back" onClick={() => history.goBack()}>
				<img src={ArrowLeftIcon} alt="Close icon" />
			</div>
			<div className="card" id='custom-scroll'>
				{users.length > 0 ? users.map((user, i) => (
					<div style={{ marginBottom: '40px' }}>
						<div className="profile__wrapper">
							<div style={{ display: 'flex' }}>
								<Avatar name={user?.name} size="55" color="#c4c2c2" round />
								<div style={{ marginLeft: '15px', display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
									<p className="profile__title">{user.name}</p>
									<p className="profile__subtitle">Usuário Web Dev</p>
								</div>
							</div>
							<div>
								<button style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => deleteUser(user.id)}>
									<img src={CloseIcon} />
								</button>
							</div>
						</div>
						<div className='users-infos'>

							<div className='info'>
								<h2>Email</h2>
								<p>{user.email}</p>
							</div>
							<div className='info'>
								<h2>Senha</h2>
								<p>{user.password}</p>
							</div>
							<div className='info'>
								<h2>Criado em</h2>
								<p>{user.createdAt}</p>
							</div>
						</div>
						{i === users.length - 1 ? null : (<hr style={{ marginTop: '40px', opacity: '0.2' }} />)}
					</div>
				)) : (
					<h1>Nenhum usuário encontrado</h1>
				)}
			</div>
			<p className="read-the-docs">
				Click <a href="">here</a> to see github repository
			</p>
		</div>
	)
}
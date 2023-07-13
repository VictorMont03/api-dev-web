import api from '../services/api'

export const signOut = async ({ name, email, password, setError }) => {
	try {
		console.log(name, email, password);
		const response = await api.post("users", { name, email, password });

		return response;
	} catch (err) {
		if (err.response?.data?.message.errors[0].message) {
			setError('Email já cadastrado');
		} else {
			setError('Erro ao criar usuario');
			console.log(err);
		}

		return;
	}
};
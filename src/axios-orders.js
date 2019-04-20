import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burgerbuilderudemy.firebaseio.com/'
});

export default instance;
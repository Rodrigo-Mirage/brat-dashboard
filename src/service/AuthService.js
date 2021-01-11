import axios from 'axios'

export default {
    async postLogin (username, password){
        const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password,
        });
        return response.data.token;
    }
}

//import axios from 'axios'

export default {
    async postLogin (username, password){
        console.log("Login: " + username + " " + password);
        return true;
        /*
        const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password,
        });
        return response;
        */
    }
}

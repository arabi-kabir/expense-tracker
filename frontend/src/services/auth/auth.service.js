import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';
import axios from 'axios';

const login = (email, password) => {
    try {
        return RestClient.postRequest(AppUrl.authLogin, { email, password })
        .then(result => {
            if(result.status == 200) {
                localStorage.setItem("user", JSON.stringify(result.data))
                localStorage.setItem("token", JSON.stringify(result.data.token))
                //console.log(result.data);
            }
            return result;
        })
    } catch (error) {
        return error
    }
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    const res = JSON.parse(localStorage.getItem("user"));
    if(res) {
        return res
    } else {
        return false
    }
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["x-access-token"] = `${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

const AuthService = {
    login,
    logout,
    getCurrentUser,
    setAuthToken
}

export default AuthService;
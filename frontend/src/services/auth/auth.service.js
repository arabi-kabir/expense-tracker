import RestClient from '../../RestAPI/RestClient';
import AppUrl from '../../RestAPI/AppUrl';

const login = (email, password) => {
    try {
        return RestClient.postRequest(AppUrl.authLogin, { email, password })
        .then(result => {
            if(result.status == 200) {
                localStorage.setItem("user", JSON.stringify(result.data))
                console.log(result.data);
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
    console.log(res);
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
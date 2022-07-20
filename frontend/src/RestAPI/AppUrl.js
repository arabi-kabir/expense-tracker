class AppUrl {
    static baseUrl = 'http://127.0.0.1:8000/v1/';

    static authLogin = this.baseUrl + 'auth/login'
    static authRegister = this.baseUrl + 'auth/register'

    static getExpenses = this.baseUrl + 'expense'
}

export default AppUrl
class AppUrl {
    static baseUrl = 'http://127.0.0.1:8000/v1/';

    static authLogin = this.baseUrl + 'auth/login'
    static authRegister = this.baseUrl + 'auth/register'

    static getExpenses = this.baseUrl + 'expense'
    static expenseCategory = this.baseUrl + 'expense-category'
    static getMyBook = this.baseUrl + 'my-book'
    static insertExpense = this.baseUrl + 'expense'

    static expenseChartData = this.baseUrl + 'expense/expense-chart-data'

    static expenseReportData = this.baseUrl + 'report/expense'

    static myBook = this.baseUrl + 'my-book'
    static myBookLastExpenses = this.baseUrl + 'my-book/expenses'
}

export default AppUrl
const ExcelJS = require('exceljs')

const wb = new ExcelJS.Workbook()
const ws = wb.addWorksheet('My Sheet')

const headers = [
    { header: 'Expense', key: 'exp', width: 15 },
    { header: 'Amount', key: 'amt', width: 15 },
    { header: 'Payment Method', key: 'pm', width: 15 },
    { header: 'Created at', key: 'cr', width: 15 },
]

ws.columns = headers;

ws.addRows([
    ['Expense', 'Amount', 'Payment Method', 'Created at'],
    ['burger', 200, 'Bkash', '2021-10-2'],
    ['KK', 440, 'Bkash', '2021-10-2'],
    ['IDK', 232, 'City', '2021-10-2'],
])

// write write to file
const fileName = 'expense_report.xlsx'

wb.xlsx
  .writeFile(fileName)
  .then(() => {
    console.log('file created');
  })
  .catch(err => {
    console.log(err.message);
  })
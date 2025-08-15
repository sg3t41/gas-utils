// test
function sayHello() {
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = spreadsheet.getActiveSheet();
	sheet.getRange('A1').setValue('Hello, World!');
}

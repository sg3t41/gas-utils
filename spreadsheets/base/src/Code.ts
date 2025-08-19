/**
 * スプレッドシートに "Hello, World!" をログ出力する関数です。
 */
function helloWorld(): void {
	Logger.log("Hello, World!");
}


/**
 * 指定された年の月ごとのシートをスプレッドシートに作成します。
 * すでにシートが存在する場合はスキップします。
 *
 * @param {number} year - シートを作成する年 (例: 2024)。
 * @returns {void}
 */
function createMonthlySheets(year: number): void {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	for (let month = 1; month <= 12; month++) {
		const sheetName = `${year}-${String(month).padStart(2, '0')}`;
		const existingSheet = spreadsheet.getSheetByName(sheetName);
		if (!existingSheet) {
			spreadsheet.insertSheet(sheetName);
			console.log(`Created sheet: ${sheetName}`);
		} else {
			console.log(`Sheet already exists: ${sheetName}`);
		}
	}
}

/**
 * スプレッドシートに今日の日付のシートを作成します。
 * シートが存在する場合はスキップします。
 */
function createDailySheets(): void {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const today = new Date();

	// シート名を「日」の形式（例: 19）で作成
	const day = today.getDate();
	const sheetName = String(day); // 日付の数字をそのまま文字列に変換

	const existingSheet = spreadsheet.getSheetByName(sheetName);

	if (!existingSheet) {
		spreadsheet.insertSheet(sheetName);
		console.log(`Created daily sheet: ${sheetName}`);
	} else {
		console.log(`Daily sheet already exists: ${sheetName}`);
	}
}

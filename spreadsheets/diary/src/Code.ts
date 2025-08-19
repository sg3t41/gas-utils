/**
 * スプレッドシートを開いたときに自動で実行されます。
 * その日の日付のシートが存在しない場合は作成します。
 */
function onOpen(): void {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const today = new Date();

	// シート名を「日」の形式（例: 19）で作成
	const day = today.getDate();
	const sheetName = String(day);

	const existingSheet = spreadsheet.getSheetByName(sheetName);

	if (!existingSheet) {
		// シートが存在しない場合のみ作成
		spreadsheet.insertSheet(sheetName);
		Logger.log(`Created new sheet on open: ${sheetName}`);
	} else {
		Logger.log(`Sheet already exists: ${sheetName}`);
	}
}

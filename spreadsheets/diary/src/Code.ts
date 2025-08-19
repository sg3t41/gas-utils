"use strict"

/**
 * スプレッドシートを開いたときに自動で実行されます。
 * その日の日付のシートが存在しない場合は、日記帳のようなデザインのシートを作成します。
 */
function onOpen(): void {
	const spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	const today: Date = new Date()

	// シート名を「日」の形式（例: 19）で作成
	const sheetName: string = String(today.getDate())
	const existingSheet: GoogleAppsScript.Spreadsheet.Sheet | null = spreadsheet.getSheetByName(sheetName)

	// シートが存在する場合はログ出力して終了
	if (existingSheet) {
		Logger.log(`Sheet already exists: ${sheetName}`)
		return
	}

	const newSheet: GoogleAppsScript.Spreadsheet.Sheet = spreadsheet.insertSheet(sheetName)

	// シートの初期設定
	newSheet.setFrozenRows(2)
	newSheet.setColumnWidth(1, 10)
	newSheet.setColumnWidth(2, 600)

	// メインヘッダー（日付と曜日）
	const date: string = Utilities.formatDate(today, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy年MM月dd日")
	const dayOfWeek: string = ["日", "月", "火", "水", "木", "金", "土"][today.getDay()]

	const mainHeader: GoogleAppsScript.Spreadsheet.Range = newSheet.getRange("B1")
	mainHeader.setValue(`${date} (${dayOfWeek})`)
	mainHeader.setFontSize(24).setFontWeight("bold")

	// セクションの定義
	const sections: { header: string; background: string; height: number; startRow: number }[] = [
		{ header: "明日の予定", background: "#b6d7a8", height: 50, startRow: 5 },
		{ header: "日記", background: "#ead1dc", height: 50, startRow: 8 },
		{ header: "その他", background: "#f9cb9c", height: 50, startRow: 11 }
	]

	// セクションごとに createSection 関数を呼び出す
	sections.forEach(section => {
		createSection(newSheet, section.header, section.background, section.height, section.startRow)
	})

	Logger.log(`Created new sheet on open: ${sheetName}`)
}

/**
 * 指定されたシートに日記のセクションを作成します。
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - セクションを作成するシート
 * @param {string} headerText - セクションの見出しテキスト
 * @param {string} backgroundColor - セクションの背景色
 * @param {number} rowHeight - 記入欄の行の高さ
 * @param {number} startRow - セクションの見出しの開始行
 */
function createSection(sheet: GoogleAppsScript.Spreadsheet.Sheet, headerText: string, backgroundColor: string, rowHeight: number, startRow: number): void {
	const headerRange: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(`B${startRow}`)
	headerRange.setValue(headerText).setBackground(backgroundColor).setFontWeight("bold")

	const contentRow: number = startRow + 1
	sheet.setRowHeight(contentRow, rowHeight)

	const contentRange: GoogleAppsScript.Spreadsheet.Range = sheet.getRange(`B${contentRow}`)
	contentRange.setBorder(true, true, true, true, null, null)

	// 記入欄の文字を左上揃えにする
	contentRange.setHorizontalAlignment("left")
	contentRange.setVerticalAlignment("top")

	// テキストの折り返しを有効にする
	contentRange.setWrap(true)
}

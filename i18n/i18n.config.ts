export default (() => ({
	pluralRules: {
		ru: pluralizationRule,
	}
}))

function pluralizationRule(choice: number) {
	let cases = [2, 0, 1, 1, 1, 2]

	return (choice % 100 > 4 && choice % 100 < 20)
		? 2
		: cases[(choice % 10 < 5) ? choice % 10 : 5];
}
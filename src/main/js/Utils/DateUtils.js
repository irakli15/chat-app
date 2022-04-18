const getTimeString = (time) => {
	const givenTime = new Date(time);
	const currentTime = new Date();
	if (currentTime.getDay() - givenTime.getDay() > 0) {
		return givenTime.getMonth() + "/" + givenTime.getDay() + "/" + givenTime.getFullYear();
	} else {
		return getZeroBeforeDigitNumber(givenTime.getHours()) + ":" + getZeroBeforeDigitNumber(givenTime.getMinutes());
	}
}

const getZeroBeforeDigitNumber = (number) => {
	return number < 10 ? "0" + number : number;
}

export default getTimeString;
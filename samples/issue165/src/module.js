const answer = 42
export default function (something, punctuation = '!') {
	if (something === 'test') {
		console.log('Testing something.')
	}

	return answer + punctuation
}
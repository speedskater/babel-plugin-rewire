let b = [ 3, 6, 1 ];

export default function addOneToEachB()
{
	let c = [];
	for (let a in b) {
		c.push(b[a] + 1)
	}
	return c;
}

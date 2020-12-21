const fs = require('fs');

fs.writeFile('./test.txt', 'hello，it,s me', {
	encoding: 'utf8'
}, err => {
	if(err) throw err;
	console.log('done!');
});

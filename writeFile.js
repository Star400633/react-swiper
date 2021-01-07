const fs = require('fs');
const shell = require('shelljs')
const date = new Date().getTime()

fs.writeFile('./test.txt', `hello，it,s me, time:${date}`, {
	encoding: 'utf8'
}, err => {
	if(err) throw err;
	console.log('done!');
  
  shell.exec(`git add ./ && git commit -m "${date}" && git push`)
});

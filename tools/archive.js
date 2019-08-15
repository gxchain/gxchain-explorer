require('shelljs/global');

var path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var archiveFilePath = path.join(__dirname, 'gxb-explorer.zip');
var archive = archiver('zip');
var ora = require('ora');

var isTest = process.env.test;
var isDev = process.env.dev;

rm('-rf', archiveFilePath);

var spinner = ora('archiving...');
spinner.start();

var output = fs.createWriteStream(archiveFilePath);

output.on('close', function () {
    spinner.stop();
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

// archive.directory('../node_modules', true, { date: new Date() });
archive.directory('../build', true, {date: new Date()});
archive.directory('../config', true, {date: new Date()});
archive.directory('../server-dist', true, {date: new Date()});
archive.directory('../dist', true, {date: new Date()});
if (isTest) {
    console.log('test env');
    archive.file('../start-test.sh', {date: new Date(), name: 'start.sh'});
} else if (isDev) {
    console.log('dev env');
    archive.file('../start-test.sh', {date: new Date(), name: 'start.sh'});
}
else {
    archive.file('../start.sh', {date: new Date(), name: 'start.sh'});
}
archive.file('../package.json', {date: new Date(), name: 'package.json'});

archive.finalize();

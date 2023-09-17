const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFilePath = path.join(logsDir, `${getCurrentDate()}.log`);
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });


const logger = morgan((tokens, req, res) => {
    let logArray = [
        tokens.date(req, res, 'clf'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms"
    ];

    const logMessage = logArray.join(' ');

    if (res.statusCode >= 400) {
        console.log(chalk.redBright(logMessage));
        logStream.write(logMessage + '\n');
    } else {
        console.log(chalk.greenBright(logMessage));
        
    }
});

module.exports = logger;

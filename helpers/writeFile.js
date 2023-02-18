const fs = require('fs')

function writeFile (req) {
  const dataFileName = `./data-db/${req.session.login.email?.split('@')[0]}.json`
  const dataTasks = {'tasks': req.session.tasks, 'completed': req.session.completed}
  fs.writeFileSync(dataFileName, JSON.stringify(dataTasks), 'utf-8')
}

module.exports = writeFile

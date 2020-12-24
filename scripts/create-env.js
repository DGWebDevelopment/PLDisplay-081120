const fs = require('fs')
fs.writeFileSync('./.env',`myAPIPassword=${process.env.REACT_APP_MY_API_PASSWORD}`)
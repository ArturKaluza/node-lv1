const { createLogger, format, transports  } = require('winston');
const { combine, timestamp, label } = format


const logger = createLogger({
  level: 'info',
  format: combine( 
    format.json(),    
    format.timestamp({
      format: 'YYYY-MM-DD'
    })
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log'})
  ]
});

module.exports = { logger };
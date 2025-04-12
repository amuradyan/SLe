const logLevels = {
  DEBUG: "DEBUG",
  ERROR: "ERROR",
};

let currentLogLevel = logLevels.ERROR;

function setupLogging(enabled = true) {
  currentLogLevel = enabled ? logLevels.DEBUG : logLevels.ERROR;
}

const logger = {
  log: (level, msg) => {
    if (level === logLevels.DEBUG && currentLogLevel === logLevels.ERROR) {
      return;
    }
    console.log(`${level} ${msg}`);
  },
};

const log = {
  debug: (msg) => logger.log(logLevels.DEBUG, msg),
  info: (msg) => logger.log(logLevels.DEBUG, msg), // Assuming info is treated as DEBUG
  warning: (msg) => logger.log(logLevels.DEBUG, msg), // Assuming warning is treated as DEBUG
  error: (msg) => logger.log(logLevels.ERROR, msg),
  enable: () => setupLogging(true),
  disable: () => setupLogging(false),
};

setupLogging(false);

export { log, setupLogging };

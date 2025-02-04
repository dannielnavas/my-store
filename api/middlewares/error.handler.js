function logErrors(err, req, res, next) {
  // aquí se envia a un servicio de log como sentry
  console.error(err.stack);
  next(err); // si no se envía nada es porque es exitoso
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  // next(); no se usa porque es el final del proceso
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };

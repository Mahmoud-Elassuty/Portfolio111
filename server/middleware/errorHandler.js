// Centralized error handler. Keeps unexpected failures (bad JSON body,
// file read/write errors, etc.) from ever crashing the process or leaking
// stack traces to the client.
function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid request body." });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server. Please try again shortly.",
  });
}

module.exports = errorHandler;

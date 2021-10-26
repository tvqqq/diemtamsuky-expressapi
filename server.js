// init express
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// api json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mongoose connect
const database = require("./config/database");
database.connect();

// cors
const cors = require("cors");
app.use(cors());

// [Sentry] Setting
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// route
const route = require("./routes");
route(app);

// [Sentry] The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// [Sentry] Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// listen
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

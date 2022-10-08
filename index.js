const handler = require("./handler");
const PORT = process.env.PORT || 3001;

handler.default.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);

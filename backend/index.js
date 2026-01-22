import "dotenv/config";
import app from "./src/app.js";
import testRoutes from "./src/routes/test.routes.js";

const PORT = 5000;
// app.use("/api/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

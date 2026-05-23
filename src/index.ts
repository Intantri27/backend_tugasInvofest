import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute";
import categoryRoute from "./routes/categoryRoute";
import pembicaraRoute from "./routes/pembicaraRoutes";

const app = express();
const port = process.env.PORT || 3000; // ← pakai env variable

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use('/events', eventRoute);
app.use('/categories', categoryRoute);
app.use('/pembicara', pembicaraRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
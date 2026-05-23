import Express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute";
import categoryRoute from "./routes/categoryRoute";
import pembicaraRoute from "./routes/pembicaraRoutes";

const app = Express();
const port = 3000;
app.use(cors())


app.use(Express.json());

app.get("/", (req, res) => {
  res.send("Hello Invofest");
});
app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/pembicara", pembicaraRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
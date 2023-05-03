import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/flights", async (req, res) => {
  const flights = await db.collection("flights").find().toArray();

  if (flights) {
    res.json(flights);
  } else {
    res.sendStatus(404);
  }
});

app.get("/api/flights/:flight_id", async (req, res) => {
  const { flight_id } = req.params;
  const flight = await db.collection("flights").findOne({ flight_id });

  if (flight) {
    res.json(flight);
  } else {
    res.sendStatus(404);
  }
});

connectToDb(() => {
  console.log("Successfully connected to database!");
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
});

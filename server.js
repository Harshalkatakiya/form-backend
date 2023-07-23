const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

const dbConnectionStr =
  "mongodb+srv://imbuesoftworld:mqmMHkuWGMtCCXlo@cluster0.sozqsp2.mongodb.net/avsar";

let ParticipatesCollection;

try {
  mongoose
    .connect(dbConnectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

  ParticipatesCollection = mongoose.model("participates");
} catch {
  const participatesCollectionSchema = new mongoose.Schema({}, { strict: false });
  ParticipatesCollection = mongoose.model("participates", participatesCollectionSchema);
}

const getParticipates = async () => {
  const participates = await ParticipatesCollection.find({});
  return participates;
};

app.get("/api/participates", async (req, res) => {
  getParticipates()
    .then((foundParticipates) => {
      res.json(foundParticipates);
    })
    .catch((err) => {
      console.error("Error fetching data from MongoDB:", err);
      return res.status(500).json({ error: "Error fetching data from MongoDB" });
    });
});

app.get("/", (req, res) => {
  return res.json("API is Live!");
});

app.listen(PORT, () => {
  console.log(`Server is listenting to Port Number ${PORT}`);
});

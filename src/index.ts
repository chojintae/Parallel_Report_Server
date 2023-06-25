import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
import { send_latest_articles_IMAGE, send_latest_articles_TEXT } from "./routes";


// Configure and start the HTTP server.
const port = 8088;
const app = express();
const imagePath = path.join(__dirname, "../src/articles/img");

// Increase the maximum number of listeners for ServerResponse
app.setMaxListeners(0); // Set a higher limit based on your requirements

app.get("/api/send_latest_articles_IMAGE", (req, res) => {
  const { SN } = req.query;
  const imageName = `SN${SN}_1.png`;

  res.sendFile(path.join(imagePath, imageName), (err) => {
    if (err) {
      console.error(`Error sending image ${imageName}: ${err}`);
      res.sendStatus(404); // Send 404 response if the image file is not found
    }
  });
});

app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../src/articles/img')));
app.post("/api/send_latest_articles_IMAGE", send_latest_articles_IMAGE);
app.post("/api/send_latest_articles_TEXT", send_latest_articles_TEXT);

app.listen(port, () => console.log(`Server listening on ${port}`));
import { Request, Response } from "express";
import * as path from "path";
import fs from 'fs';

const latest_SNs: number[] = [1,2,3,4,5,6,7,8,9,10]

// export function send_latest_SNs(_:Request, res: Response) {

// }

export function send_latest_articles_IMAGE(_: Request, res: Response) {
  const imagePath = path.join(__dirname, "../src/articles/img");

  const filePromises = latest_SNs.map((SN) => {
    const imageName = `SN${SN}_1.png`;

    return new Promise<void>((resolve, reject) => {
      res.sendFile(path.join(imagePath, imageName), (err) => {
        if (err) {
          console.error(`Error sending image ${imageName}: ${err}`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });

  Promise.all(filePromises)
  .then(() => {
    console.log("All files sent successfully");
  })
  .catch((err) => {
    console.error("Error sending files:", err);
  });
}


export function send_latest_articles_TEXT(_: Request, res: Response) {
  const latest_SNs: number[] = [1,2,3,4,5,6,7,8,9,10]
  const textPath = path.join(__dirname, "../src/articles/text");
  
  const filePromises = latest_SNs.map((SN) => {
    const textName = `SN${SN}.json`;
    const filePath = path.join(textPath, textName);

    return new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${textName}: ${err}`);
          reject(err);
        } else {
          resolve(data)
        }
      });
    });
  });

  Promise.all(filePromises)
  .then((fileContents) => {
    res.send(fileContents);
  })
  .catch((err) => {
    console.error("Error sending files:", err);
    res.sendStatus(500); // Sending an error response status
  });
}

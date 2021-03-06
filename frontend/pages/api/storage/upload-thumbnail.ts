require("dotenv").config();
import { Storage } from "@google-cloud/storage";

export default async function handler(req, res) {
  const { cuid } = req.body;

  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket("video-world-thumbnail");
  const file = bucket.file(cuid);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  console.log("Uploaded thumbnail", cuid);
  res.status(200).json({ response });
}

require("dotenv").config();
const textToSpeech = require("@google-cloud/text-to-speech");

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    private_key: process.env.GCP_PRIVATE_KEY,
    client_email: "owner-107@video-world-308113.iam.gserviceaccount.com",
  },
});

export default async (req, res) => {
  const request = {
    input: { text: req.query.text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: req.query.language },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "OGG_OPUS", speakingRate: 0.5 },
  };

  const [response] = await client.synthesizeSpeech(request);

  res.status(200).json({ audio: response });
};

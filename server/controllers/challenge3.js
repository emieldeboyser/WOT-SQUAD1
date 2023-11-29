import MQTTSingleton from "../lib/mqttSingleton.js";

export const startChallenge3 = (req, res) => {
  try {
    MQTTSingleton.getClient()
      .subscribeOnce("prop3/index")
      .then(() => {
        res.status(200).json("startChallenge3");
      });
    MQTTSingleton.getClient().publish("prop4/index");
  } catch (e) {
    console.error(e);
  }
};

export const puzzleCompleteProp3 = (req, res) => {
  try {
    // Subscribe to the puzzleComplete topic and respond to the client once
    MQTTSingleton.getClient()
      .subscribeOnce("prop3/puzzleComplete")
      .then((message) => {
        if (message === "completed") {
          res.status(200).json({ completed: true });
          MQTTSingleton.getClient().publish("prop4/index");
        } else {
          res.status(200).json({ completed: false });
        }
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

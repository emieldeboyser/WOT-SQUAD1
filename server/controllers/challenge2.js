import MQTTSingleton from "../lib/mqttSingleton.js";

export const startChallenge2 = (req, res) => {
  try {
    MQTTSingleton.getClient()
      .subscribeOnce("prop2/index")
      .then(() => {
        res.status(200).json("startChallenge2");
      });
    MQTTSingleton.getClient().publish("prop3/index");
  } catch (e) {
    console.error(e);
  }
};

export const puzzleCompleteProp2 = (req, res) => {
  try {
    // Subscribe to the puzzleComplete topic and respond to the client once
    MQTTSingleton.getClient()
      .subscribeOnce("prop2/puzzleComplete")
      .then((message) => {
        if (message === "completed") {
          res.status(200).json({ completed: true });
          MQTTSingleton.getClient().publish("prop3/index");
        } else {
          res.status(200).json({ completed: false });
        }
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

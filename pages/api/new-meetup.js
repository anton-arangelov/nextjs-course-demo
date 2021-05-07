import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      //password should be repolaced and Mydatabase should be replaced with whatever
      "mongodb+srv://Anton:Narabota01@cluster0.ecnwz.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne({ data });

    console.log(result);

    client.close()

    res.status(201).json({message: "Meetup inserted"})
  }
};

export default handler;

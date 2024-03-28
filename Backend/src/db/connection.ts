import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    throw new Error("Unable to connect to Database");
  }
}
async function disConnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Unable to Disconnect");
  }
}

export { connectToDatabase, disConnectFromDatabase };

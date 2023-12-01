const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getApiData=require("./src/controllers/getApiData.js")

// Define an async function to initialize the server and fetch data
const initializeServer = async () => {
  try {
    // Call the getApiData function to fetch and save data
    await getApiData();

    // Syncing all the models at once.
    conn.sync({ force: false }).then(() => {
      console.log("DB connected to server :)");
      const PORT = 5000;
      server.listen(PORT, () => {
        console.log(`{server listening at port ${PORT}}`); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error("Error initializing server:", error);
  }
};

// Call the initializeServer function to start the server and fetch data
initializeServer();








const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    // Step 1: Confirm the database connection exists
    console.log('Attempting to connect to the database...');
    const dbInstance = mongodb.getDb();
    if (!dbInstance) {
      console.error('Database connection failed: DB instance is undefined or null.');
      res.status(500).json({ message: 'Database connection failed' });
      return;
    }
    console.log('Database connection established.');
    // Step 2: Query the contacts collection and confirm its existence
    const db = dbInstance.db();
    console.log('Using database:', db.databaseName);  // This should print the name of the connected database
 
    const collectionName = 'contacts';
    const collection = db.collection(collectionName);
    if (!collection) {
      console.error(`Collection "${collectionName}" not found in the database.`);
      res.status(500).json({ message: `Collection "${collectionName}" not found.` });
      return;
    }
 
    // Step 3: Query the collection and return the result
    const result = await collection.find().toArray();
    console.log(`Number of documents found in "${collectionName}":`, result.length);  // Should show how many documents were returned
    // Step 4: Send the result back to the client
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    // Step 5: Handle and log any errors
    console.error('Error while fetching contacts:', err);
    res.status(500).json({ message: 'Failed to fetch contacts.' });
  }
};

 
// const getContacts = async (req, res) => {
//   try {
//       const people = await Person.find(); // grab all records for collection
//       res.status(200).json(people); // if successful send response
//   } catch (err) {
//       res.status(500).json({ error: err.message }); // if unsuccessful send error message
//   }
// };

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  console.log("yes");
  const result = await mongodb
  
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
    
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

console.log("test2");
module.exports = { getAll, getSingle };
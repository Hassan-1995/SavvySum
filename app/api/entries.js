import client from "./client";

const endPoint = "/entries";

const getAllEntriesByParticular = async (particular_id) => {
  try {
    const result = await client.get(endPoint + "/" + particular_id);
    if (result.length === 0) {
      throw new Error(`Entry with particular id ${particular_id} not found`);
    }
    const entry = result.data;
    return entry;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const createEntryByParticularID = async (newEntry) => {
  console.log(
    "Creating entry ",
    newEntry.description,
    " for particularID: ",
    newEntry.particular_id
  );

  const data = {
    particular_id: newEntry.particular_id,
    amount: newEntry.amount,
    date: newEntry.date,
    description: newEntry.description,
    type: newEntry.type,
  };

  try {
    const result = await client.post(`${endPoint}`, data);
    // Check if the response has a valid data field
    if (!result || !result.data) {
      throw new Error(
        `Failed to create entry for particular with ID ${particular_id}`
      );
    }
    const entry = result.data;
    return entry;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

const updateEntryByEntryID = async (entryID, updatedData) => {
  console.log(
    "Updating entry ",
    updatedData.description,
    " for entryID: ",
    entryID
  );

  try {
    const result = await client.put(`${endPoint}/${entryID}`, updatedData);
    // Check if the response has a valid data field
    if (!result || !result.data) {
      throw new Error(`Failed to update entry for ID ${updatedData.entry_id}`);
    }
    const entry = result.data;
    return entry;
  } catch (error) {
    console.error("Error updating entry: ", error);
    throw error;
  }
};
const deleteEntryByEntryID = async (entry_id) => {
  try {
    const result = await client.delete(endPoint + "/" + entry_id);
    if (result.length === 0) {
      throw new Error(`Entry with id ${entry_id} not deleted`);
    }
    const entry = result.data;
    return entry;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default {
  getAllEntriesByParticular,
  createEntryByParticularID,
  updateEntryByEntryID,
  deleteEntryByEntryID,
};

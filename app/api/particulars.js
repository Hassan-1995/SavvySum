import client from "./client";

const endPoint = "/particulars";

const getAllParticularsByLedgerID = async (ledger_id) => {
  try {
    const result = await client.get(endPoint + "/" + ledger_id);

    // Handle when data does not exist
    if (result.length === 0) {
      throw new Error(`Entry with ledger id ${ledger_id} not found`);
    }

    // Return the particulars if they exist
    return result.data;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error; // Ensure we keep the error handling for issues
  }
};
const createParticularByLedgerID = async (ledger_id, particular_name) => {
  console.log(
    "Creating particular ",
    particular_name,
    " for ledgerID: ",
    ledger_id
  );

  const data = {
    ledger_id: ledger_id,
    particular_name: particular_name,
  };

  try {
    const result = await client.post(`${endPoint}`, data);
    // Check if the response has a valid data field
    if (!result || !result.data) {
      throw new Error(
        `Failed to create particular for ledger with ID ${ledger_id}`
      );
    }
    const particular = result.data;
    return particular;
  } catch (error) {
    console.error("Error creating particular:", error);
    throw error;
  }
};
const updateParticularByParticularID = async (particularID, updatedData) => {
  console.log(
    "Updating name of particular ",
    updatedData.particular_name,
    " for particularID: ",
    particularID
  );

  try {
    const result = await client.put(`${endPoint}/${particularID}`, updatedData);
    // Check if the response has a valid data field
    if (!result || !result.data) {
      throw new Error(
        `Failed to update particular for particular with ID ${updatedData.particular_id}`
      );
    }
    const particular = result.data;
    return particular;
  } catch (error) {
    console.error("Error updating particular:", error);
    throw error;
  }
};

export default {
  getAllParticularsByLedgerID,
  createParticularByLedgerID,
  updateParticularByParticularID,
};

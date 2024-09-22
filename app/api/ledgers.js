import client from "./client";

const endPoint = "/ledgers";

const getAllLedgersByUserID = async (user_id) => {
  try {
    const result = await client.get(endPoint + "/" + user_id);
    if (result.length === 0) {
      throw new Error(`Ledger with user id ${user_id} not found`);
    }
    const ledger = result.data;
    return ledger;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const createLedgerByUserID = async (user_id, ledger_name) => {
  console.log("Creating ledger ", ledger_name, " for userID: ", user_id);

  const data = {
    user_id: user_id,
    ledger_name: ledger_name,
  };

  try {
    const result = await client.post(`${endPoint}`, data);
    // Check if the response has a valid data field
    if (!result || !result.data) {
      throw new Error(`Failed to create ledger for user with ID ${user_id}`);
    }
    const ledger = result.data;
    return ledger;
  } catch (error) {
    console.error("Error creating ledger:", error);
    throw error;
  }
};
const deleteLedgerByLedgerID = async (user_id, ledger_id) => {
  try {
    const result = await client.delete(endPoint + "/" + user_id + "/" + ledger_id);
    if (result.length === 0) {
      throw new Error(`Ledger of id ${ledger_id} not deleted`);
    }
    const ledger = result.data;
    return ledger;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default {
  getAllLedgersByUserID,
  createLedgerByUserID,
  deleteLedgerByLedgerID,
};

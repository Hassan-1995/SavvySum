import client from "./client";

const getSumAmountFromSpecificLedger = async (ledger_id) => {
  try {
    const result = await client.get("/ledgerSum/" + ledger_id);
    if (result.length === 0) {
      throw new Error(`Ledger sum with ledger id is ${ledger_id} not found`);
    }
    const ledgerSum = result.data;
    return ledgerSum;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const getSumAmountFromSpecificParticular = async (particular_id) => {
  try {
    const result = await client.get("/particularSum/" + particular_id);
    if (result.length === 0) {
      throw new Error(
        `particular sum with particular id is ${particular_id} not found`
      );
    }
    const particularSum = result.data;
    return particularSum;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const createPDFSpecificLedger = async (ledger_id) => {
  try {
    const result = await client.get("/createPDF/" + ledger_id);
    if (result.length === 0) {
      throw new Error(`PDF file with ledger id is ${ledger_id} not found`);
    }
    const PDF = result.data;
    return PDF;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const getAccessKeyForLedger = async (user_id, ledger_id) => {
  try {
    const result = await client.get(
      "/accessKey/" + "/" + user_id + "/" + ledger_id
    );
    if (result.length === 0) {
      throw new Error(
        `Access key with ledger id ${ledger_id} and user id ${user_id} not found`
      );
    }
    const accessKey = result.data;
    return accessKey;
  } catch (error) {
    console.error("Error getting access key:", error);
    throw error;
  }
};

const shareCopyOfLedgerWithAccessKey = async (user_id, access_key) => {
  const data = {
    user_id: user_id,
    access_key: access_key,
  };
  console.log("DATA: ", data);

  try {
    const result = await client.post("/shareLedger/", data);
    if (result.length === 0) {
      throw new Error(
        `Access key ${access_key} and user id ${user_id} not found`
      );
    }
    const shareLedger = result.data;
    return shareLedger;
  } catch (error) {
    console.error("Error creating ledger:", error);
    throw error;
  }
};

export default {
  getSumAmountFromSpecificLedger,
  getSumAmountFromSpecificParticular,
  createPDFSpecificLedger,
  getAccessKeyForLedger,
  shareCopyOfLedgerWithAccessKey,
};

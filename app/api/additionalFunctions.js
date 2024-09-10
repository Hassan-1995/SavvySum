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

export default {
  getSumAmountFromSpecificLedger,
  getSumAmountFromSpecificParticular,
};

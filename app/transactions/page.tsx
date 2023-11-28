import React from "react";
import { getCurrentUser } from "@/lib/session";
import { getAllTransactions } from "./actions";

const Transactions = async () => {
  const user = await getCurrentUser();
  // const transactions = await getAllTransactions(user.id);

  return <div>{JSON.stringify(user)}</div>;
};

export default Transactions;

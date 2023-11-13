"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Transactions = () => {
  const { data } = useSession();

  return <div>{JSON.stringify(data)}</div>;
};

export default Transactions;

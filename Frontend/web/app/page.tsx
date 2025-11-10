"use client";

import { useState } from "react";
import { DietForm } from "@/app/_components/diet-form";
import { set } from "zod";
import DietGenerator from "./_components/diet-generator";
import { DietData } from "@/types/diet-data.types";

export default function Home() {
  const [data, setData] = useState<DietData>();

  function handleSubmit(userInfo: DietData) {
    setData(userInfo);
  }
  return (
    <>
      {!data ? (
        <DietForm onSubmit={handleSubmit} />
      ) : (
        <DietGenerator data={data} />
      )}
    </>
  );
}

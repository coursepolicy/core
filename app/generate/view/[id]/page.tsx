import React from "react";
import PolicyResults from "./PolicyResults";
import getSurveyData from "../../../_utils/getServeyData";

export default async function View({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await getSurveyData(id);

  return (
    <>
      <div className="z-10 hidden h-[125px] w-[100%] max-w-[inherit] bg-neutral-50 md:fixed md:block" />
      <main className="mx-auto my-0 mt-[30px] flex w-[100%] max-w-[1000px] flex-col bg-white md:mt-[50px] ">
        <div className="z-10 hidden h-[61px] w-[100%] max-w-[inherit] bg-white md:fixed md:block" />
        <PolicyResults response={data} />
      </main>
    </>
  );
}

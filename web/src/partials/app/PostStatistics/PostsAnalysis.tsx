"use client";

import ColumnChart from "@/components/ColumnChart";
import { TimeStatistics } from "@/constants/Others";
import { postsAnalysis } from "@/utils/fakeData/Post";
import { useState } from "react";

export default function PostsAnalysis() {
  const [option, setOption] = useState(TimeStatistics.thisYear);
  const handleChangeTime = (time: number) => {
    setOption(time);
  };
  return (
    <ColumnChart
      title="Analysis post"
      data={postsAnalysis}
      onChangeTime={handleChangeTime}
      columnWidth={60}
    />
  );
}

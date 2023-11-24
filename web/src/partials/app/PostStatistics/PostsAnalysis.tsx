"use client";

import ColumnChart from "@/components/ColumnChart";
import { TimeStatistics } from "@/constants/Others";
import { getPostsAnalysis } from "@/services/adminServices";
import { postsAnalysis } from "@/utils/fakeData/Post";
import { useEffect, useState } from "react";

export default function PostsAnalysis() {
  const [chartData, setChartData] = useState();
  const [option, setOption] = useState(TimeStatistics.thisYear);

  useEffect(() => {
    getData();
  }, [option]);

  const getData = async () => {
    const res: any = await getPostsAnalysis({ time_statistics: option });

    if (res.success) {
      setChartData(res.data.data);
    }
  };

  const handleChangeTime = (time: number) => {
    setOption(time);
  };
  return (
    <>
      {chartData && (
        <ColumnChart
          title="Analysis post"
          data={chartData}
          onChangeTime={handleChangeTime}
          columnWidth={48}
        />
      )}
    </>
  );
}

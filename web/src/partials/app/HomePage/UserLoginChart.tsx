import ColumnChart from "@/components/ColumnChart";
import { TimeStatistics } from "@/constants/Others";
import { getLoginHistory } from "@/services/adminServices";
import { useEffect, useState } from "react";

export default function UserLoginChart() {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(TimeStatistics.thisYear);

  useEffect(() => {
    getData();
  }, [option]);

  const getData = async () => {
    const res: any = await getLoginHistory({
      time_statistics: option,
    });

    if (res.success) {
      setData(res.data.data);
    }
  };

  const handleChangeTime = (time: any) => {
    setOption(time);
  }
  return <ColumnChart title="User Login" data={data} onChangeTime={handleChangeTime} />;
}

import CustomPieChart from "@/components/CustomPieChart";
import { getPortsNumberWithTopic } from "@/services/adminServices";
import { useEffect, useState } from "react";

export default function PostPieCharts() {
  const [postsNumber, setPostsNumber] = useState<any>();

  useEffect(() => { 
    getAllPostsNumberData();
  }, []);
  
  const getAllPostsNumberData = async () => {
    const res = await getPortsNumberWithTopic();
    setPostsNumber({
      totalPost: res.data.total_post,
      errorPost: res.data.error_post,
    })
  }

  return (
    <div className="bg-white flex flex-row justify-between rounded-[30px] 3xl:py-[24px] py-[calc(24px*0.75)] 3xl:px-[92px] px-[calc(92px*0.75)] shadow-custom">
      {postsNumber?.totalPost && (
        <CustomPieChart
          data={postsNumber.totalPost}
          title="Thống kế chủ đề bài đăng"
        />
      )}
      {postsNumber?.errorPost && (
        <CustomPieChart
          data={postsNumber.errorPost}
          title="Thống kế chủ đề bài đăng không được duyệt"
        />
      )}
    </div>
  );
}

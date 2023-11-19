import CustomPieChart from "@/components/CustomPieChart";
import { PostTopicDatas } from "@/utils/fakeData/Post";

export default function PostPieCharts() {
  return (
    <div className="bg-white flex flex-row justify-between rounded-[30px] 3xl:py-[24px] py-[calc(24px*0.75)] 3xl:px-[92px] px-[calc(92px*0.75)] shadow-custom">
      <CustomPieChart data={PostTopicDatas} title="Thống kế chủ đề bài đăng" />
      <CustomPieChart data={PostTopicDatas} title="Thống kế chủ đề bài đăng không được duyệt" />
    </div>
  );
}

import TextReportCard from "@/components/TextReportCard";
import { commentsByPostId } from "@/utils/fakeData/Comment";

export default function TextList() {
  return (
    <div className="px-6 py-10 overflow-auto scrollbar-none 3xl:h-[calc(100vh-40px*2)] h-[calc(100vh-32px*2)]">
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-5">
        {commentsByPostId.map((comment) => {
          return (
            <section key={comment.id} className="w-[calc(50%-1rem/2)]">
              <TextReportCard
                user={comment.user}
                report_id={1}
                text={comment.content}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}

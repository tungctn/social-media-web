import Container from "@/components/Container";
import DefaultLayout from "@/layouts/DefaultLayout";
import CheckAdmin from "@/middlewares/CheckAdmin";
import PostsAnalysis from "@/partials/app/PostStatistics/PostsAnalysis";
import PostsBox from "@/partials/app/PostStatistics/PostsBox";

export default function PostStatistics() {
  return (
    <CheckAdmin>
      <DefaultLayout>
        <Container fullScreen={true} fixedHeight={false}>
          <div className="3xl:w-[1125px] w-[calc(1125px/6*5)] mx-auto 3xl:mt-[76px] mt-[calc(76px*.75)] 3xl:mb-[163px] mb-[calc(163px*.75)]">
            <div className="w-full flex flex-col 3xl:gap-16 gap-12">
              <PostsBox />
              <PostsAnalysis />
            </div>
          </div>
        </Container>
      </DefaultLayout>
    </CheckAdmin>
  );
}

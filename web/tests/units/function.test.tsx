import {
  ReactType,
  ReportErrorType,
  getReactTypeSpec,
  getReportErrorSpec,
} from "@/constants/Others";
import store from "@/store";
import { getPosts } from "@/store/actions/postActions";
import { getPostTopicData, posts } from "@/utils/fakeData/Post";
import { reactPost } from "@/utils/post";
enum PostTopic {
  education = "education",
  share = "share_experience",
  evaluate = "evaluate",
  event = "event",
  other = "other",
}
describe("React post function", () => {
  const post = posts[0];

  test("should add a like if there is no current reaction", () => {
    const newReactType = ReactType.like;
    const newPost = reactPost(post, newReactType);
    expect(newPost.likes_count + 1).toBe(post.likes_count);
  });

  test("should remove a like if the same reaction is applied", () => {
    const existingPost = {
      ...post,
      likes_count: 1,
      type_react: ReactType.like,
    };
    const newReactType = ReactType.like;
    const newPost = reactPost(existingPost, newReactType);
    expect(newPost.likes_count).toBe(0);
    expect(newPost.type_react).toBeNull();
  });

  test("should change reaction type if a different reaction is applied", () => {
    const existingPost = {
      ...post,
      likes_count: 1,
      type_react: ReactType.like,
    };
    const newReactType = ReactType.love;
    const newPost = reactPost(existingPost, newReactType);
    expect(newPost.likes_count).toBe(1); // The count remains the same because it's just a change of reaction
    expect(newPost.type_react).toBe(newReactType);
  });

  test("react type null", () => {
    const existingPost = {
      ...post,
      likes_count: 1,
      type_react: null,
    };
    const newReactType = ReactType.like;
    const newPost = reactPost(existingPost, newReactType);
    console.log(newPost);
    expect(newPost.likes_count).toBe(existingPost.likes_count + 1);
    expect(newPost.type_react).toBe(newReactType);
  });

  // test("get post function", () => {
  //   localStorage.setItem(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MzIyNTYzMDZ9.5a9RJQqbkhwTFTIojDuP042sCPe6zplpWJhOhi6cZmU"
  //   );
  //   store.dispatch(getPosts());
  // });
});

describe("getPostTopicData", () => {
  test("should return correct data for education topic", () => {
    const result = getPostTopicData(PostTopic.education, 5);
    expect(result).toEqual({
      title: "Giáo dục",
      value: 5,
      color: "#F15A3D",
      alias: PostTopic.education,
    });
  });

  test("should return correct data for share topic", () => {
    const result = getPostTopicData(PostTopic.share, 10);
    expect(result).toEqual({
      title: "Chia sẻ kinh nghiệm",
      value: 10,
      color: "#FED34A",
      alias: PostTopic.share,
    });
  });

  // ... thêm các test cho các case khác ...

  test("should return correct data for event topic", () => {
    const result = getPostTopicData(PostTopic.event, 7);
    expect(result).toEqual({
      title: "Sự kiện",
      value: 7,
      color: "#89C761",
      alias: PostTopic.event,
    });
  });

  test("should return correct data for evaluate topic", () => {
    const result = getPostTopicData(PostTopic.evaluate, 3);
    console.log(result);
    expect(result).toEqual({
      title: "Đánh giá",
      value: 3,
      color: "#8E6AAE",
      alias: PostTopic.evaluate,
    });
  });

  test("should return default data for other topic", () => {
    const result = getPostTopicData(PostTopic.other, 3);
    expect(result).toEqual({
      title: "Khác",
      value: 3,
      color: "#359CC9",
      alias: PostTopic.other,
    });
  });
});

describe("getReactTypeSpec", () => {
  test.each([
    [ReactType.like, "Liked"],
    [ReactType.love, "Love"],
    [ReactType.cute, "Cute"],
    [ReactType.wow, "Wow"],
    [ReactType.sad, "Sad"],
    [ReactType.angry, "Angry"],
  ])(
    "should return correct label for ReactType %p",
    (reactType: any, expectedLabel: any) => {
      const result = getReactTypeSpec(reactType);
      // console.log(result);
      expect(result.label).toEqual(expectedLabel);
    }
  );
});

describe("getReportErrorSpec", () => {
  test.each([
    [ReportErrorType.ImageNotStardard, "image"],
    [ReportErrorType.ImageNotRelated, "image"],
    [ReportErrorType.ContentNotStardard, "content"],
    [ReportErrorType.ContentNotRelated, "content"],
    [null, undefined],
  ])(
    "should return correct label for ReportErrorType %p",
    (reportErrorType: any, expectedLabel: any) => {
      const result = getReportErrorSpec(reportErrorType);
      if (expectedLabel !== undefined) {
        expect(result).toEqual({ label: expectedLabel });
      } else {
        expect(result).toBeUndefined();
      }
    }
  );
});

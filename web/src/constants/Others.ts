export const Gender: any = {
  "0": "Male",
  "1": "Female",
};

export enum ReactType {
  like = 1,
  love = 2,
  cute = 3,
  wow = 4,
  sad = 5,
  angry = 6,
}

interface ReactTypeSpec {
  label: string;
}

export function getReactTypeSpec(reactType: ReactType): ReactTypeSpec {
  switch (reactType) {
    case ReactType.like:
      return {
        label: "Liked",
      };
    case ReactType.love:
      return {
        label: "Love",
      };
    case ReactType.cute:
      return {
        label: "Cute",
      };
    case ReactType.wow:
      return {
        label: "Wow",
      };
    case ReactType.sad:
      return {
        label: "Sad",
      };
    case ReactType.angry:
      return {
        label: "Angry",
      };
  }
}

export enum FriendStatus {
  pending = 1,
  accept = 2,
  block = 3,
  refuse = 4,
}

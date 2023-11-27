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
  make = -1,
  pending = 1,
  accept = 2,
  block = 3,
  refuse = 4,
  remove = 5,
}

export enum ReportType {
  post = "posts",
  comment = "comments",
}

export enum ReportErrorType {
  ImageNotStardard = 1,
  ImageNotRelated = 2,
  ContentNotStardard = 3,
  ContentNotRelated = 4,
}

interface ReportErrorSpec {
  label: string;
}

export function getReportErrorSpec(
  reportErrorType: ReportErrorType | null,
): ReportErrorSpec | undefined {
  if (reportErrorType !== null) {
    switch (reportErrorType) {
      case ReportErrorType.ImageNotStardard:
      case ReportErrorType.ImageNotRelated:
        return {
          label: "image",
        };
      case ReportErrorType.ContentNotStardard:
      case ReportErrorType.ContentNotRelated:
        return {
          label: "content",
        };
    }
  }
}

export enum TimeStatistics {
  today = 1,
  yesterday = 2,
  thisMonth = 3,
  lastMonth = 4,
  thisYear = 5,
  lastYear = 6,
}

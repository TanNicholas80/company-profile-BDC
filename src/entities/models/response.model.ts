export type ServerResponseType<T> =
  | {
      status: "success";
      data: T;
      error: null;
    }
  | {
      status: "failed";
      data: null;
      error: {
        type: string;
        message: string;
        meta: T;
      };
    };

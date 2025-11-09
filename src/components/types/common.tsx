export type TFullImages = {
  image_url: string | null;
  small_image_url?: string | null;
  large_image_url?: string | null;
};


export type TDateProp = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export type TAiredPublished = {
  from: string | null;
  to: string | null;
  prop: {
    from: TDateProp;
    to: TDateProp;
  };
  string?: string | null;
};
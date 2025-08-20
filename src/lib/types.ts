export type Bonus = {
  id: number;
  title: string;
  image: string;
  imageHint: string;
  type: "pdf" | "video";
  content: {
    title: string;
    description?: string;
    url?: string;
  };
};

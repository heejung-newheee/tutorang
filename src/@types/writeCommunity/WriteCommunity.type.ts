export type EDITWRITE = {
  title: string;
  content: string;
};

export type POSTWRITE = {
  title: string;
  content: string;
  user_id?: string;
  category: string;
};

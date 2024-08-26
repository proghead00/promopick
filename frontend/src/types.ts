type PromopickFormType = {
  title?: string;
  description?: string;
};

type PromopickTypeError = {
  title?: string;
  description?: string;
  expire_at?: string;
  image?: string;
};

type PromoType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  expire_at: string;

  PromoItem: Array<PromoItem>;
  PromoComments: Array<PromoComment>;
};

type PromopickItemForm = {
  image: File | null;
};

type PromoItem = {
  id: number;
  count: number;
  image: string;
};

type PromoComment = {
  id: number;
  comment: string;
  created_at: string;
};

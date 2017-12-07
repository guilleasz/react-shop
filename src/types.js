// @flow
export type Product = {
  name: string,
  id?: number,
  price: string,
  image: string,
  categoryId: ?number,
  availability: boolean,
  description: string,
};

export type Category = {
  name: string,
  id: number,
};
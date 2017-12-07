// @flow
export type Product = {
  name: string,
  id: number,
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

export type CartItem = {
  quantity: number,
  product: Product,
}

export type ProductsState = {
  items: Product[],
}

export type CategoriesState = {
  items: Category[],
}

export type CartState = CartItem[];

export type ReduxState = {
  products: ProductsState,
  categories: CategoriesState,
  cart: CartState,
};

export type AddToCartAction = {
  type: 'ADD_TO_CART',
  product: Product,
}

export type RemoveFromCartAction = {
  type: 'REMOVE_FROM_CART',
  index: number
}

export type CartActions = AddToCartAction | RemoveFromCartAction;

export type SetCategoriesAction = {
  type: 'SET_CATEGORIES',
  categories: Category[]
};

export type CategoriesActions = SetCategoriesAction;

export type SetProductsAction = {
  type: 'SET_PRODUCTS',
  products: Product[],
};

export type AddProductAction = {
  type: 'ADD_PRODUCT',
  product: Product,
};

export type ProductsActions = SetProductsAction | AddProductAction;

export type Actions = ProductsActions | CategoriesActions | CartActions;

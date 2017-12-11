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
  loading: boolean,
}

export type CategoriesState = {
  items: Category[],
  loading: boolean,
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

export type FetchingCategoriesAction = {
  type: 'FETCHING_CATEGORIES',
}

export type CategoriesActions = SetCategoriesAction | FetchingCategoriesAction;

export type SetProductsAction = {
  type: 'SET_PRODUCTS',
  products: Product[],
};

export type FetchingProductsAction = {
  type: 'FETCHING_PRODUCTS',
};

export type AddProductAction = {
  type: 'ADD_PRODUCT',
  product: Product,
};

export type ProductsActions = SetProductsAction | AddProductAction | FetchingProductsAction;

export type Actions = ProductsActions | CategoriesActions | CartActions;


export type DispatchThunk = (d: Actions | (DispatchThunk) => mixed) => mixed;

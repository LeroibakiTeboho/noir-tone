// contexts/WishlistContext.tsx
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from "react";

type WishlistState = string[]; // Array of product IDs
type Action =
  | { type: "ADD_ITEM"; payload: string }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "LOAD_STATE"; payload: string[] };

type WishlistContextType = {
  wishlist: WishlistState;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

function wishlistReducer(state: WishlistState, action: Action): WishlistState {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((id) => id !== action.payload);
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    dispatch({ type: "LOAD_STATE", payload: saved ? JSON.parse(saved) : [] });
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleWishlist = (productId: string) => {
    dispatch({
      type: isWishlisted(productId) ? "REMOVE_ITEM" : "ADD_ITEM",
      payload: productId,
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

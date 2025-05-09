export interface Product {
    id: number;
    title: string;
    price: number;
    original_price?: number; // optional if using fake "discount"
    discountPercentage?: number;
    description?: string;
    category?: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
    Category:string
    originalPrice:number
    uniqueCategories:string[]
  }
  
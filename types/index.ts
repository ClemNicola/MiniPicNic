export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface GifImage {
  mp4?: string;
  webp?: string;
  width: string;
  height: string;
}

export interface Gif {
  id: string;
  title: string;
  url: string;
  images: {
    original: GifImage;
    downsized: GifImage;
    fixed_height: GifImage;
    fixed_width: GifImage;
  };
  username?: string;
  rating: string;
}

export interface RandomGifResponse {
  data: Gif;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

export interface GiphyResponse {
  data: Gif[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
  };
}

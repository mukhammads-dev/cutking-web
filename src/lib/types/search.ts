export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;

  duration: number;
}

export interface TimeSlot {

  time: string;
  available: boolean;
}

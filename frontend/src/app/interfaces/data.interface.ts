export interface Data<T> {
  _id: string;
  name: string;
  description?: string;
  data: T;
}

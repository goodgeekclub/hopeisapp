export interface Mission{
  name: string,
  photoUrl: string,
  description: string
  type: string,
  status:string,
  data: {
      name: string,
      description: string,
      coinValue: 10,
      level: 1,
      characterIds: [
        string
      ]
  }
}
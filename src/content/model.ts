export interface Data {
  cards: Record<CardName, CustomCardData>
}

export type CardName = string

export interface CustomCardData {
  name?: CardName
}

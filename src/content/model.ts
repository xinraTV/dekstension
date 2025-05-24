export interface Data {
  cards: Record<CardName, CustomCardData>
}

export type CardName = string

export interface CustomCardData {
  name?: CardName
  img?: string
}

export const IMAGE_HOSTER_ALLOWLIST = [
  { label: 'i.imgur.com', pattern: /^https:\/\/i.imgur.com\/.*/ },
]

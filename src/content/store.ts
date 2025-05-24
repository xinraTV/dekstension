import { create } from 'zustand'
import { CardName, CustomCardData, Data } from './model'
import { readData, writeData } from './io'
import { message } from 'antd'

interface AppState {
  data: Data
  loadData(): Promise<void>
  setCardData(name: CardName, cardData: CustomCardData): Promise<void>
}

const EMPTY_DATA: Data = {
  cards: {},
}

export const useStore = create<AppState>((set) => ({
  data: { cards: {} },
  loadData: async () => {
    set({ data: (await readData()) || EMPTY_DATA })
  },
  setCardData: async (name: CardName, cardData: CustomCardData) => {
    const data = (await readData()) || EMPTY_DATA // re-read to avoid concurrency issues

    if (cardData.name || cardData.img) {
      data.cards[name] = cardData
    } else {
      delete data.cards[name]
    }

    await writeData(data)

    set({ data })
  },
}))

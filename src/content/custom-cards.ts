import { CardName, Data } from './model'
import { fromHtml } from './utils'

export function applyCustomCardData(cardsData: Data['cards']) {
  const cardNodes: Record<CardName, ParentNode> = {}

  document.querySelectorAll('#basicCardImage').forEach((cardImage) => {
    const node = cardImage.parentNode!
    const name = node.firstChild!.firstChild!.textContent!
    cardNodes[name] = node
  })

  Object.keys(cardsData).forEach((cardName) => {
    const node = cardNodes[cardName]
    if (!node) return
    const cardData = cardsData[cardName]
    if (cardData.name && !node.querySelector('.dx-custom-name')) {
      node.appendChild(
        fromHtml(`<span class="dx dx-custom-name">${cardData.name}</span>`),
      )
    }
  })
}

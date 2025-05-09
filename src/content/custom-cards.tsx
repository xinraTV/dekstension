import { CardName, Data } from './model'
import { fromHtml } from './utils'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from 'antd'

export function addCustomCardUi(cardsData: Data['cards']) {
  const cardDetailsOverlay = document.querySelector(
    'div[class^=cardDetailsOverlay_content]',
  )
  if (!cardDetailsOverlay) return

  const parent = document.querySelector('div[class^=cardForm_left]')
  if (!parent || parent.querySelector('.dx')) return

  const cardName = cardDetailsOverlay.querySelector(
    'h3[class^=cardDetailsOverlay_title]',
  )?.textContent!
  const cardData = cardsData[cardName] || {}

  const containerClass = parent
    .querySelector('div[class^=cardForm_prettyBox]')!
    .getAttribute('class')

  const container = fromHtml(`<div class="dx ${containerClass}"></div>`)
  parent.appendChild(container)

  const root = createRoot(container as HTMLElement)
  root.render(
    <div>
      <label>Dekstension</label>
      <p>
        Custom name: {cardData.name} <Button size="small">Edit</Button>{' '}
        <Button size="small">Remove</Button>
      </p>
      <p>
        Custom image: <Button size="small">Add</Button>
      </p>
    </div>,
  )
}

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

import { applyCustomCardData } from './custom-cards'
import { Data } from './model'
import './styles.css'
import { resetAfterHotReload } from './utils'

resetAfterHotReload()

const data: Data = {
  cards: {
    'Hans Eriksson': { name: 'Erik' },
  },
}

function refresh() {
  applyCustomCardData(data.cards)
}

const observer = new MutationObserver(refresh)
observer.observe(document.getElementById('__next')!, {
  attributes: true,
  childList: true,
  subtree: true,
})

import { addCustomCardUi, applyCustomCardData } from './custom-cards'
import { readData } from './io'
import { Data } from './model'
import './styles.css'
import { resetAfterHotReload } from './utils'

resetAfterHotReload()

const data = readData()

function refresh() {
  applyCustomCardData(data.cards)
  addCustomCardUi(data.cards)
}

refresh()

const observer = new MutationObserver(refresh)
observer.observe(document.getElementById('__next')!, {
  attributes: true,
  childList: true,
  subtree: true,
})

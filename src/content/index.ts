import { addCustomCardUi, applyCustomCardData } from './custom-cards'
import { readData } from './io'
import { Data } from './model'
import './styles.css'
import { resetAfterHotReload } from './utils'

async function main() {
  resetAfterHotReload()

  console.log('Dekstension content script loaded', document.cookie)
  const data = (await readData()) || { cards: {} }
  console.log('Dekstension data loaded:', data)

  function refresh() {
    applyCustomCardData(data.cards)
    addCustomCardUi(data)
  }

  refresh()

  const observer = new MutationObserver(refresh)
  observer.observe(document.getElementById('__next')!, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}

main()

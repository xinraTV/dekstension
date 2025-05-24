import { use } from 'react'
import { addCustomCardUi, applyCustomCardData } from './custom-cards'
import { readData } from './io'
import { Data } from './model'
import './reset.css'
import { useStore } from './store'
import './styles.css'
import { resetAfterHotReload } from './utils'

async function main() {
  resetAfterHotReload()

  await useStore.getState().loadData()
  console.log('Dekstension data loaded:', useStore.getState().data)

  let unsub = () => {}

  const refresh = () => {
    unsub()
    applyCustomCardData(useStore.getState().data.cards)
    unsub = useStore.subscribe((state) => applyCustomCardData(state.data.cards))

    addCustomCardUi()
  }

  const refreshNextTick = () => setTimeout(refresh, 0)

  refresh()

  const observer = new MutationObserver(refreshNextTick)
  observer.observe(document.getElementById('__next')!, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}

main()

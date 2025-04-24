import { Data } from './model'

const PREFIX = 'DEKSTENSION_DATA_'

export function readData(): Data {
  const descriptionParagraphs = document.querySelectorAll(
    'div[class^=descriptionContainer_container] .ql-editor > p',
  )

  for (let i = 0; i < descriptionParagraphs.length; i++) {
    const text = descriptionParagraphs.item(i).textContent
    if (text && text.startsWith(PREFIX)) {
      const data = text.slice(PREFIX.length)
      try {
        return JSON.parse(atob(data))
      } catch (e) {
        console.error('Failed to parse data', e)
      }
    }
  }

  return { cards: {} }
}

export function writeData(data: Data) {
  console.log('data', btoa(JSON.stringify(data)))
}

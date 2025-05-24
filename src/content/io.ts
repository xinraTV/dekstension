import { Data } from './model'
import { getCookie } from './utils'

const DATA_PATTERN = /\[DEKSTENSION_DATA\](.*?)\[\/DEKSTENSION_DATA\]/

function getDeckId() {
  const url = window.location.href
  const match = url.match(/https:\/\/archidekt.com\/decks\/([0-9]+)\/.*/)
  if (match) {
    return match[1]
  }
  return null
}

function getCommonHeaders() {
  const authToken = getCookie('tbJwt')
  return authToken ? { authorization: `JWT ${authToken}` } : {}
}

async function readDescription() {
  const deckId = getDeckId()
  if (!deckId) {
    return null
  }

  const deck = await fetch(`https://archidekt.com/api/decks/${deckId}/`, {
    headers: getCommonHeaders(),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Deck description:', data)
      return data
    })
    .catch(console.error)

  return (deck.description as string) ?? null
}

export async function readData(): Promise<Data | null> {
  const description = await readDescription()

  if (!description) {
    return null
  }

  const match = description.match(DATA_PATTERN)
  if (!match) {
    return null
  }

  return JSON.parse(atob(match[1])) as Data
}

export async function writeData(data: Data) {
  const originalDescription = await readDescription()
  console.log('Original description:', originalDescription)
  const serializedData = `[DEKSTENSION_DATA]${btoa(JSON.stringify(data))}[/DEKSTENSION_DATA]`
  if (originalDescription && originalDescription.match(DATA_PATTERN)) {
    console.log('Updating existing description')
    await writeDescription(
      originalDescription.replace(DATA_PATTERN, serializedData),
    )
  } else {
    console.log('Creating new description')
    const parsedDescription = originalDescription
      ? JSON.parse(originalDescription)
      : { ops: [] }
    parsedDescription.ops.push({
      insert: serializedData,
    })
    await writeDescription(JSON.stringify(parsedDescription))
  }
}

async function writeDescription(description: string) {
  console.log('Writing description:', description)
  const deckId = getDeckId()
  console.log('Deck ID:', deckId)
  if (!deckId) {
    return null
  }

  await fetch('https://archidekt.com/api/decks/12719694/update/', {
    credentials: 'include',
    headers: {
      ...getCommonHeaders(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      description,
    }),
    method: 'PATCH',
  })
    .catch(console.error)
    .then(console.log)
}

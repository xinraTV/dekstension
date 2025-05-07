async function main() {
  // fetch('https://www.archidekt.com/api/decks/12719694')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error)
  //   })

  const res = await fetch('https://www.archidekt.com/api/decks/12719694/', {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      Accept: 'application/json',
      'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
      authorization:
        'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2MjY0MjEwLCJpYXQiOjE3NDU1MTA0OTcsImp0aSI6IjI2OTYxNDRjMzdlODQ1MzU4NDQyNTU2NjE1MWYxZmE4IiwidXNlcl9pZCI6MzQyNzA4fQ.txh3ZerDX29q6y-ckXN0a2lUJBfjqglsMIsQh0wwXwg',
      'Alt-Used': 'archidekt.com',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-GPC': '1',
      Priority: 'u=4',
    },
    referrer: 'https://archidekt.com/decks/12719694/dekstension_example',
    method: 'GET',
    mode: 'cors',
  }).then((response) => response.json())

  console.log(JSON.parse(res.description))
}

async function update() {
  await fetch('https://archidekt.com/api/decks/12719694/update/', {
    credentials: 'include',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
      Accept: 'application/json',
      'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
      'content-type': 'application/json',
      authorization:
        'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2MjY0MjEwLCJpYXQiOjE3NDU1MTA0OTcsImp0aSI6IjI2OTYxNDRjMzdlODQ1MzU4NDQyNTU2NjE1MWYxZmE4IiwidXNlcl9pZCI6MzQyNzA4fQ.txh3ZerDX29q6y-ckXN0a2lUJBfjqglsMIsQh0wwXwg',
      'Alt-Used': 'archidekt.com',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-GPC': '1',
      Priority: 'u=0',
    },
    referrer: 'https://archidekt.com/decks/12719694/dekstension_example',
    //"body": "{\"name\":\"Dekstension Example\",\"deckFormat\":3,\"edhBracket\":null,\"description\":\"{\\\"ops\\\":[{\\\"insert\\\":\\\"DEKSTENSION_DATA_eyJjYXJkcyI6eyJIYW5zIEVyaWtzc29uIjp7Im5hbWUiOiJFcmlrIn19fQ==\\\\n\\\\ntest\\\\n\\\\nfoo\\\\n\\\"}]}\",\"private\":false,\"unlisted\":false,\"theorycrafted\":false,\"game\":null}",
    body: '{"description":"{\\"ops\\":[{\\"insert\\":\\"DEKSTENSION_DATA_eyJjYXJkcyI6eyJIYW5zIEVyaWtzc29uIjp7Im5hbWUiOiJFcmlrIn19fQ==\\\\n\\\\ntest\\\\n\\\\nbar\\\\n\\"}]}"}',
    method: 'PATCH',
    mode: 'cors',
  })
}

//update()
main()

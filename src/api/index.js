export const getEnglishNovelList = async () => {
  const fetched = await fetch(
    'https://btapi.herokuapp.com/api/category?type=LIGHT_NOVEL&language=English'
  )

  return fetched.json()
}

export const getNovelJSON = async page => {
  const fetched = await fetch(
    `https://btapi.herokuapp.com/api?title=${encodeURIComponent(page)}`
  )
  const json = await fetched.json()

  const correctCat = json.categories.map(el => {
    if (el.toLowerCase().includes('genre')) return el.replace('Genre -', '')
  })
  const filteredCat = correctCat.filter(el => typeof el === 'string')

  json.categories = filteredCat

  const volumeNumber = ((novel, oneShot) => {
    let volumeNumber = 0

    if (!oneShot)
      for (let serie of novel.series) {
        for (let book of serie.books) {
          volumeNumber++
        }
      }
    else
      for (let volume of novel.series) {
        volumeNumber++
      }

    return volumeNumber
  })(json, json.one_off)

  return {
    json,
    volumeNumber
  }
}

export const getReaderPage = async page => {
  const fetched = await fetch(
    `https://btapi.herokuapp.com/api/page?title=${page}`
  )

  return fetched.text()
}

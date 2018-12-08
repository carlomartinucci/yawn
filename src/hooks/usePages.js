import { useState, useEffect } from 'react'

const usePages = () => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (global.chrome) {
      global.chrome.storage.local.get('pages', (result) => setPages((result.pages || []).map(JSON.parse)))
    } else if (global.browser) {
      global.browser.storage.local.get('pages').then((result) => setPages((result.pages || []).map(JSON.parse)))
    }
  }, [])

  const addPage = page => {
    const newPages = pages.concat(page)

    if (global.chrome) {
      global.chrome.storage.local.set({ pages: newPages.map(JSON.stringify) })
    } else if (global.browser) {
      global.browser.storage.local.set({ pages: newPages.map(JSON.stringify) })
    }

    // page.position
    setPages(newPages)
  }

  const removePage = pageToRemove => {
    const newPages = pages.filter(page => page.title !== pageToRemove.title || page.url !== pageToRemove.url || page.description !== pageToRemove.description)

    if (global.chrome) {
      global.chrome.storage.local.set({ pages: newPages.map(JSON.stringify) })
    } else if (global.browser) {
      global.browser.storage.local.set({ pages: newPages.map(JSON.stringify) })
    }

    // page.position
    setPages(newPages)
  }

  const emptyPages = () => {
    const newPages = []

    if (global.chrome) {
      global.chrome.storage.local.set({ pages: newPages.map(JSON.stringify) })
    } else if (global.browser) {
      global.browser.storage.local.set({ pages: newPages.map(JSON.stringify) })
    }

    // page.position
    setPages(newPages)
  }

  return [pages, addPage, removePage, emptyPages]
}

export default usePages

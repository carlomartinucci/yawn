import { useState, useEffect } from 'react'

const code = 'var meta = document.querySelector("meta[name=\'description\']"); if (meta) meta = meta.getAttribute("content"); meta';
const useDescription = () => {
  const [description, setDescription] = useState('')
  const [defaultDescription, setDefaultDescription] = useState('')

  const setDescriptions = (description) => {
    setDescription(description)
    setDefaultDescription(description)
  }

  useEffect(() => {
    if (global.chrome) {
      global.chrome.tabs.executeScript({ code }, results => { results && setDescriptions(results[0]) });
    } else if (global.browser) {
      global.browser.tabs.executeScript({ code }).then(results => { results && setDescriptions(results[0] )})
    }
  }, [])

  return [defaultDescription, description, setDescription]
}

export default useDescription

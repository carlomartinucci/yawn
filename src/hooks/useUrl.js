import { useState, useEffect } from 'react'

const useUrl = () => {
  const [url, setUrl] = useState('')
  const [defaultUrl, setDefaultUrl] = useState('')

  const setUrls = (url) => {
    setUrl(url)
    setDefaultUrl(url)
  }

  useEffect(() => {
    if(global.chrome) {
      global.chrome.tabs.query({ active: true, currentWindow: true }, tabs => tabs && tabs[0] && setUrls(tabs[0].url));
    } else if(global.browser) {
      global.browser.tabs.query({ active: true, currentWindow: true }).then(tabs => tabs && tabs[0] && setUrls(tabs[0].url))
    }
  }, [])

  return [defaultUrl, url, setUrl]
}

export default useUrl

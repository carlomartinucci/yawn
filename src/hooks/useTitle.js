import { useState, useEffect } from 'react'

const useTitle = () => {
  const [title, setTitle] = useState('')
  const [defaultTitle, setDefaultTitle] = useState('')

  useEffect(() => {
    if(global.chrome) {
      global.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs && tabs[0]) {
          setDefaultTitle(tabs[0].title)
          setTitle(tabs[0].title)
        }
      })
    } else if(global.browser) {
      global.browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        if (tabs && tabs[0]) {
          setDefaultTitle(tabs[0].title)
          setTitle(tabs[0].title)
        }
      })
    }
  }, [])

  return [defaultTitle, title, setTitle]
}

export default useTitle

import React from 'react'
import axios from 'axios'

import useDescription from '../hooks/useDescription'
import useTitle from '../hooks/useTitle'
import useUrl from '../hooks/useUrl'
import usePages from '../hooks/usePages'

const Popup = props => {
  const [defaultTitle, title, setTitle] = useTitle()
  const [defaultUrl, url, setUrl] = useUrl()
  const [defaultDescription, description, setDescription] = useDescription()

  const [pages, addPage, removePage, emptyPages] = usePages()

  const deliver = () => {
    const options = { newsletter: { pages_attributes: pages} }

    const handleSuccess = emptyPages
    const handleError = console.error

    return axios.post(`http://localhost:3000/newsletters`, options)
      .then(response => {
        console.log(response)
        if (response.status === 201) { handleSuccess() }
        else { handleError(response) }
      })
      .catch(console.error)
  }

  return <div className="container">
    <div className="row">
      <div className="col-12">
        <form>
          <div className="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" className="form-control" id="title" placeholder={defaultTitle} value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
          </div>

          <div className="form-group">
            <label for="url">Url</label>
            <input type="text" name="url" className="form-control" id="url" placeholder={defaultUrl} value={url} onChange={(event) => setUrl(event.currentTarget.value)}/>
          </div>

          <div className="form-group">
            <label for="description">Description</label>
            <textarea name="description" className="form-control" id="description" rows={3} placeholder={defaultDescription} value={description} onChange={(event) => setDescription(event.currentTarget.value)}/>
          </div>

          <button type="submit" className="btn btn-primary" onClick={event => addPage({ title, url, description })}>
            Add
          </button>
        </form>
      </div>
    </div>

    <div className="row">
      {pages.map((page, index) => (
        <div key={index} className="col-12">
          <h3>{page.title}</h3>
          <h4>{page.url}</h4>
          <p>{page.description}</p>
          <button className="btn btn-danger" onClick={event => removePage(page)}>Remove</button>
        </div>
      ))}
    </div>

    <div className="row">
      <div className="col-12">
        <button className="btn btn-primary" onClick={deliver}>Deliver!</button>
      </div>
    </div>
  </div>
}

export default Popup

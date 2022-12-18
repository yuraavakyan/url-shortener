import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './mainPage.css'

const baseUrl = 'https://api.shrtco.de/v2/shorten?url='

const MainPage = () => {
    const [urlToShorten, setUrlToShorten] = useState('')
    const [urls, setUrls] = useState([])
    const [originalUrl, setOriginalUrl] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        axios(`${baseUrl}${urlToShorten}`).then(res => {
            const { short_link, short_link2, full_short_link, full_short_link2, original_link } = res.data.result;
            setUrls([{ title: short_link, href: full_short_link }, { title: short_link2, href: full_short_link2 }]);
            setOriginalUrl(original_link)
        }).catch(e => setError(e.response.data.error))
        setUrlToShorten('')
    }
    const copyToClipboard = (index) => {
        navigator.clipboard.writeText(urls[index].title).then(() => alert('copied'))
    }
    return (
        <div className='container'>
            <div className='content'>
                <h1 className='title'>Shrtn it</h1>
                <form className='url-form' onSubmit={handleSubmit}>
                    <input
                        // type={'url'}
                        // required
                        placeholder='http://example.com'
                        onChange={(e) => setUrlToShorten(e.target.value)}
                        value={urlToShorten}
                    />
                    <button type='submit'>Shorten</button>
                </form>
                <div className='short-urls'>
                    {originalUrl ? (
                        <div className='original-link'>
                            Original url: {originalUrl}
                        </div>
                    ) : ''
                    }

                    {
                        urls.length ? urls.map((url, index) => (
                            <div className='short-url' key={url.href}>
                                <span>
                                    <span className='url-ttile'>Short url {index + 1}: </span>
                                    <span><a href={url.href}>{url.title}</a></span>
                                </span>
                                <span className='copy' onClick={() => copyToClipboard(index)}>copy</span>
                            </div>
                        )) : ''
                    }
                    {
                        error && <p className='error'>{error}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage
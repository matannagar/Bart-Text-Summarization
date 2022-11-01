import React, { useState } from 'react'
import SaveButton from './SaveButton'

function ShareButtons({ text }) {
    const [active, setActive] = useState(false)
    const twitter = 'https://twitter.com/intent/tweet?text='
    const linkedin = "https://www.linkedin.com/shareArticle?mini=true&title=TemporaryTitle&summary=hello"
    const data = encodeURIComponent(text)
    const gmail = "let url = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=lala&body='msgbody'&ui=2&tf=1&pli=1';"
    const title = "Bart Summary"
    return (
        <div className="item shareButtons">
            <a className="fa fa-google" id="mail" title="Share with Google"
                href={`mailto:?subject=${title}&body=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#dd4b39",
                    color: "white"
                }}>
            </a>

            <a className="fa fa-twitter" id="mail" title="Share with Twitter"
                href={`${twitter}${data}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#55ACEE",
                    color: "white"
                }}>
            </a>

            <a disabled className="fa fa-linkedin" id="linkedin" title="Share with Linkedin"
                href={`${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#007bb5",
                    color: "white"
                }}>
            </a>
            <SaveButton text={text} />
        </div >
    )
}

export default ShareButtons

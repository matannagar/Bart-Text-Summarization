import React from 'react'

function ShareButton({ app, title, text, url }) {
    return (
        <div>
            <a className={`fa fa-${app}`} id={`${app}`} title={`Share with ${app}`}
                href={`mailto:?subject=${title}&body=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#dd4b39",
                    color: "white"
                }}>
            </a>

            <a className="fa fa-twitter" id="mail" title="Share with Twitter"
                href={`${url}${text}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#55ACEE",
                    color: "white"
                }}>
            </a>

            <a disabled className="fa fa-linkedin" id="linkedin" title="Share with Linkedin"
                href={`${url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#007bb5",
                    color: "white"
                }}>
            </a>
        </div>
    )
}

export default ShareButton

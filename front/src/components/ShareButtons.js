import React from 'react'
import SaveButton from './SaveButton'

function ShareButtons({ text }) {
    return (
        <div className="item shareButtons">
            <i className="fa fa-google" id="mail" title="Share by Google"
                style={{
                    background: "#dd4b39",
                    color: "white"
                }}>
            </i>

            <i className="fa fa-linkedin" id="mail" title="Share by Linkedin"
                style={{
                    background: "#007bb5",
                    color: "white"
                }}>
            </i>

            <i className="fa fa-twitter" id="mail" title="Share by Twitter"
                style={{
                    background: "#55ACEE",
                    color: "white"
                }}>
            </i>

            <SaveButton text={text} />
        </div>
    )
}

export default ShareButtons

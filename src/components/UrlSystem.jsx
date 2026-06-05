import React, { useState } from "react";
import { PiStarThin } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { FaRegCopy } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";




export default function UrlSystem() {
    const [longUrl, setLongUrl] = useState("");
    const [openPopup, setOpenPopup] = useState(false);


    const handelCheckURL = () => {

        if (longUrl.trim() === "") {
            alert("Please enter a URL");
            return;
        }

        try {
            new URL(longUrl);
            const shortid = Math.random().toString(36).substring(2, 8);
            const appPassword = Math.floor(100000 + Math.random() * 900000).toString();
            const sendardata = {
                "longUrl": longUrl,
                "shortid": shortid,
                "appPassword": appPassword
            };
            alert(JSON.stringify(sendardata));
            setOpenPopup(true);
        } catch (error) {
            alert("Please enter a valid URL");
        }
    }



    return (
        <>
            <div className="flex center medel">
                <div className="ultraBox">
                    <h1 style={{ textAlign: "center" }}>
                        Transform your <span className="mark">long links</span> into <br />
                        powerful URLs
                    </h1>
                    <p style={{ textAlign: "center" }}>
                        Shorten your links with our URL shortener and share them with ease. <br />
                        Our service provides you with a simple and efficient way to shorten your URLs, making them easier to share and remember.
                    </p>
                    <div className="flex center">
                        <div className="inputBox w90">
                            <input onChange={(e) => setLongUrl(e.target.value)} type="link" placeholder="Enter and paste your long URL here" />
                            <button onClick={handelCheckURL}><PiStarThin /> Shorten Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {openPopup && (
                <div className="flex center medel popupBack animation">
                    <div className="flex center medel popup ultraBox">

                        <div>
                            <div className="flex beet">
                                <div>
                                    <h2 style={{ color: "green" }} className="flex center medel"> Successfully!</h2>
                                </div>
                                <div>
                                    <button className="closeBtn" onClick={() => setOpenPopup(false)}><CgClose /></button>
                                </div>
                            </div>
                            <hr />
                            <b>URL Shortened Successfully!</b>
                            <br /><br />
                            <div>
                                <label htmlFor="shorturl">
                                    Your shortened URL is
                                </label>
                                <div className="fxinput">
                                    <input type="url" className="input" value={"shorturl"} />
                                    <button><FaRegCopy /></button>
                                    <button className="end"><LuExternalLink /></button>
                                </div>
                                <label htmlFor="apppass">
                                    Your App Password is
                                </label>
                                <div className="fxinput">
                                    <input type="text" className="input" value={"appPassword"} />
                                    <button className="end"><FaRegCopy /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
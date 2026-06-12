import React, { useState } from "react";
import { PiStarThin } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { FaRegCopy } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { apiData } from "../api";

export default function UrlSystem() {
    const siteDomin = window.location.origin + "/";
    const [longUrl, setLongUrl] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [appPass, setAppPass] = useState("");

    const handelCheckURL = () => {
        if (longUrl.trim() === "") {
            alert("Please enter a URL");
            return;
        }

        try {

            new URL(longUrl);

            const shortid = Math.random()
                .toString(36)
                .substring(2, 6);

            const appPassword = Math.floor(
                1000 + Math.random() * 9000
            ).toString();

            const sendardata = {
                type: "post",
                data: {
                    long_url: longUrl,
                    short_id: shortid,
                    appPassword: appPassword
                }
            };

            apiData(sendardata)
                .then((response) => {

                    if (response.status === "success") {
                        setLongUrl("");
                        setShortUrl(
                            `${siteDomin}${shortid}`
                        );

                        setAppPass(appPassword);

                        setOpenPopup(true);

                    } else {
                        alert(
                            response.message ||
                            "Error occurred while shortening URL"
                        );
                    }

                })
                .catch((err) => {
                    console.log(err);
                    alert("Server Error");
                });

        } catch (error) {
            alert("Please enter a valid URL");
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied!");
    };

    return (
        <>
            <div className="flex center medel">
                <div className="ultraBox">

                    <h1 style={{ textAlign: "center" }}>
                        Transform your
                        <span className="mark"> long links </span>
                        into
                        <br />
                        powerful URLs
                    </h1>

                    <p style={{ textAlign: "center" }}>
                        Shorten your links with our URL shortener
                        and share them with ease.
                    </p>

                    <div className="flex center">
                        <div className="inputBox w90">

                            <input
                                type="url"
                                value={longUrl}
                                onChange={(e) =>
                                    setLongUrl(e.target.value)
                                }
                                placeholder="Enter and paste your long URL here"
                            />

                            <button onClick={handelCheckURL}>
                                <PiStarThin />
                                {" "}
                                Shorten Now
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {
                openPopup && (
                    <div className="flex center medel popupBack animation">
                        <div className="flex center medel popup ultraBox">

                            <div style={{ width: "100%" }}>

                                <div className="flex beet">

                                    <div>
                                        <h2
                                            style={{ color: "green" }}
                                            className="flex center medel"
                                        >
                                            Successfully!
                                        </h2>
                                    </div>

                                    <div>
                                        <button
                                            className="closeBtn"
                                            onClick={() =>
                                                setOpenPopup(false)
                                            }
                                        >
                                            <CgClose />
                                        </button>
                                    </div>

                                </div>

                                <hr />

                                <br />

                                <b>
                                    URL Shortened Successfully!
                                </b>

                                <br />
                                <br />

                                <label>
                                    Your shortened URL
                                </label>

                                <div className="fxinput">

                                    <input
                                        type="text"
                                        className="input"
                                        value={shortUrl}
                                        readOnly
                                    />

                                    <button
                                        onClick={() =>
                                            copyText(shortUrl)
                                        }
                                    >
                                        <FaRegCopy />
                                    </button>

                                    <button
                                        className="end"
                                        onClick={() =>
                                            window.open(
                                                shortUrl,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <LuExternalLink />
                                    </button>

                                </div>

                                <br />

                                <label>
                                    Your App Password
                                </label>

                                <div className="fxinput">

                                    <input
                                        type="text"
                                        className="input"
                                        value={appPass}
                                        readOnly
                                    />

                                    <button
                                        className="end"
                                        onClick={() =>
                                            copyText(appPass)
                                        }
                                    >
                                        <FaRegCopy />
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
}


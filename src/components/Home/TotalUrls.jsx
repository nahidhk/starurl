import React, { useEffect, useState } from "react";
import { apiData } from "../../api";
import { CiSettings } from "react-icons/ci";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TotalUrls() {
    const navigate = useNavigate();
    const siteDomin = window.location.origin + "/";
    const [sqlData, setSQLData] = useState([]);

    useEffect(() => {
        apiData({
            type: "getall",
        })
            .then((res) => {
                // 🔥 clicks অনুযায়ী sort (high → low)
                const sortedData = res.data.sort((a, b) => b.clicks - a.clicks);
                setSQLData(sortedData);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="flex center">
            <div className="ultraBox cpt scroll">
    
                         
                {sqlData.length > 0 ? (
                    sqlData.map((item, index) => (
                        <div key={item.id || index} className="id flex beet medel">
                            <div title="SL NO" className="fast">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div title="Site URL">
                                <div>{siteDomin}{item.short_id}</div>
                            </div>

                            <div title="Total Click" className="flex medel uniton">
                                <div>{item.clicks}</div>
                                <div title="Open this url" onClick={() => window.location.href=siteDomin + item.short_id}>
                                    <MdOutlineOpenInNew style={{ fontSize: 18, cursor: "pointer" }} />
                                </div>
                                <div onClick={() => navigate("setting")} title="Setting">
                                    <CiSettings style={{ fontSize: 23, cursor: "pointer" }} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data found</p>
                )}
            </div>
        </div>
    );
}
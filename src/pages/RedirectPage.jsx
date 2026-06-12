import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiData } from "../api";

export default function RedirectPage() {

    const { shortid } = useParams();
    const [sqlData, setSQLData] = useState(null);

    useEffect(() => {

        apiData({
            type: "get",
            data: {
                short_id: shortid
            }
        }).then(res => {
            setSQLData(res.data);
        });

    }, []);


    if (!sqlData?.long_url) {
        return <p style={{ textAlign: "center" }}>Working...</p>;
    } else {
        const countClick = Number(sqlData.clicks) + 1;

        apiData({
            type: "edit",
            data: {
                id: sqlData.id,
                clicks: countClick
            }
        }).then(res => {
            if (res.status === "success") {
                window.location.href = sqlData.long_url;
            }
        });
    }



    return (
        <>
            <div className="popupBack flex medel center bgFFF" style={{ /* same wrapper */ }}>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 19, marginBottom: 12 }}>Redirecting</p>
                    <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                        {[0, 200, 400].map((delay) => (
                            <span key={delay} style={{
                                width: 6, height: 6,
                                borderRadius: "50%",
                                background: "#888",
                                animation: `dotFlash 1.2s ${delay}ms infinite ease-in-out`
                            }} />
                        ))}
                    </div>
                    <p style={{ fontSize: 15, marginBottom: 12 }}> {"=>"} {sqlData.long_url}</p>
                </div>
            </div>
        </>
    );
}
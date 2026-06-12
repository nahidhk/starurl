import react, { useEffect, useState } from "react";


export default function Setting() {
    const shortId = sessionStorage.getItem("shortId");

    const [inputData, setInputData] = useState("");

    useEffect(() => {
        if (shortId) {
            setInputData(shortId);
        }
    }, [shortId]);

    return (
        <div className="flex center">
            <div className="ultraBox">
                <h2 className="flex center medel">Setting</h2>

                <div className="flex center medel" style={{ gap: 12, marginTop: 20 }}>
                    <label>
                        Short ID :
                    </label>

                    <div style={{ display: "flex", gap: 6 }}>
                        <input
                            type="text"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="Enter short id"
                            className="input"
                        />

                    </div>
    
                </div>
                <div className="flex center medel" style={{ gap: 12, marginTop: 20 }}>
                    <label>
                        App Password :
                    </label>

                    <div style={{ display: "flex", gap: 6 }}>
                        <input
                            type="password"
                            value={""}
                            onChange={(e) => setInputData(e.target.value)}
                            placeholder="Enter App Password"
                            className="input"
                        />

                    </div>
                    <div>
                        <button onClick={() => alert("This feature is coming soon!")}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>



    );
}
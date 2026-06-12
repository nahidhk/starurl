const api = {
    baseUrl: "http://localhost:8000/index.php"
};

export async function apiData(data) {

    const response = await fetch(api.baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Server Error : " + response.status);
    }
    return await response.json();
}



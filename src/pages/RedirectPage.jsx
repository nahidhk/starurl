import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiData } from "../api";

export default function RedirectPage() {

    const { shortid } = useParams();

    useEffect(() => {

        apiData({
            type: "get",
            shortid: shortid
        }).then(res => {
            console.log(res);
        });

    }, []);

    return <h1>Loading...</h1>;
}
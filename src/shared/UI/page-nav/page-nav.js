import React, { useEffect, useState } from "react";
import ArrowLeft from "../../../assets/icons/arrowLeft";
import ArrowLeftFill from "../../../assets/icons/arrowLeftFill";
import ArrowRight from "../../../assets/icons/arrowRight";
import ArrowRightFill from "../../../assets/icons/arrowRightFill";
import { doGetApiMethod } from "../../../services/axios-service/axios-service";

export default function PageNav({
    urlPageApi,
    perPage,
    cssClass,
    setPage,
    page,
    setIsChange,
}) {
    const [pages, setPages] = useState(0);
    const [overR, setOverR] = useState(false);
    const [overL, setOverL] = useState(false);

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        let resp = await doGetApiMethod(urlPageApi);
        let totalPages = Math.ceil(resp.data.count / perPage);
        setPages(totalPages);
    };

    return (
        <div className={cssClass}>
            <span className="flex font-bold text-gray-500 dark:text-gray-400 cursor-pointer"
                onMouseOver={() => setOverL(true)}
                onMouseLeave={() => setOverL(false)}
                onClick={() => {
                    page <= 1 ? setPage(pages) : setPage(page - 1);
                    setIsChange(true);
                }}
            >
                {overL ? (
                    <ArrowLeftFill color="gray" className="hover:shadow" width={32} height={32} />
                ) : (
                    <ArrowLeft color="gray" className="hover:shadow" width={32} height={32} />
                )}
                Prev
            </span>
            <span className="flex font-bold text-gray-500 dark:text-gray-400 cursor-pointer"
                onMouseOver={() => setOverR(true)}
                onMouseLeave={() => setOverR(false)}
                onClick={() => {
                    page >= pages ? setPage(1) : setPage(page + 1);
                    setIsChange(true);
                }}
            >Next
                {overR ? (
                    <ArrowRightFill color="gray" className="hover:shadow" width={32} height={32} />
                ) : (
                    <ArrowRight color="gray" className="hover:shadow" width={32} height={32} />
                )}
            </span>
        </div>
    );
}

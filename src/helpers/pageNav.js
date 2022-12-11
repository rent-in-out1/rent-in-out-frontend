import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { doGetApiMethod } from "./../services/service";
import ArrowLeftFill from "./../components/icons/arrowLeftFill";
import ArrowRightFill from "./../components/icons/arrowRightFill";
import ArrowRight from "../components/icons/arrowRight";
import ArrowLeft from "../components/icons/arrowLeft";

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
    let url = urlPageApi;
    let resp = await doGetApiMethod(url);
    let totalPages = Math.ceil(resp.data.count / perPage);
    // מגדיר את מספר העמודים
    setPages(totalPages);
    console.log(resp.data);
  };

  return (
    <div className={cssClass}>
      <Link className="flex font-bold text-gray-500 dark:text-gray-400"
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
      </Link>
      <Link className="flex font-bold text-gray-500 dark:text-gray-400"
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
      </Link>
    </div>
  );
}

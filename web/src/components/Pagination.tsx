"use client";

import { useCallback, useEffect, useState } from "react";
import PaginationItem from "./PaginationItem";

type PaginationProps = {
  total?: number;
  activePage?: number;
  onChangePage: Function;
};

export default function Pagination({
  total = 1,
  activePage = 1,
  onChangePage = () => {},
}: PaginationProps) {
  const [currentItem, setCurrentItem] = useState(activePage);

  useEffect(() => {
    setCurrentItem(activePage);
  }, [activePage]);

  const handleClickItem = (number: number) => {
    setCurrentItem(number);
    onChangePage(number);
  };

  const renderItems = useCallback(() => {
    const items = [];
    let t = 1;
    while (t <= total) {
      items.push(
        <PaginationItem
          number={t}
          active={currentItem === t}
          onClick={handleClickItem}
        />,
      );
      t++;
    }
    return items;
  }, [total, currentItem]);

  return <div className="flex flex-row 3xl:gap-5 gap-3">{renderItems()}</div>;
}

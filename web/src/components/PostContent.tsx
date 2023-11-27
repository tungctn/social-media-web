"use client";

import Link from "next/link";
import { useCallback } from "react";

type PostContentProps = {
  text: string;
};

export default function PostCard({ text }: PostContentProps) {
  const render = useCallback(() => {
    if (text) {
      const regex = /[#]\w+/g;
      const found = text.match(regex);
      const arr = text.split(regex);
      const nodes = [];
      let i = 0;
      if (found) {
        while (i < arr.length) {
          nodes.push(<span>{arr[i]}</span>);
          nodes.push(<Link href={`/search/${found[i]?.trim()?.substring(1)}`}><span className="bg-lavender">{found[i]}</span></Link>);
          i++;
        }
      } else {
        return text;
      }

      return nodes;
    }
    return "";
  }, [text]);
  return <p>{render()}</p>;
}

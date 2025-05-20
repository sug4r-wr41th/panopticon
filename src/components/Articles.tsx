import {
  useState,
  useEffect
} from 'react';

import { Table, Tag } from "antd";

import { ExportOutlined } from "@ant-design/icons";

import Article from "../interfaces/Article";

const columns = [
  {
    title: 'Post Title',
    dataIndex: 'title',
    key: 'title',
    render: (_: any, r: Article) => <a href={r.link} target="_blank">{r.title} <ExportOutlined /></a>
  },
  {
    title: 'Publish Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: Date) => text.toLocaleString()
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text: string) => <Tag>{text}</Tag>
  },
];

async function getRSSFeed(url: string, category: string, source: string) {

  try {

    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, { mode: "cors" })

    const text = await response.text()

    const selector = new window.DOMParser().parseFromString(text, "text/xml");

    const items = selector.querySelectorAll("item");

    return [...items].map((e) => {

      const date = new Date(e.querySelector("pubDate")!.innerHTML);

      return {
        id: e.querySelector("guid")!.innerHTML,
        title: e.querySelector("title")!.innerHTML,
        description: e.querySelector("description")!.innerHTML,
        date,
        category,
        source,
        link: e.querySelector("link")!.innerHTML,
      } as Article

    })
    
  } catch (e) { console.error(e); }
  
}

import rss from '../sources/feeds.json';

export default function Articles() {

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {

    const getArticles = async () => {

      let a: Article[] = []

      for (let i = 0; i < rss.length; i++)
      {
        let { feed, category, source } = rss[i]

        const items = await getRSSFeed(feed, category, source)

        if (items) a = a.concat(items)
      }

      a.sort((a, b) => { return new Date(b.date).valueOf() - new Date(a.date).valueOf(); })

      setArticles(a);
    };

    getArticles()

  }, [])

  return ( <Table dataSource={articles} rowKey="id" columns={columns} size="small" footer={() => { return "Fetched with RSS (Really Simple Syndication)" }} /> )
}
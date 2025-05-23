import {
  useState,
  useEffect
} from 'react';

import { Col, Row, Space, Table, Tag, Carousel, Alert, Spin, Typography } from "antd";

import { ExportOutlined } from "@ant-design/icons";

import Clock from "../components/Clock"

import Location from "../components/Location"

import Article from "../interfaces/Article";

import Ransom from "../interfaces/Ransom";

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

    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)

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

import rss from '../sources/feeds.json'

export default function Dashboard({ ransoms: any } : any) {

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

  const [ransoms, setRansoms] = useState<Ransom[]>([]);

  useEffect(() => {

    const getPosts = async () => {

      const response = await fetch("https://raw.githubusercontent.com/joshhighet/ransomwatch/main/posts.json", { mode: "cors" });

      const json = await response.json()

      let c: Ransom[] = [];

      json.forEach((r: any) => c.push({
        group: r.group_name,
        discovered: r.discovered,
        victim: r.post_title
      } as Ransom));

      setRansoms(c);
    }

    getPosts()

  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

      <Row gutter={16}>

        <Col span={6}>
          <Location />
        </Col>

        <Col span={6}>
          <Clock title="Rome, Italy" locale="it-IT" zone="Europe/Rome" />
        </Col>

        <Col span={6}>
          <Clock title="New York, United States" locale="en-US" zone="America/New_York" />
        </Col>

        <Col span={6}>
          <Clock title="Tokyo, Japan" locale="ja-JP" zone="Asia/Tokyo" />
        </Col>
      </Row>

      <Typography.Text>This platform serves as a single pane of glass for all cyber-security related and relevant content. It's created by security personnel to assist security operation centers' threat intelligence routine by aggregating multiple feeds from well-known government agencies, magazines and researchers' blogs without jumping from source to source back and forth. At the moment it's a work in progress, features ideas and suggestions are welcome</Typography.Text>
      
      <Carousel autoplay dots={false} pauseOnFocus={false} pauseOnHover={false}>
      {
      ransoms.slice(-5).map((r: Ransom, index: number) => <Alert key={index} message={ <span>gang <i>{r.group}</i> claimed victim <i>{r.victim}</i> on <i>{r.discovered}</i> (UTC)</span> } type="error" />)
      }
      </Carousel>

      <Table dataSource={articles} rowKey="id" columns={columns} size="small" footer={() => { return "Fetched with RSS (Really Simple Syndication)" }} />

    </Space>
  )
}
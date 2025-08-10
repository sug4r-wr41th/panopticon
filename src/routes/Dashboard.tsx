import {
  useState,
  useEffect,
  useRef
} from 'react';

import { Col, Row, Space, Table, Tag, Spin, Typography } from "antd";

import { ExportOutlined } from "@ant-design/icons";

import Clock from "../components/Clock"

import Location from "../components/Location"

import CVEsTrendCarousel from '../components/CVEsTrendCarousel';
import CVEsTrendCarouselTitle from '../components/CVEsTrendCarouselTitle';

import INFOCONStatus from '../components/INFOCONStatus';

import RansomClaimsCarousel from '../components/RansomClaimsCarousel';
import RansomClaimsCarouselTitle from '../components/RansomClaimsCarouselTitle';

import Article from "../interfaces/Article";

const columns = [
  {
    title: 'Title',
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
    render: (text: string) => <Tag>{text}</Tag>,
    filters: [
      {
        text: 'news',
        value: 'news',
      },
      {
        text: 'agency',
        value: 'agency',
      },
      {
        text: 'vendor',
        value: 'vendor',
      }
    ],
    onFilter: (value: any, record: any) => record.category.indexOf(value as string) === 0,
  },
];

async function getRSSFeed(url: string, category: string, source: string) {

  try {
    const response = await fetch(`https://panopticon-sug4r-wr41th.vercel.app/api/rss?url=${encodeURIComponent(url)}`);

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

export default function Dashboard() {

  const [articles, setArticles] = useState<Article[]>([]);

  const isFirstRender = useRef(true);

  useEffect(() => {

    if (isFirstRender.current)
    {
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
    }

    isFirstRender.current = false;

    return () => { isFirstRender.current = true };

  }, [])

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

      <Row gutter={16}>

        <Col span={6}>
          <Location />
        </Col>

        <Col span={5}>
          <Clock title="Rome, Italy" locale="it-IT" zone="Europe/Rome" />
        </Col>

        <Col span={5}>
          <Clock title="New York, United States" locale="en-US" zone="America/New_York" />
        </Col>

        <Col span={5}>
          <Clock title="Moscow, Russia" locale="ru-RU" zone="Europe/Moscow" />
        </Col>

        <Col span={3}>
          <INFOCONStatus />
        </Col>
      </Row>

      <Typography.Text>This platform serves as a single pane of glass for all cyber-security related and relevant content. It's created by security personnel to assist security operation centers' threat intelligence routine by aggregating multiple feeds from well-known government agencies, magazines and researchers' blogs without jumping from source to source back and forth. At the moment it's a work in progress, features ideas and suggestions are welcome!</Typography.Text>

      <Row gutter={16}>
        <Col span={8}>
          <CVEsTrendCarouselTitle />
          <CVEsTrendCarousel />
        </Col>

        <Col span={16}>
          <RansomClaimsCarouselTitle />
          <RansomClaimsCarousel />
        </Col>
      </Row>

      <Table dataSource={articles} rowKey="id" loading={articles.length == 0} columns={columns} size="small" footer={() => { return "Powered by RSS (Really Simple Syndication)" }} />

    </Space>
  )
}
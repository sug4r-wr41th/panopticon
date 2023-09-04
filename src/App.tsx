import type { MenuProps } from "antd";

import {
  useState,
  useEffect 
} from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";

import Clock from "./components/Clock"

import Location from "./components/Location"

import Ransoms from "./components/Ransoms"

import Articles from "./components/Articles";

import { Col, Row, Space, Menu, Switch, Breadcrumb, Tag, Typography, Image, Alert, } from "antd";

import { ConfigProvider, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

import { DashboardOutlined, LinkOutlined } from "@ant-design/icons";

import { Layout } from "antd";

const { Sider, Content, Footer } = Layout;

const items: MenuProps["items"] = [
  {
    key: 1,
    label: "Dashboard",
    icon: <DashboardOutlined />,
    children: [
      {
        key: 10,
        label: "News",
        children: [
          {
            key: 101,
            label: "All"
          },
          {
            key: 102,
            label: <Space><Typography.Text>Favorites</Typography.Text> <Tag color="warning">To Be Done</Tag></Space>,
            disabled: true
          },
          {
            key: 103,
            label: <Space><Typography.Text>Claims</Typography.Text> <Tag color="warning">To Be Done</Tag></Space>,
            disabled: true
          }
        ],
        type: "group"
      }
    ]
  },
  {
    type: "divider"
  },
  {
    key: "link_0",
    label: <a href="https://www.enisa.europa.eu/topics/incident-response/csirt-inventory/certs-by-country-interactive-map" target="_blank" rel="noopener noreferrer">enisa CSIRTs Map</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_1",
    label: <a href="https://www.crowdstrike.com/blog/recent-articles/" target="_blank" rel="noopener noreferrer">CrowdStrike blog</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_2",
    label: <a href="https://msrc.microsoft.com/report/" target="_blank" rel="noopener noreferrer">MSRC | Report issue</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_3",
    label: <a href="https://msrc.microsoft.com/report/infringement" target="_blank" rel="noopener noreferrer">MSRC | Report infringement</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_4",
    label: <a href="https://blog.google/threat-analysis-group/" target="_blank" rel="noopener noreferrer">Google TAG</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_5",
    label: <a href="https://abuse.ch/" target="_blank" rel="noopener noreferrer">abuse.ch</a>,
    icon: <LinkOutlined />
  }
];

export default function App() {

  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>

      <Layout hasSider>

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={256} theme="light">

          <Image preview={false} style={{ padding: 24 }} src={(isDarkMode) ? "./assets/logo-dark.png" : "./assets/logo.png"} />

          <Menu mode="inline" items={items} defaultOpenKeys={["1"]} defaultSelectedKeys={["101"]} />

        </Sider>

        <Layout>
           
          <Content style={{ margin: "0 16px" }}>

            <Breadcrumb style={{ margin: "16px 0" }} items={[{ title: "Dashboard" }, { title: "News" }, { title: "All" }]} />

            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

              <Switch checkedChildren="Dark Mode" unCheckedChildren="Light Mode" checked={isDarkMode} onChange={(value) => { setIsDarkMode(value) }} style={{ float: "right" }}/>

              <Alert closable message="Auto-refresh is on, page reloads every 5 minutes" type="info" showIcon />

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
              
              <Ransoms />

              <Articles />

            </Space>

          </Content>

          <Footer style={{ textAlign: "center" }}>
            panopticon © 2023 Created by anonymous user with <a href="https://react.dev/" target="_blank">React</a> and <a href="https://ant.design" target="_blank">Ant Design</a>
          </Footer>

        </Layout>

      </Layout>

    </ConfigProvider>
  );

}
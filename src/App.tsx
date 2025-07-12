import type { MenuProps } from "antd";

import { Outlet, Link } from "react-router-dom";

import {
  useState,
  useEffect 
} from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";

import { Space, Menu, Switch, Breadcrumb, Tag, Typography, Image, FloatButton } from "antd";

import { ConfigProvider, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

import { DashboardOutlined, LinkOutlined } from "@ant-design/icons";

import { Layout } from "antd";

import AutoRefreshAlert from "./components/AutoRefreshAlert";

const { Sider, Content, Header, Footer } = Layout;

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
            label: <Link to="/">Overview</Link>
          },
          {
            key: 102,
            label: <Space><Typography.Text>Favorites</Typography.Text> <Tag color="warning">To Be Done</Tag></Space>,
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
    label: <a href="https://msrc.microsoft.com/report/" target="_blank" rel="noopener noreferrer">MSRC | Report issue</a>,
    icon: <LinkOutlined />
  },
  {
    key: "link_2",
    label: <a href="https://msrc.microsoft.com/report/infringement" target="_blank" rel="noopener noreferrer">MSRC | Report infringement</a>,
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

          <Image alt={"Web Site Logo"} preview={false} style={{ padding: 16 }} src={(isDarkMode) ? "./assets/logo-dark.png" : "./assets/logo.png"} />

          <Menu mode="inline" items={items} defaultOpenKeys={["1"]} defaultSelectedKeys={["101"]} />
        </Sider>

        <Layout>

          <Content style={{ margin: "0 16px" }}>

            <Space direction="horizontal" size="middle" style={{ display: 'flex' }} classNames={{ item: "ant-space-item-push" }}>

              <Breadcrumb style={{ margin: "16px 0" }} items={[{ title: (<><DashboardOutlined /> <span>Dashboard</span></>) }, { title: <a href="#">News</a> }, { title: <a href="#">Overview</a> }]} />
              
              <Switch checkedChildren="Dark Mode" unCheckedChildren="Light Mode" checked={isDarkMode} onChange={(value) => { setIsDarkMode(value) }} style={{ marginLeft: "auto" }}/>

            </Space>

            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              
              <AutoRefreshAlert />

              <Outlet />

            </Space>

          </Content>

          <Footer style={{ textAlign: "center" }}>
            <a href="https://github.com/sug4r-wr41th/panopticon" target="_blank">panopticon</a> © 2025 Created by <a href="https://github.com/sug4r-wr41th" target="_blank">sug4r-wr41th</a> with <a href="https://react.dev/" target="_blank">React</a>, <a href="https://ant.design" target="_blank">Ant Design</a>, <a href="https://chatgpt.com" target="_blank">ChatGPT</a> and late nights.
          </Footer>

        </Layout>

        <FloatButton.BackTop />

      </Layout>

    </ConfigProvider>
  );
}
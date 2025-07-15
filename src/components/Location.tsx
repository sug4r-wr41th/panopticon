import {
  useState,
  useEffect
} from "react";

import { Card, Statistic, Skeleton } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";

export default function Location() {
  
  const url = "https://ident.me/json";
  const [ipAddr, setIPAddress] = useState<string>("");
  const [ipAddrDesc, setIPAddressDesc] = useState<string>("");

  useEffect(() => {

    const getIPAddress = async () => {

      const response = await fetch(url);

      const json = await response.json();

      setIPAddress(json.ip);
      setIPAddressDesc(Object.entries(json).map(([k, v]) => { return `${k}: ${v}` }).join("\n"));
    };

    getIPAddress();

  }, []);

  return (
    <Card variant="borderless" size="small">
    {
      <Statistic title={<span>Your IP Address <InfoCircleOutlined onClick={() => window.open(url, "_blank")} /></span>} loading={ipAddr.length === 0} value={ipAddr} />
    }
    </Card>
  )
}
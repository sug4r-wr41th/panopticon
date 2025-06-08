import { useState, useEffect } from "react";

import { Card, Statistic, Skeleton } from "antd";

import IP from "../interfaces/IP"

export default function Location() {

  const [ip, setIP] = useState<IP | undefined>(undefined);

  useEffect(() => {

    const getGeoLocation = async () => {

      const response = await fetch("https://ident.me/json");

      const json = await response.json();

      setIP(json);
    };

    getGeoLocation();

  }, []);

  return (
    <Card variant="borderless" size="small">
    {
      (ip === undefined)
      ?
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
      :
      <span><Statistic title="Your IP Address" value={ip?.ip} /> {ip?.continent}, {ip?.country}, {ip?.city}</span>
    }
    </Card>
  )
}
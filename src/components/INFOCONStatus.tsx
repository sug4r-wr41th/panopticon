import {
  useState,
  useEffect
} from "react";

import { Card, Statistic, Skeleton } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";

export default function INFOCONStatus () {

  const [status, setStatus] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("");
  
    useEffect(() => {
  
      const getStatus = async () => {
  
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent("https://isc.sans.edu/infocon.txt")}`, { mode: "cors" });
  
        const text = await response.text();

        setStatus(text);

        switch ( text ) {
          case "green": setStatusColor("#51B435"); break;
          case "yellow": setStatusColor("#F2F250"); break;
          case "orange": setStatusColor("#F6C844"); break;
          case "red": setStatusColor("#D72F20"); break;
          default: setStatusColor("#2D25E1"); break;
        }
      };
  
      getStatus();
  
    }, []);

  return (
    <Card variant="borderless" size="small">
    {
      (status.length == 0)
      ?
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
      :
      <Statistic title={<span>INFOCON Status <InfoCircleOutlined onClick={() => window.open("https://isc.sans.edu/infocon.html", "_blank")}/></span>}
        value={status}
        valueStyle={{ color: statusColor }}/>
    }
    </Card>
  )
}
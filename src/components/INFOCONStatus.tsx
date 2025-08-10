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

      const response = await fetch("https://panopticon-sug4r-wr41th.vercel.app/api/infoconStatus");

      const json = await response.json();

      setStatus(json.status);
      setStatusColor(json.color);
    };

    getStatus();

  }, []);

  return (
    <Card variant="borderless" size="small">
    {
      <Statistic title={<span>INFOCON Status <InfoCircleOutlined onClick={() => window.open("https://isc.sans.edu/infocon.html", "_blank")}/></span>}
        value={status}
        valueStyle={{ color: statusColor }}
        loading={status.length === 0} />
    }
    </Card>
  )
}
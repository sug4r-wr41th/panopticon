import {
  useState,
  useEffect
} from "react";

import { Card, Statistic } from "antd";

function Clock({ title, locale, zone } : any ) {

  const useDate = () => {

    const [today, setDate] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => { setDate(new Date()); }, 1000); return () => { clearInterval(timer); }
    }, []);
  
    const date = today.toLocaleDateString(locale, { timeZone: zone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = today.toLocaleTimeString(locale, { timeZone: zone });
  
    return { date, time };
  };

  return (
    <Card variant="borderless" size="small">
      <Statistic title={title} value={useDate().time} /> {useDate().date}
    </Card>
  );
}

export default Clock
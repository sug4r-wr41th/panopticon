import {
  useState,
  useEffect
} from 'react';

import { Carousel, Alert, Skeleton } from 'antd';

import Ransom from "../interfaces/Ransom";

export default function Ransoms() {

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

  if (ransoms.length == 0)
  {
    return <Skeleton.Button active block />
  }

  return (
    <Carousel autoplay dots={false} pauseOnFocus={false} pauseOnHover={false}>
    {
    ransoms.slice(-5).map((r: Ransom, index: number) => <Alert key={index} message={ <span>gang <i>{r.group}</i> claimed victim <i>{r.victim}</i> on <i>{r.discovered}</i> (UTC)</span> } type="error" />)
    }
    </Carousel>
  )
}
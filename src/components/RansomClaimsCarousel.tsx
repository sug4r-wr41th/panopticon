import { 
  useState,
  useEffect
} from "react";

import { Carousel, Alert } from "antd";

import Ransom from "../interfaces/Ransom";

export default function RansomClaimsCarousel() {

  const [ransoms, setRansoms] = useState<Ransom[]>([]);

  useEffect(() => {

    const getPosts = async () => {

      console.log("RansomClaimsCarousel::getPosts called...");

      const response = await fetch("https://raw.githubusercontent.com/joshhighet/ransomwatch/main/posts.json");

      const json = await response.json()

      let r: Ransom[] = [];

      json.forEach((i: any) => r.push({
        group: i.group_name,
        discovered: i.discovered,
        victim: i.post_title
      } as Ransom));

      setRansoms(r);
    }

    getPosts()

  }, []);

  return (
    <Carousel autoplay dots={false} pauseOnFocus={false} pauseOnHover={false}>
    {
    ransoms.slice(-10).map((r: Ransom, index: number) => <Alert key={index} message={ <span>gang <b>{r.group}</b> claimed victim <b>{r.victim}</b> on <b>{r.discovered}</b> (UTC)</span> } type="error" />)
    }
    </Carousel>
  )
}
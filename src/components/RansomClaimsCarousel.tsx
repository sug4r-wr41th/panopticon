import { 
  useState,
  useEffect
} from "react";

import { Carousel, Alert, Skeleton } from "antd";

import Ransom from "../interfaces/Ransom";

export default function RansomClaimsCarousel() {

  const [claims, setClaims] = useState<Ransom[]>([]);

  useEffect(() => {

    const getClaims = async () => {

      console.log("RansomClaimsCarousel::getPosts called...");

      const response = await fetch("https://raw.githubusercontent.com/joshhighet/ransomwatch/main/posts.json");

      const json = await response.json()

      let r: Ransom[] = [];

      json.forEach((i: any) => r.push({
        group: i.group_name,
        discovered: i.discovered,
        victim: i.post_title
      } as Ransom));

      setClaims(r);
    }

    getClaims()

  }, []);

  if (claims.length === 0) {
    return (
      <Skeleton.Input active />
    )
  } else {
    return (
      <Carousel autoplay dots={false} pauseOnFocus={false} pauseOnHover={false}>
      {
      claims.slice(-10).map((r: Ransom, index: number) => <Alert key={index} message={ <span>gang <b>{r.group}</b> claimed victim <b>{r.victim}</b> on <b>{r.discovered}</b> (UTC)</span> } type="error" />)
      }
      </Carousel>
    )
  }
}
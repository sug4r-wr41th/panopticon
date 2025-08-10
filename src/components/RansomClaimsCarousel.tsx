import { 
  useState,
  useEffect
} from "react";

import { Carousel, Alert, Skeleton } from "antd";

export default function RansomClaimsCarousel() {

  const [claims, setClaims] = useState<object[]>([]);

  useEffect(() => {

    const getClaims = async () => {

      console.log("RansomClaimsCarousel::getPosts called...");

      const response = await fetch("https://raw.githubusercontent.com/joshhighet/ransomwatch/main/posts.json");

      const json = await response.json()

      setClaims(json);
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
      claims.slice(-10).map((r: object, i: number) => <Alert key={i} message={ <span>gang <b>{r.group}</b> claimed victim <b>{r.victim}</b> on <b>{r.discovered}</b> (UTC)</span> } type="error" />)
      }
      </Carousel>
    )
  }
}
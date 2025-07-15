import { 
  useState,
  useEffect
} from "react";

import { Carousel, Alert, Skeleton } from "antd";

export default function CVEsTrendCarousel() {

  const [cves, setCVEs] = useState<any[]>([]);

  useEffect(() => {

    const getCVEs = async () => {

      console.log("CVEsTrendsCarousel::getPosts called...");

      try {

        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent("https://cvemon.intruder.io/rss/cvetrends/latest")}`, { mode: "cors" })
        
        const text = await response.text()

        const selector = new window.DOMParser().parseFromString(text, "text/xml");

        let items: any[] = [];

        selector.querySelectorAll("item").forEach((i: any) => {

          const item = {
            id: i.querySelector("guid")!.innerHTML,
            title: i.querySelector("title")!.innerHTML,
            description: i.querySelector("description")!.innerHTML,
            date: i.querySelector("pubDate")!.innerHTML,
            intruder_rank: i.querySelector("rank")!.innerHTML,
            intruder_score: i.querySelector("hypeScore")!.innerHTML,
            intruder_max_score: "100",
            link: i.querySelector("link")!.innerHTML,
          }

          item.title = item.title.replace("<![CDATA[", "").replace("]]>", "");
          item.description = item.description.replace("<![CDATA[", "").replace("]]>", "").replace(/Currently trending CVE - Hype Score: .* - /, "");

          items.push(item);
        })

        setCVEs(items);

      } catch (e) {
        console.error("CVEsTrendsCarousel::getPosts fail... ");
      }
    }

    getCVEs()

  }, []);

  if (cves.length === 0) {
    return (
      <Skeleton.Input active />
    )
  } else {
    return (
      <Carousel autoplay dots={false} pauseOnFocus={false} pauseOnHover={false}>
      {
      cves.slice(-10).map((c: any, index: number) => <Alert key={index} message={<span><b>{c.title}</b> | Hype Score: <b>{c.intruder_score}</b> / 100</span>} type="warning" />)
      }
      </Carousel>
    )
  }
}
export default async function handler(req, res) {
  try {
    const response = await fetch("https://cvemon.intruder.io/rss/cvetrends/latest");

    const text = await response.text()

    const selector = new window.DOMParser().parseFromString(text, "text/xml");

    const items = [];

    selector.querySelectorAll("item").forEach((i) => {

      const item = {
        title: i.querySelector("title").innerHTML,
        description: i.querySelector("description").innerHTML,
        date: i.querySelector("pubDate").innerHTML,
        intruder_rank: i.querySelector("rank").innerHTML,
        intruder_score: i.querySelector("hypeScore").innerHTML,
        intruder_max_score: "100",
        link: i.querySelector("link").innerHTML
      }

      item.title = item.title.replace("<![CDATA[", "").replace("]]>", "");
      item.description = item.description.replace("<![CDATA[", "").replace("]]>", "").replace(/Currently trending CVE - Hype Score: .* - /, "");

      items.push(item);
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e);
  }
}
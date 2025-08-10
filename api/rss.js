export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) { res.status(500).send("error::query_missing_URL"); }

  try {
    const response = await fetch(url);

    const data = await response.text()

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Vary", "Origin");
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
}
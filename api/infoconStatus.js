export default async function handler(req, res) {
  try {
    const response = await fetch("https://isc.sans.edu/infocon.txt");

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/text");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send("Error:: URL not fetched");
  }
}
export default async function handler(req, res) {
  try {
    const response = await fetch("https://isc.sans.edu/infocon.txt");

    let status = await response.text();

    let color = "";

    switch ( status ) {
      case "green": color = "#51B435"; break;
      case "yellow": color ="#F2F250"; break;
      case "orange": color = "#F6C844"; break;
      case "red": color = "#D72F20"; break;
      default: color = "#2D25E1"; break;
    }

    const data = { status, color }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send("Error:: URL not fetched");
  }
}
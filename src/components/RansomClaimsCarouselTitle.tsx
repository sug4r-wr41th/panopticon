import { 
  useState,
  useEffect
} from "react";

import { Typography } from "antd";

export default function RansomClaimsCarouselTitle() {
  return (
    <Typography.Text strong>☠️ Latest Ransom Claims by <Typography.Link href="https://ransomwatch.telemetry.ltd" target="_blank">RansomWatch</Typography.Link></Typography.Text>
  )
}
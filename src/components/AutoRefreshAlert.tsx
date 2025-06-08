import { Alert } from "antd";

export default function AutoRefreshAlert() {
  return (
    <Alert closable message="Auto-refresh is on, page reloads every 5 minutes" type="info" showIcon />
  )
}
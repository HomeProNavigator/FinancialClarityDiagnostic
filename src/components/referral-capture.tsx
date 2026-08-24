import { useEffect } from "react";
import { captureReferralFromWindow } from "@/lib/diagnostic/referral";

export function ReferralCapture() {
  useEffect(() => {
    captureReferralFromWindow();
  }, []);
  return null;
}

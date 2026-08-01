"use client";

import React, { useEffect, useState } from "react";
import PartnerMap from "@/components/mainLayout/partner/PartnerMap";
import BangladeshContactDirectory from "@/components/mainLayout/partner/BangladeshContactDirectory";
import { getSiteContent } from "@/lib/api";

export default function PartnerPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSiteContent("partner")
      .then((res) => {
        if (res && res.map) setData(res);
      })
      .catch(() => {});
  }, []);

  return (
    <section>
      <PartnerMap mapData={data?.map} />
      <BangladeshContactDirectory divisionsData={data?.divisions} />
    </section>
  );
}

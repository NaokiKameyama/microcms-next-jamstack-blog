import { useEffect, useRef } from "react";

// AdSense の広告ユニット。
// adsbygoogle.js 本体は pages/_document.tsx で全ページに読み込み済みなので、
// ここでは <ins> を置いて push({}) するだけ。
//
// 注意: 同じ <ins> に 2 回 push すると AdSense がエラーを投げるので、
// data-adsbygoogle-status（AdSense が処理済みの印）が付いていたら何もしない。
// 記事間の遷移や一覧の絞り込みで再リクエストしたい場合は、呼び出し側で key を変えて再マウントする。
const CLIENT = "ca-pub-6575946142497456";

export default function AdSense({ slot, format = "auto", layout, layoutKey, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const ins = ref.current;
    if (!ins || ins.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // 広告ブロッカー等で adsbygoogle が無い場合は何もしない
    }
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
    />
  );
}

// 記事内広告（Google 管理画面の「記事内」ユニット）
export const InArticleAd = () => (
  <AdSense
    slot="5889468495"
    format="fluid"
    layout="in-article"
    style={{ textAlign: "center" }}
  />
);

// インフィード広告（Google 管理画面の「インフィード」ユニット）
export const InFeedAd = () => (
  <AdSense slot="6655026303" format="fluid" layoutKey="-72+d5-2s-2t+oy" />
);

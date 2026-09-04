// next/image 用のパススルーローダー。
// 静的エクスポート（next export）では画像最適化サーバーが無いので、
// src をそのまま返す。microCMS の画像は CDN 側で配信される。
export const imageLoader = ({ src }) => src;

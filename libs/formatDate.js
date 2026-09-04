// microCMS が返す ISO 文字列を日本語表記にする。
// サーバーとクライアントで結果がずれないよう、タイムゾーンは JST に固定する。
const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Tokyo",
});

export const formatDate = (iso) => (iso ? formatter.format(new Date(iso)) : "");

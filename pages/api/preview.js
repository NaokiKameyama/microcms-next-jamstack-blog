/* eslint-disable import/no-anonymous-default-export */
import fetch from 'node-fetch'

export default async (req, res) => {
  console.log(req.query.slug)
  console.log(req.query.draftKey)
  console.log(process.env.API_KEY)
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await fetch(
    // `https://atukan0930.microcms.io/api/v1/blog/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
    `https://atukan0930.microcms.io/api/v1/blog/${req.query.slug}?draftKey=${req.query.draftKey}`,
    { headers: { 'X-API-KEY': process.env.API_KEY || '' } }
  )
  .then(res => res.json()).catch(error => null);
  console.log(content)

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};
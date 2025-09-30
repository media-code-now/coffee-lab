"use strict";(()=>{var e={};e.id=287,e.ids=[287],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1017:e=>{e.exports=require("path")},9941:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>h,requestAsyncStorage:()=>p,routeModule:()=>u,serverHooks:()=>c,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>x});var s={};r.r(s),r.d(s,{GET:()=>GET}),r(8976);var i=r(884),n=r(6132),a=r(5798);require("fs"),r(1017);var o=r(5544);let l=process.env.NEXT_PUBLIC_SITE_URL??"https://example.com";async function GET(){let e=function(){let e=(0,o.Bd)(),t=e.map(e=>{let t=new URL(e.canonical??e.permalink,l).toString(),r=new Date(e.date).toUTCString();return`
    <item>
      <title><![CDATA[${e.title}]]></title>
      <link>${t}</link>
      <guid>${t}</guid>
      <pubDate>${r}</pubDate>
      <description><![CDATA[${e.summary}]]></description>
    </item>`}).join("");return`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Mushroom Coffee Lab</title>
    <link>${l}</link>
    <description>Latest mushroom coffee guides, reviews, and research.</description>${t}
  </channel>
</rss>`}();return new a.Z(e,{headers:{"Content-Type":"application/rss+xml; charset=UTF-8","Cache-Control":"s-maxage=300, stale-while-revalidate"}})}let u=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/rss.xml/route",pathname:"/rss.xml",filename:"route",bundlePath:"app/rss.xml/route"},resolvedPagePath:"/Users/noamsadi/New App/app/rss.xml/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:d,serverHooks:c,headerHooks:m,staticGenerationBailout:x}=u,h="/rss.xml/route"},5354:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[364,798,544],()=>__webpack_exec__(9941));module.exports=r})();
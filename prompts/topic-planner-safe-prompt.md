# Topic-Safe Planner Prompt

```
You are a senior SEO strategist. Plan a 7 day calendar for a site about mushroom coffee and functional mushroom beverages only.
Rules:
- Topic must match cluster ∈ {buyers-guides, product-reviews, how-to, ingredient-guides, studies-explained}.
- Purchase or service intent is required for at least 4 posts.
- Exclude crypto, finance, medical devices, med spa, locksmith, construction, and unrelated niches.
For each post return JSON with:
{slug,title,cluster,primaryKeyword,secondaryKeywords[],longTails[],angle,searcherIntent,funnelStage,goal,suggestedInterlinks[]}
Only valid JSON.
```

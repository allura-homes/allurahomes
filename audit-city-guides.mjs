#!/usr/bin/env node

import { setTimeout as sleep } from 'node:timers/promises';

const BASE_URL = 'https://www.allurahomes.com';

// Extract all city guide URLs from sitemap
const cityGuideUrls = [
  // hosting category
  '/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-del-mar-california',
  '/hosting/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california',
  
  // regulations category
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-carlsbad-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-encinitas-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-oceanside-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-rancho-santa-fe-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-san-marcos-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-solana-beach-california',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-unincorporated-san-diego-county',
  '/regulations/comprehensive-guide-to-operating-an-airbnb-or-short-term-rental-in-vista-california',
  
  // Alternative URLs mentioned in issue
  '/regulations/rancho-santa-fe-caliornia', // misspelled version from search
  '/regulations/rancho-santa-fe-california', // correctly spelled variant
  
  // Other regulation URLs
  '/regulations/san-diego-california',
  '/regulations/chula-vista-ca',
  '/regulations/airbnb-carlsbad-regulations',
  '/regulations/get-started-registering-your-airbnb-for-a-short-term-rental-permit-in-chula-vista-california',
];

const results = [];

console.error('Starting URL audit...\n');

for (const path of cityGuideUrls) {
  const url = BASE_URL + path;
  console.error(`Checking: ${path}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Allura-Homes-Audit-Bot/1.0'
      }
    });
    
    const status = response.status;
    const location = response.headers.get('location');
    
    results.push({
      url: path,
      status,
      location,
      ok: status >= 200 && status < 300,
      redirect: status >= 300 && status < 400,
    });
    
    console.error(`  → ${status} ${location ? `(→ ${location})` : ''}`);
    
  } catch (error) {
    results.push({
      url: path,
      status: 'ERROR',
      error: error.message,
      ok: false,
      redirect: false,
    });
    
    console.error(`  → ERROR: ${error.message}`);
  }
  
  // Rate limit: ~1 request per second
  await sleep(1100);
}

console.error('\n\n=== AUDIT RESULTS ===\n');
console.log(JSON.stringify(results, null, 2));

// Summary
const dead404 = results.filter(r => r.status === 404);
const working = results.filter(r => r.ok);
const redirecting = results.filter(r => r.redirect);

console.error('\n\n=== SUMMARY ===');
console.error(`Total URLs checked: ${results.length}`);
console.error(`Working (2xx): ${working.length}`);
console.error(`Redirecting (3xx): ${redirecting.length}`);
console.error(`Dead (404): ${dead404.length}`);

if (dead404.length > 0) {
  console.error('\nDead URLs (404):');
  dead404.forEach(r => console.error(`  - ${r.url}`));
}

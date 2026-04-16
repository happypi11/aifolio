/**
 * Deep CSS Extraction Script v2
 * Extracts exact CSS values from reference sites using Playwright
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITES = [
  { name: 'toolfame', url: 'https://toolfame.com/' },
  { name: 'dofollow', url: 'https://dofollow.tools/' },
  { name: 'turbo0', url: 'https://turbo0.com/' },
  { name: 'dangai', url: 'https://dang.ai/' },
  { name: 'showmebestai', url: 'https://showmebestai.com/' },
  { name: 'fazier', url: 'https://fazier.com/' },
];

async function extractFromSite(browser, site) {
  console.log(`\n🌐 Extracting from ${site.name}: ${site.url}`);
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2000);
    
    const results = await page.evaluate(async () => {
      const results = {};

      // 1. HEADER/NAV
      const header = document.querySelector('header, nav');
      if (header) {
        const cs = getComputedStyle(header);
        results.header = {
          position: cs.position,
          background: cs.background,
          backdropFilter: cs.backdropFilter,
          borderBottom: cs.borderBottom,
          height: cs.height,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          boxShadow: cs.boxShadow,
        };
        const navLinks = [...document.querySelectorAll('header a, nav a')].slice(0, 8);
        results.navLinks = navLinks.map(a => ({
          fontSize: getComputedStyle(a).fontSize,
          fontWeight: getComputedStyle(a).fontWeight,
          color: getComputedStyle(a).color,
          padding: getComputedStyle(a).padding,
          textDecoration: getComputedStyle(a).textDecoration,
        }));
      }

      // 2. HERO SECTION
      const heroSelectors = 'section, main > div, [class*="hero"], [class*="banner"], main';
      const hero = document.querySelector(heroSelectors);
      if (hero) {
        const cs = getComputedStyle(hero);
        results.hero = {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          backgroundImage: cs.backgroundImage,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          textAlign: cs.textAlign,
          minHeight: cs.minHeight,
          display: cs.display,
          alignItems: cs.alignItems,
          justifyContent: cs.justifyContent,
          flexDirection: cs.flexDirection,
        };
      }

      // 3. HERO H1
      const h1 = document.querySelector('h1');
      if (h1) {
        const cs = getComputedStyle(h1);
        results.h1 = {
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          lineHeight: cs.lineHeight,
          color: cs.color,
          margin: cs.margin,
          textAlign: cs.textAlign,
          letterSpacing: cs.letterSpacing,
        };
        results.h1Text = h1.textContent.trim().slice(0, 80);
      }

      // 4. SEARCH INPUT
      const searchSelectors = 'input[type="search"], input[placeholder*="earch"], input[placeholder*="ool"], input[placeholder*="Search"]';
      let search = document.querySelector(searchSelectors);
      if (!search) {
        search = document.querySelector('input[type="text"]');
      }
      if (search) {
        const cs = getComputedStyle(search);
        results.search = {
          width: cs.width,
          height: cs.height,
          borderRadius: cs.borderRadius,
          border: cs.border,
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          fontSize: cs.fontSize,
          color: cs.color,
          outline: cs.outline,
          boxShadow: cs.boxShadow,
        };
        results.searchPlaceholder = search.placeholder;
      }

      // 5. TOOL CARD (first card found)
      const cardSelectors = '[class*="card"], [class*="tool"], [class*="product"], [class*="item"], [class*="resource"]';
      let card = document.querySelector(cardSelectors);
      if (!card) {
        const allDivs = document.querySelectorAll('div');
        card = allDivs[0];
      }
      if (card) {
        const cs = getComputedStyle(card);
        results.card = {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          borderRadius: cs.borderRadius,
          border: cs.border,
          boxShadow: cs.boxShadow,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          margin: cs.margin,
          width: cs.width,
          display: cs.display,
          gap: cs.gap,
          flexDirection: cs.flexDirection,
          alignItems: cs.alignItems,
          justifyContent: cs.justifyContent,
        };
        
        const cardH3 = card.querySelector('h3, h2, h4, [class*="title"], [class*="name"]');
        if (cardH3) {
          const cs3 = getComputedStyle(cardH3);
          results.cardTitle = { 
            fontSize: cs3.fontSize, 
            fontWeight: cs3.fontWeight, 
            color: cs3.color,
            fontFamily: cs3.fontFamily,
            lineHeight: cs3.lineHeight,
            margin: cs3.margin,
          };
        }
        const cardDesc = card.querySelector('p, [class*="desc"], [class*="text"], [class*="summary"]');
        if (cardDesc) {
          const csd = getComputedStyle(cardDesc);
          results.cardDesc = { 
            fontSize: csd.fontSize, 
            color: csd.color, 
            lineHeight: csd.lineHeight,
            fontFamily: csd.fontFamily,
          };
        }
        const badge = card.querySelector('[class*="tag"], [class*="badge"], [class*="label"], span[class], [class*="pill"]');
        if (badge) {
          const csb = getComputedStyle(badge);
          results.cardBadge = { 
            background: csb.background, 
            color: csb.color, 
            borderRadius: csb.borderRadius, 
            padding: csb.padding, 
            fontSize: csb.fontSize,
            fontWeight: csb.fontWeight,
            border: csb.border,
          };
        }
        
        const cardImg = card.querySelector('img, [class*="icon"]');
        if (cardImg) {
          const csi = getComputedStyle(cardImg);
          results.cardImage = {
            width: csi.width,
            height: csi.height,
            borderRadius: csi.borderRadius,
          };
        }
      }

      // 6. BUTTON
      const btn = document.querySelector('button, [class*="btn"], a[href*="submit"], [class*="button"]');
      if (btn) {
        const cs = getComputedStyle(btn);
        results.button = {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          borderRadius: cs.borderRadius,
          border: cs.border,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          boxShadow: cs.boxShadow,
          display: cs.display,
          cursor: cs.cursor,
        };
      }

      // 7. GRID/CONTAINER
      const gridSelectors = '[class*="grid"], [class*="list"], main > div, .container, .content';
      let container = document.querySelector(gridSelectors);
      if (!container) {
        container = document.querySelector('main > *');
      }
      if (container) {
        const cs = getComputedStyle(container);
        results.container = {
          display: cs.display,
          gridTemplateColumns: cs.gridTemplateColumns,
          gridTemplateRows: cs.gridTemplateRows,
          gap: cs.gap,
          maxWidth: cs.maxWidth,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          margin: cs.margin,
          width: cs.width,
        };
      }

      // 8. FOOTER
      const footer = document.querySelector('footer');
      if (footer) {
        const cs = getComputedStyle(footer);
        results.footer = {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          borderTop: cs.borderTop,
          color: cs.color,
        };
        
        const footerLinks = [...footer.querySelectorAll('a')].slice(0, 6);
        results.footerLinks = footerLinks.map(a => ({
          fontSize: getComputedStyle(a).fontSize,
          color: getComputedStyle(a).color,
        }));
      }

      // 9. PAGE BACKGROUND
      const body = document.body;
      if (body) {
        const cs = getComputedStyle(body);
        results.body = {
          backgroundColor: cs.backgroundColor,
          fontFamily: cs.fontFamily,
          color: cs.color,
        };
      }

      // 10. CATEGORY/SIDEBAR if present
      const sidebar = document.querySelector('[class*="sidebar"], [class*="aside"], aside');
      if (sidebar) {
        const cs = getComputedStyle(sidebar);
        results.sidebar = {
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          padding: cs.paddingTop + ' ' + cs.paddingRight + ' ' + cs.paddingBottom + ' ' + cs.paddingLeft,
          width: cs.width,
          borderRight: cs.borderRight,
        };
      }

      return results;
    });
    
    // Take a screenshot too
    await page.screenshot({ 
      path: path.join(__dirname, '..', 'clone-work', 'docs', 'deep-css', `${site.name}-screenshot.png`),
      fullPage: false 
    });
    
    console.log(`  ✓ Extracted data for ${site.name}`);
    console.log(`    - Hero: ${results.hero ? 'found' : 'not found'}`);
    console.log(`    - Card: ${results.card ? 'found' : 'not found'}`);
    console.log(`    - Search: ${results.search ? 'found' : 'not found'}`);
    console.log(`    - Footer: ${results.footer ? 'found' : 'not found'}`);
    console.log(`    - Sidebar: ${results.sidebar ? 'found' : 'not found'}`);
    
    return { name: site.name, url: site.url, data: results, success: true };
  } catch (error) {
    console.error(`  ✗ Error extracting ${site.name}: ${error.message}`);
    return { name: site.name, url: site.url, data: null, success: false, error: error.message };
  } finally {
    await context.close();
  }
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'clone-work', 'docs', 'deep-css');
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log('🚀 Starting Deep CSS Extraction v2\n');
  console.log('='.repeat(50));
  
  const browser = await chromium.launch({ headless: true });
  
  const results = [];
  for (const site of SITES) {
    const result = await extractFromSite(browser, site);
    results.push(result);
    
    // Save individual result
    const filePath = path.join(outputDir, `${site.name}-deep.json`);
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    console.log(`  → Saved to ${filePath}`);
  }
  
  await browser.close();
  
  // Save combined results
  const combinedPath = path.join(outputDir, 'all-extractions.json');
  fs.writeFileSync(combinedPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Combined results saved to ${combinedPath}`);
  
  // Summary
  const successful = results.filter(r => r.success).length;
  console.log(`\n📊 Extraction complete: ${successful}/${SITES.length} sites successful`);
  
  return results;
}

main().catch(console.error);

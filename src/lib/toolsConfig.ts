import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type ToolCategory =
  | "Image & Design"
  | "Developer & Data"
  | "Text & Docs"
  | "Math & Everyday"
  | "Games & Fun"
  | "Generators & Security"
  | "Time & Productivity"
  | "Emoji & Unicode";

export interface FAQ {
  q: string;
  a: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  path: string;
  category: ToolCategory;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: string;
  tagline: string;
  /** Long-form intro paragraph rendered above the tool UI. */
  intro?: string;
  /** Step-by-step usage shown under the tool. */
  howTo?: string[];
  /** Realistic use cases — great for long-tail SEO. */
  useCases?: string[];
  /** FAQ rendered as accordion + injected as FAQPage JSON-LD. */
  faqs?: FAQ[];
  Component?: LazyExoticComponent<ComponentType>;
}

export const TOOLS: ToolConfig[] = [
  // ---------- Image & Design ----------
  {
    id: "image-resizer",
    name: "Image Resizer & Compressor",
    path: "/tools/image-resizer",
    category: "Image & Design",
    seoTitle: "Free Image Resizer & Compressor — 100% Private, In-Browser",
    seoDescription: "Resize and compress JPG, PNG, or WebP images instantly in your browser. No upload. No signup. 100% local processing.",
    keywords: ["image resizer", "image compressor", "resize jpg online", "compress png", "browser image resizer", "private image tool"],
    icon: "🖼️",
    tagline: "Scale & compress images locally with HTML5 Canvas.",
    intro: "Resize JPG, PNG, or WebP images to any width or quality directly in your browser. Files never leave your device — perfect for sensitive screenshots, ID photos, and product images you don't want sitting on a third-party server.",
    howTo: [
      "Drag a JPG, PNG, or WebP image into the dropzone (or click to pick).",
      "Choose a target width — the height scales proportionally.",
      "Pick a quality between 60–95% for the right size-to-clarity trade-off.",
      "Click download to save the compressed image to your device.",
    ],
    useCases: [
      "Compress product photos before uploading to Shopify, Etsy, or eBay.",
      "Resize avatars and profile pictures to platform limits (LinkedIn, X, Discord).",
      "Shrink screenshots to fit email attachment size caps.",
      "Prepare lightweight hero images for blog posts and landing pages.",
    ],
    faqs: [
      { q: "Are my images uploaded anywhere?", a: "No. All processing happens inside your browser using the HTML5 Canvas API. You can disconnect from the internet and the tool still works." },
      { q: "What image formats are supported?", a: "JPG, PNG, and WebP for both input and output. Output format follows your chosen quality target." },
      { q: "How much can I compress without losing quality?", a: "For photos, 80–85% quality usually cuts file size by 50–70% with no visible difference. For graphics with text, stay above 90%." },
      { q: "Is there a file size limit?", a: "Only your device's RAM. Most modern phones and laptops handle 20MB+ images without issue." },
    ],
    Component: lazy(() => import("@/tools/ImageResizer")),
  },
  {
    id: "qr-generator",
    name: "Premium QR Code Generator",
    path: "/tools/qr-generator",
    category: "Image & Design",
    seoTitle: "Free QR Code Generator — 9 Designs, Private, Instant",
    seoDescription: "Generate beautiful, downloadable QR codes in 9 designs — classic, gradient, story, ticket, polaroid and more. Fully offline.",
    keywords: ["qr code generator", "free qr code", "custom qr code", "qr code maker", "private qr generator", "rectangle qr code"],
    icon: "📱",
    tagline: "Beautiful QR codes — 9 ready-to-download designs.",
    intro: "Turn any link, Wi-Fi password, vCard, or message into a beautiful QR code in seconds. Pick from 9 polished designs — square, rectangle, story format, event ticket, polaroid, and more — and download a print-ready PNG instantly.",
    howTo: [
      "Paste any URL, text, Wi-Fi string, or contact info.",
      "Pick one of the 9 design presets that matches your use case.",
      "Add an optional caption to show under the code.",
      "Click download to save a high-resolution PNG.",
    ],
    useCases: [
      "Restaurant menus — link customers to your digital menu without an app.",
      "Event tickets and wedding RSVPs — print scannable codes on invites.",
      "Wi-Fi sharing — let guests connect without typing the password.",
      "Instagram Stories — story-format QR codes that fit the 9:16 frame.",
      "Business cards — vCard QR that adds you to a contact list in one scan.",
    ],
    faqs: [
      { q: "Do QR codes expire?", a: "No. Static QR codes generated here never expire — they encode your data directly and work forever." },
      { q: "Can I track scans?", a: "Not with a static code (and not without a server). For scan analytics, point the QR at a URL you control and track visits there." },
      { q: "What's the maximum size I can encode?", a: "Up to ~2,900 characters for URLs/text. For best scan reliability, keep URLs short." },
      { q: "Will the QR work when printed small?", a: "Yes — the generator uses high error correction so codes stay scannable down to ~2cm × 2cm." },
    ],
    Component: lazy(() => import("@/tools/QrGenerator")),
  },
  {
    id: "svg-converter",
    name: "SVG to PNG / JPG Converter",
    path: "/tools/svg-converter",
    category: "Image & Design",
    seoTitle: "SVG to PNG & JPG Converter — Free, Fast, In-Browser",
    seoDescription: "Convert SVG vector files to PNG or JPG at any resolution. Runs locally — your files never leave your device.",
    keywords: ["svg to png", "svg to jpg", "svg converter", "vector to raster", "free svg converter"],
    icon: "🎨",
    tagline: "Rasterize SVG to PNG or JPG at any resolution.",
    intro: "Convert any SVG vector file into a crisp PNG or JPG at any resolution. Useful for app icons, social previews, slide decks, and any place that needs a raster image instead of vector.",
    howTo: [
      "Drop your .svg file or paste raw SVG markup.",
      "Choose a target width (height scales automatically).",
      "Pick PNG for transparency or JPG for smaller file size.",
      "Download the rasterized image.",
    ],
    useCases: [
      "Generate app icons at 512×512, 1024×1024 from a single SVG source.",
      "Export logo PNGs at exact pixel widths for press kits.",
      "Turn vector illustrations into JPGs for blog post thumbnails.",
    ],
    faqs: [
      { q: "Does it preserve transparency?", a: "Yes when you export to PNG. JPG flattens to a solid background." },
      { q: "Are my SVG files uploaded?", a: "No — rasterization runs locally using the browser's Canvas API." },
    ],
    Component: lazy(() => import("@/tools/SvgConverter")),
  },
  {
    id: "color-palette",
    name: "Hex to RGB & Color Palette Generator",
    path: "/tools/color-palette",
    category: "Image & Design",
    seoTitle: "Hex to RGB Converter & Color Palette Generator",
    seoDescription: "Convert HEX to RGB/HSL and generate beautiful complementary color palettes instantly. Designer-friendly and free.",
    keywords: ["hex to rgb", "color palette generator", "hex converter", "color picker", "rgb to hex"],
    icon: "🎨",
    tagline: "HEX ↔ RGB ↔ HSL with auto-palette suggestions.",
    intro: "Convert colors between HEX, RGB, and HSL — and instantly generate beautiful complementary, analogous, and monochrome palettes from any starting color. Built for designers, frontend engineers, and brand work.",
    howTo: [
      "Type or paste a HEX, RGB, or HSL value.",
      "See all three formats update live and copy any one with a click.",
      "Use the generated palette as a starting point for your design system.",
    ],
    useCases: [
      "Build CSS custom-property palettes for a new design system.",
      "Find accessible variants of a brand color.",
      "Translate a Figma color into Tailwind config.",
    ],
    faqs: [
      { q: "What color formats are supported?", a: "HEX (#RRGGBB and shorthand), RGB, and HSL. The tool converts between all three live." },
    ],
    Component: lazy(() => import("@/tools/ColorPalette")),
  },
  {
    id: "box-shadow",
    name: "CSS Box Shadow Generator",
    path: "/tools/box-shadow",
    category: "Image & Design",
    seoTitle: "CSS Box Shadow Generator — Visual Editor, Copy-Ready Code",
    seoDescription: "Design and preview CSS box-shadows visually. Copy the exact CSS snippet ready for your stylesheet.",
    keywords: ["css box shadow", "box shadow generator", "shadow editor", "css shadow tool"],
    icon: "🌫️",
    tagline: "Design CSS shadows visually, copy production-ready code.",
    intro: "Design CSS box-shadows visually with live sliders for offset, blur, spread, opacity and color. Copy the exact CSS snippet — ready to paste into Tailwind, CSS Modules, or styled-components.",
    howTo: [
      "Adjust the X / Y offset, blur, spread, and color sliders.",
      "Watch the preview update in real time.",
      "Copy the generated `box-shadow:` value to your stylesheet.",
    ],
    useCases: [
      "Quickly prototype card and button elevation styles.",
      "Build a layered shadow system (sm / md / lg / xl) for your design tokens.",
    ],
    faqs: [
      { q: "Can I stack multiple shadows?", a: "Yes — chain comma-separated shadow values in your CSS. Use the tool to design each layer, then concatenate." },
    ],
    Component: lazy(() => import("@/tools/BoxShadow")),
  },

  // ---------- Developer & Data ----------
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    path: "/tools/json-formatter",
    category: "Developer & Data",
    seoTitle: "JSON Formatter & Validator — Free, Private, In-Browser",
    seoDescription: "Format, validate, and prettify JSON instantly. Catch syntax errors with precise line/column reporting. 100% private.",
    keywords: ["json formatter", "json validator", "json prettifier", "json beautifier", "format json online"],
    icon: "{ }",
    tagline: "Validate & prettify JSON with precise error reporting.",
    intro: "Paste any JSON and instantly pretty-print, validate, or minify it. Errors point to the exact line and column — much faster than scrolling through chrome devtools output. Runs entirely in your browser, so API responses and credentials never leave your machine.",
    howTo: [
      "Paste JSON (or a JSON-ish blob with extra commas) into the editor.",
      "The tool auto-validates and reports line + column of any error.",
      "Click prettify for indented output or minify for a single-line payload.",
      "Copy the result to your clipboard.",
    ],
    useCases: [
      "Debug API responses without piping through `jq` in a terminal.",
      "Format webhook payloads pasted from CloudWatch or Stripe logs.",
      "Validate a JSON config file before committing it.",
    ],
    faqs: [
      { q: "Is my JSON sent to a server?", a: "No. Parsing uses the native `JSON.parse` running in your browser." },
      { q: "Does it support JSON5 or comments?", a: "Standard JSON only. Strip comments before pasting, or use a JSON5-aware tool if you need them." },
    ],
    Component: lazy(() => import("@/tools/JsonFormatter")),
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON Converter",
    path: "/tools/csv-to-json",
    category: "Developer & Data",
    seoTitle: "CSV to JSON Converter — Free Online, No Upload",
    seoDescription: "Convert CSV files to JSON arrays instantly in your browser. Handles quoted fields, custom delimiters, and headers.",
    keywords: ["csv to json", "csv converter", "convert csv online", "csv parser"],
    icon: "📊",
    tagline: "Turn CSV into clean JSON arrays — locally and instantly.",
    intro: "Convert spreadsheets, exports, and CSV files into clean JSON arrays in seconds. Supports custom delimiters (comma, tab, semicolon, pipe), quoted fields with embedded commas, and optional headers.",
    howTo: [
      "Paste your CSV or upload a .csv file.",
      "Pick the delimiter and whether the first row is headers.",
      "Copy the resulting JSON array, ready for any API or import script.",
    ],
    useCases: [
      "Import an Excel export into a JavaScript app.",
      "Seed a database from a Google Sheets download.",
      "Convert analytics exports to a JSON-friendly shape.",
    ],
    faqs: [
      { q: "Does it handle quoted fields with commas?", a: "Yes — a proper CSV parser handles RFC 4180 quoting." },
    ],
    Component: lazy(() => import("@/tools/CsvToJson")),
  },
  {
    id: "base64-image",
    name: "Base64 Image Encoder",
    path: "/tools/base64-image",
    category: "Developer & Data",
    seoTitle: "Base64 Image Encoder — Convert Image to Data URI",
    seoDescription: "Encode images to Base64 data URIs for inline CSS or HTML. Drag, drop, copy — done. Fully offline.",
    keywords: ["base64 image", "image to base64", "data uri encoder", "base64 encoder"],
    icon: "🔤",
    tagline: "Encode images to Base64 data URIs in one drop.",
    intro: "Convert any image into a Base64 data URI — perfect for inlining icons in CSS, embedding logos in email templates, or shipping a single-file HTML demo with no external requests.",
    howTo: [
      "Drop an image (PNG, JPG, SVG, WebP, GIF).",
      "Copy the generated `data:image/...;base64,...` string.",
      "Paste it into your CSS `background-image` or `<img src>`.",
    ],
    useCases: [
      "Inline tiny icons in CSS to skip an HTTP request.",
      "Embed logos in HTML email templates that block external images.",
      "Bundle assets into a single portable HTML demo file.",
    ],
    faqs: [
      { q: "When should I NOT use Base64?", a: "Anything over ~5KB usually loads faster as a normal HTTP request once cached. Use Base64 for tiny icons and inline assets only." },
    ],
    Component: lazy(() => import("@/tools/Base64Image")),
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    path: "/tools/jwt-decoder",
    category: "Developer & Data",
    seoTitle: "JWT Decoder — Inspect Tokens Safely in Your Browser",
    seoDescription: "Decode JSON Web Token headers and payloads locally. Tokens are never sent to any server.",
    keywords: ["jwt decoder", "json web token decoder", "decode jwt", "jwt inspector"],
    icon: "🔐",
    tagline: "Decode and inspect JWT headers & payloads locally.",
    intro: "Paste any JSON Web Token to see its header, payload, expiry, and signature — entirely in your browser. Unlike popular JWT websites, your tokens never leave your machine, so it's safe to inspect production auth tokens.",
    howTo: [
      "Paste the full JWT (three Base64 segments separated by dots).",
      "Inspect the decoded header, claims payload, and signature.",
      "Check the `exp` claim against the current time to spot expired tokens.",
    ],
    useCases: [
      "Debug auth issues by inspecting the `sub`, `iss`, and `aud` claims.",
      "Verify token expiry without firing a request to your API.",
      "Check that custom claims are being set correctly by your auth provider.",
    ],
    faqs: [
      { q: "Is it safe to paste a production token?", a: "Yes — the decoding runs locally and we never transmit the token. That said, you should rotate any token you've shared in screenshots or chat." },
      { q: "Does it verify the signature?", a: "No — verification requires the secret/public key. The decoder only parses the structure." },
    ],
    Component: lazy(() => import("@/tools/JwtDecoder")),
  },
  {
    id: "url-codec",
    name: "URL Encode / Decode",
    path: "/tools/url-codec",
    category: "Developer & Data",
    seoTitle: "URL Encoder & Decoder — Free, Instant, Private",
    seoDescription: "Encode and decode URL components and query strings instantly. Browser-only, no logs.",
    keywords: ["url encoder", "url decoder", "percent encoding", "uri encode"],
    icon: "🔗",
    tagline: "encodeURIComponent & decodeURIComponent, beautifully.",
    intro: "Percent-encode or decode any string — query parameters, fragments, or whole URLs. Useful when debugging deep links, building OAuth redirects, or copying a URL out of a log file.",
    howTo: [
      "Paste your raw or encoded string.",
      "See both `encodeURIComponent` and `decodeURIComponent` outputs side by side.",
      "Copy whichever one you need.",
    ],
    useCases: [
      "Build OAuth callback URLs with the right encoding.",
      "Decode tracking parameters captured from analytics.",
      "Sanity-check deep links before sharing them.",
    ],
    faqs: [
      { q: "What's the difference between encodeURI and encodeURIComponent?", a: "`encodeURI` keeps URL-safe characters like `:` and `/` intact. `encodeURIComponent` encodes them — use it for individual query values." },
    ],
    Component: lazy(() => import("@/tools/UrlCodec")),
  },

  // ---------- Text & Docs ----------
  {
    id: "text-cleanup",
    name: "Text Clean-Up Suite",
    path: "/tools/text-cleanup",
    category: "Text & Docs",
    seoTitle: "Text Clean-Up Suite — Case Converter & Whitespace Trimmer",
    seoDescription: "Convert case (UPPER, lower, Title, camelCase), trim whitespace, and normalize text instantly.",
    keywords: ["text case converter", "uppercase converter", "title case", "whitespace remover", "text cleaner"],
    icon: "✂️",
    tagline: "Case-switch, trim, and normalize text in one click.",
    intro: "An all-in-one text cleanup utility: switch case (UPPER, lower, Title, Sentence, camelCase, snake_case, kebab-case), strip extra whitespace, remove blank lines, and normalize line endings. Useful before you paste content into a CMS or copy into code.",
    howTo: [
      "Paste any text into the input.",
      "Click the transformation you want to apply.",
      "Copy the cleaned result.",
    ],
    useCases: [
      "Convert article titles to Title Case before publishing.",
      "Turn `Some Phrase` into `some-phrase` for URL slugs.",
      "Strip extra spaces from copy pasted out of a PDF.",
    ],
    faqs: [
      { q: "Will it preserve my line breaks?", a: "Yes — line structure is preserved unless you explicitly choose the 'collapse blank lines' transform." },
    ],
    Component: lazy(() => import("@/tools/TextCleanup")),
  },
  {
    id: "duplicate-remover",
    name: "Duplicate Line Remover",
    path: "/tools/duplicate-remover",
    category: "Text & Docs",
    seoTitle: "Duplicate Line Remover — Free Text Dedupe Tool",
    seoDescription: "Remove duplicate lines from any text instantly. Preserve order, ignore case, sort alphabetically — your choice.",
    keywords: ["remove duplicate lines", "text dedupe", "deduplicate text", "unique lines"],
    icon: "🧹",
    tagline: "Strip duplicate lines while preserving order.",
    intro: "Strip duplicate lines from any list — emails, keywords, log lines, customer IDs. Preserve original order, ignore case, or sort alphabetically.",
    howTo: [
      "Paste a list (one item per line).",
      "Pick whether to preserve order or sort the result.",
      "Copy the deduped output.",
    ],
    useCases: [
      "Clean a list of email addresses before importing into a CRM.",
      "Dedupe SEO keywords pulled from multiple sources.",
      "Find unique error messages in a log file.",
    ],
    faqs: [
      { q: "Is matching case-sensitive?", a: "By default yes. Toggle 'ignore case' to treat `Foo` and `foo` as duplicates." },
    ],
    Component: lazy(() => import("@/tools/DuplicateRemover")),
  },
  {
    id: "word-counter",
    name: "Word & Reading Time Counter",
    path: "/tools/word-counter",
    category: "Text & Docs",
    seoTitle: "Word Counter & Reading Time Estimator — Live, Free",
    seoDescription: "Live word, character, sentence, and reading-time analysis. Ideal for writers, bloggers, and students.",
    keywords: ["word counter", "character counter", "reading time calculator", "text analyzer"],
    icon: "📝",
    tagline: "Live word, character & reading-time analysis.",
    intro: "Count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time as you type. Useful for essays, blog posts, social-media captions, and meta-description copy.",
    howTo: [
      "Paste or type your text — counters update live.",
      "Read off the metric you care about (word count, character count, reading time).",
    ],
    useCases: [
      "Stay under Twitter/X 280 char limit or LinkedIn 3000 char limit.",
      "Hit a 500-word minimum on a school essay.",
      "Write meta descriptions in the 150–160 char sweet spot.",
      "Estimate how long an article will take readers to finish.",
    ],
    faqs: [
      { q: "How is reading time calculated?", a: "Based on 225 words per minute — the average adult silent-reading speed. Technical content reads slower; light content reads faster." },
    ],
    Component: lazy(() => import("@/tools/WordCounter")),
  },
  {
    id: "markdown-to-html",
    name: "Markdown to HTML Converter",
    path: "/tools/markdown-to-html",
    category: "Text & Docs",
    seoTitle: "Markdown to HTML Converter — Free & In-Browser",
    seoDescription: "Convert Markdown to clean HTML in real time. Preview side-by-side. Copy or download.",
    keywords: ["markdown to html", "md to html", "markdown converter", "markdown preview"],
    icon: "📄",
    tagline: "Real-time Markdown → HTML with side-by-side preview.",
    intro: "Convert GitHub-flavored Markdown to clean, paste-ready HTML in real time. Tables, code blocks, links, lists, and blockquotes all render correctly. Useful for blog posts, CMS imports, and email templates.",
    howTo: [
      "Write or paste Markdown on the left.",
      "See the rendered preview and the raw HTML on the right.",
      "Copy either output.",
    ],
    useCases: [
      "Convert a README into HTML for a marketing site.",
      "Paste Markdown notes into a CMS that only accepts HTML.",
      "Preview a post before publishing to a static site generator.",
    ],
    faqs: [
      { q: "Which Markdown flavor is supported?", a: "GitHub-Flavored Markdown (GFM) — tables, task lists, strikethrough, fenced code blocks." },
    ],
    Component: lazy(() => import("@/tools/MarkdownToHtml")),
  },

  // ---------- Math & Everyday ----------
  {
    id: "percentage-calc",
    name: "Percentage Calculator",
    path: "/tools/percentage-calc",
    category: "Math & Everyday",
    seoTitle: "Percentage Calculator — Free, Instant, No Ads",
    seoDescription: "Calculate percentages, percentage change, and percentage of a number — instantly.",
    keywords: ["percentage calculator", "percent of", "percentage change", "calculate percent"],
    icon: "%",
    tagline: "Every kind of % calculation, instantly.",
    intro: "Every common percentage calculation in one place: percent of a number, percent change between two values, and reverse percentage. No ads, no popups, no math homework.",
    howTo: [
      "Pick the calculation type you need.",
      "Fill in the two known values.",
      "Read the result — copy it if you need it.",
    ],
    useCases: [
      "Calculate sale discounts (`30% off $79.99`).",
      "Work out tip percentages on a restaurant bill.",
      "Track week-over-week growth in a metric.",
    ],
    faqs: [
      { q: "How do I calculate percentage change?", a: "((new − old) / old) × 100. Positive = increase, negative = decrease." },
    ],
    Component: lazy(() => import("@/tools/PercentageCalc")),
  },
  {
    id: "wage-to-salary",
    name: "Hourly Wage to Salary Converter",
    path: "/tools/wage-to-salary",
    category: "Math & Everyday",
    seoTitle: "Hourly Wage to Salary Converter — Free Calculator",
    seoDescription: "Convert hourly wage to annual, monthly, weekly, and daily salary in seconds.",
    keywords: ["hourly to salary", "wage calculator", "salary converter", "annual salary calculator"],
    icon: "💰",
    tagline: "Hourly wage → annual / monthly / weekly salary.",
    intro: "Translate an hourly wage into annual, monthly, weekly, and daily pay — accounting for how many hours per week and weeks per year you actually work. Helpful when comparing job offers or freelance rates.",
    howTo: [
      "Enter your hourly rate.",
      "Adjust hours per week (default 40) and weeks per year (default 52).",
      "See annualized, monthly, weekly, and daily totals.",
    ],
    useCases: [
      "Compare a salaried offer against your current hourly contract.",
      "Quote a freelance project based on a target annual income.",
      "Sanity-check a job listing's pay range.",
    ],
    faqs: [
      { q: "Does this include taxes?", a: "No — figures are gross pay. Take-home varies by location and tax bracket." },
    ],
    Component: lazy(() => import("@/tools/WageToSalary")),
  },
  {
    id: "bill-splitter",
    name: "Bill Splitter & Tip Calculator",
    path: "/tools/bill-splitter",
    category: "Math & Everyday",
    seoTitle: "Bill Splitter & Tip Calculator — Free for Groups",
    seoDescription: "Split a bill across any number of people, add a tip, and see the per-person total instantly.",
    keywords: ["bill splitter", "tip calculator", "split bill", "restaurant calculator"],
    icon: "🧾",
    tagline: "Split bills + tips fairly across the table.",
    intro: "Split a restaurant bill, group trip, or shared subscription across any number of people. Add a tip percentage and see the per-person total — no spreadsheet required.",
    howTo: [
      "Enter the total bill amount.",
      "Adjust the tip percentage with the slider.",
      "Set the number of people splitting.",
      "See per-person total.",
    ],
    useCases: [
      "Split dinner bills evenly with friends.",
      "Divide a group Airbnb cost between travelers.",
      "Share the cost of a Netflix or Spotify family plan.",
    ],
    faqs: [
      { q: "What's a fair tip in the US?", a: "15–20% for sit-down restaurants is standard. 10% for counter service, 0% in countries where tipping isn't customary." },
    ],
    Component: lazy(() => import("@/tools/BillSplitter")),
  },
  {
    id: "age-calculator",
    name: "Exact Age Calculator",
    path: "/tools/age-calculator",
    category: "Math & Everyday",
    seoTitle: "Exact Age Calculator — Years, Months, Days, Hours",
    seoDescription: "Calculate your exact age in years, months, days, hours, and minutes from any birthdate.",
    keywords: ["age calculator", "exact age", "date difference", "how old am i"],
    icon: "🎂",
    tagline: "Age to the year, day, and minute.",
    intro: "See your exact age in years, months, days, hours, and even minutes — calculated from any birthdate. Also works as a date-difference calculator between any two dates.",
    howTo: [
      "Pick your birthdate (or any start date).",
      "Optionally pick a target date — defaults to today.",
      "Read your exact age, broken down across units.",
    ],
    useCases: [
      "Calculate the precise age of a child in days for a baby app.",
      "Find the difference between two dates for a contract or anniversary.",
      "Plan a milestone birthday count-down.",
    ],
    faqs: [
      { q: "How accurate is the calculation?", a: "Accurate to the minute, using the browser's local timezone." },
    ],
    Component: lazy(() => import("@/tools/AgeCalculator")),
  },

  // ---------- Games & Fun ----------
  {
    id: "spin-the-wheel",
    name: "Spin The Wheel (Random Name Picker)",
    path: "/tools/spin-the-wheel",
    category: "Games & Fun",
    seoTitle: "Spin The Wheel — Free Random Name Picker",
    seoDescription: "Add names, spin the wheel, get a winner. Smooth canvas animation with physics deceleration. 100% local.",
    keywords: ["spin the wheel", "random name picker", "wheel of names", "name spinner", "decision wheel"],
    icon: "🎡",
    tagline: "Smooth physics spin — pick a winner from any list.",
    intro: "A smooth, animated random picker. Add names, options, or prizes — hit spin and a physics-based deceleration picks a winner. Great for classroom games, raffles, and indecisive friend groups.",
    howTo: [
      "Type names into the list (one per line).",
      "Click spin — the wheel decelerates over a few seconds.",
      "The pointer lands on a single winner.",
    ],
    useCases: [
      "Teachers picking which student answers next.",
      "Streamers running giveaways live on Twitch / YouTube.",
      "Friends deciding where to eat dinner.",
      "Team standups picking the next speaker.",
    ],
    faqs: [
      { q: "Is the result truly random?", a: "Yes — driven by `Math.random()` with the wheel angle. Every entry has equal odds." },
    ],
    Component: lazy(() => import("@/tools/SpinWheel")),
  },
  {
    id: "dice-coin",
    name: "Dice Roller & Coin Flipper",
    path: "/tools/dice-coin",
    category: "Games & Fun",
    seoTitle: "Dice Roller & Coin Flipper — Free Random Generator",
    seoDescription: "Roll any number of d6 dice or flip coins instantly. Fully random, fully offline.",
    keywords: ["dice roller", "coin flipper", "random dice", "flip a coin online"],
    icon: "🎲",
    tagline: "Roll dice, flip coins — true random, true offline.",
    intro: "Roll 1–10 dice or flip a coin — a fair, instant, ad-free alternative to dice apps. Good for board games, tabletop RPGs, classroom games, and any time you need a quick coin flip.",
    howTo: [
      "Pick how many dice you want to roll (or use a single coin).",
      "Click roll / flip.",
      "Read the result.",
    ],
    useCases: [
      "Replace a missing die in a board game.",
      "Settle a coin-flip decision online.",
      "Roll for initiative in a D&D session.",
    ],
    faqs: [
      { q: "Are the rolls truly random?", a: "They use the browser's `Math.random()` PRNG — statistically fair for casual use." },
    ],
    Component: lazy(() => import("@/tools/DiceCoin")),
  },
  {
    id: "fancy-font",
    name: "Fancy Font Bio Generator",
    path: "/tools/fancy-font",
    category: "Games & Fun",
    seoTitle: "Fancy Font Bio Generator — Unicode Text Styler",
    seoDescription: "Generate ✨fancy✨ Unicode fonts for Instagram, TikTok, and Twitter bios. Copy-ready.",
    keywords: ["fancy fonts", "bio generator", "unicode text", "instagram fonts", "stylish text"],
    icon: "🔤",
    tagline: "Stylish Unicode fonts for your bio — copy & paste.",
    intro: "Turn boring text into ✨stylish Unicode fonts✨ that work in Instagram bios, TikTok captions, Discord names, and Twitter/X handles — without any extension or app.",
    howTo: [
      "Type your text once at the top.",
      "Browse the generated styles below.",
      "Tap any style to copy it.",
    ],
    useCases: [
      "Stand out in an Instagram bio.",
      "Add personality to a Discord nickname.",
      "Style a TikTok username.",
    ],
    faqs: [
      { q: "Will the fonts work everywhere?", a: "They're Unicode — works on most platforms. Some apps (banking, government) strip non-ASCII characters." },
    ],
    Component: lazy(() => import("@/tools/FancyFont")),
  },

  // ---------- Generators & Security ----------
  {
    id: "password-generator",
    name: "Secure Password Generator",
    path: "/tools/password-generator",
    category: "Generators & Security",
    seoTitle: "Strong Password Generator — Free, Private, No Logs",
    seoDescription: "Generate cryptographically secure random passwords up to 128 chars. Letters, numbers, symbols — your choice. Runs locally, never logged.",
    keywords: ["password generator", "strong password", "random password", "secure password", "password creator", "passphrase generator"],
    icon: "🔑",
    tagline: "Cryptographically random passwords, generated on your device.",
    intro: "Create strong, cryptographically random passwords — letters, numbers, symbols, any length up to 128 chars. Built on the browser's `crypto.getRandomValues`, so output is unpredictable and never transmitted.",
    howTo: [
      "Pick the length (12+ is recommended; 16+ for sensitive accounts).",
      "Toggle character classes: uppercase, lowercase, numbers, symbols.",
      "Generate and copy — paste straight into your password manager.",
    ],
    useCases: [
      "Create unique passwords for every account.",
      "Generate API keys, database passwords, or admin credentials.",
      "Build memorable passphrases by enabling word mode.",
    ],
    faqs: [
      { q: "How long should my password be?", a: "Minimum 12 characters for normal accounts. 16+ for email, banking, or anything financial. 20+ for crypto wallets and admin accounts." },
      { q: "Is `crypto.getRandomValues` actually random?", a: "Yes — it's cryptographically secure (CSPRNG), as opposed to `Math.random()` which is predictable enough to attack." },
      { q: "Are generated passwords logged?", a: "No. They're created in your browser and never sent anywhere. Refresh the page and they're gone." },
    ],
    Component: lazy(() => import("@/tools/PasswordGenerator")),
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    path: "/tools/lorem-ipsum",
    category: "Generators & Security",
    seoTitle: "Lorem Ipsum Generator — Words, Sentences, Paragraphs",
    seoDescription: "Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Classic Latin or modern variants. Free and instant.",
    keywords: ["lorem ipsum", "lorem ipsum generator", "placeholder text", "dummy text", "filler text"],
    icon: "📜",
    tagline: "Placeholder text for mockups — words, sentences, paragraphs.",
    intro: "Generate Lorem Ipsum placeholder text at any length — by words, sentences, or paragraphs. The classic typesetting filler from the 1500s, perfect for mockups, design previews, and CMS dummy content.",
    howTo: [
      "Pick paragraphs, sentences, or words.",
      "Set how many you want.",
      "Copy the generated text.",
    ],
    useCases: [
      "Fill design mockups with realistic-looking copy.",
      "Test layout overflow on a CMS template.",
      "Seed a database with sample blog content.",
    ],
    faqs: [
      { q: "Is Lorem Ipsum real Latin?", a: "It's scrambled passages from Cicero's `De Finibus Bonorum et Malorum`, written ~45 BC. The text is nonsense, but it sets word patterns close to natural English." },
    ],
    Component: lazy(() => import("@/tools/LoremIpsum")),
  },

  // ---------- Time & Productivity ----------
  {
    id: "pomodoro",
    name: "Pomodoro Focus Timer",
    path: "/tools/pomodoro",
    category: "Time & Productivity",
    seoTitle: "Pomodoro Timer — Free 25/5 Focus Timer in Browser",
    seoDescription: "A clean, distraction-free Pomodoro timer. 25-min focus blocks + 5-min breaks. Audio chime, no signup, no ads.",
    keywords: ["pomodoro timer", "focus timer", "25 minute timer", "study timer", "productivity timer", "tomato timer"],
    icon: "🍅",
    tagline: "25-minute focus blocks with a soft chime — no signup.",
    intro: "A distraction-free Pomodoro timer for deep work and study sessions. 25-minute focus blocks alternate with 5-minute breaks; after four blocks, you get a longer 15-minute rest. A gentle chime signals each transition.",
    howTo: [
      "Click start to begin a 25-minute focus block.",
      "Work until the chime — then take a 5-minute break.",
      "Repeat. Every fourth cycle gets a 15-minute long break.",
    ],
    useCases: [
      "Study sessions for exams and certification prep.",
      "Focused deep-work blocks for writing or coding.",
      "Time-boxing creative work to avoid burnout.",
    ],
    faqs: [
      { q: "What's the Pomodoro Technique?", a: "Developed by Francesco Cirillo in the late 1980s — work in focused 25-minute blocks (`pomodori`), separated by short breaks, to reduce burnout and improve focus." },
      { q: "Will the timer keep running if I switch tabs?", a: "Yes — it runs from a timestamp, so it stays accurate even if the tab is throttled." },
    ],
    Component: lazy(() => import("@/tools/Pomodoro")),
  },
  {
    id: "unit-converter",
    name: "Universal Unit Converter",
    path: "/tools/unit-converter",
    category: "Time & Productivity",
    seoTitle: "Unit Converter — Length, Weight, Temperature, Volume",
    seoDescription: "Convert between metric and imperial units instantly. Length, weight, temperature, volume, and speed — all in your browser.",
    keywords: ["unit converter", "metric to imperial", "cm to inches", "kg to lbs", "celsius to fahrenheit", "miles to km"],
    icon: "📐",
    tagline: "Length, weight, temperature, volume — metric ↔ imperial.",
    intro: "Convert between every common unit instantly — length, weight, temperature, volume, and speed. Switch between metric and imperial in a tap. Especially useful for recipes, travel, and DIY projects.",
    howTo: [
      "Pick a category (length, weight, temperature, volume, speed).",
      "Type a value in any unit — every other unit updates live.",
      "Copy the value you need.",
    ],
    useCases: [
      "Convert recipe units from cups to grams or ml.",
      "Translate height and weight when filling out a US/EU form.",
      "Convert Fahrenheit oven temperatures to Celsius.",
    ],
    faqs: [
      { q: "Which conversions are included?", a: "Length (mm, cm, m, km, in, ft, yd, mi), weight (g, kg, oz, lb), temperature (°C, °F, K), volume (ml, l, tsp, tbsp, cup, fl oz, gal), and speed (km/h, mph, m/s, knots)." },
    ],
    Component: lazy(() => import("@/tools/UnitConverter")),
  },

  // ---------- Emoji & Unicode ----------
  {
    id: "apple-emoji",
    name: "Apple iPhone Emoji Picker",
    path: "/tools/apple-emoji",
    category: "Emoji & Unicode",
    seoTitle: "Apple iPhone Emoji — Copy & Download as PNG",
    seoDescription: "Browse Apple-style iPhone emoji artwork. Tap to copy Unicode emoji, preview the iOS-style design, and download transparent PNGs.",
    keywords: ["apple emoji", "iphone emoji", "emoji to png", "copy emoji", "ios emoji", "emoji picker", "download emoji"],
    icon: "🍎",
    tagline: "Copy Unicode emoji and download Apple-style PNG artwork.",
    intro: "Browse Apple-style iPhone emoji artwork without owning an iPhone. Tap any emoji to copy the normal Unicode character, preview the iOS-style design, and download a single emoji as a PNG with transparent, white, or gradient backgrounds.",
    howTo: [
      "Search or scroll the categorized emoji grid.",
      "Tap to copy a single emoji.",
      "Build longer strings in the composer at the top.",
      "Choose a background and download any emoji as PNG.",
    ],
    useCases: [
      "Copy iOS emojis on Windows or Android where they aren't built-in.",
      "Download a single emoji as a transparent PNG for a slide or thumbnail.",
      "Build emoji combos for social posts and notifications.",
    ],
    faqs: [
      { q: "Why do these look like iOS emoji on Windows?", a: "The picker displays Apple-style emoji image assets instead of relying on your computer's local emoji font. Copying still uses normal Unicode emoji text." },
      { q: "Can I download the PNG with a transparent background?", a: "Yes — pick the transparent option before downloading." },
    ],
    Component: lazy(() => import("@/tools/EmojiPicker")),
  },
];

export const CATEGORIES: ToolCategory[] = [
  "Image & Design",
  "Developer & Data",
  "Text & Docs",
  "Math & Everyday",
  "Games & Fun",
  "Generators & Security",
  "Time & Productivity",
  "Emoji & Unicode",
];

export const getToolById = (id: string) => TOOLS.find((t) => t.id === id);
export const getToolsByCategory = (cat: ToolCategory) =>
  TOOLS.filter((t) => t.category === cat);

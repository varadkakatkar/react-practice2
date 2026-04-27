const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();

// Theme colors
const DARK_BLUE = "1A3A5C";
const ACCENT_BLUE = "2E86C1";
const LIGHT_BLUE = "D6EAF8";
const WHITE = "FFFFFF";
const GOLD = "F0A500";
const DARK_TEXT = "1A1A2E";
const LIGHT_GRAY = "ECF0F1";

// Slide layout helper
function addStyledSlide(pptx, opts) {
  const slide = pptx.addSlide();

  // Background
  slide.background = { color: opts.bgColor || WHITE };

  // Header bar
  if (opts.headerBar !== false) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: "100%", h: 1.1,
      fill: { color: DARK_BLUE },
      line: { color: DARK_BLUE },
    });
    // Gold accent stripe
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 1.05, w: "100%", h: 0.08,
      fill: { color: GOLD },
      line: { color: GOLD },
    });
  }

  // Title in header
  if (opts.title) {
    slide.addText(opts.title, {
      x: 0.35, y: 0.08, w: 9.0, h: 0.85,
      fontSize: opts.titleFontSize || 22,
      bold: true,
      color: WHITE,
      fontFace: "Calibri",
      align: "left",
      valign: "middle",
    });
  }

  // Footer bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.0, w: "100%", h: 0.5,
    fill: { color: DARK_BLUE },
    line: { color: DARK_BLUE },
  });
  slide.addText("Processing Manual for Medical Summarization  |  Confidential", {
    x: 0.3, y: 7.02, w: 8.5, h: 0.44,
    fontSize: 9,
    color: LIGHT_GRAY,
    fontFace: "Calibri",
    align: "left",
    valign: "middle",
  });
  slide.addText(`${opts.slideNum || ""}`, {
    x: 9.0, y: 7.02, w: 0.7, h: 0.44,
    fontSize: 9,
    color: GOLD,
    fontFace: "Calibri",
    bold: true,
    align: "right",
    valign: "middle",
  });

  return slide;
}

// ─────────────────────────────────────────────────────────────
// SLIDE 1 – Title / Cover
// ─────────────────────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: DARK_BLUE };

  // Gold diagonal accent shape (right side)
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.2, y: 0, w: 2.8, h: 7.5,
    fill: { color: ACCENT_BLUE },
    line: { color: ACCENT_BLUE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.4, y: 0, w: 0.6, h: 7.5,
    fill: { color: GOLD },
    line: { color: GOLD },
  });

  slide.addText("PROCESSING MANUAL", {
    x: 0.4, y: 1.3, w: 6.6, h: 0.65,
    fontSize: 30,
    bold: true,
    color: GOLD,
    fontFace: "Calibri",
    charSpacing: 4,
  });
  slide.addText("for Medical Summarization", {
    x: 0.4, y: 1.95, w: 6.6, h: 0.7,
    fontSize: 26,
    bold: false,
    color: WHITE,
    fontFace: "Calibri",
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 2.72, w: 2.5, h: 0.07,
    fill: { color: GOLD },
    line: { color: GOLD },
  });
  slide.addText(
    "A comprehensive guide to need, importance\nand application across Training, Production & Client domains.",
    {
      x: 0.4, y: 2.9, w: 6.6, h: 1.0,
      fontSize: 13,
      color: LIGHT_BLUE,
      fontFace: "Calibri",
      breakLine: true,
    }
  );
  slide.addText("March 2026", {
    x: 0.4, y: 6.5, w: 3.0, h: 0.4,
    fontSize: 11,
    color: LIGHT_GRAY,
    fontFace: "Calibri",
    italic: true,
  });
  // Slide number
  slide.addText("1 / 10", {
    x: 9.0, y: 7.05, w: 0.9, h: 0.35,
    fontSize: 9, color: GOLD, fontFace: "Calibri", align: "right",
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 2 – Agenda
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Agenda",
    bgColor: WHITE,
    slideNum: "2 / 10",
  });

  const items = [
    ["01", "What is Medical Summarization?"],
    ["02", "What is a Processing Manual?"],
    ["03", "Why a Processing Manual is Needed"],
    ["04", "Core Components of the Manual"],
    ["05", "Importance in Training"],
    ["06", "Importance in Production"],
    ["07", "Importance for the Client"],
    ["08", "Cross-Domain Benefits"],
    ["09", "Challenges Without a Manual"],
    ["10", "Conclusion & Recommendations"],
  ];

  items.forEach(([num, label], i) => {
    const col = i < 5 ? 0 : 1;
    const row = i % 5;
    const x = col === 0 ? 0.4 : 5.1;
    const y = 1.3 + row * 1.05;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.55, h: 0.55,
      fill: { color: ACCENT_BLUE },
      line: { color: ACCENT_BLUE },
      rounding: 0.1,
    });
    slide.addText(num, {
      x, y, w: 0.55, h: 0.55,
      fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    slide.addText(label, {
      x: x + 0.65, y: y + 0.04, w: 4.2, h: 0.48,
      fontSize: 12, color: DARK_TEXT, fontFace: "Calibri", valign: "middle",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 3 – What is Medical Summarization?
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "What is Medical Summarization?",
    bgColor: WHITE,
    slideNum: "3 / 10",
  });

  slide.addText(
    "Medical Summarization is the process of condensing large volumes of patient health records, clinical notes, discharge summaries, and medical documents into concise, accurate, and actionable summaries.",
    {
      x: 0.4, y: 1.25, w: 9.2, h: 1.0,
      fontSize: 13, color: DARK_TEXT, fontFace: "Calibri",
      bold: false, align: "left",
    }
  );

  const cards = [
    { icon: "📋", title: "Clinical Notes", body: "Condensing physician notes into structured summaries." },
    { icon: "🏥", title: "Discharge Summaries", body: "Converting lengthy hospital records into brief overviews." },
    { icon: "🔬", title: "Lab & Diagnostic Reports", body: "Highlighting critical findings from test results." },
    { icon: "📊", title: "Patient History", body: "Aggregating longitudinal data into readable timelines." },
  ];

  cards.forEach((c, i) => {
    const x = 0.4 + i * 2.35;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 2.45, w: 2.1, h: 3.7,
      fill: { color: LIGHT_BLUE },
      line: { color: ACCENT_BLUE, pt: 1.5 },
    });
    slide.addText(c.icon, { x, y: 2.6, w: 2.1, h: 0.7, fontSize: 24, align: "center" });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.1, y: 3.35, w: 1.9, h: 0.06,
      fill: { color: GOLD },
      line: { color: GOLD },
    });
    slide.addText(c.title, {
      x, y: 3.5, w: 2.1, h: 0.5,
      fontSize: 11, bold: true, color: DARK_BLUE, align: "center", fontFace: "Calibri",
    });
    slide.addText(c.body, {
      x: x + 0.1, y: 4.05, w: 1.9, h: 1.8,
      fontSize: 10, color: DARK_TEXT, align: "center", fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 4 – What is a Processing Manual?
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "What is a Processing Manual?",
    bgColor: WHITE,
    slideNum: "4 / 10",
  });

  slide.addText(
    "A Processing Manual is a structured, standardized document that defines the rules, guidelines, workflows, and quality benchmarks governing how medical summarization tasks must be performed.",
    {
      x: 0.4, y: 1.25, w: 9.2, h: 0.9,
      fontSize: 13, color: DARK_TEXT, fontFace: "Calibri",
    }
  );

  const bullets = [
    "Defines scope, objectives, and output format of summaries",
    "Establishes annotation guidelines and tagging conventions",
    "Documents quality control checkpoints and escalation procedures",
    "Provides domain-specific terminology references and abbreviation guides",
    "Outlines edge-case handling and decision trees for ambiguous records",
    "Serves as the single source of truth for all stakeholders",
  ];

  bullets.forEach((b, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.4, y: 2.3 + i * 0.73, w: 0.35, h: 0.45,
      fill: { color: GOLD },
      line: { color: GOLD },
    });
    slide.addText(`${i + 1}`, {
      x: 0.4, y: 2.3 + i * 0.73, w: 0.35, h: 0.45,
      fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    slide.addText(b, {
      x: 0.85, y: 2.32 + i * 0.73, w: 8.7, h: 0.45,
      fontSize: 12, color: DARK_TEXT, fontFace: "Calibri", valign: "middle",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 5 – Why a Processing Manual is Needed
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Why a Processing Manual is Needed",
    bgColor: WHITE,
    slideNum: "5 / 10",
  });

  const needs = [
    {
      icon: "⚠️",
      title: "Consistency",
      body: "Eliminates variability across annotators, teams, and geographies, ensuring uniform output quality.",
    },
    {
      icon: "📏",
      title: "Compliance",
      body: "Aligns processes with healthcare regulations (HIPAA, HL7) and client contractual obligations.",
    },
    {
      icon: "🔄",
      title: "Scalability",
      body: "Enables rapid onboarding and expansion without degrading accuracy or reliability.",
    },
    {
      icon: "🛡️",
      title: "Risk Mitigation",
      body: "Reduces errors in clinical context that could have downstream patient-safety implications.",
    },
    {
      icon: "💡",
      title: "Knowledge Retention",
      body: "Preserves institutional knowledge, preventing disruption from team attrition.",
    },
    {
      icon: "📈",
      title: "Continuous Improvement",
      body: "Provides a versioned baseline to measure quality improvements over time.",
    },
  ];

  needs.forEach((n, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.3 + col * 3.25;
    const y = 1.35 + row * 2.75;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 3.05, h: 2.55,
      fill: { color: i % 2 === 0 ? LIGHT_BLUE : "EAF4FB" },
      line: { color: ACCENT_BLUE, pt: 1.2 },
    });
    slide.addText(n.icon, { x, y: y + 0.15, w: 3.05, h: 0.6, fontSize: 22, align: "center" });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.3, y: y + 0.82, w: 2.45, h: 0.06,
      fill: { color: GOLD },
      line: { color: GOLD },
    });
    slide.addText(n.title, {
      x, y: y + 0.95, w: 3.05, h: 0.45,
      fontSize: 12, bold: true, color: DARK_BLUE, align: "center", fontFace: "Calibri",
    });
    slide.addText(n.body, {
      x: x + 0.15, y: y + 1.4, w: 2.75, h: 1.0,
      fontSize: 10, color: DARK_TEXT, align: "center", fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 6 – Core Components of the Manual
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Core Components of the Processing Manual",
    bgColor: WHITE,
    slideNum: "6 / 10",
  });

  // Central label
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 3.8, y: 2.8, w: 2.4, h: 1.5,
    fill: { color: DARK_BLUE },
    line: { color: DARK_BLUE },
  });
  slide.addText("Processing\nManual", {
    x: 3.8, y: 2.8, w: 2.4, h: 1.5,
    fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle",
  });

  const components = [
    { label: "Scope &\nObjectives", x: 0.2, y: 1.3 },
    { label: "Annotation\nGuidelines", x: 7.8, y: 1.3 },
    { label: "Quality\nBenchmarks", x: 0.2, y: 4.5 },
    { label: "Workflow\n& SLAs", x: 7.8, y: 4.5 },
    { label: "Terminology\n& Glossary", x: 3.8, y: 1.0 },
    { label: "Edge-Case\nDecision Trees", x: 3.8, y: 5.2 },
  ];

  components.forEach((c) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: c.x, y: c.y, w: 2.0, h: 1.0,
      fill: { color: ACCENT_BLUE },
      line: { color: DARK_BLUE, pt: 1.5 },
      rectRadius: 0.15,
    });
    slide.addText(c.label, {
      x: c.x, y: c.y, w: 2.0, h: 1.0,
      fontSize: 10.5, bold: true, color: WHITE, align: "center", valign: "middle", fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 7 – Importance in Training
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Importance in Training",
    bgColor: WHITE,
    slideNum: "7 / 10",
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.25, w: 4.4, h: 5.55,
    fill: { color: LIGHT_BLUE },
    line: { color: ACCENT_BLUE, pt: 1.5 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.3, y: 1.25, w: 4.4, h: 5.55,
    fill: { color: "FEF9E7" },
    line: { color: GOLD, pt: 1.5 },
  });

  slide.addText("🎓  For Annotators & QA Teams", {
    x: 0.4, y: 1.35, w: 4.2, h: 0.55,
    fontSize: 12, bold: true, color: DARK_BLUE, fontFace: "Calibri",
  });
  slide.addText("🤖  For AI / ML Model Training", {
    x: 5.4, y: 1.35, w: 4.2, h: 0.55,
    fontSize: 12, bold: true, color: "A0522D", fontFace: "Calibri",
  });

  const trainLeft = [
    "Provides a structured onboarding curriculum for new hires.",
    "Sets clear performance benchmarks and assessment criteria.",
    "Reduces ramp-up time from weeks to days.",
    "Ensures calibration across distributed annotation teams.",
    "Minimizes inter-annotator disagreement through clear examples.",
    "Enables targeted refresher training on error-prone categories.",
  ];
  const trainRight = [
    "Defines gold-standard labeling for supervised learning datasets.",
    "Reduces label noise, improving model accuracy significantly.",
    "Ensures training data diversity across specialties and formats.",
    "Documents data pre-processing and normalization steps.",
    "Facilitates reproducible experiments and model versioning.",
    "Aligns model outputs with clinical expectations and use cases.",
  ];

  trainLeft.forEach((t, i) => {
    slide.addText(`• ${t}`, {
      x: 0.5, y: 2.0 + i * 0.72, w: 4.0, h: 0.65,
      fontSize: 10.5, color: DARK_TEXT, fontFace: "Calibri",
    });
  });
  trainRight.forEach((t, i) => {
    slide.addText(`• ${t}`, {
      x: 5.45, y: 2.0 + i * 0.72, w: 4.1, h: 0.65,
      fontSize: 10.5, color: DARK_TEXT, fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 8 – Importance in Production
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Importance in Production",
    bgColor: WHITE,
    slideNum: "8 / 10",
  });

  const stages = [
    {
      num: "01",
      title: "Operational Consistency",
      body: "Ensures every summary produced at scale adheres to the same quality standard, regardless of volume spikes.",
    },
    {
      num: "02",
      title: "SLA Adherence",
      body: "Clear turnaround-time definitions and escalation paths prevent missed deadlines in live environments.",
    },
    {
      num: "03",
      title: "Error Governance",
      body: "Documented error taxonomy and correction workflows enable fast incident response and root-cause analysis.",
    },
    {
      num: "04",
      title: "Audit & Traceability",
      body: "Versioned manual provides a paper trail for compliance audits and regulatory inspections.",
    },
    {
      num: "05",
      title: "Seamless Handoffs",
      body: "Shift changes, team rotations, or vendor transitions are managed without quality degradation.",
    },
  ];

  stages.forEach((s, i) => {
    const y = 1.35 + i * 1.1;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.35, y, w: 0.7, h: 0.85,
      fill: { color: DARK_BLUE },
      line: { color: DARK_BLUE },
    });
    slide.addText(s.num, {
      x: 0.35, y, w: 0.7, h: 0.85,
      fontSize: 13, bold: true, color: GOLD, align: "center", valign: "middle",
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.15, y, w: 8.5, h: 0.85,
      fill: { color: i % 2 === 0 ? LIGHT_BLUE : LIGHT_GRAY },
      line: { color: ACCENT_BLUE, pt: 0.8 },
    });
    slide.addText(s.title, {
      x: 1.25, y: y + 0.05, w: 2.5, h: 0.4,
      fontSize: 12, bold: true, color: DARK_BLUE, fontFace: "Calibri",
    });
    slide.addText(s.body, {
      x: 1.25, y: y + 0.42, w: 8.2, h: 0.38,
      fontSize: 10.5, color: DARK_TEXT, fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 9 – Importance for the Client
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Importance for the Client",
    bgColor: WHITE,
    slideNum: "9 / 10",
  });

  const clientBenefits = [
    {
      icon: "🤝",
      title: "Transparency & Trust",
      body: "Clients gain visibility into how their data is handled, processed, and summarized — building confidence in deliverables.",
    },
    {
      icon: "🎯",
      title: "Aligned Expectations",
      body: "The manual acts as a contractual reference ensuring output format, scope, and quality meet agreed specifications.",
    },
    {
      icon: "🔒",
      title: "Data Privacy Assurance",
      body: "Documented PHI handling procedures reassure clients that regulatory requirements are met at every step.",
    },
    {
      icon: "📦",
      title: "Faster Delivery",
      body: "Streamlined workflows enabled by the manual translate into quicker turnaround and reduced revision cycles.",
    },
    {
      icon: "📑",
      title: "Customisation",
      body: "The manual can be tailored to client-specific terminology, specialty areas, and output templates.",
    },
    {
      icon: "🔁",
      title: "Feedback Integration",
      body: "Client feedback loops are formally incorporated, driving iterative improvements in summary quality.",
    },
  ];

  clientBenefits.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.3 : 5.15;
    const y = 1.35 + row * 1.9;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 4.65, h: 1.75,
      fill: { color: col === 0 ? LIGHT_BLUE : "F0F4FF" },
      line: { color: col === 0 ? ACCENT_BLUE : DARK_BLUE, pt: 1.2 },
    });
    slide.addText(b.icon, {
      x, y: y + 0.15, w: 1.0, h: 1.3,
      fontSize: 20, align: "center", valign: "middle",
    });
    slide.addText(b.title, {
      x: x + 1.0, y: y + 0.15, w: 3.55, h: 0.45,
      fontSize: 11.5, bold: true, color: DARK_BLUE, fontFace: "Calibri",
    });
    slide.addText(b.body, {
      x: x + 1.0, y: y + 0.6, w: 3.55, h: 1.0,
      fontSize: 10, color: DARK_TEXT, fontFace: "Calibri",
    });
  });
}

// ─────────────────────────────────────────────────────────────
// SLIDE 10 – Conclusion & Recommendations
// ─────────────────────────────────────────────────────────────
{
  const slide = addStyledSlide(pptx, {
    title: "Conclusion & Recommendations",
    bgColor: WHITE,
    slideNum: "10 / 10",
  });

  slide.addText(
    "A well-maintained Processing Manual for Medical Summarization is not just a document — it is the backbone of quality, consistency, and trust across every stage of the summarization lifecycle.",
    {
      x: 0.4, y: 1.25, w: 9.2, h: 0.85,
      fontSize: 12.5, color: DARK_TEXT, italic: true, fontFace: "Calibri",
      align: "left",
    }
  );

  const recs = [
    ["Establish", "Develop a versioned, living manual with dedicated ownership and review cycles."],
    ["Align", "Conduct cross-team alignment sessions (Training, QA, Production, Client Success) at every major release."],
    ["Enforce", "Integrate manual adherence checks into QA scorecards and model evaluation pipelines."],
    ["Iterate", "Incorporate client feedback and production error analyses into quarterly manual updates."],
    ["Scale", "Leverage the manual as the foundation for building automated summarization validation tools."],
  ];

  recs.forEach(([tag, text], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.4, y: 2.25 + i * 0.95, w: 1.3, h: 0.7,
      fill: { color: i % 2 === 0 ? DARK_BLUE : GOLD },
      line: { color: i % 2 === 0 ? DARK_BLUE : GOLD },
    });
    slide.addText(tag, {
      x: 0.4, y: 2.25 + i * 0.95, w: 1.3, h: 0.7,
      fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", fontFace: "Calibri",
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.8, y: 2.25 + i * 0.95, w: 7.8, h: 0.7,
      fill: { color: i % 2 === 0 ? LIGHT_BLUE : "FEF9E7" },
      line: { color: i % 2 === 0 ? ACCENT_BLUE : GOLD, pt: 0.8 },
    });
    slide.addText(text, {
      x: 1.95, y: 2.28 + i * 0.95, w: 7.5, h: 0.65,
      fontSize: 11, color: DARK_TEXT, fontFace: "Calibri", valign: "middle",
    });
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 6.85, w: "90%", h: 0.05,
    fill: { color: GOLD },
    line: { color: GOLD },
  });
  slide.addText("Thank you  —  Questions welcome", {
    x: 0.4, y: 6.62, w: 9.2, h: 0.45,
    fontSize: 11, color: DARK_BLUE, bold: true, align: "center", fontFace: "Calibri",
  });
}

// ─────────────────────────────────────────────────────────────
// Save
// ─────────────────────────────────────────────────────────────
pptx.writeFile({ fileName: "Medical_Summarization_Processing_Manual.pptx" }).then(() => {
  console.log("✅ PPT created: Medical_Summarization_Processing_Manual.pptx");
}).catch((err) => {
  console.error("❌ Error:", err);
});

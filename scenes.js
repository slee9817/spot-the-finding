// =====================================================================
// Spot the Finding -- scenes
//
// Each scene is an SVG drawing plus two lists:
//   findings: real nonconformances to click (each has an id matching a
//             data-id in the SVG, a title, why it matters, and a clause)
//   decoys:   things that look suspicious but are actually compliant
// =====================================================================

const SCENES = [
  {
    id: "machining",
    title: "Machining Cell",
    auditDate: "October 20, 2026",
    seconds: 90,          // time to walk the area

    findings: [
      { id: "f-sticky", title: "Uncontrolled work instruction",
        why: "A handwritten sticky note on the machine (\"OFFSET +.12 — BOB\") is acting as a work instruction. It has no revision, no approval, and nobody knows if it's still right.",
        clause: "AS9100 7.5.3 Control of documented information" },
      { id: "f-cal", title: "Expired calibration",
        why: "The caliper's sticker reads CAL DUE 03/2026. It's October. Every measurement it has made in seven months is suspect, and those parts may need to be recalled.",
        clause: "AS9100 7.1.5.2 Measurement traceability" },
      { id: "f-coffee", title: "Food and drink at the workstation",
        why: "An open coffee cup on a bench with parts and gages. Spills contaminate parts, and food is a classic FOD source.",
        clause: "AS9100 8.1.3 / 8.5.4 FOD prevention and preservation" },
      { id: "f-spray", title: "Unlabeled chemical container",
        why: "A spray bottle with no label. Nobody can tell what's in it, whether it's compatible with the parts, or what PPE it needs.",
        clause: "OSHA 1910.1200 Hazard communication" },
      { id: "f-nolabel", title: "Unidentified parts",
        why: "One bin on the rack has no label. Unidentified parts can't be traced to a lot, a revision, or an inspection status.",
        clause: "AS9100 8.5.2 Identification and traceability" },
      { id: "f-redtag", title: "Rejected part mixed with good stock",
        why: "A part with a red REJECT tag is sitting on the shelf with conforming parts instead of in the MRB cage. It can easily end up in a shipment.",
        clause: "AS9100 8.7 Control of nonconforming outputs" },
      { id: "f-blocked", title: "Blocked fire extinguisher",
        why: "A pallet is stacked in front of the fire extinguisher. In an emergency, nobody can reach it.",
        clause: "OSHA 1910.157 Portable fire extinguishers" },
      { id: "f-fod", title: "FOD in the aisle",
        why: "A loose bolt and washer on the floor. Foreign object debris gets tracked into work areas and ends up in assemblies.",
        clause: "AS9100 8.1.3 FOD prevention" },
    ],

    decoys: [
      { id: "d-traveler", message: "Compliant: the traveler is posted at the machine, so the job and its revision are identified." },
      { id: "d-height", message: "Compliant: the height gage's sticker reads CAL DUE 02/2027. It's in calibration." },
      { id: "d-tote", message: "Compliant: the tote is tagged with part number, lot, and quantity." },
      { id: "d-mrb", message: "Compliant: this is exactly where a rejected part belongs. It's tagged, segregated, and in the locked MRB cage." },
      { id: "d-bin1", message: "Compliant: the bin is labeled BRK-220." },
      { id: "d-bin2", message: "Compliant: the bin is labeled PIN-77." },
      { id: "d-bin3", message: "Compliant: the bin is labeled SH-118." },
      { id: "d-goodstock", message: "Compliant: these parts are in a labeled good-stock location. Look more closely at each one." },
    ],

    // The drawing. Every clickable thing is a <g data-id="..."> group.
    svg: `
<svg viewBox="0 0 1000 620" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, Consolas, monospace">
  <!-- Wall and floor -->
  <rect x="0" y="0" width="1000" height="390" fill="#d7dcdf"/>
  <rect x="0" y="0" width="1000" height="40" fill="#c4cacd"/>
  <text x="500" y="27" text-anchor="middle" font-size="16" fill="#4a5258" font-weight="600">MACHINING CELL</text>
  <rect x="0" y="380" width="1000" height="12" fill="#a9b0b4"/>
  <rect x="0" y="390" width="1000" height="230" fill="#8d9397"/>
  <!-- Yellow aisle markings -->
  <rect x="0" y="548" width="1000" height="7" fill="#e8c547"/>
  <rect x="0" y="600" width="1000" height="7" fill="#e8c547"/>
  <text x="80" y="583" font-size="12" fill="#e8c547" opacity="0.8">AISLE · KEEP CLEAR</text>

  <!-- ===== CNC machine ===== -->
  <g>
    <rect x="30" y="110" width="260" height="360" rx="6" fill="#c3c9cd" stroke="#6b7177" stroke-width="2"/>
    <rect x="30" y="440" width="260" height="30" fill="#5d6469"/>
    <rect x="60" y="160" width="150" height="160" rx="4" fill="#5b7f95" stroke="#43525c" stroke-width="3"/>
    <rect x="70" y="170" width="130" height="140" fill="#7fa3b8" opacity="0.5"/>
    <rect x="128" y="250" width="40" height="10" fill="#9aa5ab"/>
    <rect x="140" y="200" width="16" height="50" fill="#b5bdc2"/>
    <rect x="215" y="215" width="8" height="60" rx="3" fill="#6b7177"/>
    <!-- Control panel -->
    <rect x="232" y="150" width="50" height="150" rx="4" fill="#3d4449"/>
    <rect x="238" y="160" width="38" height="30" fill="#5fd0a0" opacity="0.8"/>
    <circle cx="246" cy="205" r="4" fill="#d9534f"/><circle cx="260" cy="205" r="4" fill="#5cb85c"/>
    <rect x="240" y="218" width="34" height="40" fill="#555d62"/>
    <circle cx="257" cy="282" r="9" fill="#d9534f" stroke="#8c2a26" stroke-width="2"/>
    <text x="45" y="138" font-size="12" fill="#4a5258" font-weight="600">CNC-07</text>
  </g>

  <!-- Finding: sticky-note work instruction -->
  <g data-id="f-sticky">
    <rect x="236" y="312" width="38" height="36" fill="#f6e36b" transform="rotate(-6 255 330)"/>
    <text x="240" y="326" font-size="7" fill="#5a4a10" transform="rotate(-6 255 330)">OFFSET</text>
    <text x="240" y="336" font-size="7" fill="#5a4a10" transform="rotate(-6 255 330)">+.12</text>
    <text x="240" y="345" font-size="6" fill="#5a4a10" transform="rotate(-6 255 330)">—BOB</text>
  </g>

  <!-- Decoy: traveler in its holder -->
  <g data-id="d-traveler">
    <rect x="44" y="340" width="54" height="72" rx="3" fill="#8a6a42"/>
    <rect x="49" y="350" width="44" height="58" fill="#fbfaf5"/>
    <rect x="62" y="336" width="18" height="8" rx="2" fill="#9aa5ab"/>
    <line x1="54" y1="360" x2="88" y2="360" stroke="#888" stroke-width="2"/>
    <line x1="54" y1="370" x2="84" y2="370" stroke="#bbb" stroke-width="2"/>
    <line x1="54" y1="378" x2="86" y2="378" stroke="#bbb" stroke-width="2"/>
    <line x1="54" y1="386" x2="80" y2="386" stroke="#bbb" stroke-width="2"/>
    <line x1="54" y1="394" x2="84" y2="394" stroke="#bbb" stroke-width="2"/>
  </g>

  <!-- ===== Fire extinguisher, blocked by a pallet ===== -->
  <g data-id="f-blocked">
    <rect x="306" y="252" width="44" height="18" fill="#c0392b"/>
    <text x="328" y="265" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">FIRE</text>
    <rect x="314" y="290" width="26" height="70" rx="10" fill="#d0392f" stroke="#8c2a26" stroke-width="2"/>
    <rect x="322" y="280" width="10" height="12" fill="#333"/>
    <path d="M332 286 q14 2 12 22" stroke="#333" stroke-width="3" fill="none"/>
    <rect x="318" y="306" width="18" height="14" fill="#f4f1e8"/>
    <!-- Pallet and boxes stacked right in front of it -->
    <rect x="296" y="452" width="86" height="12" fill="#a77b4c"/>
    <rect x="300" y="464" width="12" height="8" fill="#8a6237"/><rect x="333" y="464" width="12" height="8" fill="#8a6237"/><rect x="366" y="464" width="12" height="8" fill="#8a6237"/>
    <rect x="300" y="328" width="78" height="64" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="304" y="392" width="72" height="60" fill="#bf965f" stroke="#8a6a42" stroke-width="2"/>
    <line x1="300" y1="360" x2="378" y2="360" stroke="#8a6a42" stroke-width="2"/>
    <line x1="304" y1="422" x2="376" y2="422" stroke="#8a6a42" stroke-width="2"/>
  </g>

  <!-- ===== Workbench ===== -->
  <g>
    <rect x="395" y="352" width="290" height="16" fill="#7a6248"/>
    <rect x="405" y="368" width="12" height="100" fill="#5d4a36"/>
    <rect x="663" y="368" width="12" height="100" fill="#5d4a36"/>
    <rect x="405" y="430" width="270" height="8" fill="#5d4a36"/>
  </g>

  <!-- Finding: caliper with expired cal sticker -->
  <g data-id="f-cal">
    <rect x="410" y="338" width="120" height="8" rx="2" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="410" y="320" width="10" height="26" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="452" y="324" width="34" height="22" rx="3" fill="#cfd5d8" stroke="#7d868b"/>
    <rect x="456" y="328" width="22" height="10" fill="#4f6b5c"/>
    <rect x="490" y="326" width="32" height="12" fill="#f0a64b"/>
    <text x="492" y="335" font-size="6" fill="#3a2410" textLength="28" lengthAdjust="spacingAndGlyphs">DUE 03/26</text>
  </g>

  <!-- Finding: coffee cup -->
  <g data-id="f-coffee">
    <path d="M548 320 h26 l-3 32 h-20 z" fill="#f4f1e8" stroke="#8b8478" stroke-width="1.5"/>
    <path d="M574 328 q10 0 9 9 q-1 8 -11 7" fill="none" stroke="#8b8478" stroke-width="2"/>
    <rect x="550" y="331" width="22" height="7" fill="#7a4a2a" opacity="0.7"/>
    <path d="M556 312 q-4 -6 0 -12 M564 312 q-4 -6 0 -12" stroke="#a3a9ad" stroke-width="1.5" fill="none"/>
  </g>

  <!-- Finding: unlabeled spray bottle -->
  <g data-id="f-spray">
    <rect x="596" y="300" width="22" height="52" rx="5" fill="#dfeaf2" stroke="#7b98ab" stroke-width="1.5"/>
    <rect x="600" y="314" width="14" height="34" fill="#9ec7e0" opacity="0.6"/>
    <rect x="601" y="286" width="12" height="16" fill="#3c6e8f"/>
    <path d="M613 290 h12 v5 h-8" fill="#3c6e8f"/>
    <path d="M606 300 l-6 14" stroke="#3c6e8f" stroke-width="3"/>
  </g>

  <!-- Decoy: height gage with a current sticker -->
  <g data-id="d-height">
    <rect x="636" y="340" width="40" height="12" fill="#6b7177"/>
    <rect x="652" y="240" width="8" height="100" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="644" y="290" width="26" height="12" fill="#9aa5ab" stroke="#6b7177"/>
    <rect x="661" y="304" width="30" height="12" fill="#5cb85c"/>
    <text x="663" y="312.5" font-size="6" fill="#fff" textLength="26" lengthAdjust="spacingAndGlyphs">DUE 02/27</text>
  </g>

  <!-- Decoy: tagged tote under the bench -->
  <g data-id="d-tote">
    <path d="M430 390 h110 l-6 40 h-98 z" fill="#3d7bbf" stroke="#2a5687" stroke-width="2"/>
    <rect x="456" y="398" width="58" height="22" fill="#fbfaf5"/>
    <text x="459" y="407" font-size="6" fill="#333">PN BRK-220</text>
    <text x="459" y="416" font-size="6" fill="#333">LOT 2210 Q40</text>
  </g>

  <!-- ===== Parts rack ===== -->
  <g>
    <rect x="712" y="120" width="8" height="350" fill="#4f6b8a"/>
    <rect x="872" y="120" width="8" height="350" fill="#4f6b8a"/>
    <rect x="712" y="200" width="168" height="8" fill="#3f5a78"/>
    <rect x="712" y="290" width="168" height="8" fill="#3f5a78"/>
    <rect x="712" y="380" width="168" height="8" fill="#3f5a78"/>
  </g>

  <!-- Decoys: labeled bins, each its own item -->
  <g data-id="d-bin1">
    <rect x="726" y="160" width="62" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="736" y="170" width="42" height="12" fill="#fbfaf5"/><text x="739" y="179" font-size="7" fill="#333">BRK-220</text>
  </g>
  <g data-id="d-bin2">
    <rect x="802" y="160" width="62" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="812" y="170" width="42" height="12" fill="#fbfaf5"/><text x="815" y="179" font-size="7" fill="#333">PIN-77</text>
  </g>
  <g data-id="d-bin3">
    <rect x="726" y="340" width="62" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="736" y="350" width="42" height="12" fill="#fbfaf5"/><text x="739" y="359" font-size="7" fill="#333">SH-118</text>
  </g>

  <!-- Finding: unlabeled bin -->
  <g data-id="f-nolabel">
    <rect x="802" y="340" width="62" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="812" y="330" width="14" height="12" fill="#b0b7bb"/><rect x="830" y="333" width="16" height="9" fill="#a3aaae"/>
  </g>

  <!-- Middle shelf: good parts, with one rejected part mixed in -->
  <g data-id="d-goodstock">
    <rect x="726" y="262" width="22" height="28" fill="#b0b7bb" stroke="#7d868b"/>
    <rect x="752" y="262" width="22" height="28" fill="#b0b7bb" stroke="#7d868b"/>
    <rect x="806" y="262" width="22" height="28" fill="#b0b7bb" stroke="#7d868b"/>
    <rect x="832" y="262" width="22" height="28" fill="#b0b7bb" stroke="#7d868b"/>
    <rect x="726" y="226" width="128" height="10" fill="#fbfaf5"/>
    <text x="732" y="234" font-size="7" fill="#333">GOOD STOCK · BRK-310-L</text>
  </g>
  <g data-id="f-redtag">
    <rect x="779" y="262" width="22" height="28" fill="#b0b7bb" stroke="#7d868b"/>
    <path d="M790 270 l8 -8" stroke="#c0392b" stroke-width="1.5"/>
    <rect x="794" y="256" width="16" height="11" fill="#d0392f" transform="rotate(-20 802 261)"/>
  </g>

  <!-- ===== MRB cage (decoy: rejected part where it belongs) ===== -->
  <g data-id="d-mrb">
    <rect x="898" y="240" width="90" height="230" fill="none" stroke="#c0392b" stroke-width="4"/>
    <g stroke="#c0392b" stroke-width="1" opacity="0.5">
      <line x1="913" y1="240" x2="913" y2="470"/><line x1="928" y1="240" x2="928" y2="470"/><line x1="943" y1="240" x2="943" y2="470"/>
      <line x1="958" y1="240" x2="958" y2="470"/><line x1="973" y1="240" x2="973" y2="470"/>
      <line x1="898" y1="270" x2="988" y2="270"/><line x1="898" y1="300" x2="988" y2="300"/><line x1="898" y1="330" x2="988" y2="330"/>
      <line x1="898" y1="360" x2="988" y2="360"/><line x1="898" y1="390" x2="988" y2="390"/><line x1="898" y1="420" x2="988" y2="420"/>
      <line x1="898" y1="450" x2="988" y2="450"/>
    </g>
    <rect x="900" y="208" width="86" height="26" fill="#c0392b"/>
    <text x="943" y="219" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">NONCONFORMING</text>
    <text x="943" y="229" text-anchor="middle" font-size="7.5" fill="#fff" font-weight="700">HOLD · MRB</text>
    <rect x="928" y="430" width="26" height="30" fill="#b0b7bb" stroke="#7d868b"/>
    <rect x="944" y="420" width="14" height="10" fill="#d0392f"/>
    <rect x="960" y="300" width="14" height="18" rx="2" fill="#555"/>
  </g>

  <!-- Finding: FOD on the floor -->
  <g data-id="f-fod">
    <polygon points="610,520 618,516 626,520 626,528 618,532 610,528" fill="#7d868b" stroke="#4a5258"/>
    <rect x="626" y="521" width="22" height="6" fill="#9aa5ab" stroke="#4a5258"/>
    <circle cx="664" cy="530" r="6" fill="none" stroke="#5d6469" stroke-width="3"/>
  </g>
</svg>`,
  },
  // ===================================================================
  {
    id: "lab",
    title: "Quality Lab: Inspection",
    auditDate: "October 20, 2026",
    seconds: 90,

    findings: [
      { id: "f-door", title: "Controlled-environment door propped open",
        why: "The lab door is wedged open under a sign that says KEEP CLOSED. Shop air carries heat, dust, and coolant mist into a room that has to stay at 20 °C for measurements to be valid.",
        clause: "AS9100 7.1.4 Environment for the operation of processes" },
      { id: "f-temp", title: "Lab temperature out of spec",
        why: "The lab is posted at 20 ±1 °C, and the display reads 26.4 °C. Steel grows about 0.0115 mm per meter per °C, so every precision measurement taken in here right now is suspect.",
        clause: "AS9100 7.1.5.1 Monitoring and measuring resources" },
      { id: "f-rev", title: "Obsolete drawing at point of use",
        why: "The drawing pinned on the wall is BRK-220 Rev B, but the traveler on the desk is for Rev C. Inspectors could check parts to the wrong revision.",
        clause: "AS9100 7.5.3 Control of documented information" },
      { id: "f-fai", title: "Incomplete inspection record",
        why: "The FAI report is stamped APPROVED, but the signature line is blank. An unsigned record doesn't prove who verified the part, so the approval is meaningless in an audit.",
        clause: "AS9100 7.5.3 / 8.6 Release of products and services" },
      { id: "f-status", title: "Parts with unknown inspection status",
        why: "One tray has an ACCEPT tag, but the tray next to it has no status tag at all. Nobody can tell whether those parts are inspected, rejected, or still waiting.",
        clause: "AS9100 8.5.2 Identification and traceability (inspection status)" },
      { id: "f-shelf", title: "Expired shelf-life material",
        why: "The threadlocker tube reads EXP 06/26. It's October. Expired adhesives can fail to cure, and it's sitting out ready to use.",
        clause: "AS9100 8.5.4 Preservation" },
      { id: "f-nocal", title: "Gage with no calibration status",
        why: "Two micrometers on the rack have calibration stickers. The middle one has none. There's no way to know if it's calibrated, so it can't be used.",
        clause: "AS9100 7.1.5.2 Measurement traceability" },
      { id: "f-plate", title: "Surface plate used as a shelf",
        why: "A heavy box of spare parts is sitting on the granite surface plate. Loads and impacts wear and chip the reference surface that every height measurement depends on.",
        clause: "AS9100 7.1.5 Monitoring and measuring resources (care of equipment)" },
    ],

    decoys: [
      { id: "d-drawing2", message: "Compliant: PIN-77 Rev A is the current revision for that part." },
      { id: "d-traveler2", message: "Compliant: the traveler identifies the job: BRK-220, Rev C. (Did you compare it to the drawing on the wall?)" },
      { id: "d-accept", message: "Compliant: this tray is tagged ACCEPT with a stamp and date." },
      { id: "d-cmm", message: "Compliant: the CMM's calibration sticker reads DUE 01/2027." },
      { id: "d-mics", message: "Compliant: this micrometer has a current calibration sticker." },
    ],

    svg: `
<svg viewBox="0 0 1000 620" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, Consolas, monospace">
  <!-- Wall and floor -->
  <rect x="0" y="0" width="1000" height="390" fill="#e3e6e2"/>
  <rect x="0" y="0" width="1000" height="40" fill="#cfd4cf"/>
  <text x="500" y="27" text-anchor="middle" font-size="16" fill="#4a5258" font-weight="600">QUALITY LAB · INSPECTION</text>
  <rect x="0" y="380" width="1000" height="12" fill="#b8bfba"/>
  <rect x="0" y="390" width="1000" height="230" fill="#b9c3c7"/>
  <g stroke="#a7b1b5" stroke-width="2">
    <line x1="0" y1="450" x2="1000" y2="450"/><line x1="0" y1="520" x2="1000" y2="520"/>
    <line x1="200" y1="390" x2="160" y2="620"/><line x1="450" y1="390" x2="440" y2="620"/><line x1="700" y1="390" x2="720" y2="620"/>
  </g>

  <!-- Finding: door wedged open -->
  <g data-id="f-door">
    <rect x="20" y="100" width="120" height="370" fill="#6b7177"/>
    <rect x="28" y="108" width="104" height="362" fill="#2f3438"/>
    <polygon points="28,108 92,124 92,458 28,470" fill="#9fb2bd" stroke="#5c6b74" stroke-width="2"/>
    <circle cx="82" cy="292" r="5" fill="#5c6b74"/>
    <rect x="40" y="160" width="44" height="40" fill="#fbfaf5" transform="skewY(14) translate(0 -14)"/>
    <text x="42" y="170" font-size="5.5" fill="#c0392b" font-weight="700" transform="skewY(14) translate(0 -14)" textLength="40" lengthAdjust="spacingAndGlyphs">CONTROLLED</text>
    <text x="42" y="180" font-size="5.5" fill="#333" transform="skewY(14) translate(0 -14)" textLength="40" lengthAdjust="spacingAndGlyphs">ENVIRONMENT</text>
    <text x="42" y="192" font-size="6" fill="#c0392b" font-weight="700" transform="skewY(14) translate(0 -14)" textLength="40" lengthAdjust="spacingAndGlyphs">KEEP CLOSED</text>
    <polygon points="90,470 118,470 90,456" fill="#e8c547" stroke="#a88a1c"/>
  </g>

  <!-- Finding: temperature display out of spec -->
  <g data-id="f-temp">
    <rect x="160" y="120" width="76" height="44" rx="4" fill="#2b2f33"/>
    <text x="198" y="150" text-anchor="middle" font-size="18" fill="#ff6b5e" font-weight="700">26.4°</text>
    <rect x="158" y="170" width="80" height="16" fill="#fbfaf5" stroke="#9aa5ab"/>
    <text x="162" y="181" font-size="7" fill="#333" textLength="72" lengthAdjust="spacingAndGlyphs">LAB SPEC 20 ±1 °C</text>
  </g>

  <!-- Finding: obsolete drawing on the wall -->
  <g data-id="f-rev">
    <rect x="262" y="80" width="140" height="110" fill="#2f5d8a"/>
    <g stroke="#cfe0f0" stroke-width="1.5" fill="none">
      <rect x="282" y="96" width="60" height="40"/><circle cx="296" cy="116" r="6"/><circle cx="328" cy="116" r="6"/>
      <line x1="350" y1="100" x2="390" y2="100"/><line x1="350" y1="110" x2="384" y2="110"/><line x1="350" y1="120" x2="388" y2="120"/>
    </g>
    <rect x="320" y="158" width="78" height="28" fill="#fbfaf5"/>
    <text x="324" y="170" font-size="8" fill="#333" textLength="70" lengthAdjust="spacingAndGlyphs">BRK-220</text>
    <text x="324" y="181" font-size="8" fill="#333" font-weight="700" textLength="34" lengthAdjust="spacingAndGlyphs">REV B</text>
    <circle cx="268" cy="86" r="3" fill="#c0392b"/><circle cx="396" cy="86" r="3" fill="#c0392b"/>
  </g>

  <!-- Decoy: current drawing for a different part -->
  <g data-id="d-drawing2">
    <rect x="420" y="80" width="110" height="110" fill="#2f5d8a"/>
    <g stroke="#cfe0f0" stroke-width="1.5" fill="none">
      <rect x="436" y="98" width="70" height="14"/><line x1="436" y1="122" x2="506" y2="122"/><line x1="440" y1="132" x2="500" y2="132"/>
    </g>
    <rect x="448" y="158" width="78" height="28" fill="#fbfaf5"/>
    <text x="452" y="170" font-size="8" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">PIN-77</text>
    <text x="452" y="181" font-size="8" fill="#333" font-weight="700" textLength="34" lengthAdjust="spacingAndGlyphs">REV A</text>
    <circle cx="426" cy="86" r="3" fill="#c0392b"/><circle cx="524" cy="86" r="3" fill="#c0392b"/>
  </g>

  <!-- Inspection desk -->
  <g>
    <rect x="160" y="350" width="370" height="16" fill="#8f9a9f"/>
    <rect x="172" y="366" width="12" height="104" fill="#6b7177"/>
    <rect x="506" y="366" width="12" height="104" fill="#6b7177"/>
  </g>

  <!-- Decoy: traveler (the current revision) -->
  <g data-id="d-traveler2">
    <rect x="172" y="300" width="56" height="50" fill="#fbfaf5" stroke="#9aa5ab" transform="rotate(-4 200 325)"/>
    <text x="177" y="314" font-size="6" fill="#333" transform="rotate(-4 200 325)" textLength="46" lengthAdjust="spacingAndGlyphs">TRAVELER</text>
    <text x="177" y="324" font-size="6" fill="#333" transform="rotate(-4 200 325)" textLength="46" lengthAdjust="spacingAndGlyphs">BRK-220</text>
    <text x="177" y="334" font-size="6.5" fill="#333" font-weight="700" transform="rotate(-4 200 325)" textLength="30" lengthAdjust="spacingAndGlyphs">REV C</text>
  </g>

  <!-- Finding: FAI report stamped but not signed -->
  <g data-id="f-fai">
    <rect x="240" y="296" width="60" height="54" fill="#fbfaf5" stroke="#9aa5ab"/>
    <text x="245" y="306" font-size="5.5" fill="#333" textLength="50" lengthAdjust="spacingAndGlyphs">FAI REPORT</text>
    <line x1="245" y1="312" x2="294" y2="312" stroke="#ccc"/><line x1="245" y1="318" x2="290" y2="318" stroke="#ccc"/>
    <rect x="246" y="321" width="44" height="12" fill="none" stroke="#2f8a57" stroke-width="1.5" transform="rotate(-8 268 327)"/>
    <text x="249" y="330" font-size="6" fill="#2f8a57" font-weight="700" transform="rotate(-8 268 327)" textLength="38" lengthAdjust="spacingAndGlyphs">APPROVED</text>
    <text x="245" y="345" font-size="5" fill="#333" textLength="50" lengthAdjust="spacingAndGlyphs">SIGN: ______</text>
  </g>

  <!-- Decoy: tray tagged ACCEPT -->
  <g data-id="d-accept">
    <rect x="316" y="324" width="70" height="26" fill="#5e8fbf" stroke="#3d6a94" stroke-width="2"/>
    <rect x="324" y="316" width="12" height="10" fill="#b0b7bb"/><rect x="340" y="316" width="12" height="10" fill="#b0b7bb"/><rect x="356" y="316" width="12" height="10" fill="#b0b7bb"/>
    <rect x="330" y="332" width="42" height="12" fill="#5cb85c"/>
    <text x="334" y="341" font-size="7" fill="#fff" font-weight="700" textLength="34" lengthAdjust="spacingAndGlyphs">ACCEPT</text>
  </g>

  <!-- Finding: tray with no status tag -->
  <g data-id="f-status">
    <rect x="394" y="324" width="70" height="26" fill="#5e8fbf" stroke="#3d6a94" stroke-width="2"/>
    <rect x="402" y="316" width="12" height="10" fill="#b0b7bb"/><rect x="418" y="316" width="12" height="10" fill="#b0b7bb"/><rect x="434" y="316" width="12" height="10" fill="#b0b7bb"/>
  </g>

  <!-- Finding: expired threadlocker -->
  <g data-id="f-shelf">
    <rect x="476" y="322" width="40" height="14" rx="4" fill="#c0392b"/>
    <polygon points="516,326 530,329 516,332" fill="#7a1f17"/>
    <rect x="482" y="324" width="28" height="10" fill="#fbfaf5"/>
    <text x="484" y="331.5" font-size="5" fill="#333" textLength="24" lengthAdjust="spacingAndGlyphs">EXP 06/26</text>
  </g>

  <!-- CMM (decoy: current calibration) -->
  <g data-id="d-cmm">
    <rect x="560" y="300" width="250" height="40" fill="#4a5258"/>
    <rect x="575" y="340" width="220" height="130" fill="#6b7177"/>
    <rect x="592" y="150" width="18" height="150" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="760" y="150" width="18" height="150" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="584" y="140" width="202" height="22" fill="#d3d8db" stroke="#7d868b"/>
    <rect x="670" y="162" width="26" height="60" fill="#b9c0c4" stroke="#7d868b"/>
    <rect x="680" y="222" width="6" height="50" fill="#7d868b"/>
    <circle cx="683" cy="276" r="5" fill="#c0392b"/>
    <rect x="650" y="276" width="70" height="24" fill="#9aa5ab"/>
    <rect x="590" y="372" width="44" height="14" fill="#5cb85c"/>
    <text x="593" y="382" font-size="6" fill="#fff" textLength="38" lengthAdjust="spacingAndGlyphs">DUE 01/27</text>
    <text x="700" y="400" font-size="12" fill="#d3d8db" font-weight="600">CMM-01</text>
  </g>

  <!-- Gage board -->
  <g>
    <rect x="840" y="90" width="140" height="190" fill="#c9b48a" stroke="#8a6a42" stroke-width="3"/>
    <text x="910" y="108" text-anchor="middle" font-size="9" fill="#5a4a30" font-weight="600">GAGE BOARD</text>
  </g>
  <g data-id="d-mics">
    <path d="M860 130 h20 v30 a14 14 0 0 1 -20 0 z" fill="#b9c0c4" stroke="#6b7177"/>
    <rect x="866" y="166" width="8" height="54" fill="#d3d8db" stroke="#6b7177"/>
    <rect x="856" y="226" width="30" height="11" fill="#5cb85c"/>
    <text x="858" y="234" font-size="5.5" fill="#fff" textLength="26" lengthAdjust="spacingAndGlyphs">DUE 04/27</text>
    <path d="M940 130 h20 v30 a14 14 0 0 1 -20 0 z" fill="#b9c0c4" stroke="#6b7177"/>
    <rect x="946" y="166" width="8" height="54" fill="#d3d8db" stroke="#6b7177"/>
    <rect x="936" y="226" width="30" height="11" fill="#5cb85c"/>
    <text x="938" y="234" font-size="5.5" fill="#fff" textLength="26" lengthAdjust="spacingAndGlyphs">DUE 12/26</text>
  </g>
  <!-- Finding: micrometer with no sticker -->
  <g data-id="f-nocal">
    <path d="M900 130 h20 v30 a14 14 0 0 1 -20 0 z" fill="#b9c0c4" stroke="#6b7177"/>
    <rect x="906" y="166" width="8" height="54" fill="#d3d8db" stroke="#6b7177"/>
  </g>

  <!-- Surface plate with a box on it -->
  <g>
    <rect x="836" y="360" width="150" height="26" fill="#3b3f42"/>
    <rect x="850" y="386" width="14" height="84" fill="#6b7177"/>
    <rect x="958" y="386" width="14" height="84" fill="#6b7177"/>
    <text x="842" y="378" font-size="7" fill="#9aa5ab">GRANITE PLATE</text>
  </g>
  <g data-id="f-plate">
    <rect x="900" y="316" width="70" height="44" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="910" y="326" width="50" height="14" fill="#fbfaf5"/>
    <text x="913" y="336" font-size="6.5" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">SPARE PARTS</text>
  </g>
</svg>`,
  },

  // ===================================================================
  {
    id: "receiving",
    title: "Receiving & Shipping",
    auditDate: "October 20, 2026",
    seconds: 100,

    findings: [
      { id: "f-heldstock", title: "Held material moved into stock",
        why: "A box with an orange HOLD: RECEIVING INSPECTION tag is sitting on the stock rack. It hasn't been inspected or released, but it's now available to production.",
        clause: "AS9100 8.4.3 / 8.6 Verification and release of incoming product" },
      { id: "f-crushed", title: "Damaged package accepted into stock",
        why: "A crushed, torn box was put away with no damage report. Whatever's inside could be damaged too.",
        clause: "AS9100 8.5.4 Preservation" },
      { id: "f-drum", title: "Expired material in stock",
        why: "The drum of coolant concentrate is labeled EXP 08/26. It's October, and it's still in usable stock.",
        clause: "AS9100 8.5.4 Preservation (shelf-life control)" },
      { id: "f-stack", title: "Boxes stacked over the height limit",
        why: "The wall marking says MAX STACK 3, and the stack is 5 boxes high. Crushed bottom boxes and a falling load are both real risks.",
        clause: "AS9100 8.5.4 Preservation / OSHA 1910.176 Material storage" },
      { id: "f-scale", title: "Object left on the counting scale",
        why: "A roll of tape is sitting on the counting scale's platform. Its weight gets counted as parts, so every count on this scale is wrong.",
        clause: "AS9100 7.1.5 Monitoring and measuring resources" },
      { id: "f-mislabel", title: "Shipping label doesn't match the contents",
        why: "The outgoing box is labeled PIN-77, but the bag inside is tagged PIN-75. The customer will receive the wrong part.",
        clause: "AS9100 8.5.2 Identification and traceability" },
      { id: "f-certlot", title: "Cert doesn't match the material",
        why: "The incoming box is LOT 7711, but the certificate taped to it is for LOT 7171. A cert for the wrong lot proves nothing about this material.",
        clause: "AS9100 8.4.3 / 7.5.3 Records of incoming verification" },
      { id: "f-opentote", title: "Finished parts uncovered at the open dock",
        why: "An open tote of finished parts is sitting right inside the open dock door. Dust, rain, and debris from outside can land straight on them.",
        clause: "AS9100 8.5.4 Preservation / FOD prevention" },
    ],

    decoys: [
      { id: "d-holdzone", message: "Compliant: incoming material is in the marked hold area with HOLD tags, waiting for inspection. That's exactly right." },
      { id: "d-stock", message: "Compliant: these boxes are labeled and in good condition." },
      { id: "d-shipbox", message: "Compliant: the outgoing box is sealed, labeled BRK-310-L QTY 50, and the packing slip matches." },
      { id: "d-fire2", message: "Compliant: the fire extinguisher is mounted, tagged, and clear." },
      { id: "d-dock", message: "Compliant: the dock door is open for a delivery. The problem would be what's left sitting next to it." },
    ],

    svg: `
<svg viewBox="0 0 1000 620" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, Consolas, monospace">
  <!-- Wall and floor -->
  <rect x="0" y="0" width="1000" height="390" fill="#d6d3cc"/>
  <rect x="0" y="0" width="1000" height="40" fill="#c3bfb6"/>
  <text x="500" y="27" text-anchor="middle" font-size="16" fill="#4a4a44" font-weight="600">RECEIVING &amp; SHIPPING</text>
  <rect x="0" y="380" width="1000" height="12" fill="#aaa69c"/>
  <rect x="0" y="390" width="1000" height="230" fill="#97948c"/>

  <!-- Decoy: dock door (open) -->
  <g data-id="d-dock">
    <rect x="16" y="70" width="180" height="400" fill="#5b5f63"/>
    <rect x="26" y="80" width="160" height="390" fill="#cfe3ef"/>
    <rect x="26" y="300" width="160" height="170" fill="#8a8f84"/>
    <rect x="26" y="80" width="160" height="70" fill="#9aa1a6"/>
    <g stroke="#7e858a" stroke-width="2"><line x1="26" y1="96" x2="186" y2="96"/><line x1="26" y1="112" x2="186" y2="112"/><line x1="26" y1="128" x2="186" y2="128"/><line x1="26" y1="144" x2="186" y2="144"/></g>
    <rect x="16" y="54" width="70" height="16" fill="#2b2f33"/>
    <text x="22" y="66" font-size="10" fill="#e8c547" font-weight="700">DOCK 1</text>
  </g>

  <!-- Finding: open tote of finished parts at the dock -->
  <g data-id="f-opentote">
    <path d="M120 440 h80 l-5 40 h-70 z" fill="#3d7bbf" stroke="#2a5687" stroke-width="2"/>
    <rect x="132" y="432" width="12" height="10" fill="#b0b7bb"/><rect x="148" y="430" width="12" height="12" fill="#b0b7bb"/><rect x="164" y="432" width="12" height="10" fill="#b0b7bb"/><rect x="178" y="434" width="10" height="8" fill="#b0b7bb"/>
    <rect x="138" y="452" width="46" height="14" fill="#fbfaf5"/>
    <text x="141" y="462" font-size="6.5" fill="#333" textLength="40" lengthAdjust="spacingAndGlyphs">FINISHED</text>
  </g>

  <!-- Decoy: marked receiving hold area with tagged boxes -->
  <g data-id="d-holdzone">
    <rect x="224" y="460" width="200" height="110" fill="none" stroke="#e8c547" stroke-width="5" stroke-dasharray="14 8"/>
    <text x="232" y="560" font-size="9" fill="#e8c547" font-weight="700" textLength="184" lengthAdjust="spacingAndGlyphs">RECEIVING INSPECTION HOLD</text>
    <rect x="240" y="470" width="70" height="60" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="252" y="480" width="38" height="14" fill="#f08a24"/>
    <text x="256" y="490" font-size="7" fill="#fff" font-weight="700" textLength="30" lengthAdjust="spacingAndGlyphs">HOLD</text>
  </g>

  <!-- Finding: cert for the wrong lot -->
  <g data-id="f-certlot">
    <rect x="330" y="466" width="80" height="66" fill="#bf965f" stroke="#8a6a42" stroke-width="2"/>
    <rect x="338" y="474" width="38" height="12" fill="#f08a24"/>
    <text x="342" y="483" font-size="7" fill="#fff" font-weight="700" textLength="30" lengthAdjust="spacingAndGlyphs">HOLD</text>
    <rect x="338" y="492" width="40" height="12" fill="#fbfaf5"/>
    <text x="340" y="501" font-size="6.5" fill="#333" textLength="36" lengthAdjust="spacingAndGlyphs">LOT 7711</text>
    <rect x="382" y="478" width="24" height="32" fill="#fbfaf5" stroke="#9aa5ab" transform="rotate(6 394 494)"/>
    <text x="384" y="488" font-size="4.5" fill="#333" transform="rotate(6 394 494)" textLength="20" lengthAdjust="spacingAndGlyphs">C of C</text>
    <text x="384" y="497" font-size="4" fill="#333" transform="rotate(6 394 494)" textLength="20" lengthAdjust="spacingAndGlyphs">LOT 7171</text>
    <line x1="385" y1="503" x2="402" y2="503" stroke="#ccc" transform="rotate(6 394 494)"/>
  </g>

  <!-- Stock rack -->
  <g>
    <rect x="450" y="110" width="8" height="360" fill="#4f6b8a"/>
    <rect x="642" y="110" width="8" height="360" fill="#4f6b8a"/>
    <rect x="450" y="200" width="200" height="8" fill="#3f5a78"/>
    <rect x="450" y="300" width="200" height="8" fill="#3f5a78"/>
    <rect x="450" y="400" width="200" height="8" fill="#3f5a78"/>
  </g>
  <g data-id="d-stock">
    <rect x="466" y="150" width="70" height="50" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="476" y="160" width="50" height="12" fill="#fbfaf5"/><text x="479" y="169" font-size="6.5" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">6061 BAR</text>
    <rect x="564" y="250" width="70" height="50" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="574" y="260" width="50" height="12" fill="#fbfaf5"/><text x="577" y="269" font-size="6.5" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">FASTENERS</text>
    <rect x="466" y="350" width="70" height="50" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="476" y="360" width="50" height="12" fill="#fbfaf5"/><text x="479" y="369" font-size="6.5" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">17-4 BAR</text>
  </g>
  <!-- Finding: held box on the stock rack -->
  <g data-id="f-heldstock">
    <rect x="564" y="150" width="70" height="50" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="574" y="160" width="50" height="12" fill="#fbfaf5"/><text x="577" y="169" font-size="6.5" fill="#333" textLength="44" lengthAdjust="spacingAndGlyphs">BEARINGS</text>
    <rect x="590" y="178" width="30" height="10" fill="#f08a24" transform="rotate(8 605 183)"/>
    <text x="593" y="186" font-size="6" fill="#fff" font-weight="700" transform="rotate(8 605 183)" textLength="24" lengthAdjust="spacingAndGlyphs">HOLD</text>
  </g>
  <!-- Finding: crushed box on the rack -->
  <g data-id="f-crushed">
    <polygon points="466,300 536,300 536,262 518,256 504,268 488,250 466,258" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <path d="M490 262 l8 10 l6 -8 l8 12" stroke="#6b4f2e" stroke-width="2" fill="none"/>
    <rect x="476" y="280" width="40" height="11" fill="#fbfaf5"/><text x="479" y="288" font-size="6" fill="#333" textLength="34" lengthAdjust="spacingAndGlyphs">SEALS</text>
  </g>

  <!-- Finding: expired drum -->
  <g data-id="f-drum">
    <rect x="566" y="330" width="62" height="70" rx="6" fill="#2e6e9e" stroke="#1f4d70" stroke-width="2"/>
    <line x1="566" y1="350" x2="628" y2="350" stroke="#1f4d70" stroke-width="2"/>
    <line x1="566" y1="380" x2="628" y2="380" stroke="#1f4d70" stroke-width="2"/>
    <rect x="574" y="356" width="46" height="20" fill="#fbfaf5"/>
    <text x="577" y="364" font-size="5.5" fill="#333" textLength="40" lengthAdjust="spacingAndGlyphs">COOLANT CONC</text>
    <text x="577" y="373" font-size="5.5" fill="#333" font-weight="700" textLength="34" lengthAdjust="spacingAndGlyphs">EXP 08/26</text>
  </g>

  <!-- Finding: stack over the height limit -->
  <g data-id="f-stack">
    <rect x="668" y="456" width="96" height="14" fill="#a77b4c"/>
    <rect x="674" y="400" width="84" height="56" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="674" y="344" width="84" height="56" fill="#bf965f" stroke="#8a6a42" stroke-width="2"/>
    <rect x="674" y="288" width="84" height="56" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <rect x="674" y="232" width="84" height="56" fill="#bf965f" stroke="#8a6a42" stroke-width="2"/>
    <rect x="674" y="176" width="84" height="56" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <line x1="664" y1="288" x2="776" y2="288" stroke="#c0392b" stroke-width="3" stroke-dasharray="8 5"/>
    <text x="680" y="282" font-size="8" fill="#c0392b" font-weight="700" textLength="74" lengthAdjust="spacingAndGlyphs">MAX STACK 3</text>
  </g>

  <!-- Decoy: fire extinguisher, clear and tagged -->
  <g data-id="d-fire2">
    <rect x="796" y="140" width="40" height="16" fill="#c0392b"/>
    <text x="816" y="152" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">FIRE</text>
    <rect x="804" y="174" width="24" height="64" rx="10" fill="#d0392f" stroke="#8c2a26" stroke-width="2"/>
    <rect x="811" y="164" width="10" height="12" fill="#333"/>
    <rect x="808" y="190" width="16" height="14" fill="#f4f1e8"/>
  </g>

  <!-- Shipping bench -->
  <g>
    <rect x="780" y="350" width="210" height="16" fill="#7a6248"/>
    <rect x="790" y="366" width="12" height="104" fill="#5d4a36"/>
    <rect x="968" y="366" width="12" height="104" fill="#5d4a36"/>
  </g>

  <!-- Finding: tape roll on the counting scale -->
  <g data-id="f-scale">
    <rect x="792" y="332" width="70" height="18" fill="#9aa5ab" stroke="#6b7177"/>
    <rect x="796" y="326" width="62" height="8" fill="#c3c9cd" stroke="#6b7177"/>
    <rect x="806" y="338" width="34" height="9" fill="#2b2f33"/>
    <text x="809" y="345.5" font-size="6.5" fill="#5fd99a" textLength="26" lengthAdjust="spacingAndGlyphs">212 pc</text>
    <circle cx="840" cy="318" r="9" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <circle cx="840" cy="318" r="4" fill="#d6d3cc"/>
  </g>

  <!-- Finding: outgoing box labeled for the wrong part -->
  <g data-id="f-mislabel">
    <rect x="874" y="296" width="54" height="54" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <polygon points="874,296 864,280 900,284" fill="#d6b07a" stroke="#8a6a42"/>
    <rect x="880" y="320" width="42" height="22" fill="#fbfaf5"/>
    <text x="883" y="329" font-size="5.5" fill="#333" textLength="36" lengthAdjust="spacingAndGlyphs">SHIP: PIN-77</text>
    <text x="883" y="338" font-size="5.5" fill="#333" textLength="30" lengthAdjust="spacingAndGlyphs">QTY 200</text>
    <rect x="886" y="282" width="30" height="16" fill="#e8f0f5" stroke="#9aa5ab" opacity="0.95"/>
    <rect x="890" y="285" width="22" height="9" fill="#fbfaf5"/>
    <text x="891" y="292" font-size="5" fill="#333" textLength="20" lengthAdjust="spacingAndGlyphs">PIN-75</text>
  </g>

  <!-- Decoy: correct, sealed outgoing box -->
  <g data-id="d-shipbox">
    <rect x="936" y="300" width="48" height="50" fill="#bf965f" stroke="#8a6a42" stroke-width="2"/>
    <rect x="936" y="318" width="48" height="5" fill="#d9c08f"/>
    <rect x="940" y="328" width="40" height="18" fill="#fbfaf5"/>
    <text x="942" y="336" font-size="5" fill="#333" textLength="36" lengthAdjust="spacingAndGlyphs">BRK-310-L</text>
    <text x="942" y="343" font-size="5" fill="#333" textLength="24" lengthAdjust="spacingAndGlyphs">QTY 50</text>
  </g>
</svg>`,
  },
  // ===================================================================
  {
    id: "paint",
    title: "Paint & Powder Coat",
    auditDate: "October 20, 2026",
    seconds: 100,

    findings: [
      { id: "f-hooks", title: "Hooks caked with coating buildup",
        why: "The rack hooks are covered in thick layers of old powder. Buildup insulates the part from ground, so the powder doesn't attract evenly and coverage and thickness suffer. The racks are overdue for stripping.",
        clause: "AS9100 8.5.1 Control of production (maintenance of process equipment)" },
      { id: "f-powder", title: "Wrong powder going into the hopper",
        why: "The hopper is labeled RAL 9005 BLACK, but the open box being poured in is RAL 7035 GRAY. The next lot comes out the wrong color, or a contaminated mix of both.",
        clause: "AS9100 8.5.2 Identification and traceability" },
      { id: "f-rh", title: "Booth humidity over the limit",
        why: "The booth is posted at 65% RH max, and the display reads 78%. High humidity makes powder clump and spray unevenly, and it can cause adhesion problems. Coating should stop until it's back in range.",
        clause: "AS9100 7.1.4 Environment for the operation of processes" },
      { id: "f-cure", title: "Parts not fully cured",
        why: "The cure spec is 400 °F for 20 minutes, but the oven reads 320 °F and the cycle shows DONE. Undercured powder looks fine but chips, scratches, and fails adhesion and solvent tests.",
        clause: "AS9100 8.5.1.2 Validation and control of special processes" },
      { id: "f-gloss", title: "Gloss standard past recertification",
        why: "The reference tile used to check the gloss meter reads RECERT 05/26. A meter verified against an expired standard can't be trusted, and neither can the gloss readings.",
        clause: "AS9100 7.1.5.2 Measurement traceability" },
      { id: "f-dft", title: "Out-of-spec reading marked PASS",
        why: "The coating thickness log shows 1.2 mils against a spec of 2.0 to 4.0 mils, and it's checked off as PASS. A recorded failure was accepted, which is worse than not measuring at all.",
        clause: "AS9100 8.6 Release of products and services" },
      { id: "f-mask", title: "Masking left on a finished part",
        why: "A part on the FINISHED rack still has a blue masking plug in it. It wasn't de-masked or final-inspected, but it's staged to ship.",
        clause: "AS9100 8.6 Release of products and services" },
      { id: "f-touching", title: "Coated parts stacked touching",
        why: "Finished parts are piled directly on top of each other with no separators. Coated surfaces rub and chip during handling and shipping.",
        clause: "AS9100 8.5.4 Preservation" },
    ],

    decoys: [
      { id: "d-filter", message: "Compliant: the booth filter gage reads in the green. Filters are fine." },
      { id: "d-glossmeter", message: "Compliant: the gloss meter itself is calibrated (DUE 03/27). Check what it's verified against, though." },
      { id: "d-interleaf", message: "Compliant: these parts are separated with foam interleaf. That's how coated parts should be stored." },
      { id: "d-fire3", message: "Compliant: the fire extinguisher is mounted, tagged, and clear." },
      { id: "d-ovenspec", message: "Compliant: the cure spec is posted right on the oven. Now compare it to the display." },
    ],

    svg: `
<svg viewBox="0 0 1000 620" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, Consolas, monospace">
  <!-- Wall and floor -->
  <rect x="0" y="0" width="1000" height="390" fill="#dcdad3"/>
  <rect x="0" y="0" width="1000" height="40" fill="#c8c5bc"/>
  <text x="500" y="27" text-anchor="middle" font-size="16" fill="#4a4a44" font-weight="600">PAINT &amp; POWDER COAT</text>
  <rect x="0" y="380" width="1000" height="12" fill="#b3b0a7"/>
  <rect x="0" y="390" width="1000" height="230" fill="#8e9a8f"/>
  <!-- Overhead conveyor -->
  <rect x="0" y="62" width="460" height="8" fill="#555b60"/>

  <!-- Powder booth -->
  <g>
    <rect x="20" y="90" width="250" height="380" fill="#e9eef0" stroke="#7d868b" stroke-width="3"/>
    <rect x="40" y="110" width="210" height="300" fill="#c6d6de"/>
    <rect x="20" y="410" width="250" height="60" fill="#b9c3c7"/>
    <text x="32" y="455" font-size="11" fill="#4a5258" font-weight="600">POWDER BOOTH 1</text>
  </g>

  <!-- Finding: hooks with coating buildup (and the parts on them) -->
  <g data-id="f-hooks">
    <line x1="80" y1="70" x2="80" y2="150" stroke="#3b3f42" stroke-width="3"/>
    <line x1="150" y1="70" x2="150" y2="150" stroke="#3b3f42" stroke-width="3"/>
    <line x1="220" y1="70" x2="220" y2="150" stroke="#3b3f42" stroke-width="3"/>
    <ellipse cx="80" cy="140" rx="9" ry="16" fill="#2b2b2b"/>
    <ellipse cx="150" cy="138" rx="10" ry="18" fill="#2b2b2b"/>
    <ellipse cx="220" cy="140" rx="9" ry="16" fill="#2b2b2b"/>
    <rect x="58" y="156" width="44" height="70" fill="#3a3a3a"/>
    <rect x="128" y="156" width="44" height="70" fill="#3a3a3a"/>
    <rect x="198" y="156" width="44" height="70" fill="#3a3a3a"/>
    <circle cx="80" cy="190" r="7" fill="#c6d6de"/><circle cx="150" cy="190" r="7" fill="#c6d6de"/><circle cx="220" cy="190" r="7" fill="#c6d6de"/>
  </g>

  <!-- Decoy: booth filter gage -->
  <g data-id="d-filter">
    <circle cx="245" cy="300" r="16" fill="#fbfaf5" stroke="#555" stroke-width="2"/>
    <path d="M233 306 a14 14 0 0 1 24 0" fill="none" stroke="#5cb85c" stroke-width="4"/>
    <line x1="245" y1="300" x2="238" y2="292" stroke="#333" stroke-width="2"/>
    <text x="233" y="328" font-size="6" fill="#333" textLength="24" lengthAdjust="spacingAndGlyphs">FILTER</text>
  </g>

  <!-- Finding: wrong powder into the hopper -->
  <g data-id="f-powder">
    <rect x="280" y="340" width="70" height="130" rx="6" fill="#6b7177" stroke="#3b3f42" stroke-width="2"/>
    <rect x="286" y="356" width="58" height="22" fill="#fbfaf5"/>
    <text x="289" y="365" font-size="6" fill="#333" textLength="52" lengthAdjust="spacingAndGlyphs">HOPPER</text>
    <text x="289" y="374" font-size="6" fill="#111" font-weight="700" textLength="52" lengthAdjust="spacingAndGlyphs">RAL 9005 BLACK</text>
    <rect x="356" y="400" width="64" height="70" fill="#c9a26b" stroke="#8a6a42" stroke-width="2"/>
    <polygon points="356,400 340,384 372,388" fill="#d6b07a" stroke="#8a6a42"/>
    <rect x="362" y="420" width="52" height="22" fill="#fbfaf5"/>
    <text x="365" y="429" font-size="6" fill="#333" textLength="46" lengthAdjust="spacingAndGlyphs">POWDER</text>
    <text x="365" y="438" font-size="6" fill="#111" font-weight="700" textLength="46" lengthAdjust="spacingAndGlyphs">RAL 7035 GRAY</text>
    <path d="M352 392 q-6 -14 -14 -20" stroke="#9aa0a3" stroke-width="6" fill="none" opacity="0.7"/>
  </g>

  <!-- Finding: booth humidity display -->
  <g data-id="f-rh">
    <rect x="300" y="110" width="78" height="40" rx="4" fill="#2b2f33"/>
    <text x="339" y="138" text-anchor="middle" font-size="16" fill="#ff6b5e" font-weight="700">78%</text>
    <rect x="296" y="154" width="86" height="15" fill="#fbfaf5" stroke="#9aa5ab"/>
    <text x="300" y="165" font-size="7" fill="#333" textLength="78" lengthAdjust="spacingAndGlyphs">BOOTH RH MAX 65%</text>
  </g>

  <!-- Cure oven -->
  <g>
    <rect x="450" y="100" width="230" height="370" fill="#9aa5ab" stroke="#5d6469" stroke-width="3"/>
    <rect x="466" y="130" width="160" height="320" fill="#868f94" stroke="#5d6469" stroke-width="2"/>
    <rect x="606" y="270" width="12" height="50" rx="4" fill="#3b3f42"/>
    <text x="474" y="122" font-size="11" fill="#2b2f33" font-weight="600">CURE OVEN 2</text>
  </g>
  <!-- Finding: oven display (temperature low, cycle done) -->
  <g data-id="f-cure">
    <rect x="636" y="140" width="38" height="66" rx="3" fill="#2b2f33"/>
    <text x="640" y="160" font-size="9" fill="#f2c230" font-weight="700" textLength="30" lengthAdjust="spacingAndGlyphs">320°F</text>
    <rect x="640" y="168" width="30" height="12" fill="#5cb85c"/>
    <text x="642" y="177" font-size="6" fill="#fff" font-weight="700" textLength="26" lengthAdjust="spacingAndGlyphs">DONE</text>
    <circle cx="648" cy="194" r="4" fill="#d9534f"/><circle cx="662" cy="194" r="4" fill="#5cb85c"/>
  </g>
  <!-- Decoy: cure spec plate on the oven -->
  <g data-id="d-ovenspec">
    <rect x="480" y="150" width="80" height="34" fill="#fbfaf5" stroke="#5d6469"/>
    <text x="484" y="162" font-size="7" fill="#333" textLength="72" lengthAdjust="spacingAndGlyphs">CURE SPEC</text>
    <text x="484" y="176" font-size="8" fill="#111" font-weight="700" textLength="72" lengthAdjust="spacingAndGlyphs">400°F · 20 MIN</text>
  </g>

  <!-- Decoy: fire extinguisher -->
  <g data-id="d-fire3">
    <rect x="696" y="120" width="40" height="16" fill="#c0392b"/>
    <text x="716" y="132" text-anchor="middle" font-size="9" fill="#fff" font-weight="700">FIRE</text>
    <rect x="704" y="154" width="24" height="64" rx="10" fill="#d0392f" stroke="#8c2a26" stroke-width="2"/>
    <rect x="711" y="144" width="10" height="12" fill="#333"/>
    <rect x="708" y="170" width="16" height="14" fill="#f4f1e8"/>
  </g>

  <!-- Inspection table -->
  <g>
    <rect x="760" y="300" width="230" height="16" fill="#7a6248"/>
    <rect x="770" y="316" width="12" height="70" fill="#5d4a36"/>
    <rect x="968" y="316" width="12" height="70" fill="#5d4a36"/>
  </g>
  <!-- Decoy: gloss meter (calibrated) -->
  <g data-id="d-glossmeter">
    <rect x="772" y="266" width="44" height="34" rx="5" fill="#3b3f42"/>
    <rect x="778" y="272" width="26" height="12" fill="#8fd1a8"/>
    <rect x="776" y="252" width="34" height="12" fill="#5cb85c"/>
    <text x="778" y="261" font-size="6" fill="#fff" textLength="30" lengthAdjust="spacingAndGlyphs">DUE 03/27</text>
  </g>
  <!-- Finding: gloss reference tile past recert -->
  <g data-id="f-gloss">
    <rect x="826" y="282" width="40" height="18" fill="#111" stroke="#555"/>
    <rect x="828" y="264" width="38" height="13" fill="#f0a64b"/>
    <text x="830" y="273.5" font-size="6" fill="#3a2410" textLength="34" lengthAdjust="spacingAndGlyphs">RECERT 05/26</text>
  </g>
  <!-- Finding: DFT log accepting a failed reading -->
  <g data-id="f-dft">
    <rect x="876" y="236" width="84" height="64" fill="#fbfaf5" stroke="#9aa5ab"/>
    <rect x="904" y="230" width="28" height="9" rx="2" fill="#9aa5ab"/>
    <text x="880" y="250" font-size="6.5" fill="#333" textLength="74" lengthAdjust="spacingAndGlyphs">DFT LOG · SPEC 2.0–4.0</text>
    <text x="880" y="262" font-size="6.5" fill="#333" textLength="52" lengthAdjust="spacingAndGlyphs">LOT 88: 2.6 ✔</text>
    <text x="880" y="274" font-size="6.5" fill="#333" textLength="52" lengthAdjust="spacingAndGlyphs">LOT 89: 3.1 ✔</text>
    <text x="880" y="286" font-size="6.5" fill="#333" textLength="74" lengthAdjust="spacingAndGlyphs">LOT 90: 1.2 ✔ PASS</text>
  </g>

  <!-- Finished parts cart -->
  <g>
    <rect x="740" y="410" width="250" height="8" fill="#4f6b8a"/>
    <rect x="740" y="500" width="250" height="8" fill="#4f6b8a"/>
    <rect x="740" y="410" width="8" height="160" fill="#4f6b8a"/>
    <rect x="982" y="410" width="8" height="160" fill="#4f6b8a"/>
    <circle cx="760" cy="578" r="8" fill="#333"/><circle cx="970" cy="578" r="8" fill="#333"/>
    <rect x="770" y="392" width="190" height="14" fill="#fbfaf5"/>
    <text x="776" y="402" font-size="8" fill="#2f8a57" font-weight="700" textLength="178" lengthAdjust="spacingAndGlyphs">FINISHED · OK TO SHIP</text>
  </g>
  <!-- Decoy: parts with interleaf -->
  <g data-id="d-interleaf">
    <rect x="756" y="460" width="40" height="40" fill="#3a3a3a"/>
    <rect x="798" y="456" width="6" height="44" fill="#f2c4d6"/>
    <rect x="806" y="460" width="40" height="40" fill="#3a3a3a"/>
    <rect x="848" y="456" width="6" height="44" fill="#f2c4d6"/>
  </g>
  <!-- Finding: masking plug left in a finished part -->
  <g data-id="f-mask">
    <rect x="862" y="460" width="40" height="40" fill="#3a3a3a"/>
    <circle cx="882" cy="480" r="7" fill="#2f6fd6" stroke="#1d4c99" stroke-width="2"/>
  </g>
  <!-- Finding: parts piled touching -->
  <g data-id="f-touching">
    <rect x="770" y="540" width="44" height="28" fill="#3a3a3a" transform="rotate(-6 792 554)"/>
    <rect x="800" y="530" width="44" height="28" fill="#444" transform="rotate(8 822 544)"/>
    <rect x="830" y="542" width="44" height="26" fill="#3a3a3a" transform="rotate(-3 852 555)"/>
    <rect x="812" y="516" width="44" height="26" fill="#474747" transform="rotate(-12 834 529)"/>
    <rect x="870" y="538" width="44" height="28" fill="#404040" transform="rotate(5 892 552)"/>
  </g>
</svg>`,
  },

  // ===================================================================
  {
    id: "assembly",
    title: "Assembly",
    auditDate: "October 20, 2026",
    seconds: 100,

    findings: [
      { id: "f-shadow", title: "Tool missing from the shadow board",
        why: "One outline on the shadow board is empty and nobody signed the tool out. In assembly, a missing tool might be sitting inside a finished unit.",
        clause: "AS9100 8.1.3 FOD prevention (tool control)" },
      { id: "f-torque", title: "Torque wrench set to the wrong value",
        why: "The posted work instruction says 25 in-lb, but the torque wrench is set to 40. Every fastener at this station is being over-torqued.",
        clause: "AS9100 8.5.1 Control of production (following documented instructions)" },
      { id: "f-kit", title: "Leftover fastener in a 'complete' kit",
        why: "The kit tray is marked COMPLETE, but one screw is still in it. Kits are counted so every part goes in. A leftover screw means one is missing from the assembly.",
        clause: "AS9100 8.5.1 / 8.6 Control of production and release" },
      { id: "f-markup", title: "Hand-marked work instruction",
        why: "Someone wrote \"USE 3 WASHERS!!\" in pen on a photocopied instruction. Unapproved changes to work instructions mean different people build the product differently.",
        clause: "AS9100 7.5.3 Control of documented information" },
      { id: "f-mixbin", title: "Wrong screw mixed into a bin",
        why: "The bin is labeled M5×12, but one screw is visibly longer than the rest. A long screw can bottom out or damage whatever is behind the hole.",
        clause: "AS9100 8.5.2 Identification and traceability" },
      { id: "f-hose", title: "Air hose across the walkway",
        why: "An air hose runs across the aisle on the floor. It's a trip hazard for anyone carrying parts, and carts roll right over it.",
        clause: "OSHA 1910.22 Walking-working surfaces" },
      { id: "f-noplate", title: "Unit with no serial number",
        why: "This unit is in the COMPLETE area, but its data plate is missing. Without a serial number it can't be traced to its build records.",
        clause: "AS9100 8.5.2 Identification and traceability" },
      { id: "f-cable", title: "Damaged cable on a finished unit",
        why: "The cable on this unit has a cut in the insulation with bare copper showing, and it's sitting in the COMPLETE area waiting for test. That's a workmanship defect and a shock hazard.",
        clause: "AS9100 8.6 Release of products and services" },
    ],

    decoys: [
      { id: "d-wi", message: "Compliant: WI-204 Rev D is a controlled, printed work instruction. It's the reference. Check what it says against the tools." },
      { id: "d-bins4", message: "Compliant: these bins are labeled and hold the right fasteners." },
      { id: "d-unit", message: "Compliant: this unit has its data plate and serial number." },
      { id: "d-fire4", message: "Compliant: the fire extinguisher is mounted, tagged, and clear." },
      { id: "d-drop", message: "Compliant: an air drop on the wall is normal. The problem would be where the hose goes." },
    ],

    svg: `
<svg viewBox="0 0 1000 620" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, Consolas, monospace">
  <!-- Wall and floor -->
  <rect x="0" y="0" width="1000" height="390" fill="#dde2e6"/>
  <rect x="0" y="0" width="1000" height="40" fill="#c9cfd4"/>
  <text x="500" y="27" text-anchor="middle" font-size="16" fill="#4a5258" font-weight="600">ASSEMBLY</text>
  <rect x="0" y="380" width="1000" height="12" fill="#b3bac0"/>
  <rect x="0" y="390" width="1000" height="230" fill="#93a0a8"/>
  <rect x="0" y="560" width="1000" height="7" fill="#e8c547"/>

  <!-- Finding: shadow board with one empty outline -->
  <g data-id="f-shadow">
    <rect x="30" y="80" width="200" height="150" fill="#f4f1e8" stroke="#8a6a42" stroke-width="3"/>
    <text x="40" y="98" font-size="9" fill="#5a4a30" font-weight="600">TOOL BOARD · STN 4</text>
    <rect x="46" y="112" width="12" height="80" rx="3" fill="#c0392b"/>
    <rect x="44" y="104" width="16" height="12" fill="#8c2a26"/>
    <rect x="76" y="112" width="12" height="80" rx="3" fill="#2f6fd6"/>
    <rect x="74" y="104" width="16" height="12" fill="#1d4c99"/>
    <path d="M110 112 h10 v50 l8 20 h-26 l8 -20 z" fill="none" stroke="#333" stroke-width="2.5" stroke-dasharray="4 3"/>
    <rect x="146" y="120" width="60" height="10" rx="4" fill="#6b7177"/>
    <rect x="146" y="150" width="60" height="10" rx="4" fill="#6b7177"/>
    <rect x="140" y="146" width="10" height="18" fill="#c0392b"/>
  </g>

  <!-- Decoy: controlled work instruction on the wall -->
  <g data-id="d-wi">
    <rect x="250" y="80" width="120" height="150" fill="#fbfaf5" stroke="#9aa5ab" stroke-width="2"/>
    <text x="258" y="98" font-size="8" fill="#333" font-weight="700" textLength="104" lengthAdjust="spacingAndGlyphs">WI-204 · REV D</text>
    <line x1="258" y1="108" x2="362" y2="108" stroke="#ccc"/>
    <text x="258" y="122" font-size="7" fill="#333" textLength="90" lengthAdjust="spacingAndGlyphs">STEP 4: INSTALL</text>
    <text x="258" y="133" font-size="7" fill="#333" textLength="90" lengthAdjust="spacingAndGlyphs">COVER, 6X M5×12</text>
    <rect x="256" y="140" width="108" height="16" fill="#fff1bf"/>
    <text x="260" y="152" font-size="8" fill="#111" font-weight="700" textLength="100" lengthAdjust="spacingAndGlyphs">TORQUE 25 in-lb</text>
    <line x1="258" y1="170" x2="350" y2="170" stroke="#ddd" stroke-width="2"/>
    <line x1="258" y1="180" x2="340" y2="180" stroke="#ddd" stroke-width="2"/>
    <line x1="258" y1="190" x2="346" y2="190" stroke="#ddd" stroke-width="2"/>
    <text x="258" y="222" font-size="6" fill="#888" textLength="80" lengthAdjust="spacingAndGlyphs">CONTROLLED COPY</text>
  </g>

  <!-- Workbench -->
  <g>
    <rect x="30" y="330" width="400" height="16" fill="#7a6248"/>
    <rect x="40" y="346" width="12" height="124" fill="#5d4a36"/>
    <rect x="408" y="346" width="12" height="124" fill="#5d4a36"/>
  </g>

  <!-- Finding: torque wrench set to 40 -->
  <g data-id="f-torque">
    <rect x="44" y="312" width="130" height="10" rx="4" fill="#9aa5ab" stroke="#5d6469"/>
    <circle cx="52" cy="317" r="10" fill="#6b7177" stroke="#3b3f42" stroke-width="2"/>
    <rect x="120" y="300" width="40" height="14" rx="2" fill="#2b2f33"/>
    <text x="124" y="310.5" font-size="8" fill="#f2c230" font-weight="700" textLength="32" lengthAdjust="spacingAndGlyphs">40 in-lb</text>
    <rect x="160" y="310" width="40" height="14" rx="5" fill="#333"/>
  </g>

  <!-- Finding: kit tray with a leftover screw -->
  <g data-id="f-kit">
    <rect x="214" y="304" width="90" height="26" fill="#3d7bbf" stroke="#2a5687" stroke-width="2"/>
    <g fill="#2a5687"><rect x="222" y="310" width="16" height="14"/><rect x="242" y="310" width="16" height="14"/><rect x="262" y="310" width="16" height="14"/><rect x="282" y="310" width="16" height="14"/></g>
    <rect x="266" y="314" width="8" height="3" fill="#c3c9cd"/><rect x="264" y="312" width="3" height="7" fill="#c3c9cd"/>
    <rect x="220" y="290" width="62" height="12" fill="#5cb85c"/>
    <text x="223" y="299" font-size="6.5" fill="#fff" font-weight="700" textLength="56" lengthAdjust="spacingAndGlyphs">KIT · COMPLETE</text>
  </g>

  <!-- Finding: hand-marked photocopy -->
  <g data-id="f-markup">
    <rect x="320" y="276" width="62" height="54" fill="#f2f2ee" stroke="#9aa5ab" transform="rotate(5 351 303)"/>
    <g transform="rotate(5 351 303)">
      <line x1="326" y1="288" x2="376" y2="288" stroke="#bbb" stroke-width="2"/>
      <line x1="326" y1="296" x2="370" y2="296" stroke="#bbb" stroke-width="2"/>
      <text x="326" y="312" font-size="7" fill="#1d4c99" font-style="italic" textLength="50" lengthAdjust="spacingAndGlyphs">USE 3</text>
      <text x="326" y="322" font-size="7" fill="#1d4c99" font-style="italic" textLength="50" lengthAdjust="spacingAndGlyphs">WASHERS!!</text>
    </g>
  </g>

  <!-- Fastener bins -->
  <g>
    <rect x="452" y="110" width="150" height="220" fill="#d9dee2" stroke="#7d868b" stroke-width="2"/>
    <text x="462" y="128" font-size="8" fill="#4a5258" font-weight="600">FASTENERS</text>
  </g>
  <g data-id="d-bins4">
    <rect x="466" y="140" width="56" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="474" y="160" width="40" height="12" fill="#fbfaf5"/><text x="477" y="169" font-size="7" fill="#333" textLength="34" lengthAdjust="spacingAndGlyphs">M4×8</text>
    <g fill="#c3c9cd"><rect x="476" y="134" width="3" height="8"/><rect x="486" y="136" width="3" height="8"/><rect x="496" y="134" width="3" height="8"/><rect x="506" y="135" width="3" height="8"/></g>
    <rect x="466" y="260" width="56" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="474" y="280" width="40" height="12" fill="#fbfaf5"/><text x="477" y="289" font-size="7" fill="#333" textLength="34" lengthAdjust="spacingAndGlyphs">M6×16</text>
    <g fill="#c3c9cd"><rect x="476" y="248" width="4" height="14"/><rect x="488" y="250" width="4" height="14"/><rect x="500" y="248" width="4" height="14"/></g>
    <rect x="534" y="140" width="56" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="542" y="160" width="40" height="12" fill="#fbfaf5"/><text x="545" y="169" font-size="7" fill="#333" textLength="34" lengthAdjust="spacingAndGlyphs">WASHER</text>
    <g fill="#c3c9cd"><circle cx="550" cy="138" r="4"/><circle cx="562" cy="139" r="4"/><circle cx="574" cy="138" r="4"/></g>
  </g>
  <!-- Finding: long screw in the M5x12 bin -->
  <g data-id="f-mixbin">
    <rect x="534" y="260" width="56" height="40" fill="#e1a33c" stroke="#a87423" stroke-width="2"/>
    <rect x="542" y="280" width="40" height="12" fill="#fbfaf5"/><text x="545" y="289" font-size="7" fill="#333" textLength="34" lengthAdjust="spacingAndGlyphs">M5×12</text>
    <g fill="#c3c9cd"><rect x="544" y="250" width="3" height="11"/><rect x="554" y="251" width="3" height="11"/><rect x="574" y="250" width="3" height="11"/></g>
    <rect x="563" y="230" width="3" height="31" fill="#c3c9cd"/>
    <rect x="561" y="228" width="7" height="4" fill="#9aa5ab"/>
  </g>

  <!-- Decoy: fire extinguisher -->
  <g data-id="d-fire4">
    <rect x="612" y="140" width="34" height="14" fill="#c0392b"/>
    <text x="629" y="151" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">FIRE</text>
    <rect x="618" y="170" width="22" height="60" rx="9" fill="#d0392f" stroke="#8c2a26" stroke-width="2"/>
    <rect x="624" y="161" width="10" height="11" fill="#333"/>
    <rect x="621" y="186" width="16" height="12" fill="#f4f1e8"/>
  </g>

  <!-- Decoy: air drop on the wall -->
  <g data-id="d-drop">
    <rect x="450" y="340" width="16" height="40" fill="#2f6fd6"/>
    <circle cx="458" cy="384" r="7" fill="#1d4c99"/>
  </g>
  <!-- Finding: hose across the walkway -->
  <g data-id="f-hose">
    <!-- invisible wide copy of the hose so it's easier to click -->
    <path d="M458 390 C470 450, 520 520, 600 530 S 720 500, 760 540 S 820 590, 860 585" fill="none" stroke="transparent" stroke-width="26"/>
    <path d="M458 390 C470 450, 520 520, 600 530 S 720 500, 760 540 S 820 590, 860 585" fill="none" stroke="#e8c547" stroke-width="6"/>
    <path d="M458 390 C470 450, 520 520, 600 530 S 720 500, 760 540 S 820 590, 860 585" fill="none" stroke="#a88a1c" stroke-width="1.5" stroke-dasharray="6 6"/>
    <rect x="852" y="578" width="18" height="12" rx="3" fill="#6b7177"/>
  </g>

  <!-- Complete area shelf -->
  <g>
    <rect x="670" y="120" width="320" height="16" fill="#fbfaf5" stroke="#9aa5ab"/>
    <text x="680" y="132" font-size="9" fill="#2f8a57" font-weight="700" textLength="300" lengthAdjust="spacingAndGlyphs">COMPLETE · READY FOR TEST</text>
    <rect x="670" y="290" width="320" height="8" fill="#3f5a78"/>
    <rect x="670" y="440" width="320" height="8" fill="#3f5a78"/>
    <rect x="670" y="136" width="8" height="334" fill="#4f6b8a"/>
    <rect x="982" y="136" width="8" height="334" fill="#4f6b8a"/>
  </g>
  <!-- Decoy: unit with data plate -->
  <g data-id="d-unit">
    <rect x="690" y="190" width="120" height="100" rx="4" fill="#5d6a74" stroke="#3b444b" stroke-width="2"/>
    <rect x="700" y="200" width="60" height="30" fill="#2b3338"/>
    <circle cx="785" cy="215" r="8" fill="#5fd99a"/>
    <rect x="704" y="250" width="56" height="24" fill="#d3d8db" stroke="#8a949a"/>
    <text x="707" y="260" font-size="6" fill="#333" textLength="50" lengthAdjust="spacingAndGlyphs">MODEL 7C</text>
    <text x="707" y="270" font-size="6" fill="#333" font-weight="700" textLength="50" lengthAdjust="spacingAndGlyphs">S/N 0412</text>
  </g>
  <!-- Finding: unit with no data plate -->
  <g data-id="f-noplate">
    <rect x="840" y="190" width="120" height="100" rx="4" fill="#5d6a74" stroke="#3b444b" stroke-width="2"/>
    <rect x="850" y="200" width="60" height="30" fill="#2b3338"/>
    <circle cx="935" cy="215" r="8" fill="#5fd99a"/>
    <rect x="854" y="250" width="56" height="24" fill="none" stroke="#3b444b" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle cx="858" cy="254" r="1.5" fill="#3b444b"/><circle cx="906" cy="254" r="1.5" fill="#3b444b"/>
    <circle cx="858" cy="270" r="1.5" fill="#3b444b"/><circle cx="906" cy="270" r="1.5" fill="#3b444b"/>
  </g>
  <!-- Finding: unit with damaged cable -->
  <g data-id="f-cable">
    <rect x="740" y="340" width="130" height="100" rx="4" fill="#5d6a74" stroke="#3b444b" stroke-width="2"/>
    <rect x="750" y="350" width="60" height="30" fill="#2b3338"/>
    <rect x="752" y="404" width="56" height="24" fill="#d3d8db" stroke="#8a949a"/>
    <text x="755" y="414" font-size="6" fill="#333" textLength="50" lengthAdjust="spacingAndGlyphs">MODEL 7C</text>
    <text x="755" y="424" font-size="6" fill="#333" font-weight="700" textLength="50" lengthAdjust="spacingAndGlyphs">S/N 0415</text>
    <path d="M870 380 C900 380, 900 420, 930 420 S 960 430, 965 440" fill="none" stroke="#222" stroke-width="7"/>
    <rect x="893" y="392" width="10" height="7" fill="#d9822b" transform="rotate(60 898 395)"/>
  </g>
</svg>`,
  },
];



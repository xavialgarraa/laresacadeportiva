import { useState, useMemo, useRef, useCallback } from "react"

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const TEAMS = [
  { id:"argentona", full:"Argentona, CF A",          s:"Argentona",       pts:46,pj:25,pg:13,pe:7, pp:5, gf:44,gc:30, ha:{hJ:12,hG:7,hE:4,hP:1,aJ:13,aG:6,aE:3,aP:4}, fm:["G","P","G","G","E"] },
  { id:"lloret",    full:"Lloret, CF A",              s:"Lloret",          pts:46,pj:25,pg:14,pe:4, pp:7, gf:42,gc:35, ha:{hJ:13,hG:6,hE:4,hP:3,aJ:12,aG:8,aE:0,aP:4}, fm:["P","P","G","G","G"] },
  { id:"palamos",   full:"Palamós Club de Futbol A",  s:"Palamós",         pts:44,pj:25,pg:13,pe:5, pp:7, gf:45,gc:31, ha:{hJ:13,hG:8,hE:2,hP:3,aJ:12,aG:5,aE:3,aP:4}, fm:["P","G","G","E","P"] },
  { id:"tossa",     full:"Tossa Unió Esportiva A",    s:"Tossa",           pts:39,pj:24,pg:12,pe:3, pp:9, gf:39,gc:29, ha:{hJ:11,hG:7,hE:1,hP:3,aJ:13,aG:5,aE:2,aP:6}, fm:["G","G","P","N","G"] },
  { id:"juventus",  full:"Juventus-Lloret FC A",      s:"Juventus-Lloret", pts:39,pj:25,pg:11,pe:6, pp:8, gf:38,gc:32, ha:{hJ:12,hG:6,hE:3,hP:3,aJ:13,aG:5,aE:3,aP:5}, fm:["E","P","G","G","E"] },
  { id:"caldes",    full:"Caldes Montbui, CF A",      s:"Caldes Montbui",  pts:36,pj:25,pg:11,pe:3, pp:11,gf:39,gc:35, ha:{hJ:13,hG:5,hE:2,hP:6,aJ:12,aG:6,aE:1,aP:5}, fm:["G","E","G","P","P"] },
  { id:"torroella", full:"Torroella, UE A",           s:"Torroella",       pts:35,pj:24,pg:11,pe:2, pp:11,gf:37,gc:39, ha:{hJ:11,hG:8,hE:1,hP:2,aJ:13,aG:3,aE:1,aP:9}, fm:["P","G","P","N","G"] },
  { id:"cangibert", full:"Can Gibert, UE A",          s:"Can Gibert",      pts:34,pj:25,pg:9, pe:7, pp:9, gf:35,gc:41, ha:{hJ:13,hG:6,hE:3,hP:4,aJ:12,aG:3,aE:4,aP:5}, fm:["G","G","P","E","G"] },
  { id:"tosca",     full:"Escola Bosc de Tosca, CA",  s:"Bosc de Tosca",   pts:32,pj:24,pg:8, pe:8, pp:8, gf:24,gc:25, ha:{hJ:13,hG:4,hE:4,hP:5,aJ:11,aG:4,aE:4,aP:3}, fm:["G","E","P","N","E"] },
  { id:"granollers",full:"Granollers, EC A",          s:"Granollers",      pts:32,pj:25,pg:9, pe:5, pp:11,gf:39,gc:40, ha:{hJ:13,hG:4,hE:4,hP:5,aJ:12,aG:5,aE:1,aP:6}, fm:["P","G","P","P","P"] },
  { id:"parets",    full:"Parets, CF A",              s:"Parets",          pts:31,pj:25,pg:7, pe:10,pp:8, gf:32,gc:29, ha:{hJ:12,hG:4,hE:5,hP:3,aJ:13,aG:3,aE:5,aP:5}, fm:["G","P","E","P","G"] },
  { id:"figueres",  full:"Figueres, UE A",            s:"Figueres",        pts:30,pj:25,pg:7, pe:9, pp:9, gf:35,gc:30, ha:{hJ:12,hG:4,hE:2,hP:6,aJ:13,aG:3,aE:7,aP:3}, fm:["E","P","E","P","G"] },
  { id:"premia",    full:"Premià Club Esp. A",         s:"Premià",          pts:30,pj:25,pg:8, pe:6, pp:11,gf:29,gc:43, ha:{hJ:13,hG:5,hE:3,hP:5,aJ:12,aG:3,aE:3,aP:6}, fm:["P","P","G","G","P"] },
  { id:"banyoles",  full:"Banyoles, CE A",            s:"Banyoles",        pts:28,pj:25,pg:7, pe:7, pp:11,gf:31,gc:39, ha:{hJ:12,hG:6,hE:2,hP:4,aJ:13,aG:1,aE:5,aP:7}, fm:["P","G","E","E","E"] },
  { id:"stjaume",   full:"Sant Jaume Olot B, CF A",   s:"St. Jaume Olot B",pts:25,pj:24,pg:6, pe:7, pp:11,gf:27,gc:37, ha:{hJ:13,hG:3,hE:2,hP:8,aJ:11,aG:3,aE:5,aP:3}, fm:["G","P","E","N","P"] },
  { id:"mollet",    full:"Mollet UE, CF A",            s:"Mollet",          pts:19,pj:25,pg:4, pe:7, pp:14,gf:23,gc:44, ha:{hJ:12,hG:1,hE:6,hP:5,aJ:13,aG:3,aE:1,aP:9}, fm:["P","G","P","E","P"] },
]

const FIXTURES = [
  { id:"j26_1",j:26,d:"17 Abr", H:"torroella",  A:"lloret"    }, { id:"j26_2",j:26,d:"18 Abr", H:"juventus",  A:"stjaume"   },
  { id:"j26_3",j:26,d:"18 Abr", H:"figueres",   A:"palamos"   }, { id:"j26_4",j:26,d:"18 Abr", H:"parets",    A:"cangibert" },
  { id:"j26_5",j:26,d:"18 Abr", H:"banyoles",   A:"granollers"}, { id:"j26_6",j:26,d:"19 Abr", H:"mollet",    A:"argentona" },
  { id:"j26_7",j:26,d:"19 Abr", H:"premia",     A:"caldes"    }, { id:"j26_8",j:26,d:"19 Abr", H:"tossa",     A:"tosca"     },
  { id:"j27_1",j:27,d:"25 Abr", H:"cangibert",  A:"premia"    }, { id:"j27_2",j:27,d:"25 Abr", H:"caldes",    A:"torroella" },
  { id:"j27_3",j:27,d:"25 Abr", H:"stjaume",    A:"mollet"    }, { id:"j27_4",j:27,d:"25 Abr", H:"tosca",     A:"figueres"  },
  { id:"j27_5",j:27,d:"25 Abr", H:"argentona",  A:"parets"    }, { id:"j27_6",j:27,d:"25 Abr", H:"lloret",    A:"banyoles"  },
  { id:"j27_7",j:27,d:"26 Abr", H:"granollers", A:"tossa"     }, { id:"j27_8",j:27,d:"26 Abr", H:"palamos",   A:"juventus"  },
  { id:"j28_1",j:28,d:"2 Maig", H:"juventus",   A:"tosca"     }, { id:"j28_2",j:28,d:"2 Maig", H:"figueres",  A:"granollers"},
  { id:"j28_3",j:28,d:"2 Maig", H:"parets",     A:"stjaume"   }, { id:"j28_4",j:28,d:"2 Maig", H:"argentona", A:"cangibert" },
  { id:"j28_5",j:28,d:"2 Maig", H:"banyoles",   A:"caldes"    }, { id:"j28_6",j:28,d:"3 Maig", H:"mollet",    A:"palamos"   },
  { id:"j28_7",j:28,d:"3 Maig", H:"torroella",  A:"premia"    }, { id:"j28_8",j:28,d:"3 Maig", H:"tossa",     A:"lloret"    },
  { id:"j29_1",j:29,d:"9 Maig", H:"granollers", A:"juventus"  }, { id:"j29_2",j:29,d:"9 Maig", H:"caldes",    A:"tossa"     },
  { id:"j29_3",j:29,d:"9 Maig", H:"stjaume",    A:"argentona" }, { id:"j29_4",j:29,d:"9 Maig", H:"torroella", A:"cangibert" },
  { id:"j29_5",j:29,d:"9 Maig", H:"tosca",      A:"mollet"    }, { id:"j29_6",j:29,d:"9 Maig", H:"lloret",    A:"figueres"  },
  { id:"j29_7",j:29,d:"10 Maig",H:"premia",     A:"banyoles"  }, { id:"j29_8",j:29,d:"10 Maig",H:"palamos",   A:"parets"    },
  { id:"j30_1",j:30,d:"16 Maig",H:"juventus",   A:"lloret"    }, { id:"j30_2",j:30,d:"16 Maig",H:"figueres",  A:"caldes"    },
  { id:"j30_3",j:30,d:"16 Maig",H:"cangibert",  A:"stjaume"   }, { id:"j30_4",j:30,d:"16 Maig",H:"parets",    A:"tosca"     },
  { id:"j30_5",j:30,d:"16 Maig",H:"argentona",  A:"palamos"   }, { id:"j30_6",j:30,d:"16 Maig",H:"banyoles",  A:"torroella" },
  { id:"j30_7",j:30,d:"17 Maig",H:"mollet",     A:"granollers"}, { id:"j30_8",j:30,d:"17 Maig",H:"tossa",     A:"premia"    },
]

const J_INFO = {
  26:{ label:"Jornada 26", dates:"17 – 19 Abril 2026"  },
  27:{ label:"Jornada 27", dates:"25 – 26 Abril 2026"  },
  28:{ label:"Jornada 28", dates:"2 – 3 Maig 2026"     },
  29:{ label:"Jornada 29", dates:"9 – 10 Maig 2026"    },
  30:{ label:"Jornada 30", dates:"16 – 17 Maig 2026"   },
}

const TEAM_MAP = Object.fromEntries(TEAMS.map(t => [t.id, t]))

// ─────────────────────────────────────────────────────────────────
// MODEL
// ─────────────────────────────────────────────────────────────────

const LEAGUE_AVG  = 1.40
const CHAOS       = 0.20

function ppg(g, e, j) { return j > 0 ? (g * 3 + e) / j : 0 }

function formScore(fm) {
  let pts = 0, cnt = 0
  fm.forEach(r => { if (r === "G") { pts += 3; cnt++ } else if (r === "E") { pts += 1; cnt++ } else if (r === "P") cnt++ })
  return cnt > 0 ? pts / (cnt * 3) : 0.5
}

const PROFILES = (() => {
  const out = {}
  TEAMS.forEach(t => {
    const ov  = ppg(t.pg, t.pe, t.pj)
    const { hJ, hG, hE, aJ, aG, aE } = t.ha
    const hPPG = ppg(hG, hE, hJ)
    const aPPG = ppg(aG, aE, aJ)
    out[t.id] = {
      atk:  (t.gf / t.pj) / LEAGUE_AVG,
      def:  (t.gc / t.pj) / LEAGUE_AVG,
      hR:   ov > 0 ? Math.sqrt(hPPG / ov) : 1,
      aR:   ov > 0 ? Math.sqrt(aPPG / ov) : 1,
      fMul: 0.90 + formScore(t.fm) * 0.20,
      fScore: formScore(t.fm),
      hPPG, aPPG, ov,
    }
  })
  return out
})()

function calcStandings(results = {}) {
  const m = {}
  TEAMS.forEach(t => { m[t.id] = { ...t } })
  FIXTURES.forEach(f => {
    const r = results[f.id]
    if (!r) return
    const H = m[f.H], A = m[f.A]
    H.pj++; A.pj++
    H.gf += r.h; H.gc += r.a; A.gf += r.a; A.gc += r.h
    if      (r.h > r.a) { H.pg++; H.pts += 3; A.pp++ }
    else if (r.h < r.a) { A.pg++; A.pts += 3; H.pp++ }
    else                 { H.pe++; H.pts++;    A.pe++; A.pts++ }
  })
  return Object.values(m).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const dA = a.gf - a.gc, dB = b.gf - b.gc
    if (dB !== dA) return dB - dA
    if (b.gf !== a.gf) return b.gf - a.gf
    return a.full.localeCompare(b.full)
  })
}

const BASE_POS = (() => {
  const pos = {}
  calcStandings({}).forEach((t, i) => { pos[t.id] = i + 1 })
  return pos
})()

function poisson(lam) {
  lam = Math.min(Math.max(lam, 0.05), 7)
  const L = Math.exp(-lam)
  let k = 0, p = 1
  do { k++; p *= Math.random() } while (p > L)
  return Math.min(k - 1, 12)
}

function smartResult(hId, aId) {
  const pH = PROFILES[hId], pA = PROFILES[aId]
  const cH = 1 + (Math.random() - 0.5) * CHAOS
  const cA = 1 + (Math.random() - 0.5) * CHAOS
  return {
    h: poisson(pH.atk * pA.def * LEAGUE_AVG * pH.hR * pH.fMul * cH),
    a: poisson(pA.atk * pH.def * LEAGUE_AVG * pA.aR * pA.fMul * cA),
  }
}

function simOnce(userResults) {
  const m = {}
  TEAMS.forEach(t => { m[t.id] = { ...t } })
  FIXTURES.forEach(f => {
    const r = userResults[f.id] ?? smartResult(f.H, f.A)
    const H = m[f.H], A = m[f.A]
    H.pj++; A.pj++
    H.gf += r.h; H.gc += r.a; A.gf += r.a; A.gc += r.h
    if      (r.h > r.a) { H.pg++; H.pts += 3; A.pp++ }
    else if (r.h < r.a) { A.pg++; A.pts += 3; H.pp++ }
    else                 { H.pe++; H.pts++;    A.pe++; A.pts++ }
  })
  return Object.values(m).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const dA = a.gf - a.gc, dB = b.gf - b.gc
    if (dB !== dA) return dB - dA
    return b.gf - a.gf
  })
}

// ─────────────────────────────────────────────────────────────────
// STYLES  (injected once via <style> tag)
// ─────────────────────────────────────────────────────────────────

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:14px;-webkit-font-smoothing:antialiased}
body{background:#f0fdf4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;color:#111827}

.pc-root{min-height:100vh;background:#f0fdf4}

/* HEADER */
.pc-header{background:linear-gradient(160deg,#166534 0%,#14532d 100%);padding:24px 20px 20px;text-align:center;color:#fff}
.pc-header__eyebrow{font-size:.65rem;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#86efac;margin-bottom:6px}
.pc-header__title{font-size:1.25rem;font-weight:800;letter-spacing:.1px}
.pc-header__sub{font-size:.72rem;color:rgba(255,255,255,.55);margin-top:4px;font-weight:500}
.pc-header__badge{display:inline-block;margin-top:10px;border:1px solid rgba(134,239,172,.35);color:#a7f3d0;border-radius:3px;padding:3px 10px;font-size:.62rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase}

/* TABS */
.pc-tabs{background:#fff;display:flex;border-bottom:1px solid #dcfce7;position:sticky;top:0;z-index:100;box-shadow:0 1px 8px rgba(0,0,0,.05)}
.pc-tab{flex:1;border:none;background:none;padding:13px 6px 11px;font-size:.72rem;font-weight:700;color:#9ca3af;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;letter-spacing:.4px;text-transform:uppercase;transition:color .15s,border-color .15s}
.pc-tab:hover:not(.pc-tab--active){color:#4b5563;background:#f9fafb}
.pc-tab--active{color:#16a34a;border-bottom-color:#16a34a}

/* LAYOUT */
.pc-panel{display:none;padding:16px;max-width:960px;margin:0 auto}
.pc-panel--active{display:block}

/* STAT STRIP */
.pc-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.pc-stat{background:#fff;border:1px solid #dcfce7;border-radius:8px;padding:14px 10px;text-align:center}
.pc-stat__val{font-size:1.5rem;font-weight:900;color:#16a34a;line-height:1}
.pc-stat__lbl{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9ca3af;margin-top:5px}

/* LEGEND */
.pc-legend{display:flex;flex-wrap:wrap;gap:6px 16px;margin-bottom:14px}
.pc-legend__item{display:flex;align-items:center;gap:6px;font-size:.7rem;color:#6b7280;font-weight:500}
.pc-legend__dot{width:10px;height:10px;border-radius:2px;flex-shrink:0}

/* TABLE CARD */
.pc-table-wrap{background:#fff;border:1px solid #dcfce7;border-radius:10px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.04);margin-bottom:14px}
.pc-table{width:100%;border-collapse:collapse;font-size:.76rem}
.pc-table thead tr{background:#166534}
.pc-table th{color:#fff;padding:9px 5px;text-align:center;font-size:.62rem;font-weight:700;letter-spacing:.6px;text-transform:uppercase;white-space:nowrap}
.pc-table th.al{text-align:left;padding-left:12px}
.pc-table td{padding:8px 5px;text-align:center;border-bottom:1px solid #f0fdf4;color:#374151}
.pc-table td.al{text-align:left;padding-left:8px}
.pc-table tbody tr:last-child td{border-bottom:none}
.pc-table tbody tr:hover{background:#fafffe}

/* ZONES */
.z-up1{background:#f7fef9}
.z-up2{background:#fefff5}
.z-rel{background:#fef9f9}
.z-up1 td:first-child{border-left:3px solid #22c55e}
.z-up2 td:first-child{border-left:3px solid #fbbf24}
.z-rel td:first-child{border-left:3px solid #f87171}

/* ZONE SEPARATORS */
.pc-sep td{height:1px;padding:0;background:#dcfce7}
.pc-sep--amber td{background:#fde68a}
.pc-sep--red td{background:#fca5a5}

/* POSITION BADGE */
.pc-pos{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:4px;font-size:.68rem;font-weight:900;background:#f3f4f6;color:#6b7280}
.z-up1 .pc-pos{background:#dcfce7;color:#166534}
.z-up2 .pc-pos{background:#fef9c3;color:#92400e}
.z-rel .pc-pos{background:#fee2e2;color:#b91c1c}

/* TEAM CELL */
.pc-team{display:inline-flex;align-items:center;gap:4px;font-weight:700;font-size:.76rem;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:145px}
.pc-mv{font-size:.57rem;font-weight:900;width:10px;flex-shrink:0}
.pc-mv--up{color:#22c55e}
.pc-mv--dn{color:#f87171}
.pc-mv--eq{color:#d1d5db}

/* STATS CELLS */
.pc-pts{font-weight:900;color:#16a34a;font-size:.88rem}
.pc-dg--pos{color:#16a34a;font-weight:700}
.pc-dg--neg{color:#dc2626;font-weight:700}
.pc-dg--zer{color:#d1d5db}

/* FORM BADGES */
.pc-form{display:flex;gap:2px;justify-content:center}
.pc-fb{width:16px;height:16px;border-radius:3px;font-size:.57rem;font-weight:900;display:flex;align-items:center;justify-content:center;letter-spacing:0}
.pc-fb--G{background:#dcfce7;color:#166534}
.pc-fb--E{background:#fef9c3;color:#92400e}
.pc-fb--P{background:#fee2e2;color:#b91c1c}
.pc-fb--N{background:#f3f4f6;color:#9ca3af}

/* FOOTNOTE */
.pc-foot{font-size:.63rem;color:#9ca3af;text-align:center;line-height:1.7;margin-top:10px}

/* ── FIXTURES ── */
.pc-topbar{display:flex;justify-content:flex-end;margin-bottom:12px}
.pc-btn-ghost{background:#fff;border:1px solid #fca5a5;color:#dc2626;padding:6px 12px;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;transition:.15s;letter-spacing:.3px}
.pc-btn-ghost:hover{background:#fef2f2}

.pc-jornada{background:#fff;border:1px solid #dcfce7;border-radius:10px;overflow:hidden;margin-bottom:12px;box-shadow:0 1px 6px rgba(0,0,0,.04)}
.pc-jornada__head{background:#166534;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;color:#fff}
.pc-jornada__title{font-weight:800;font-size:.84rem}
.pc-jornada__dates{font-size:.67rem;color:rgba(255,255,255,.55);margin-top:2px}
.pc-jornada__right{display:flex;align-items:center;gap:8px}
.pc-jornada__ctr{font-size:.67rem;color:rgba(255,255,255,.5)}
.pc-btn-clear{background:transparent;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8);padding:4px 10px;border-radius:4px;font-size:.67rem;font-weight:700;cursor:pointer;transition:.15s;letter-spacing:.3px}
.pc-btn-clear:hover{background:rgba(255,255,255,.12)}

.pc-match{display:grid;grid-template-columns:1fr 104px 1fr;align-items:center;padding:9px 14px;border-bottom:1px solid #f0fdf4;gap:8px}
.pc-match:last-child{border-bottom:none}
.pc-match:hover{background:#fafffe}
.pc-match__home{text-align:right;font-size:.76rem;font-weight:600;color:#374151}
.pc-match__away{text-align:left;font-size:.76rem;font-weight:600;color:#374151}
.pc-match__date{display:block;font-size:.61rem;color:#9ca3af;margin-top:1px}
.pc-score{display:flex;align-items:center;gap:4px;justify-content:center}
.pc-score__inp{width:36px;height:36px;border:1.5px solid #e5e7eb;border-radius:6px;text-align:center;font-size:.92rem;font-weight:800;color:#111827;background:#fff;transition:.15s;-moz-appearance:textfield}
.pc-score__inp::-webkit-outer-spin-button,.pc-score__inp::-webkit-inner-spin-button{-webkit-appearance:none}
.pc-score__inp:focus{outline:none;border-color:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.1)}
.pc-score__inp--filled{border-color:#22c55e;background:#f0fdf4;color:#15803d}
.pc-score__sep{font-weight:700;color:#d1d5db;font-size:.9rem}

/* ── INFO BOX ── */
.pc-info{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:.73rem;color:#92400e;margin-bottom:14px;line-height:1.55}

/* ── SUPERCALCULATOR ── */
.pc-calc-intro{background:#fff;border:1px solid #dcfce7;border-radius:10px;padding:22px 18px 18px;text-align:center;margin-bottom:14px;box-shadow:0 1px 6px rgba(0,0,0,.04)}
.pc-calc-intro__title{font-size:1.05rem;font-weight:900;color:#166534;letter-spacing:.1px;margin-bottom:6px}
.pc-calc-intro__desc{font-size:.75rem;color:#6b7280;line-height:1.65;max-width:500px;margin:0 auto}
.pc-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px}
.pc-chip{display:inline-flex;align-items:center;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;border-radius:4px;padding:4px 10px;font-size:.66rem;font-weight:700;letter-spacing:.3px}
.pc-progress{max-width:260px;margin:14px auto 0;height:3px;background:#dcfce7;border-radius:2px;overflow:hidden}
.pc-progress__bar{height:100%;background:#16a34a;border-radius:2px;transition:width .1s}
.pc-sim-btn{display:block;width:100%;max-width:260px;margin:14px auto 0;background:#16a34a;color:#fff;border:none;border-radius:8px;padding:12px;font-size:.84rem;font-weight:800;cursor:pointer;letter-spacing:.3px;transition:.2s}
.pc-sim-btn:hover:not(:disabled){background:#15803d;box-shadow:0 3px 12px rgba(22,163,74,.25);transform:translateY(-1px)}
.pc-sim-btn:disabled{background:#e5e7eb;color:#9ca3af;cursor:not-allowed;transform:none;box-shadow:none}
.pc-sim-note{font-size:.67rem;color:#9ca3af;text-align:center;margin:8px 0 14px;line-height:1.5}

/* STRENGTH TABLE */
.pc-strength{background:#fff;border:1px solid #dcfce7;border-radius:10px;overflow:hidden;margin-bottom:14px;box-shadow:0 1px 6px rgba(0,0,0,.04)}
.pc-strength__toggle{width:100%;background:none;border:none;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:.76rem;font-weight:700;color:#374151;letter-spacing:.2px}
.pc-strength__toggle:hover{background:#f9fafb}
.pc-strength__chevron{font-size:.65rem;color:#16a34a;transition:transform .2s;font-weight:700}
.pc-strength__chevron--open{transform:rotate(180deg)}
.pc-strength__body{padding:0 14px 14px;display:none}
.pc-strength__body--open{display:block}
.pc-strength__desc{font-size:.68rem;color:#9ca3af;line-height:1.6;margin-bottom:12px}
.pc-str-grid{display:grid;grid-template-columns:20px 1fr 80px 80px 70px 56px;border-top:1px solid #f0f0f0}
.pc-str-head{display:contents}
.pc-str-head span{background:#f9fafb;padding:7px 5px;font-size:.6rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#9ca3af;text-align:center;border-bottom:1px solid #f0f0f0}
.pc-str-head span:nth-child(2){text-align:left;padding-left:8px}
.pc-str-row{display:contents}
.pc-str-row span{padding:7px 5px;border-bottom:1px solid #f9fafb;text-align:center;font-size:.71rem;color:#6b7280;display:flex;align-items:center;justify-content:center}
.pc-str-row span:first-child{font-size:.66rem;font-weight:800;color:#9ca3af}
.pc-str-row span:nth-child(2){text-align:left;justify-content:flex-start;padding-left:8px;font-weight:700;color:#111827}
.pc-str-row span:nth-child(3),.pc-str-row span:nth-child(4){display:block;padding:6px 5px}
.pc-mini-bar{width:100%;height:5px;background:#f3f4f6;border-radius:3px;overflow:hidden;margin-bottom:2px}
.pc-mini-bar__fill{height:100%;border-radius:3px}
.pc-mini-lbl{font-size:.58rem;color:#9ca3af;text-align:center}
.pc-rating{font-size:.66rem;font-weight:800;padding:2px 7px;border-radius:3px}

/* PROBABILITY TABLE */
.pc-prob{background:#fff;border:1px solid #dcfce7;border-radius:10px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.04)}
.pc-prob__head{background:#166534;display:grid;grid-template-columns:26px 1fr 82px 82px 82px;padding:9px 14px;gap:6px}
.pc-prob__head span{color:#fff;font-size:.61rem;font-weight:700;text-align:center;letter-spacing:.6px;text-transform:uppercase}
.pc-prob__head span:nth-child(2){text-align:left}
.pc-prob__row{display:grid;grid-template-columns:26px 1fr 82px 82px 82px;padding:9px 14px;gap:6px;align-items:center;border-bottom:1px solid #f0fdf4;transition:background .1s}
.pc-prob__row:hover{background:#fafffe}
.pc-prob__row:last-child{border-bottom:none}
.pc-prob__pos{font-size:.76rem;font-weight:900;color:#9ca3af;text-align:center}
.pc-prob__name{font-size:.75rem;font-weight:700;color:#111827;display:flex;align-items:center;gap:5px}
.pc-prob__dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.pc-bar-wrap{height:8px;background:#f3f4f6;border-radius:4px;overflow:hidden;margin-bottom:3px}
.pc-bar-fill{height:100%;border-radius:4px;transition:width .6s cubic-bezier(.4,0,.2,1)}
.pc-bar-val{font-size:.65rem;font-weight:800;text-align:center}
.pc-prob__sep{height:1px;background:#dcfce7}
.pc-prob__sep--amber{background:#fde68a}
.pc-prob__sep--red{background:#fca5a5}
.pc-prob__placeholder{padding:36px;text-align:center;color:#9ca3af;font-size:.78rem}

/* RESPONSIVE */
@media(max-width:640px){
  .pc-header__title{font-size:1.05rem}
  .pc-table{font-size:.7rem}
  .pc-table th,.pc-table td{padding:7px 3px}
  .pc-team{max-width:100px}
  .pc-match{grid-template-columns:1fr 94px 1fr;padding:8px 10px}
  .pc-match__home,.pc-match__away{font-size:.7rem}
  .pc-score__inp{width:32px;height:32px;font-size:.85rem}
  .pc-prob__head,.pc-prob__row{grid-template-columns:20px 1fr 68px 68px 68px;padding:8px 10px;gap:4px}
  .pc-hide-sm{display:none!important}
  .pc-str-grid{grid-template-columns:18px 1fr 70px 70px 60px 48px}
}
`

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function FormBadge({ result }) {
  return <span className={`pc-fb pc-fb--${result}`}>{result}</span>
}

function MiniBar({ pct, color }) {
  return (
    <div className="pc-mini-bar">
      <div className="pc-mini-bar__fill" style={{ width: `${Math.max(4, pct)}%`, background: color }} />
    </div>
  )
}

function ProbBar({ pct, color }) {
  return (
    <div>
      <div className="pc-bar-wrap">
        <div className="pc-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="pc-bar-val" style={{ color }}>{pct}%</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// STANDINGS TAB
// ─────────────────────────────────────────────────────────────────

function StandingsTab({ results }) {
  const standings = useMemo(() => calcStandings(results), [results])
  const played    = Object.keys(results).length

  const rows = []
  standings.forEach((t, i) => {
    const pos = i + 1
    const dg  = t.gf - t.gc
    const mv  = (BASE_POS[t.id] ?? pos) - pos

    if (pos === 3)  rows.push(<tr key="sep-a"  className="pc-sep pc-sep--amber"><td colSpan={11} /></tr>)
    if (pos === 13) rows.push(<tr key="sep-r"  className="pc-sep pc-sep--red"  ><td colSpan={11} /></tr>)

    let zoneClass = ""
    if (pos === 1) zoneClass = "z-up1"
    else if (pos === 2) zoneClass = "z-up2"
    else if (pos >= 13) zoneClass = "z-rel"

    rows.push(
      <tr key={t.id} className={zoneClass}>
        <td><span className="pc-pos">{pos}</span></td>
        <td className="al">
          <span className="pc-team">
            <span className={`pc-mv ${mv > 0 ? "pc-mv--up" : mv < 0 ? "pc-mv--dn" : "pc-mv--eq"}`}>
              {mv > 0 ? "▲" : mv < 0 ? "▼" : "—"}
            </span>
            <span title={t.full}>{t.s}</span>
          </span>
        </td>
        <td className="pc-hide-sm">{t.pj}</td>
        <td className="pc-hide-sm">{t.pg}</td>
        <td className="pc-hide-sm">{t.pe}</td>
        <td className="pc-hide-sm">{t.pp}</td>
        <td className="pc-hide-sm">{t.gf}</td>
        <td className="pc-hide-sm">{t.gc}</td>
        <td>
          {dg > 0
            ? <span className="pc-dg--pos">+{dg}</span>
            : dg < 0
            ? <span className="pc-dg--neg">{dg}</span>
            : <span className="pc-dg--zer">0</span>}
        </td>
        <td>
          <div className="pc-form">
            {t.fm.map((r, idx) => <FormBadge key={idx} result={r} />)}
          </div>
        </td>
        <td><span className="pc-pts">{t.pts}</span></td>
      </tr>
    )
  })

  return (
    <div className="pc-panel pc-panel--active">
      <div className="pc-stats">
        <div className="pc-stat">
          <div className="pc-stat__val">{played}</div>
          <div className="pc-stat__lbl">Introduïts</div>
        </div>
        <div className="pc-stat">
          <div className="pc-stat__val">{FIXTURES.length - played}</div>
          <div className="pc-stat__lbl">Pendents</div>
        </div>
        <div className="pc-stat">
          <div className="pc-stat__val">
            {standings[0] && standings[1] ? `${standings[0].pts} / ${standings[1].pts}` : "—"}
          </div>
          <div className="pc-stat__lbl">Pts 1r / 2n</div>
        </div>
      </div>

      <div className="pc-legend">
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#22c55e"}} />Ascens directe Lliga Elit</div>
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#fbbf24"}} />Eliminatòria d&apos;ascens (2n classificat)</div>
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#f87171"}} />Descens Segona Catalana (pos. 13 – 16)</div>
      </div>

      <div className="pc-table-wrap">
        <table className="pc-table">
          <thead>
            <tr>
              <th style={{width:26}}>#</th>
              <th className="al">Equip</th>
              <th className="pc-hide-sm">PJ</th>
              <th className="pc-hide-sm">G</th>
              <th className="pc-hide-sm">E</th>
              <th className="pc-hide-sm">P</th>
              <th className="pc-hide-sm">GF</th>
              <th className="pc-hide-sm">GC</th>
              <th>DG</th>
              <th>Forma</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <p className="pc-foot">
        Criteri de desempat: Punts → Diferència de gols → Gols a favor<br />
        Normes FCF 25/26: 1r ascens directe Lliga Elit · 2n playoff d&apos;ascens · 13–16 descens Segona Catalana
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// FIXTURES TAB
// ─────────────────────────────────────────────────────────────────

function FixturesTab({ results, setResults }) {
  function handleInput(id, side, value) {
    const other = side === "h" ? `a-${id}` : `h-${id}`
    const otherEl = document.getElementById(other)
    const otherVal = otherEl ? otherEl.value.trim() : ""
    const thisVal  = value.trim()

    if (thisVal !== "" && otherVal !== "") {
      const h = side === "h" ? parseInt(thisVal) : parseInt(otherVal)
      const a = side === "a" ? parseInt(thisVal) : parseInt(otherVal)
      if (!isNaN(h) && !isNaN(a) && h >= 0 && a >= 0) {
        setResults(prev => ({ ...prev, [id]: { h, a } }))
        return
      }
    }
    setResults(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function clearJornada(j) {
    setResults(prev => {
      const next = { ...prev }
      FIXTURES.filter(f => f.j === j).forEach(f => delete next[f.id])
      return next
    })
  }

  function clearAll() {
    if (!window.confirm("Esborrar tots els resultats introduïts?")) return
    setResults({})
  }

  return (
    <div className="pc-panel pc-panel--active">
      <div className="pc-info">
        Introdueix els marcadors de la Jornada 26 a la 30. La classificació s&apos;actualitza en temps real.
        Els partits que deixes en blanc els simularà el Supercalculador amb el model estadístic.
      </div>
      <div className="pc-topbar">
        <button className="pc-btn-ghost" onClick={clearAll}>Esborrar tot</button>
      </div>

      {[26, 27, 28, 29, 30].map(j => {
        const matches = FIXTURES.filter(f => f.j === j)
        const played  = matches.filter(f => results[f.id]).length
        const info    = J_INFO[j]
        return (
          <div key={j} className="pc-jornada">
            <div className="pc-jornada__head">
              <div>
                <div className="pc-jornada__title">{info.label}</div>
                <div className="pc-jornada__dates">{info.dates}</div>
              </div>
              <div className="pc-jornada__right">
                <span className="pc-jornada__ctr">{played} / {matches.length}</span>
                <button className="pc-btn-clear" onClick={() => clearJornada(j)}>Esborrar</button>
              </div>
            </div>

            {matches.map(f => {
              const H = TEAM_MAP[f.H], A = TEAM_MAP[f.A]
              const r = results[f.id]
              return (
                <div key={f.id} className="pc-match">
                  <div className="pc-match__home">
                    {H.s}
                    <span className="pc-match__date">{f.d}</span>
                  </div>
                  <div className="pc-score">
                    <input
                      id={`h-${f.id}`}
                      type="number"
                      className={`pc-score__inp${r ? " pc-score__inp--filled" : ""}`}
                      defaultValue={r ? r.h : ""}
                      placeholder="–"
                      min="0" max="30"
                      onChange={e => handleInput(f.id, "h", e.target.value)}
                    />
                    <span className="pc-score__sep">:</span>
                    <input
                      id={`a-${f.id}`}
                      type="number"
                      className={`pc-score__inp${r ? " pc-score__inp--filled" : ""}`}
                      defaultValue={r ? r.a : ""}
                      placeholder="–"
                      min="0" max="30"
                      onChange={e => handleInput(f.id, "a", e.target.value)}
                    />
                  </div>
                  <div className="pc-match__away">
                    {A.s}
                    <span className="pc-match__date">{f.d}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// STRENGTH TABLE
// ─────────────────────────────────────────────────────────────────

function StrengthTable() {
  const [open, setOpen] = useState(false)

  const sorted = useMemo(() => {
    const rats = TEAMS.map(t => ({ ...t, ...PROFILES[t.id], rat: PROFILES[t.id].atk / PROFILES[t.id].def }))
    return rats.sort((a, b) => b.rat - a.rat)
  }, [])

  const maxAtk = Math.max(...sorted.map(t => t.atk))
  const maxRat = Math.max(...sorted.map(t => t.rat))
  const minRat = Math.min(...sorted.map(t => t.rat))

  return (
    <div className="pc-strength">
      <button className="pc-strength__toggle" onClick={() => setOpen(v => !v)}>
        <span>Paràmetres del model per equip</span>
        <span className={`pc-strength__chevron${open ? " pc-strength__chevron--open" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="pc-strength__body pc-strength__body--open">
          <p className="pc-strength__desc">
            Índexs calculats sobre les 25 jornades disputades. <strong>Atac</strong>: gols/part dividit per la mitjana de la lliga (1.40 g/part/equip).{" "}
            <strong>Defensa</strong>: gols encaixats/part vs la mitjana (menor = millor). <strong>Rendiment</strong>: punts per partit a casa i fora.{" "}
            El model aplica una arrel quadrada al factor casa/fora per suavitzar extrems, i una forma que oscil·la entre ×0.90 i ×1.10.
          </p>
          <div className="pc-str-grid">
            <div className="pc-str-head">
              <span>#</span><span>Equip</span>
              <span>Atac</span><span>Defensa</span>
              <span>Casa/Fora</span><span>Rating</span>
            </div>
            {sorted.map((t, i) => {
              const atkPct  = Math.round((t.atk / (maxAtk * 1.05)) * 100)
              const defScore = 2 - t.def
              const defPct  = Math.round(Math.max(0, (defScore / 1.5)) * 100)
              const ratPct  = (t.rat - minRat) / (maxRat - minRat)
              const hue     = Math.round(ratPct * 120)
              const ratBg   = `hsla(${hue},55%,42%,.1)`
              const ratClr  = `hsl(${hue},55%,35%)`
              return (
                <div key={t.id} className="pc-str-row">
                  <span>{i + 1}</span>
                  <span title={`Casa: ${t.hPPG.toFixed(2)} pts/p · Fora: ${t.aPPG.toFixed(2)} pts/p`}>{t.s}</span>
                  <span>
                    <MiniBar pct={atkPct} color="#f97316" />
                    <div className="pc-mini-lbl">{t.atk.toFixed(2)}×</div>
                  </span>
                  <span>
                    <MiniBar pct={defPct} color="#3b82f6" />
                    <div className="pc-mini-lbl">{t.def.toFixed(2)}×</div>
                  </span>
                  <span style={{flexDirection:"column",gap:1}}>
                    <div style={{fontSize:".58rem",color:"#9ca3af"}}>C: {t.hPPG.toFixed(2)}</div>
                    <div style={{fontSize:".58rem",color:"#9ca3af"}}>F: {t.aPPG.toFixed(2)}</div>
                  </span>
                  <span>
                    <span className="pc-rating" style={{background:ratBg, color:ratClr}}>{t.rat.toFixed(2)}</span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// CALCULATOR TAB
// ─────────────────────────────────────────────────────────────────

function CalculatorTab({ results }) {
  const [simState, setSimState] = useState({ running: false, progress: 0, data: null, note: "" })
  const standings = useMemo(() => calcStandings(results), [results])

  const runSimulation = useCallback(async () => {
    setSimState({ running: true, progress: 0, data: null, note: "Iniciant simulació…" })

    const N = 10000, CHUNK = 300
    const prom = {}, play = {}, relg = {}
    TEAMS.forEach(t => { prom[t.id] = 0; play[t.id] = 0; relg[t.id] = 0 })

    let done = 0
    while (done < N) {
      const end = Math.min(done + CHUNK, N)
      for (let i = done; i < end; i++) {
        const res = simOnce(results)
        res.forEach((t, idx) => {
          if (idx === 0)  prom[t.id]++
          if (idx === 1)  play[t.id]++
          if (idx >= 12)  relg[t.id]++
        })
      }
      done = end
      setSimState(prev => ({ ...prev, progress: done / N, note: `Simulant… ${done.toLocaleString()} / ${N.toLocaleString()}` }))
      await new Promise(r => setTimeout(r, 0))
    }

    const fixed = Object.keys(results).length
    setSimState({
      running: false,
      progress: 1,
      data: { prom, play, relg, N },
      note: `${N.toLocaleString()} simulacions completades · ${fixed} partits fixos · ${FIXTURES.length - fixed} simulats`,
    })
  }, [results])

  const rats    = TEAMS.map(t => PROFILES[t.id].atk / PROFILES[t.id].def)
  const maxRat  = Math.max(...rats)
  const minRat  = Math.min(...rats)

  return (
    <div className="pc-panel pc-panel--active">
      <div className="pc-calc-intro">
        <div className="pc-calc-intro__title">Supercalculador de probabilitats</div>
        <div className="pc-calc-intro__desc">
          10.000 simulacions basades en la força estadística real de cada equip: gols marcats i encaixats,
          rendiment específic a casa i fora, i forma dels últims 5 partits. Distribució de Poisson independent
          per a cada equip. Factor d&apos;imprevisibilitat ±20%. Els resultats introduïts al Calendari queden fixos.
        </div>
        <div className="pc-chips">
          <span className="pc-chip">Model Poisson</span>
          <span className="pc-chip">Rendiment casa / fora real</span>
          <span className="pc-chip">Forma últims 5 partits</span>
          <span className="pc-chip">Factor imprevisibilitat ±20%</span>
        </div>
        {simState.running && (
          <div className="pc-progress">
            <div className="pc-progress__bar" style={{width:`${simState.progress * 100}%`}} />
          </div>
        )}
        <button
          className="pc-sim-btn"
          disabled={simState.running}
          onClick={runSimulation}
        >
          {simState.running ? "Simulant…" : simState.data ? "Tornar a simular" : "Iniciar simulació"}
        </button>
      </div>

      {simState.note && <p className="pc-sim-note">{simState.note}</p>}

      <StrengthTable />

      <div className="pc-legend" style={{justifyContent:"center", marginBottom:10}}>
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#22c55e"}} />Ascens directe</div>
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#fbbf24"}} />Playoff d&apos;ascens</div>
        <div className="pc-legend__item"><div className="pc-legend__dot" style={{background:"#f87171"}} />Descens</div>
      </div>

      <div className="pc-prob">
        <div className="pc-prob__head">
          <span>#</span><span>Equip</span>
          <span>Ascens</span><span>Playoff</span><span>Descens</span>
        </div>

        {!simState.data ? (
          <div className="pc-prob__placeholder">
            Prem <strong>Iniciar simulació</strong> per veure les probabilitats de cada equip
          </div>
        ) : (
          standings.map((t, i) => {
            const pos = i + 1
            const { prom, play, relg, N } = simState.data
            const pr = (prom[t.id] / N * 100).toFixed(1)
            const pl = (play[t.id] / N * 100).toFixed(1)
            const re = (relg[t.id] / N * 100).toFixed(1)
            const rat    = PROFILES[t.id].atk / PROFILES[t.id].def
            const ratPct = (rat - minRat) / (maxRat - minRat)
            const hue    = Math.round(ratPct * 120)
            const dotClr = `hsl(${hue},60%,42%)`

            let rowBg = {}
            if (pos === 1)  rowBg = { background:"#f7fef9" }
            else if (pos === 2)  rowBg = { background:"#fffef5" }
            else if (pos >= 13) rowBg = { background:"#fef9f9" }

            return [
              pos === 3  && <div key="sep-a" className="pc-prob__sep pc-prob__sep--amber" />,
              pos === 13 && <div key="sep-r" className="pc-prob__sep pc-prob__sep--red" />,
              <div key={t.id} className="pc-prob__row" style={rowBg}>
                <span className="pc-prob__pos">{pos}</span>
                <span className="pc-prob__name">
                  <span className="pc-prob__dot" style={{background:dotClr}} />
                  {t.s}
                </span>
                <ProbBar pct={pr} color="#22c55e" />
                <ProbBar pct={pl} color="#fbbf24" />
                <ProbBar pct={re} color="#f87171" />
              </div>
            ]
          })
        )}
      </div>

      <p className="pc-foot" style={{marginTop:12}}>
        Model: xG_local = Atac × Def_rival × 1.40 × Factor_rendiment_local × Forma · xG_visitant: anàleg.
        Distribució de Poisson independent per a cada equip. Factor de caos ±20%.
        Rendiment casa/fora calculat sobre les 25 jornades disputades (arrel quadrada per suavitzar extrems).
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────

export function PrimeraCatalana() {
  const [tab,     setTab]     = useState("standings")
  const [results, setResults] = useState({})

  return (
    <>
      <style>{CSS}</style>
      <div className="pc-root">

        <header className="pc-header">
          <div className="pc-header__eyebrow">Federació Catalana de Futbol</div>
          <h1 className="pc-header__title">Primera Catalana · Grup 1</h1>
          <div className="pc-header__sub">Temporada 2025 / 2026</div>
          <div className="pc-header__badge">Supercalculador interactiu</div>
        </header>

        <nav className="pc-tabs">
          {[
            { id:"standings",   label:"Classificació"  },
            { id:"fixtures",    label:"Calendari"       },
            { id:"calculator",  label:"Supercalculador" },
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`pc-tab${tab === id ? " pc-tab--active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "standings"   && <StandingsTab  results={results} />}
        {tab === "fixtures"    && <FixturesTab   results={results} setResults={setResults} />}
        {tab === "calculator"  && <CalculatorTab results={results} />}

      </div>
    </>
  )
}
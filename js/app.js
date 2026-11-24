/* Weave: app logic (rendered by js/runtime.js) */
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { sel: (typeof window !== 'undefined' && window.innerWidth <= 640) ? null : 's1', hover: null, hidden: {}, done: {}, snooze: {}, lastDone: null, lastClone: null, sound: true, names: false, night: false, listOpen: false, zoom: { k: 1, x: 0, y: 0 }, dragging: false, wheeling: false, urgentOpen: false, iconOv: {}, iconsFor: null, customCats: [], catForm: null, keyOpen: false, sewing: null, unpicking: null, pinsOpen: false, night: false, added: [], addedLinks: [], form: null };
    this.cur = {};
    this.vel = {};
    this.raf = null;
  }

  componentWillUnmount() {
    if (this.raf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  palettes() {
    return {
      "Tailor's room": { bg: '#38281B', menu: '#FBF3EE', border: '#C9A08A', line: '#EADCD2', soft: '#F3E6DE', o: { board: '#38281B', field: '#FFFFFF', fieldBorder: 'rgba(92,60,40,0.25)', ink3: '#5E4A3A', ink4: '#7A6450', hover: 'rgba(92,60,40,0.08)', disabled: '#C2A898', logo: '#B8322A', ring: '#FFF6EE', iconOn: '#2A1D14', urgentBg: '#C2412D', urgentFg: '#FFF6EE', inv: '#2B1C12', invsoft: '#4A3424', ink: '#2B1C12', ink2: '#3E2C20', raised: '#5E4130', newBg: '#140801', newFg: '#F5E6D3', newStitch: 'rgba(245,230,211,0.35)', soundDark: '#140801', soundLight: '#F5E6D3', soundOn: '#C98A4B', soundOnFg: '#2B1C12' }, customs: [['#D9826B', 'Clay'], ['#9DB7C4', 'Dusk'], ['#C9A15E', 'Wheat'], ['#A7B58A', 'Moss'], ['#D99A8E', 'Rosehip'], ['#B9A3C9', 'Heather']], cats: {
        domestic: ['#F2806E', '#8E2E22', '#FBDEDA'], health: ['#B5C17A', '#4A5520', '#ECF0DA'], school: ['#6FB3A8', '#245B53', '#D8EEEA'], work: ['#E8B04A', '#7A5410', '#F8EBCB'] } },
      'Autumn slate': { bg: '#28313A', menu: '#E9ECEF', border: '#9AA5B0', line: '#D3D9DF', soft: '#DDE2E7', o: { board: '#28313A', field: '#F7F8F9', fieldBorder: 'rgba(40,50,60,0.25)', ink3: '#4C5560', ink4: '#6A737D', hover: 'rgba(40,50,60,0.08)', disabled: '#A3ACB5', logo: '#B5502E', ring: '#F2F4F6', iconOn: '#2A2420', urgentBg: '#B5502E', urgentFg: '#FFF6EE' }, customs: [['#4FB0A6', 'Teal'], ['#D9683A', 'Rust'], ['#8FB3D9', 'Sky'], ['#E48FA0', 'Rose'], ['#B6B04A', 'Olive'], ['#A98BD6', 'Lilac']], cats: {
        domestic: ['#E8866A', '#8E3B26', '#F7DED6'], health: ['#A9BF80', '#4C5E2C', '#E6EDD9'], school: ['#C98BB9', '#6B3A60', '#F1DFEC'], work: ['#E6A532', '#7A5410', '#F6E3B8'] } },
      'Autumn walnut': { bg: '#D3A377', menu: '#F5E6CB', border: '#C49A70', line: '#E3CCA7', soft: '#EEDBB9', o: { board: '#D3A377', field: '#FFF7E8', fieldBorder: 'rgba(90,55,30,0.3)', ink3: '#5E4A3A', ink4: '#7A6450', hover: 'rgba(90,55,30,0.1)', disabled: '#B5946F', logo: '#5A2E14', ring: '#2B1A0E' }, customs: [['#084541', 'Teal'], ['#6E2604', 'Rust'], ['#6B1A50', 'Berry'], ['#353D0C', 'Olive'], ['#2E2E7A', 'Ink'], ['#4A2A14', 'Cocoa']], cats: {
        domestic: ['#6E0A20', '#5E0A1A', '#F6D3D8'], health: ['#0F4423', '#0F3A1F', '#D3EBDC'], school: ['#4E1D6E', '#43185C', '#E7D8F0'], work: ['#0B4250', '#083440', '#D2E7EB'] } },
      'Craft board': { bg: '#EBD9BC', menu: '#F6E7D0', border: '#B98C64', line: '#E0C9A8', soft: '#EFDDC2', o: { board: '#EBD9BC', field: '#FBF0E0', fieldBorder: 'rgba(110,70,40,0.3)', ink3: '#5E4A3A', ink4: '#7A6450', hover: 'rgba(110,70,40,0.1)', disabled: '#B5946F', logo: '#7A3E1E' }, nightCats: { work: ['#E3C9A3', '#F3E6D2', '#3A2C20'] }, cats: {
        domestic: ['#A8202E', '#490E14', '#EECED1'], health: ['#2E6B24', '#1C4116', '#D6E9D2'], school: ['#5A2A70', '#33183F', '#E2D3E8'], work: ['#7A5A00', '#553F00', '#F5E9C7'] } },
      'Original': { bg: '#EAE3D8', menu: '#FFF8F5', border: '#E5D3C7', line: '#EEDFD4', soft: '#F4EEE7', cats: {
        domestic: ['#D23F78', '#A22659', '#FBE4ED'], health: ['#2E8F62', '#1B6B46', '#DDF0E6'], school: ['#1F75B8', '#145A8A', '#DFEDF8'], work: ['#7552D6', '#4E36A6', '#ECE6FB'] } },
      'Citrus pop': { bg: '#F0E3CF', menu: '#FBF4EA', border: '#E6D2B8', line: '#EEDFCB', soft: '#F3E8D8', cats: {
        domestic: ['#E26A2C', '#A8471A', '#FBE3D3'], health: ['#6F8A2E', '#4C611C', '#E9EED8'], school: ['#2F5DA8', '#1F4177', '#DEE7F4'], work: ['#8A3B6E', '#652850', '#F1DEEA'] } },
      'Terracotta & sage': { bg: '#E8DDCF', menu: '#F8F2EA', border: '#DCCBB8', line: '#E9DDCF', soft: '#EFE6DA', cats: {
        domestic: ['#C2643F', '#8F4425', '#F5E0D6'], health: ['#5F8460', '#405D41', '#E2EBDF'], school: ['#4F769E', '#345473', '#DFE7F0'], work: ['#B07F1F', '#7C5813', '#F3E8D0'] } },
      'Retro diner': { bg: '#F2E6D6', menu: '#FFFAF2', border: '#E8D6C0', line: '#F0E3D2', soft: '#F6EEE2', cats: {
        domestic: ['#C8323C', '#92212A', '#F8DDDF'], health: ['#23877D', '#165F58', '#D9EEEB'], school: ['#C9961A', '#7F5E0C', '#F6EACB'], work: ['#24396B', '#1A2A50', '#DDE2EE'] } },
      'Soft pastel ink': { bg: '#EDE6EE', menu: '#FAF7FA', border: '#DED3E0', line: '#EAE2EB', soft: '#F2ECF2', cats: {
        domestic: ['#C9667E', '#94445A', '#F6E1E7'], health: ['#3E957C', '#296A57', '#DCEFE8'], school: ['#5E6FC4', '#3F4E95', '#E2E5F6'], work: ['#D98A45', '#9A5C24', '#F8E7D6'] } },
      'Sage meadow': { bg: '#CFE3C8', menu: '#E6F1E1', border: '#AFCBA5', line: '#C2DAB9', soft: '#DAEAD4', o: { field: '#F1F7EE', fieldBorder: 'rgba(30,50,30,0.24)', ink3: '#4A4F44', ink4: '#66705F', hover: 'rgba(30,60,30,0.08)', disabled: '#93A88C' }, cats: {
        domestic: ['#B5522F', '#592817', '#EAD4CD'], health: ['#8C6400', '#5A4000', '#F4E6C2'], school: ['#3B5998', '#1F2F51', '#D0D7E6'], work: ['#7A3B6B', '#4C2542', '#E4D3E0'] } }
    };
  }

  nightBases() {
    return {
      'Craft board': { bg: '#2B1F17', menu: '#3A2B21', border: '#5E4734', line: '#47362A', soft: '#423226', board: '#2B1F17' },
      'Original': { bg: '#17161C', menu: '#22212A', border: '#383644', line: '#2E2D37', soft: '#2B2A33' },
      'Citrus pop': { bg: '#18141F', menu: '#231E2B', border: '#3A3345', line: '#2E2837', soft: '#2B2533' },
      'Terracotta & sage': { bg: '#181614', menu: '#24201C', border: '#3B332B', line: '#302923', soft: '#2C2621' },
      'Retro diner': { bg: '#14161D', menu: '#1F222B', border: '#353A48', line: '#2A2E39', soft: '#272B35' },
      'Soft pastel ink': { bg: '#1A1720', menu: '#25212C', border: '#3C3646', line: '#302B38', soft: '#2D2835' },
      'Sunflower': { bg: '#1E2B5C', menu: '#26356E', border: '#3A4C8F', line: '#2E3F7A', soft: '#2C3B73' },
      'Tomato': { bg: '#3A1020', menu: '#4A1629', border: '#6B2840', line: '#571C33', soft: '#521A30' },
      'Periwinkle': { bg: '#141B4D', menu: '#1C2560', border: '#2F3B85', line: '#252F70', soft: '#222C69' },
      'Mint & cherry': { bg: '#0B3B32', menu: '#114A3F', border: '#1D6656', line: '#16564A', soft: '#145045' },
      'Bubblegum': { bg: '#3D0F33', menu: '#4D1541', border: '#6E2560', line: '#5A1A4E', soft: '#551849' },
      'Sage meadow': { bg: '#16211B', menu: '#1F2C24', border: '#344A3C', line: '#283A2F', soft: '#25352B' }
    };
  }

  pal() {
    const all = this.palettes();
    const key = all[this.props.palette] ? this.props.palette : "Tailor's room";
    const custom = {};
    ((this.state && this.state.customCats) || []).forEach((c) => {
      const z = this.hexHsl(c.base);
      const hs = (h, sat, l) => 'hsl(' + Math.round(h * 360) + ', ' + Math.round(sat * 100) + '%, ' + Math.round(l * 100) + '%)';
      custom[c.key] = [c.base, hs(z[0], Math.min(z[1], 0.7), 0.3), hs(z[0], Math.min(z[1], 0.6), 0.92)];
    });
    const day = Object.assign({}, all[key], { cats: Object.assign({}, all[key].cats, custom) });
    const mixHex = (a, b, t) => {
      const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
      return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
    };
    if (true) {
      return Object.assign({}, day, {
        night: false, scheme: 'light', board: day.bg, logo: '#1C1C26',
        ink: '#1C1C26', ink2: '#33302B', ink3: '#5E554A', ink4: '#8A8075',
        inv: '#1C1C26', invfg: '#FFFFFF', invsoft: '#3A3A47',
        field: '#FFFFFF', fieldBorder: 'rgba(70,45,25,0.2)', hover: 'rgba(70,45,25,0.07)',
        warn: '#9E321C', warnBg: mixHex(day.menu, '#D2402A', 0.16), warnLine: mixHex(day.menu, '#9E321C', 0.45), soonBg: '#FFF0D6', soonFg: '#7A4F00',
        disabled: '#B3A89C', onColor: '#FFFFFF', scrim: 'rgba(60,44,30,0.2)'
      }, day.o || {});
    }
    const nb = this.nightBases()[key] || this.nightBases()['Original'];
    const toHsl = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      let h = 0, sat = 0;
      const l = (mx + mn) / 2;
      if (mx !== mn) {
        const d = mx - mn;
        sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
        if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (mx === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
      }
      return [h, sat, l];
    };
    const hsl = (h, sat, l) => 'hsl(' + Math.round(h * 360) + ', ' + Math.round(sat * 100) + '%, ' + Math.round(l * 100) + '%)';
    const shift = (hex) => {
      const z = toHsl(hex);
      return [
        hsl(z[0], Math.min(z[1], 0.72), Math.min(0.72, Math.max(0.62, z[2] + 0.15))),
        hsl(z[0], Math.min(z[1], 0.7), 0.82),
        hsl(z[0], Math.min(z[1], 0.45) , 0.21)
      ];
    };
    const cats = {};
    Object.keys(day.cats).forEach((k) => { cats[k] = shift(day.cats[k][0]); });
    if (day.nightCats) Object.assign(cats, day.nightCats);
    return Object.assign({}, nb, {
      cats: cats, night: true, scheme: 'dark', board: nb.board || nb.bg, logo: '#F3EEE7',
      ink: '#F3EEE7', ink2: '#DAD3CA', ink3: '#ABA399', ink4: '#80786F',
      inv: '#F3EEE7', invfg: nb.bg, invsoft: '#D3CCC2',
      field: nb.bg, fieldBorder: 'rgba(255,255,255,0.14)', hover: 'rgba(255,255,255,0.07)',
      warn: '#FF9C85', warnBg: mixHex(nb.menu, '#FF7A62', 0.2), warnLine: mixHex(nb.menu, '#FF9C85', 0.5), soonBg: '#43361A', soonFg: '#F5CF85',
      disabled: '#5A534C', onColor: nb.bg, scrim: 'rgba(0,0,0,0.5)'
    });
  }

  hexHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    let h = 0, sat = 0;
    const l = (mx + mn) / 2;
    if (mx !== mn) {
      const d = mx - mn;
      sat = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      if (mx === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [h, sat, l];
  }

  stitchFor(cat) {
    const base = { domestic: 'running', health: 'back', school: 'zigzag', work: 'chain' };
    if (base[cat]) return base[cat];
    const c = ((this.state && this.state.customCats) || []).find((x) => x.key === cat);
    return (c && c.stitch) || 'running';
  }

  colorStitch(i) {
    return ['wave', 'seed', 'zigzag', 'chain', 'running', 'back', 'wave'][i % 7];
  }

  stitchSample(st, mini) {
    const names = { running: 'Running stitch', back: 'Backstitch', zigzag: 'Zigzag', chain: 'Chain stitch', seed: 'Seed stitch', wave: 'Wave stitch' };
    if (mini) {
      const d = { seed: 'M1 4H27', wave: 'M1 4Q4.25 1.5 7.5 4T14 4T20.5 4T27 4', running: 'M1 4H27', back: 'M1 4H27', zigzag: 'M1 4L5.5 2L10 6L14.5 2L19 6L23.5 2L27 4', chain: 'M1 4Q4 1.8 7.5 4Q4 6.2 1 4M7.5 4Q11 1.8 14 4Q11 6.2 7.5 4M14 4Q17.5 1.8 20.5 4Q17.5 6.2 14 4M20.5 4Q24 1.8 27 4Q24 6.2 20.5 4' };
      const dash = { running: '5 2.5', back: '9 1.5', zigzag: 'none', chain: 'none', seed: '0.1 4', wave: 'none' };
      return { d: d[st], dash: dash[st], name: names[st] };
    }
    const d = { seed: 'M2 6H62', wave: 'M2 6Q9.5 2.5 17 6T32 6T47 6T62 6', running: 'M2 6H62', back: 'M2 6H62', zigzag: 'M2 6L12 3.5L22 8.5L32 3.5L42 8.5L52 3.5L62 6', chain: 'M2 6Q8 3 14 6Q8 9 2 6M14 6Q20 3 26 6Q20 9 14 6M26 6Q32 3 38 6Q32 9 26 6M38 6Q44 3 50 6Q44 9 38 6M50 6Q56 3 62 6Q56 9 50 6' };
    const dash = { running: '10 4', back: '18 2.5', zigzag: 'none', chain: 'none', seed: '0.1 6', wave: 'none' };
    return { d: d[st], dash: dash[st], name: names[st] };
  }

  customColors() {
    const all = this.palettes();
    const k = all[this.props.palette] ? this.props.palette : "Tailor's room";
    return all[k].customs || [['#2A9D8F', 'Teal'], ['#E9A23B', 'Amber'], ['#E76F51', 'Coral'], ['#5A5FD6', 'Indigo'], ['#C2508A', 'Berry'], ['#5B7083', 'Slate'], ['#8C6A4F', 'Cocoa']];
  }

  cats() {
    const p = this.pal().cats;
    const mk = (name, c) => ({ name: name, color: c[0], dark: c[1], tint: c[2] });
    const out = {
      domestic: mk('Domestic', p.domestic),
      health:   mk('Health', p.health),
      school:   mk('School', p.school),
      work:     mk('Work', p.work)
    };
    ((this.state && this.state.customCats) || []).forEach((c) => { if (p[c.key]) out[c.key] = mk(c.name, p[c.key]); });
    return out;
  }

  tasks() {
    return [
      { id: 'd1', repeat: 'monthly', cat: 'domestic', title: 'Pay electricity bill', due: '2026-11-15T20:00', imp: true, x: 300, y: 92, rot: -4, loc: 'Online', tags: ['bills'], desc: 'Autopay is off this month. The amount is on the paper statement.' },
      { id: 'd2', cat: 'domestic', title: 'Grocery run', due: '2026-11-16T11:00', imp: false, x: 150, y: 118, rot: 45, loc: 'Downtown market', tags: ['errand', 'food'], desc: 'Oats, spinach, eggs, rice, dish soap. Bring tote bags.' },
      { id: 'd3', repeat: 'weekly', cat: 'domestic', title: 'Laundry', due: '2026-11-18T19:00', imp: false, x: 88, y: 252, rot: 12, loc: 'Basement laundry room', tags: ['chores'], desc: 'Darks and towels. Quarters are in the jar by the door.' },
      { id: 'd4', cat: 'domestic', title: 'Return library books', due: '2026-11-22T18:00', imp: false, x: 262, y: 302, rot: 45, loc: 'Main library drop box', tags: ['errand'], desc: 'Two books and one DVD. Late fees start the next day.' },
      { id: 'd5', cat: 'domestic', title: 'Fix closet door', due: null, imp: false, x: 392, y: 212, rot: 0, loc: null, tags: ['home'], desc: 'The hinge squeaks and the door won’t latch. Grab a screwdriver.' },
      { id: 'd6', cat: 'domestic', title: 'Water the plants', due: null, imp: false, x: 205, y: 205, rot: 0, loc: null, tags: ['home'], desc: 'Monstera and the herbs on the windowsill. Check the soil first.' },

      { id: 'h1', cat: 'health', title: 'Refill prescription', due: '2026-11-16T18:00', imp: true, x: 562, y: 66, rot: 6, loc: 'Campus pharmacy', tags: ['errand', 'meds'], desc: 'Last refill on the current bottle. Call ahead so it is ready for pickup after class.' },
      { id: 'h2', cat: 'health', title: 'Dentist cleaning', due: '2026-11-24T10:30', imp: false, x: 742, y: 92, rot: 45, loc: 'Student health center, 2nd floor', tags: ['appointment'], desc: 'Six-month cleaning. Bring your insurance card and arrive ten minutes early.' },
      { id: 'h3', repeat: 'weekly', cat: 'health', title: 'Yoga class', due: '2026-11-19T17:30', imp: false, x: 642, y: 212, rot: 20, loc: 'Rec center, studio B', tags: ['exercise', 'weekly'], desc: 'Beginner flow class. Mat is in the hall closet.' },
      { id: 'h4', cat: 'health', title: 'Morning stretch routine', due: null, imp: false, x: 480, y: 158, rot: 0, loc: null, tags: ['habit'], desc: 'Ten minutes before breakfast. No deadline, just a gentle nudge.' },
      { id: 'h5', cat: 'health', title: 'Book flu shot', due: '2026-11-26T12:00', imp: true, x: 806, y: 224, rot: -8, loc: 'Campus pharmacy', tags: ['appointment'], desc: 'Walk-in hours are posted online. It takes about fifteen minutes.' },

      { id: 's1', cat: 'school', title: 'Econ problem set 7', due: '2026-11-15T23:59', imp: true, x: 150, y: 420, rot: 3, loc: 'Submit online', tags: ['econ', 'homework'], desc: 'Questions 1–6 on price elasticity. Office hours are Sunday 2–4 PM if #5 gets tricky.' },
      { id: 's2', cat: 'school', title: 'Studio critique boards', due: '2026-11-17T13:10', imp: true, x: 384, y: 522, rot: -6, loc: 'Design studio', tags: ['design', 'critique'], desc: 'Print two 18×24 boards showing process and final. Pin up before class starts.' },
      { id: 's3', cat: 'school', title: 'Read ch. 9: market structures', due: '2026-11-19T10:00', imp: false, x: 108, y: 562, rot: 45, loc: null, tags: ['econ', 'reading'], desc: 'Skim the summary first, then take notes on monopolistic competition.' },
      { id: 's4', cat: 'school', title: 'Email TA about regrade', due: '2026-11-21T12:00', imp: false, x: 332, y: 380, rot: 10, loc: null, tags: ['email'], desc: 'Ask about partial credit on midterm question 4. Attach the scan.' },
      { id: 's5', cat: 'school', title: 'Research spring internships', due: null, imp: false, x: 244, y: 604, rot: 0, loc: null, tags: ['career'], desc: 'Shortlist five roles and note each application deadline.' },
      { id: 's6', cat: 'school', title: 'Group project check-in', due: '2026-11-18T16:00', imp: false, x: 252, y: 470, rot: 45, loc: 'Library, 3rd floor study room', tags: ['team', 'econ'], desc: 'Divide up the slides and agree on a draft deadline.' },

      { id: 'w1', repeat: 'weekly', cat: 'work', title: 'Prep slides for Monday standup', due: '2026-11-16T09:00', imp: true, x: 602, y: 378, rot: 8, loc: 'Remote · video call', tags: ['slides', 'team'], desc: 'Three slides: last week’s wins, blockers, and what’s next. Pull numbers from the shared tracker.' },
      { id: 'w2', cat: 'work', title: 'Review Q4 campaign brief', due: '2026-11-17T12:00', imp: true, x: 832, y: 352, rot: -3, loc: null, tags: ['marketing', 'review'], desc: 'Leave comments on audience and channel mix before the kickoff meeting.' },
      { id: 'w3', cat: 'work', title: 'Send client recap email', due: '2026-11-20T17:00', imp: false, x: 884, y: 500, rot: 45, loc: null, tags: ['email', 'follow-up'], desc: 'Summarize the decisions from Thursday’s call and confirm the next meeting date.' },
      { id: 'w4', cat: 'work', title: 'Submit October expenses', due: '2026-11-27T17:00', imp: false, x: 702, y: 584, rot: 15, loc: null, tags: ['admin'], desc: 'Receipts are in the Expenses folder. Two still need photos.' },
      { id: 'w5', cat: 'work', title: 'Refresh portfolio site', due: null, imp: false, x: 540, y: 522, rot: 0, loc: null, tags: ['portfolio', 'design'], desc: 'Add the studio critique boards once they are finished.' },
      { id: 'w6', cat: 'work', title: '1:1 with manager', due: '2026-11-19T14:00', imp: true, x: 722, y: 460, rot: 5, loc: 'Remote · video call', tags: ['team'], desc: 'Bring two questions about the Q4 campaign and an update on current tasks.' }
    ];
  }

  allTasks() {
    return this.tasks().concat(this.state.added || []);
  }

  links() {
    return [
      ['d1','d2'],['d2','d6'],['d6','d1'],['d2','d3'],['d3','d6'],['d3','d4'],['d4','d6'],['d4','d5'],['d5','d1'],['d5','d6'],
      ['h4','h1'],['h1','h2'],['h2','h5'],['h5','h3'],['h3','h4'],['h1','h3'],['h2','h3'],
      ['s1','s4'],['s4','s6'],['s6','s1'],['s1','s3'],['s3','s6'],['s3','s5'],['s5','s6'],['s5','s2'],['s2','s6'],['s2','s4'],
      ['w1','w2'],['w2','w3'],['w3','w6'],['w6','w1'],['w1','w5'],['w5','w6'],['w5','w4'],['w4','w6'],['w4','w3'],['w2','w6'],
      ['d1','h4'],['d5','h4'],['d4','s4'],['d3','s1'],['h3','w1'],['h5','w2'],['s2','w5'],['s4','w1']
    ].concat(this.state.addedLinks || []);
  }

  targetsFor(hover) {
    const T = this.allTasks();
    const H = hover ? T.find((t) => t.id === hover) : null;
    const k0 = this.props.nudge ?? 24;
    const R = 230;
    const out = {};
    T.forEach((t) => {
      let tx = 0, ty = 0;
      if (H && t.id !== H.id) {
        const dx = t.x - H.x, dy = t.y - H.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0 && d < R) {
          const k = k0 * Math.pow(1 - d / R, 1.15);
          tx = dx / d * k; ty = dy / d * k;
        }
      }
      out[t.id] = { x: tx, y: ty };
    });
    return out;
  }

  kick() {
    if (this.raf || typeof requestAnimationFrame === 'undefined') return;
    const step = () => {
      const tg = this.targetsFor(this.hoverId());
      let moving = false;
      Object.keys(tg).forEach((id) => {
        const c = this.cur[id] || { x: 0, y: 0 };
        const v = this.vel[id] || { x: 0, y: 0 };
        v.x = v.x * 0.74 + (tg[id].x - c.x) * 0.13;
        v.y = v.y * 0.74 + (tg[id].y - c.y) * 0.13;
        c.x += v.x; c.y += v.y;
        if (Math.abs(v.x) + Math.abs(v.y) > 0.08 || Math.abs(tg[id].x - c.x) + Math.abs(tg[id].y - c.y) > 0.15) {
          moving = true;
        } else {
          c.x = tg[id].x; c.y = tg[id].y; v.x = 0; v.y = 0;
        }
        this.cur[id] = c; this.vel[id] = v;
      });
      this.forceUpdate();
      this.raf = moving ? requestAnimationFrame(step) : null;
    };
    this.raf = requestAnimationFrame(step);
  }

  iconSet() {
    return {
      money:    { label: 'Money', d: 'M12 3v18M16.5 7.5c0-1.9-2-3-4.5-3s-4.5 1.2-4.5 3.2c0 4.6 9 2.6 9 7.3 0 2-2 3.5-4.5 3.5s-4.5-1.3-4.5-3.2' },
      cart:     { label: 'Shopping', d: 'M3 4h2.5l2.2 10.5h10.3L20 7H6.4M10.5 19.5a1 1 0 1 1-2 0a1 1 0 1 1 2 0M18 19.5a1 1 0 1 1-2 0a1 1 0 1 1 2 0' },
      shirt:    { label: 'Laundry', d: 'M8 3L4 6l2 4 2-1v12h8V9l2 1 2-4-4-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3z' },
      plant:    { label: 'Plant', d: 'M12 21v-8M12 13c0-4 3-7 7-7 0 4-3 7-7 7zM12 15c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5zM7 21h10' },
      wrench:   { label: 'Repair', d: 'M14.7 6.3a4 4 0 0 0 5 5l1.3-1.3a5 5 0 0 1-6.8 5.6L7.5 22.3a2.1 2.1 0 0 1-3-3l6.7-6.7A5 5 0 0 1 16.8 5.8z' },
      food:     { label: 'Food', d: 'M7 3v18M4.5 3v5a2.5 2.5 0 0 0 5 0V3M17 21V3c-2 1-3.5 3.5-3.5 7.5H17' },
      home:     { label: 'Home', d: 'M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5' },
      heart:    { label: 'Health', d: 'M12 20s-7-4.5-9-9c-1.3-3 .7-6.5 4-6.5 2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.3 0 5.3 3.5 4 6.5-2 4.5-9 9-9 9z' },
      pill:     { label: 'Medicine', d: 'M4.9 12.9l8-8a4.24 4.24 0 0 1 6 6l-8 8a4.24 4.24 0 0 1-6-6zM8.9 8.9l6 6' },
      syringe:  { label: 'Shot', d: 'M17 3l4 4M19 5l-4 4M14 6l4 4-8.5 8.5H5.5v-4zM5.5 18.5L3 21M9 11l2 2M11.5 8.5l2 2' },
      tooth:    { label: 'Dentist', d: 'M7 3C4.5 3 3 5 3 7.5c0 3 1.5 4 2 7 .5 3 1 6.5 2.5 6.5S9 16.5 12 16.5s3 4.5 4.5 4.5 2-3.5 2.5-6.5c.5-3 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z' },
      run:      { label: 'Exercise', d: 'M14 4.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0M5 9.5l7 1.5 7-1.5M12 11v4l-4 6M12 15l4 6' },
      calendar: { label: 'Appointment', d: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
      cap:      { label: 'School', d: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6' },
      book:     { label: 'Reading', d: 'M4 5.5C6 4.5 9 4.5 12 6c3-1.5 6-1.5 8-.5V19c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5zM12 6v13.5' },
      pencil:   { label: 'Homework', d: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4' },
      palette:  { label: 'Design', d: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8zM7.5 11.5h.01M10.5 7.5h.01M15.5 8.5h.01' },
      brief:    { label: 'Work', d: 'M3 8h18v12H3zM8 8V5h8v3M3 13h18' },
      slides:   { label: 'Presentation', d: 'M3 4h18M4 4v11h16V4M12 15v5M8 20h8M8 11l3-3 2 2 3-3' },
      doc:      { label: 'Document', d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6' },
      mail:     { label: 'Email', d: 'M3 6h18v12H3zM3 7l9 6 9-6' },
      receipt:  { label: 'Expenses', d: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3' },
      laptop:   { label: 'Computer', d: 'M4 5h16v11H4zM2 19h20' },
      people:   { label: 'Meeting', d: 'M12 8a3 3 0 1 1-6 0a3 3 0 1 1 6 0M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M21 20c0-2.6-1.6-4.8-4-5.6' },
      star:     { label: 'Career', d: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z' },
      phone:    { label: 'Call', d: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z' },
      plane:    { label: 'Travel', d: 'M10.5 13.5L3 11l1.5-2 7 1 4.5-5c1-1 2.5-1.5 3.5-.5s.5 2.5-.5 3.5l-5 4.5 1 7-2 1.5-2.5-7.5-3.5 3.5v3l-1.5 1-1-3.5-3.5-1 1-1.5h3z' }
    };
  }

  autoIcon(title, cat) {
    const t = ' ' + (title || '').toLowerCase() + ' ';
    const rules = [
      ['syringe', ['shot', 'vaccine', 'flu', 'booster']],
      ['tooth', ['dentist', 'teeth', 'tooth', 'orthodont']],
      ['pill', ['prescription', 'pill', 'meds', 'medication', 'pharmacy', 'refill', 'vitamin']],
      ['money', ['bill', ' pay', 'rent', 'bank', 'budget', 'tax', 'money', 'venmo', 'tuition']],
      ['receipt', ['expense', 'receipt', 'invoice', 'reimburse']],
      ['cart', ['grocer', 'shop', ' buy', 'store', 'errand', 'pick up']],
      ['shirt', ['laundry', 'clothes', ' wash', 'iron']],
      ['plant', ['plant', 'water the', 'garden', 'flower']],
      ['wrench', ['fix', 'repair', 'door', 'hinge', 'install', 'assemble', 'leak']],
      ['food', ['cook', 'meal', 'dinner', 'lunch', 'breakfast', 'recipe', 'bake']],
      ['plane', ['flight', 'trip', 'travel', 'pack ', 'airport']],
      ['phone', [' call', 'phone', 'text ']],
      ['slides', ['slides', 'presentation', 'standup', 'pitch', 'deck']],
      ['mail', ['email', 'mail', ' send', 'letter', 'reply', 'newsletter']],
      ['doc', ['brief', 'review', 'report', ' doc', 'proposal', 'paper']],
      ['laptop', ['portfolio', 'website', ' site', 'code', 'computer', 'update app']],
      ['palette', ['design', 'studio', 'critique', 'board', 'draw', 'sketch', ' art', 'paint', 'illustrat']],
      ['pencil', ['problem set', 'homework', 'essay', 'assignment', 'write', 'exam', 'quiz', 'study']],
      ['star', ['intern', 'career', 'resume', 'apply', 'application', ' job']],
      ['people', ['team', 'meeting', '1:1', 'check-in', 'manager', 'group', 'club', 'friend']],
      ['run', ['yoga', 'stretch', 'gym', ' run', 'workout', 'exercise', ' walk', 'swim', 'hike']],
      ['book', ['read', 'book', 'library', 'chapter', 'notes']],
      ['calendar', ['appointment', 'schedule', 'class', 'reserve']]
    ];
    for (let i = 0; i < rules.length; i++) {
      if (rules[i][1].some((k) => t.indexOf(k) !== -1)) return rules[i][0];
    }
    return { domestic: 'home', health: 'heart', school: 'cap', work: 'brief' }[cat] || 'star';
  }

  iconFor(t) {
    const ov = this.state.iconOv && this.state.iconOv[t.id];
    return ov || t.icon || this.autoIcon(t.title, t.cat);
  }

  onWheel(e) {
    const tg = e.target;
    if (tg && tg.closest && tg.closest('[role="dialog"]')) return;
    e.preventDefault();
    const z = this._live || this.state.zoom;
    let cx = 0, cy = 0;
    if (this.vpEl) {
      const r = this.vpEl.getBoundingClientRect();
      cx = e.clientX - (r.left + r.width / 2);
      cy = e.clientY - (r.top + r.height / 2);
    }
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const nk = Math.max(0.5, Math.min(2.5, z.k * Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0015))));
    const lx = (cx - z.x) / z.k, ly = (cy - z.y) / z.k;
    const p = this.clampPan(nk, cx - nk * lx, cy - nk * ly);
    if (!this.state.wheeling) this.setState({ wheeling: true });
    this.liveZoom({ k: nk, x: p.x, y: p.y });
    clearTimeout(this._wt);
    this._wt = setTimeout(() => this.commitZoom({ wheeling: false }), 240);
  }

  onTouch(ev, kind) {
    const t = ev.touches;
    if (kind !== 'end' && t && t.length === 2) {
      const tg = ev.target;
      if (tg && tg.closest && tg.closest('[role="dialog"]')) return;
      if (ev.cancelable) ev.preventDefault();
      const a = t[0], b = t[1];
      const d = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY) || 1;
      const mx = (a.clientX + b.clientX) / 2, my = (a.clientY + b.clientY) / 2;
      let cx = 0, cy = 0;
      if (this.vpEl) {
        const r = this.vpEl.getBoundingClientRect();
        cx = mx - (r.left + r.width / 2);
        cy = my - (r.top + r.height / 2);
      }
      if (!this.pinch) {
        const z = this.state.zoom;
        this.pinch = { d0: d, k0: z.k, lx: (cx - z.x) / z.k, ly: (cy - z.y) / z.k };
        this.drag = null;
        this.setState({ wheeling: true, dragging: false });
        return;
      }
      const nk = Math.max(0.5, Math.min(2.5, this.pinch.k0 * d / this.pinch.d0));
      const p = this.clampPan(nk, cx - nk * this.pinch.lx, cy - nk * this.pinch.ly);
      this.liveZoom({ k: nk, x: p.x, y: p.y });
    } else if (this.pinch && (!t || t.length < 2)) {
      this.pinch = null;
      this._pinchEnd = Date.now();
      this.drag = null;
      this.commitZoom({ wheeling: false, dragging: false });
    }
  }

  clampPan(k, x, y) {
    const W = this.vpW || 1000, H = this.vpH || 640;
    const mx = Math.max(0, k - 1) * W / 2 + 140;
    const my = Math.max(0, k - 1) * H / 2 + 100;
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  }

  moveNeedle(e) {
    const m = this.mainEl, nd = this.needleEl;
    if (!m || !nd) return;
    const r = m.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const tg = e.target;
    const overUI = tg && tg.closest && tg.closest('button, input, textarea, nav, [role="dialog"], [role="group"], [role="menu"], .felt');
    nd.style.opacity = overUI && !this.drag ? '0' : '1';
    nd.style.transform = 'translate(' + (x - 3) + 'px, ' + (y - 37) + 'px)';
    if (this.drag && this.trailEl) {
      this.trail = (this.trail || []).concat([[Math.round(x), Math.round(y)]]).slice(-22);
      const d = 'M' + this.trail.map((pt) => pt[0] + ' ' + pt[1]).join('L');
      const ps = this.trailEl.querySelectorAll('path');
      ps.forEach((pp) => pp.setAttribute('d', d));
      this.trailEl.style.opacity = '1';
    }
  }

  clearTrail() {
    this.trail = [];
    const t = this.trailEl;
    if (!t) return;
    t.style.opacity = '0';
    clearTimeout(this._trT);
    this._trT = setTimeout(() => { if (!this.drag) t.querySelectorAll('path').forEach((pp) => pp.setAttribute('d', '')); }, 460);
  }

  fitIfOverflow() {
    const s = this.state;
    const ts = this.allTasks().filter((t) => !s.done[t.id] && !s.hidden[t.cat]);
    if (!ts.length) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    ts.forEach((t) => { minX = Math.min(minX, t.x); maxX = Math.max(maxX, t.x); minY = Math.min(minY, t.y); maxY = Math.max(maxY, t.y); });
    if (minX >= 0 && maxX <= 1000 && minY >= 0 && maxY <= 640) return;
    const pad = 45;
    minX -= pad; maxX += pad; minY -= pad; maxY += pad;
    const W = this.vpW || 1000, H = this.vpH || 640;
    const fit = Math.min(1000 / (maxX - minX), 640 / (maxY - minY));
    const k = Math.max(0.5, Math.min(1, s.zoom.k, Math.round(fit * 100) / 100));
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const p = this.clampPan(k, -(cx - 500) * (W / 1000) * k, -(cy - 320) * (H / 640) * k);
    if (Math.abs(k - s.zoom.k) < 0.01 && Math.abs(p.x - s.zoom.x) < 2 && Math.abs(p.y - s.zoom.y) < 2) return;
    this.setState({ zoom: { k: k, x: p.x, y: p.y }, autoFit: true });
    clearTimeout(this._fitT);
    this._fitT = setTimeout(() => this.setState({ autoFit: false }), 1200);
  }

  audio() {
    if (this._ac !== undefined) return this._ac;
    try {
      const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      this._ac = AC ? new AC() : null;
    } catch (e) { this._ac = null; }
    return this._ac;
  }

  sfx(kind, opt) {
    if (this.state && this.state.sound === false) return;
    const ac = this.audio();
    if (!ac) return;
    try {
      if (ac.state === 'suspended') ac.resume();
      const t0 = ac.currentTime + 0.01 + ((opt && opt.delay) || 0);
      const out = ac.createGain();
      out.gain.value = 0.45;
      out.connect(ac.destination);
      const tone = (type, f0, f1, dur, vol, at) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = type;
        o.frequency.setValueAtTime(f0, at);
        if (f1) o.frequency.exponentialRampToValueAtTime(f1, at + dur);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(vol, at + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        o.connect(g); g.connect(out);
        o.start(at); o.stop(at + dur + 0.03);
      };
      const noise = (dur, freq, q, vol, at) => {
        const n = Math.max(1, Math.floor(ac.sampleRate * dur));
        const buf = ac.createBuffer(1, n, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
        const src = ac.createBufferSource();
        src.buffer = buf;
        const bp = ac.createBiquadFilter();
        bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q;
        const g = ac.createGain();
        g.gain.value = vol;
        src.connect(bp); bp.connect(g); g.connect(out);
        src.start(at);
      };
      if (kind === 'tock') {
        tone('triangle', 620, 210, 0.11, 0.15, t0);
        noise(0.025, 2600, 1.2, 0.1, t0);
      } else if (kind === 'sew') {
        [0, 0.15, 0.3].forEach((dl, i) => { tone('triangle', 540 + i * 70, 200, 0.09, 0.11, t0 + dl); noise(0.02, 3000, 1.5, 0.07, t0 + dl); });
      } else if (kind === 'snip') {
        [0, 0.12].forEach((dl) => { noise(0.05, 5200, 2.5, 0.28, t0 + dl); tone('sine', 2600, 1700, 0.05, 0.03, t0 + dl); });
      } else if (kind === 'tape') {
        const up = opt && opt.up;
        noise(0.007, up ? 2900 : 2400, 3, 0.16, t0);
        noise(0.07, up ? 1500 : 1200, 0.8, 0.05, t0);
        tone('sine', up ? 1250 : 1050, 0, 0.012, 0.012, t0);
      } else if (kind === 'click') {
        noise(0.012, 3800, 1.4, 0.09, t0);
        tone('sine', 1900, 1500, 0.025, 0.025, t0);
      } else if (kind === 'pluck') {
        const f = (opt && opt.f) || 440;
        tone('sine', f, f * 0.985, 0.42, 0.11, t0);
        tone('triangle', f * 2, f * 1.97, 0.19, 0.025, t0);
      }
    } catch (e) { }
  }

  syncList() {
    const el = this._listEl, th = this._thumbEl, tr = this._trackEl;
    if (!el || !th || !tr) return;
    const h = el.clientHeight, sh = el.scrollHeight;
    if (sh <= h + 1) { tr.style.display = 'none'; return; }
    tr.style.display = 'block';
    const trackH = tr.clientHeight;
    const thH = Math.max(40, Math.round(trackH * h / sh));
    const top = (trackH - thH) * (el.scrollTop / (sh - h));
    th.style.height = thH + 'px';
    th.style.transform = 'translateY(' + top.toFixed(1) + 'px)';
  }

  nextDue(t) {
    const DAYn = 86400000;
    const today = new Date(2026, 10, 14, 23, 59);
    let d = t.due ? new Date(t.due) : new Date(2026, 10, 14, 17, 0);
    if (t.due && this.state.snooze && this.state.snooze[t.id]) d = new Date(d.getTime() + this.state.snooze[t.id] * DAYn);
    const step = (x) => {
      const n = new Date(x.getTime());
      if (t.repeat === 'daily') n.setDate(n.getDate() + 1);
      else if (t.repeat === 'monthly') n.setMonth(n.getMonth() + 1);
      else n.setDate(n.getDate() + 7);
      return n;
    };
    d = step(d);
    while (d <= today) d = step(d);
    const p2 = (v) => String(v).padStart(2, '0');
    return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + 'T' + p2(d.getHours()) + ':' + p2(d.getMinutes());
  }

  texVals(s) {
        const k = s.zoom.k;
        const mw = this.mainW || 1440, mh = this.mainH || 900;
        const cx = (this.vpL != null ? this.vpL : 64) + (this.vpW || 1000) / 2, cy = (this.vpT != null ? this.vpT : 96) + (this.vpH || 640) / 2;
        const ox = cx * (1 - k) + s.zoom.x, oy = cy * (1 - k) + s.zoom.y;
        const moving = !!(s.dragging || s.wheeling || this.pinch);
        const ease = moving ? null : (s.autoFit ? '1.1s cubic-bezier(.3,.7,.2,1)' : '.3s cubic-bezier(.2,.8,.2,1)');
        // every tile divides 200px, so the pattern repeats every 200px: draw a layer only
        // slightly bigger than the screen and shift it by the leftover of a 200px period
        const per = 200 * k;
        const x0 = ((ox % per) + per) % per - per, y0 = ((oy % per) + per) % per - per;
        return {
          // only two sizes, so zooming never resizes (and repaints) the fabric on every tick
          w: Math.ceil(mw / (k < 1 ? 0.5 : 1)) + 400,
          h: Math.ceil(mh / (k < 1 ? 0.5 : 1)) + 400,
          tf: 'translate(' + x0.toFixed(2) + 'px, ' + y0.toFixed(2) + 'px) scale(' + k + ')',
          tr: ease ? 'transform ' + ease : 'none',
          wc: moving ? 'transform' : 'auto'
        };
  }

  // Draw the weave once into a 200px image tile. The CSS version (two gradients plus an SVG
  // noise filter) looks the same but is far slower to repaint; it stays as the fallback.
  bakeFabric(el) {
    if (this._baked || typeof document === 'undefined') return;
    this._baked = true;
    const m = /url\("(data:image\/svg\+xml[^"]*)"\)/.exec(getComputedStyle(el).backgroundImage);
    if (!m) return;
    const img = new Image();
    img.onload = () => {
      try {
        const P = 200, R = 3, cv = document.createElement('canvas');
        cv.width = cv.height = P * R;
        const g = cv.getContext('2d');
        g.scale(R, R);
        g.drawImage(img, 0, 0, P, P);
        // diagonal stripes; dir 1 runs down-right, dir -1 runs up-right
        const stripes = (a, part, dir, color) => {
          g.fillStyle = color;
          for (let c = -P; c < 2 * P; c += a) {
            const x0 = dir === 1 ? c : c - a * part, w = a * part;
            g.beginPath();
            g.moveTo(x0, 0); g.lineTo(x0 + w, 0);
            g.lineTo(x0 + w + dir * P, P); g.lineTo(x0 + dir * P, P);
            g.fill();
          }
        };
        stripes(P / 18, 0.125, -1, 'rgba(0,0,0,.12)');
        stripes(P / 36, 0.3, 1, 'rgba(255,255,255,.09)');
        cv.toBlob((b) => {
          if (!b) return;
          const st = document.createElement('style');
          st.textContent = '.fabric-tex{background-image:url("' + URL.createObjectURL(b) + '");background-size:200px 200px}';
          document.head.appendChild(st);
        });
      } catch (e) { /* keep the CSS fabric */ }
    };
    img.src = m[1];
  }

  bubblePos(z) {
    const a = this._anchor;
    if (!a) return { left: 'auto', right: 'auto', top: 'auto', bottom: 'auto' };
    const VW = this.vpW || 1000, VH = this.vpH || 640;
    const sx = VW / 2 + (a.px / 1000 * VW - VW / 2) * z.k + z.x;
    const sy = VH / 2 + (a.py / 640 * VH - VH / 2) * z.k + z.y;
    const gap = Math.round(a.half * z.k + 8), lift = 40;
    return {
      left: a.flip ? 'auto' : Math.round(sx + gap) + 'px',
      right: a.flip ? Math.round(VW - sx + gap) + 'px' : 'auto',
      top: a.below ? 'auto' : Math.round(sy - lift) + 'px',
      bottom: a.below ? Math.round(VH - sy - lift) + 'px' : 'auto'
    };
  }

  // Move the web, fabric, bubble and zoom readout straight from a gesture, without a re-render.
  liveZoom(z) {
    this._live = z;
    if (this.mainEl) this.mainEl.classList.add('gesturing');
    const ok = (el) => el && el.isConnected;
    if (ok(this._zl)) {
      this._zl.style.transition = 'none';
      this._zl.style.willChange = 'transform';
      this._zl.style.transform = 'translate(' + Math.round(z.x) + 'px, ' + Math.round(z.y) + 'px) scale(' + z.k + ')';
    }
    if (ok(this._tx)) {
      const t = this.texVals(Object.assign({}, this.state, { zoom: z, dragging: true }));
      const st = this._tx.style;
      st.transition = 'none'; st.willChange = 'transform';
      if (st.width !== t.w + 'px') st.width = t.w + 'px';
      if (st.height !== t.h + 'px') st.height = t.h + 'px';
      st.transform = t.tf;
    }
    if (ok(this._bb) && this._anchor) {
      // slide the bubble with a transform from where the last render put it (no layout)
      const base = this._bbBase || (this._bbBase = this.bubblePos(this.state.zoom));
      const p = this.bubblePos(z), st = this._bb.style;
      const num = (v) => (v === 'auto' ? 0 : parseFloat(v));
      const dx = this._anchor.flip ? num(base.right) - num(p.right) : num(p.left) - num(base.left);
      const dy = this._anchor.below ? num(base.bottom) - num(p.bottom) : num(p.top) - num(base.top);
      st.transition = 'none';
      st.translate = dx + 'px ' + dy + 'px';
    }
    const pct = Math.round(z.k * 100);
    if (ok(this._rg) && document.activeElement !== this._rg) this._rg.value = pct;
    if (ok(this._pc)) this._pc.textContent = pct + '%';
  }

  // End of a gesture: hand the final zoom back to the app state (one render).
  commitZoom(extra) {
    const z = this._live;
    this._live = null;
    if (this.mainEl) this.mainEl.classList.remove('gesturing');
    this._bbBase = null;
    if (this._bb && this._bb.isConnected) this._bb.style.translate = '';
    this.setState(Object.assign(z ? { zoom: z } : {}, extra || {}));
  }

  setZoom(k) {
    const z = this.state.zoom;
    const nk = Math.max(0.5, Math.min(2.5, Math.round(k * 20) / 20));
    const r = nk / z.k;
    const p = this.clampPan(nk, z.x * r, z.y * r);
    this.setState({ zoom: { k: nk, x: p.x, y: p.y }, dragging: false });
  }

  focusTask(t, extra) {
    const z = this.state.zoom;
    let zoom = z;
    if (z.k > 1) {
      const W = this.vpW || 1000, H = this.vpH || 640;
      const p = this.clampPan(z.k, -(t.x / 1000 - 0.5) * W * z.k, -(t.y / 640 - 0.5) * H * z.k);
      zoom = { k: z.k, x: p.x, y: p.y };
    }
    this.setState(Object.assign({ sel: t.id, zoom: zoom }, extra || {}));
  }

  hoverId() {
    return this._touch ? (this.state.sel || null) : this.state.hover;
  }

  setHover(id) {
    if (this.state.hover === id) return;
    this.setState({ hover: id });
    this.kick();
  }

  renderVals() {
    const s = this._live ? Object.assign({}, this.state, { zoom: this._live }) : this.state;
    const hv = this.hoverId();
    if (this._touch && this._lastSel !== s.sel) {
      this._lastSel = s.sel;
      if (typeof setTimeout !== 'undefined') setTimeout(() => this.kick(), 0);
    }
    const C = this.cats();
    const order = ['domestic', 'health', 'school', 'work'].concat((s.customCats || []).map((c) => c.key));
    const DAY = 86400000;
    const today = new Date(2026, 10, 14);
    const mode = this.props.labels ?? 'On hover';
    const pal = this.pal();
    const BG = pal.board;

    const sizeScale = Math.max(0.55, Math.min(1, (this.vpW || 1000) / 900));
    const sizeFor = (d) => Math.round(sizeScale * (d === null ? 10 : d <= 1 ? 102 : d === 2 ? 64 : d === 3 ? 48 : d <= 5 ? 34 : d <= 7 ? 24 : d <= 10 ? 16 : 12));
    const hitFor = (size) => Math.max(40, size + 12);
    const relOf = (d) => d === null ? 'No deadline' : d <= 0 ? 'Today' : d === 1 ? 'Tomorrow' : 'In ' + d + ' days';
    const fmt = (dt) => dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ' · ' + dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const ICONS = this.iconSet();
    const ICOFF = {"money": [0, 0], "cart": [-0.5, 0.25], "shirt": [0, 0], "plant": [0.5, 1.5], "wrench": [0.49, 2.31], "food": [-1.25, 0], "home": [0, 0], "heart": [0, 0.25], "pill": [-0.1, -0.1], "syringe": [0, 0], "tooth": [0, 0], "run": [0, 0], "calendar": [0, -0.5], "cap": [0, -1.25], "book": [0, 0.15], "pencil": [-0.5, 0.5], "palette": [0, 0], "brief": [0, 0.5], "slides": [0, 0], "doc": [0, 0], "mail": [0, 0], "receipt": [0, 0], "laptop": [0, 0], "people": [0, 0.5], "star": [0, -0.55], "phone": [-0.5, 0.5], "plane": [-1.48, 0.48]};
    const source = this.allTasks();
    const all = source.filter((t) => !s.done[t.id]).map((t) => {
      let due = t.due ? new Date(t.due) : null;
      if (due && s.snooze[t.id]) due = new Date(due.getTime() + s.snooze[t.id] * DAY);
      const days = due ? Math.round((new Date(due.getFullYear(), due.getMonth(), due.getDate()) - today) / DAY) : null;
      const off = this.cur[t.id] || { x: 0, y: 0 };
      return Object.assign({}, t, { dueDate: due, days: days, px: t.x + off.x, py: t.y + off.y });
    });
    const byId = {};
    all.forEach((t) => { byId[t.id] = t; });

    const selTask = all.find((t) => t.id === s.sel && !s.hidden[t.cat]) || null;
    const selCat = selTask ? selTask.cat : null;
    const visible = all.filter((t) => !s.hidden[t.cat]);
    const shown = {};
    visible.forEach((t) => { shown[t.id] = true; });

    const STITCH = ['running', 'back', 'zigzag', 'chain'];
    const stitchOf = (cat) => this.stitchFor(cat);
    const stitchPath = (st, x1, y1, x2, y2, sag, baseLen) => {
      const dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const f = (v) => Math.round(v * 10) / 10;
      const L = baseLen || len;
      const cqx = (x1 + x2) / 2, cqy = (y1 + y2) / 2 + 2 * (sag || 0);
      const P = (t) => {
        const u = 1 - t;
        return [u * u * x1 + 2 * t * u * cqx + t * t * x2, u * u * y1 + 2 * t * u * cqy + t * t * y2];
      };
      const env = (t) => Math.sin(Math.PI * Math.max(0, Math.min(1, t)));
      if (st === 'zigzag') {
        const n = Math.max(4, 2 * Math.round(L / 44));
        let d = 'M' + f(x1) + ' ' + f(y1);
        for (let i = 1; i <= n; i++) {
          const t = i / n, q = P(t), amp = (i % 2 ? 2.4 : -2.4) * env(t);
          d += 'L' + f(q[0] + nx * amp) + ' ' + f(q[1] + ny * amp);
        }
        return d;
      }
      if (st === 'wave') {
        const n = Math.max(2, Math.round(L / 24));
        let d = 'M' + f(x1) + ' ' + f(y1);
        for (let i = 0; i < n; i++) {
          const tm = (i + 0.5) / n, q = P(tm), e2 = P((i + 1) / n), sg = (i % 2 ? -3 : 3) * env(tm);
          d += 'Q' + f(q[0] + nx * sg) + ' ' + f(q[1] + ny * sg) + ' ' + f(e2[0]) + ' ' + f(e2[1]);
        }
        return d;
      }
      if (st === 'chain') {
        const n = Math.max(2, Math.round(L / 24));
        let d = '';
        for (let i = 0; i < n; i++) {
          const pa = P(i / n), pb = P((i + 1) / n), tm = (i + 0.5) / n, pm = P(tm), r = 2.6 * (0.35 + 0.65 * env(tm));
          d += 'M' + f(pa[0]) + ' ' + f(pa[1]) + 'Q' + f(pm[0] + nx * r) + ' ' + f(pm[1] + ny * r) + ' ' + f(pb[0]) + ' ' + f(pb[1]) + 'Q' + f(pm[0] - nx * r) + ' ' + f(pm[1] - ny * r) + ' ' + f(pa[0]) + ' ' + f(pa[1]);
        }
        return d;
      }
      if (sag && Math.abs(sag) > 0.3) return 'M' + f(x1) + ' ' + f(y1) + 'Q' + f(cqx) + ' ' + f(cqy) + ' ' + f(x2) + ' ' + f(y2);
      return 'M' + f(x1) + ' ' + f(y1) + 'L' + f(x2) + ' ' + f(y2);
    };
    const DASH = { running: '14 5', back: '24 3', zigzag: 'none', chain: 'none', seed: '0.1 7', wave: 'none' };
    const HDASH = { running: '14 5', back: '24 3', zigzag: '1.5 3.5', chain: '1.5 3.5', seed: '0.1 7', wave: '1.5 3.5' };
    const slack = this.slack || 0;
    const edges = this.links().filter((l) => shown[l[0]] && shown[l[1]]).map((l) => {
      const a = byId[l[0]], b = byId[l[1]];
      const cross = a.cat !== b.cat;
      const touch = hv && (l[0] === hv || l[1] === hv);
      const hot = (a.days !== null && a.days <= 1) || (b.days !== null && b.days <= 1);
      let op = cross ? 0.75 : 1;
      if (selCat && (a.cat !== selCat && b.cat !== selCat)) op = 0.2;
      else if (selCat && cross) op = 0.35;
      if (touch) op = 1;
      const impN = (a.imp ? 1 : 0) + (b.imp ? 1 : 0);
      let w = [1.8, 3, 4.4][impN];
      if (cross) w *= 0.8;
      if (hot) w += 0.6;
      if (touch) w += 1.2;
      w = Math.round(w * 10) / 10;
      const st = stitchOf(a.cat);
      const unpick = s.unpicking && (l[0] === s.unpicking || l[1] === s.unpicking);
      const sew = s.sewing && (l[0] === s.sewing || l[1] === s.sewing);
      return {
        d: stitchPath(st, a.px, a.py, b.px, b.py, 0, Math.hypot(b.x - a.x, b.y - a.y)),
        dash: DASH[st], hdash: HDASH[st],
        color: C[a.cat].color,
        w: w,
        op: op,
        cls: unpick ? 'unpickline' : (sew ? 'sewline' : ''),
        hw: Math.max(0.7, Math.round(w * 0.35 * 10) / 10)
      };
    });

    const nodes = visible.map((t) => {
      const c = C[t.cat];
      const shape = t.imp ? 'tri' : 'circ';
      const size = sizeFor(t.days);
      const hit = hitFor(size);
      const selected = t.id === s.sel;
      const hovered = t.id === hv;
      const urgent = t.days !== null && t.days <= 1;
      const minSel = selected && size < 30 ? 30 / size : 1;
      const scale = Math.max(minSel, hovered ? (size > 40 ? 1.14 : 1.35) : 1);
      const show = urgent || hovered || s.names || mode === 'All' || (mode === 'Important' && shape === 'tri');
      return {
        title: t.title,
        left: (t.x / 10).toFixed(3) + '%',
        top: (t.y / 6.4).toFixed(3) + '%',
        dx: ((t.px - t.x) / 1000 * (this.vpW || 1000)).toFixed(2),
        dy: ((t.py - t.y) / 640 * (this.vpH || 640)).toFixed(2),
        wc: this.raf ? 'transform' : 'auto',
        size: size, hit: hit, scale: scale, rot: t.rot,
        isTri: shape === 'tri', isSq: shape === 'sq', isCirc: shape === 'circ',
        color: c.color, tint: c.tint,
        fill: selected ? c.color : BG,
        sw: size >= 40 ? 3.6 : 2.8,
        rim: c.dark,
        ringColor: pal.ring || pal.ink,
        selOp: selected ? 1 : 0,
        holeOp: ((urgent || selected) && s.sewing !== t.id && s.unpicking !== t.id) ? 0 : 1,
        isSnipping: s.unpicking === t.id,
        hasRepeat: !!t.repeat && (size >= 20 || selected),
        rbLeft: Math.round(hit / 2 + size * scale * 0.3),
        rbTop: Math.round(hit / 2 - size * scale * 0.5 - 6),
        isSewing: s.sewing === t.id,
        ringW: size < 22 ? 1.1 : (size < 40 ? 1.6 : 2.2),
        ringDash: size < 22 ? '1.5 1.8' : (size < 40 ? '2.4 2.4' : '3 3'),
        ringR: size < 22 ? 18.5 : 20.5,
        ringT: 'translate(20 25) scale(' + (size < 22 ? 1.2 : 1.32) + ') translate(-20 -25)',
        op: selCat && selCat !== t.cat ? 0.35 : 1,
        z: hovered ? 6 : (selected ? 5 : (urgent ? 4 : 2)),
        selected: selected,
        pressed: selected ? 'true' : 'false',
        pulse: t.days !== null && t.days <= 1,
        lblClass: (show ? 'show' : '') + (urgent ? ' urgent' : ''),
        tagText: urgent ? t.title + ' · ' + relOf(t.days) : t.title,
        iconD: ICONS[this.iconFor(t)].d,
        iconOn: urgent || selected,
        showIcon: (urgent || selected) && s.sewing !== t.id && s.unpicking !== t.id,
        iconSize: Math.round(size * (shape === 'tri' ? 0.4 : 0.46)),
        iconTop: shape === 'tri' ? '46%' : '50%',
        iconRot: shape === 'tri' ? t.rot : 0,
        iconDx: Math.round(-(ICOFF[this.iconFor(t)] || [0, 0])[0] / 24 * Math.round(size * (shape === 'tri' ? 0.4 : 0.46)) * 10) / 10,
        iconDy: Math.round(-(ICOFF[this.iconFor(t)] || [0, 0])[1] / 24 * Math.round(size * (shape === 'tri' ? 0.4 : 0.46)) * 10) / 10,
        iconSw: size >= 40 ? 2.2 : 1.8,
        iconColor: pal.iconOn || pal.onColor,
        freshClass: s.sewing === t.id ? 'sewing' : (s.unpicking === t.id ? 'unpicking' : ''),
        lblTop: Math.round(hit / 2 + (size * scale) / 2 + 8),
        aria: t.title + ', ' + c.name + ', ' + (t.imp ? 'important' : 'routine') + ', ' + relOf(t.days),
        pick: () => { if (this.pinch || (this._pinchEnd && Date.now() - this._pinchEnd < 350)) return; if (!selected) this.sfx('pluck', { f: [392, 440, 494, 587, 659, 740, 784, 880][Math.max(0, order.indexOf(t.cat)) % 8] }); this.setState({ sel: selected ? null : t.id }); },
        enter: () => { if (!this._touch) this.setHover(t.id); },
        leave: () => { if (!this._touch && this.state.hover === t.id) this.setHover(null); }
      };
    });

    const bobbinW = (n) => (n <= 0 ? 0 : Math.round((5 + Math.min(n, 8) * 1.4) * 10) / 10);
    const bobbinWrap = (n) => {
      const w = bobbinW(n);
      if (!w) return '';
      let d = '';
      for (let y = 6.5; y < 20; y += 2.6) d += 'M' + (10 - w / 2 + 0.6) + ' ' + y + 'L' + (10 + w / 2 - 0.6) + ' ' + (y + 1.4);
      return d;
    };
    const cats = order.map((k) => {
      const c = C[k];
      const on = !s.hidden[k];
      const n = all.filter((t) => t.cat === k).length;
      return {
        name: c.name, color: c.color,
        swBg: on ? c.color : 'transparent',
        twist: on ? 'rgba(255,255,255,0.45)' : c.color,
        tw2: bobbinW(n),
        tx: 10 - bobbinW(n) / 2,
        thread: on ? c.color : pal.ink4,
        wrapD: bobbinWrap(n),
        band: pal.menu,
        text: on ? pal.ink : pal.ink3,
        label: on ? String(n) : 'Hidden',
        pressed: on ? 'true' : 'false',
        toggle: () => this.setState({ hidden: Object.assign({}, s.hidden, { [k]: !s.hidden[k] }) })
      };
    });

    const soon = visible.filter((t) => t.dueDate).sort((a, b) => a.dueDate - b.dueDate).slice(0, 5).map((t) => ({
      title: t.title,
      color: C[t.cat].color,
      rel: relOf(t.days),
      relColor: t.days !== null && t.days <= 1 ? pal.warn : pal.ink3,
      bg: t.id === s.sel ? pal.soft : 'transparent',
      iconD: ICONS[this.iconFor(t)].d,
      showIcon: (t.days !== null && t.days <= 1) || t.id === s.sel,
      showDot: !((t.days !== null && t.days <= 1) || t.id === s.sel),
      pick: () => this.focusTask(t)
    }));

    let b = {};
    if (!selTask) this._anchor = null;
    if (selTask) {
      const t = selTask;
      const c = C[t.cat];
      const d = t.days;
      const flip = t.x > 560;
      const below = t.y > 330;
      this._anchor = { px: t.px, py: t.py, half: hitFor(sizeFor(d)) / 2, flip: flip, below: below };
      const bp = this.bubblePos(s.zoom);
      b = {
        title: t.title, catName: c.name, color: c.color, dark: c.dark, tint: c.tint,
        btnBg: pal.night ? c.color : c.dark, btnFg: pal.onColor,
        hasRepeat: !!t.repeat,
        repeatLabel: t.repeat ? 'Repeats ' + t.repeat + ' · the next one sews on when you finish' : '',
        iconD: ICONS[this.iconFor(t)].d,
        iconsOpen: s.iconsFor === t.id,
        iconsExpanded: s.iconsFor === t.id ? 'true' : 'false',
        toggleIcons: () => this.setState({ iconsFor: this.state.iconsFor === t.id ? null : t.id }),
        iconChoices: Object.keys(ICONS).map((k) => {
          const on = this.iconFor(t) === k && !!(s.iconOv && s.iconOv[t.id]);
          return {
            d: ICONS[k].d, label: ICONS[k].label + ' icon',
            pressed: on ? 'true' : 'false',
            bg: on ? c.tint : 'transparent', border: on ? c.color : 'transparent', stroke: on ? c.dark : pal.ink2,
            pick: () => this.setState({ iconOv: Object.assign({}, this.state.iconOv, { [t.id]: k }), iconsFor: null })
          };
        }),
        autoPressed: s.iconOv && s.iconOv[t.id] ? 'false' : 'true',
        autoBg: s.iconOv && s.iconOv[t.id] ? 'transparent' : c.tint,
        autoBorder: s.iconOv && s.iconOv[t.id] ? pal.line : c.color,
        autoIcon: () => { const o = Object.assign({}, this.state.iconOv); delete o[t.id]; this.setState({ iconOv: o, iconsFor: null }); },
        importance: t.imp ? 'Important' : 'Routine',
        dueText: t.dueDate ? fmt(t.dueDate) : 'No deadline set',
        hasDue: !!t.dueDate,
        rel: relOf(d),
        relBg: d !== null && d <= 1 ? pal.warnBg : d !== null && d <= 3 ? pal.soonBg : pal.soft,
        relFg: d !== null && d <= 1 ? pal.warn : d !== null && d <= 3 ? pal.soonFg : pal.ink2,
        hasLoc: !!t.loc, loc: t.loc || '',
        desc: t.desc,
        tags: t.tags.map((x) => ({ t: x })),
        left: bp.left, right: bp.right, top: bp.top, bottom: bp.bottom,
        tr: (s.dragging || s.wheeling || this.pinch) ? 'none' : 'left .3s cubic-bezier(.2,.8,.2,1), right .3s cubic-bezier(.2,.8,.2,1), top .3s cubic-bezier(.2,.8,.2,1), bottom .3s cubic-bezier(.2,.8,.2,1)',
        origin: (flip ? 'right' : 'left') + ' ' + (below ? 'bottom' : 'top'),
        tailLeft: !flip, tailRight: flip,
        tailTop: below ? 'auto' : '31px',
        tailBottom: below ? '31px' : 'auto'
      };
    }

    const lastTask = s.lastDone ? source.find((t) => t.id === s.lastDone) : null;
    const flowerFor = (st) => {
      const r1 = (v) => Math.round(v * 10) / 10;
      const rot = (x, y, a) => [r1(x * Math.cos(a) - y * Math.sin(a)), r1(x * Math.sin(a) + y * Math.cos(a))];
      let d = '';
      if (st === 'running' || st === 'chain') {
        const k = st === 'running' ? 5 : 7, L = st === 'running' ? 18 : 15, W = st === 'running' ? 5.5 : 4.2;
        for (let i = 0; i < k; i++) {
          const a = i * 2 * Math.PI / k;
          const p0 = rot(0, -2, a), c1 = rot(-W, -L * 0.45, a), c2 = rot(-W, -L, a), tip = rot(0, -L, a), c3 = rot(W, -L, a), c4 = rot(W, -L * 0.45, a);
          d += 'M' + p0 + 'C' + c1 + ' ' + c2 + ' ' + tip + 'C' + c3 + ' ' + c4 + ' ' + p0;
        }
        return { d: d, dash: st === 'running' ? '4 2.6' : 'none' };
      }
      if (st === 'back') {
        return { d: 'M-9 -1C-11 -11 -7 -18 -4 -13L0 -19L4 -13C7 -18 11 -11 9 -1C6 5 -6 5 -9 -1ZM0 4V17M0 12C-5 8 -9 9 -11 11C-7 14 -3 13 0 12M0 14C4 10 8 11 10 13', dash: '7 1.6' };
      }
      if (st === 'zigzag') {
        const k = 9;
        for (let i = 0; i <= 2 * k; i++) {
          const a = i * Math.PI / k, rr = i % 2 ? 7 : 18, q = rot(0, -rr, a);
          d += (i ? 'L' : 'M') + q;
        }
        return { d: d + 'Z', dash: 'none' };
      }
      if (st === 'seed') {
        for (let i = 0; i < 6; i++) {
          const c = rot(0, -10.5, i * Math.PI / 3);
          d += 'M' + r1(c[0] - 5.5) + ' ' + c[1] + 'a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0';
        }
        return { d: d, dash: '0.1 2.8' };
      }
      for (let i = 0; i <= 96; i++) {
        const a = i * 2 * Math.PI / 96, rr = 13 + 4 * Math.sin(8 * a), q = rot(0, -rr, a);
        d += (i ? 'L' : 'M') + q;
      }
      return { d: d + 'M0 -6.5a6.5 6.5 0 1 0 0.01 0', dash: 'none' };
    };
    const emptyStates = order.filter((k) => !s.hidden[k] && C[k] && all.filter((t) => t.cat === k).length === 0 && source.some((t) => t.cat === k)).map((k) => {
      const ts = source.filter((t) => t.cat === k);
      const cx = ts.reduce((acc, t) => acc + t.x, 0) / ts.length, cy = ts.reduce((acc, t) => acc + t.y, 0) / ts.length;
      const fl = flowerFor(this.stitchFor(k));
      return { flowerD: fl.d, flowerDash: fl.dash, left: (cx / 10).toFixed(2) + '%', top: (cy / 6.4).toFixed(2) + '%', color: C[k].color, dark: C[k].dark, leaf: C.health ? C.health.color : C[k].color, name: C[k].name, aria: C[k].name + ': all caught up' };
    });
    let catFormVals = {};
    if (s.catForm) {
      const cf = s.catForm;
      const cols = this.customColors();
      const patchCat = (o) => this.setState({ catForm: Object.assign({}, this.state.catForm, o) });
      catFormVals = {
        name: cf.name,
        setName: (e) => patchCat({ name: e && e.target ? e.target.value : e, err: '' }),
        swatches: cols.map((c, i) => {
          const sm = this.stitchSample(this.colorStitch(i), true);
          return {
            color: c[0], label: c[1] + ', ' + sm.name, pressed: i === cf.color ? 'true' : 'false',
            ring: i === cf.color ? pal.ink : 'transparent', bg: i === cf.color ? pal.soft : 'transparent',
            d: sm.d, dash: sm.dash,
            pick: () => patchCat({ color: i })
          };
        }),
        previewColor: cols[cf.color][0],
        stitchD: this.stitchSample(this.colorStitch(cf.color)).d,
        stitchDash: this.stitchSample(this.colorStitch(cf.color)).dash,
        stitchName: this.stitchSample(this.colorStitch(cf.color)).name + ' (swapped if a neighbor already uses it)',
        previewName: cf.name.trim() || 'Your category',
        hasErr: !!cf.err, err: cf.err || '',
        close: () => this.setState({ catForm: null }),
        add: () => {
          const c = this.state.catForm;
          const name = (c.name || '').trim();
          const names = Object.keys(C).map((k) => C[k].name.toLowerCase());
          if (!name) { patchCat({ err: 'Give the category a name.' }); return; }
          if (names.indexOf(name.toLowerCase()) !== -1) { patchCat({ err: 'You already have a category with that name.' }); return; }
          if (names.length >= 8) { patchCat({ err: 'You can have up to 8 categories.' }); return; }
          const key = 'c' + Date.now().toString(36);
          this.setState({ customCats: (this.state.customCats || []).concat([{ key: key, name: name, base: cols[c.color][0], stitch: this.colorStitch(c.color), placed: false }]), catForm: null });
        }
      };
    }
    const urgentList = visible.filter((t) => t.days !== null && t.days <= 1).sort((a, b) => a.dueDate - b.dueDate);
    const ui = urgentList.findIndex((t) => t.id === s.sel);
    const urgentNext = urgentList.length ? urgentList[(ui + 1) % urgentList.length] : null;

    const markDone = (id) => {
      if (this.state.unpicking) return;
      this.setState({ unpicking: id, sel: this.state.sel === id ? null : this.state.sel, hover: null, iconsFor: null });
      clearTimeout(this._unT);
      this.sfx('snip', { delay: 0.18 });
      this._unT = setTimeout(() => {
        const t = this.allTasks().find((x) => x.id === id);
        const doneNext = Object.assign({}, this.state.done, { [id]: true });
        if (t && t.repeat) {
          const nid = 'r' + Date.now().toString(36);
          const clone = Object.assign({}, t, { id: nid, due: this.nextDue(t), fresh: true });
          const links = this.links().filter((l) => l[0] === id || l[1] === id).map((l) => (l[0] === id ? [nid, l[1]] : [l[0], nid]));
          const ov = this.state.iconOv && this.state.iconOv[id] ? Object.assign({}, this.state.iconOv, { [nid]: this.state.iconOv[id] }) : this.state.iconOv;
          this.setState({ done: doneNext, lastDone: id, lastClone: nid, unpicking: null, added: (this.state.added || []).concat([clone]), addedLinks: (this.state.addedLinks || []).concat(links), iconOv: ov, sewing: nid });
          this.sfx('sew', { delay: 0.05 });
          clearTimeout(this._sewT);
          this._sewT = setTimeout(() => this.setState({ sewing: null }), 950);
        } else {
          this.setState({ done: doneNext, lastDone: id, lastClone: null, unpicking: null });
        }
        this.kick();
      }, 780);
    };

    const groups = order.filter((k) => !s.hidden[k]).map((k) => {
      const c = C[k];
      const rows = all.filter((t) => t.cat === k).sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate - b.dueDate;
      }).map((t) => {
        const shape = t.imp ? 'tri' : 'circ';
        return {
          title: t.title,
          color: c.color,
          isTri: shape === 'tri', isSq: shape === 'sq', isCirc: shape === 'circ',
          rel: t.dueDate ? relOf(t.days) : 'No date',
          relColor: t.days !== null && t.days <= 1 ? pal.warn : pal.ink3,
          bg: t.id === s.sel ? c.tint : 'transparent',
          doneLabel: 'Mark ' + t.title + ' done',
          done: () => markDone(t.id),
          pick: () => this.focusTask(t, { listOpen: false })
        };
      });
      return { name: c.name, color: c.color, dark: c.dark, count: rows.length, rows: rows };
    });

    const FORM0 = { title: '', cat: 'school', imp: true, repeat: 'never', date: '', time: '17:00', loc: '', desc: '', tags: '', tried: false };
    const f = s.form;
    const patchForm = (obj) => this.setState({ form: Object.assign({}, this.state.form, obj) });
    const setF = (k) => (e) => patchForm({ [k]: e && e.target ? e.target.value : e });
    const validDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || '');
    const validTime = (v) => /^\d{2}:\d{2}$/.test(v || '');
    let nf = {};
    if (f) {
      let pdays = null;
      if (validDate(f.date)) {
        const p = f.date.split('-').map(Number);
        pdays = Math.max(0, Math.round((new Date(p[0], p[1] - 1, p[2]) - today) / DAY));
      }
      const pc = C[f.cat];
      const on = (yes) => ({ bg: yes ? pc.tint : pal.field, border: yes ? pc.color : pal.border, fg: yes ? pc.dark : pal.ink2, pressed: yes ? 'true' : 'false' });
      const io = on(f.imp), ro = on(!f.imp);
      const pad2 = (n) => String(n).padStart(2, '0');
      const dstr = (y, m, d) => y + '-' + pad2(m + 1) + '-' + pad2(d);
      const todayStr = '2026-11-14';
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let vy = f.vy, vm = f.vm;
      if (vy === undefined || vm === undefined) {
        if (validDate(f.date)) { const q = f.date.split('-').map(Number); vy = q[0]; vm = q[1] - 1; } else { vy = 2026; vm = 10; }
      }
      const atMin = vy < 2026 || (vy === 2026 && vm <= 10);
      const shiftMonth = (k) => { let m = vm + k, y = vy; if (m < 0) { m = 11; y -= 1; } if (m > 11) { m = 0; y += 1; } patchForm({ vy: y, vm: m }); };
      const dueSet = {};
      all.forEach((t) => { if (t.dueDate) dueSet[dstr(t.dueDate.getFullYear(), t.dueDate.getMonth(), t.dueDate.getDate())] = true; });
      const calDays = [];
      const firstDow = new Date(vy, vm, 1).getDay();
      const dim = new Date(vy, vm + 1, 0).getDate();
      for (let i = 0; i < firstDow; i++) calDays.push({ isDay: false, blank: true });
      for (let d = 1; d <= dim; d++) {
        const key = dstr(vy, vm, d);
        const past = key < todayStr;
        const sel = key === f.date;
        const isToday = key === todayStr;
        calDays.push({
          isDay: true, blank: false, n: d, past: past,
          pressed: sel ? 'true' : 'false',
          bg: sel ? pc.color : 'transparent',
          fg: sel ? pal.onColor : (past ? pal.disabled : pal.ink),
          border: sel || isToday ? pc.color : 'transparent',
          weight: sel || isToday ? 700 : 500,
          cursor: past ? 'default' : 'pointer',
          dot: !!dueSet[key] && !sel,
          dotColor: pal.ink4,
          aria: monthNames[vm] + ' ' + d + (isToday ? ', today' : '') + (dueSet[key] ? ', other tasks due' : ''),
          pick: () => { if (!past) patchForm({ date: key, pop: null }); }
        });
      }
      while (calDays.length % 7) calDays.push({ isDay: false, blank: true });
      const addDaysStr = (n) => { const d = new Date(2026, 10, 14 + n); return dstr(d.getFullYear(), d.getMonth(), d.getDate()); };
      const quick = [['No deadline', ''], ['Today', addDaysStr(0)], ['Tomorrow', addDaysStr(1)], ['In 3 days', addDaysStr(3)], ['Next week', addDaysStr(7)]].map((q) => {
        const yes = (validDate(f.date) ? f.date : '') === q[1];
        return {
          label: q[0], pressed: yes ? 'true' : 'false',
          bg: yes ? pc.tint : pal.menu, border: yes ? pc.color : pal.border, fg: yes ? pc.dark : pal.ink2,
          pick: () => { const o = { date: q[1], pop: null }; if (q[1]) { const z = q[1].split('-').map(Number); o.vy = z[0]; o.vm = z[1] - 1; } patchForm(o); }
        };
      });
      const tm = validTime(f.time) ? f.time : '17:00';
      const fmt12 = (t) => { const z = t.split(':').map(Number); return (z[0] % 12 || 12) + ':' + pad2(z[1]) + ' ' + (z[0] >= 12 ? 'PM' : 'AM'); };
      const setTimeVal = (v) => { const cur = this.state.form || {}; patchForm(validDate(cur.date) ? { time: v } : { time: v, date: todayStr }); };
      const stepTime = (delta) => { const z = tm.split(':').map(Number); const tot = (z[0] * 60 + z[1] + delta + 1440) % 1440; setTimeVal(pad2(Math.floor(tot / 60)) + ':' + pad2(tot % 60)); };
      const ROW = 36;
      const tz = tm.split(':').map(Number);
      const hIdx = (tz[0] % 12 || 12) - 1;
      const mIdx = Math.min(11, Math.round(tz[1] / 5));
      const apIdx = tz[0] >= 12 ? 1 : 0;
      const commitWheel = (colName, i) => {
        const cur = this.state.form || {};
        const z = (validTime(cur.time) ? cur.time : '17:00').split(':').map(Number);
        let h12 = z[0] % 12 || 12, mm = z[1], pm = z[0] >= 12;
        if (colName === 'hour') h12 = i + 1;
        if (colName === 'minute') mm = i * 5;
        if (colName === 'ampm') pm = i === 1;
        const h24 = (h12 % 12) + (pm ? 12 : 0);
        const v = pad2(h24) + ':' + pad2(mm);
        if (v !== cur.time || !validDate(cur.date)) setTimeVal(v);
      };
      const wheelScroll = (colName, n) => (e) => {
        const el = e.currentTarget;
        if (!el) return;
        el._scrolling = true;
        clearTimeout(el._t);
        el._t = setTimeout(() => {
          el._scrolling = false;
          const i = Math.max(0, Math.min(n - 1, Math.round(el.scrollTop / ROW)));
          commitWheel(colName, i);
        }, 120);
      };
      const wheelRef = (idx) => (el) => {
        if (!el || el._scrolling) return;
        const target = idx * ROW;
        if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target;
      };
      const wheelItem = (label, i, selIdx) => ({
        label: label,
        sel: i === selIdx ? 'true' : 'false',
        weight: i === selIdx ? 600 : 500,
        color: i === selIdx ? pal.ink : pal.ink3,
        pick: (e) => { const c = e && e.currentTarget ? e.currentTarget.parentElement : null; if (c && c.scrollTo) c.scrollTo({ top: i * ROW, behavior: 'smooth' }); }
      });
      const wheelHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h, i) => wheelItem(String(h), i, hIdx));
      const wheelMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => wheelItem(pad2(m), i, mIdx));
      const wheelAmpm = ['AM', 'PM'].map((x, i) => wheelItem(x, i, apIdx));
      const presets = [['9 AM', '09:00'], ['12 PM', '12:00'], ['5 PM', '17:00'], ['9 PM', '21:00']].map((q) => {
        const yes = tm === q[1];
        return { label: q[0], pressed: yes ? 'true' : 'false', bg: yes ? pc.tint : pal.menu, border: yes ? pc.color : pal.border, fg: yes ? pc.dark : pal.ink2, pick: () => setTimeVal(q[1]) };
      });
      let whenLabel = 'No deadline';
      if (validDate(f.date)) {
        const z = f.date.split('-').map(Number);
        whenLabel = new Date(z[0], z[1] - 1, z[2]).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ' · ' + fmt12(tm);
      }
      const when = pdays === null ? 'with no deadline' : (pdays <= 0 ? 'due today' : 'due ' + relOf(pdays).toLowerCase());
      nf = {
        title: f.title, date: f.date, time: f.time, loc: f.loc, desc: f.desc, tags: f.tags,
        setTitle: setF('title'), setDate: setF('date'), setTime: (e) => { const v = e && e.target ? e.target.value : e; const cur = this.state.form || {}; patchForm(validDate(cur.date) ? { time: v } : { time: v, date: '2026-11-14' }); }, setLoc: setF('loc'), setDesc: setF('desc'), setTags: setF('tags'),
        showErr: f.tried && !f.title.trim(),
        cats: order.map((k) => {
          const c = C[k];
          const yes = f.cat === k;
          return { name: c.name, color: c.color, pressed: yes ? 'true' : 'false', bg: yes ? c.tint : pal.field, border: yes ? c.color : pal.border, fg: yes ? c.dark : pal.ink2, pick: () => patchForm({ cat: k }) };
        }),
        impBg: io.bg, impBorder: io.border, impFg: io.fg, impPressed: io.pressed,
        rouBg: ro.bg, rouBorder: ro.border, rouFg: ro.fg, rouPressed: ro.pressed,
        setImp: () => patchForm({ imp: true }),
        setRou: () => patchForm({ imp: false }),
        pTri: !!f.imp, pCirc: !f.imp,
        repeats: [['never', 'Never'], ['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']].map((r) => {
          const yes = (f.repeat || 'never') === r[0];
          return { label: r[1], pressed: yes ? 'true' : 'false', bg: yes ? pc.tint : pal.field, border: yes ? pc.color : pal.border, fg: yes ? pc.dark : pal.ink2, pick: () => patchForm({ repeat: r[0] }) };
        }),
        iconD: ICONS[this.autoIcon(f.title, f.cat)].d,
        pIconShow: Math.round(sizeFor(pdays) * 0.82) >= 18,
        pIconSize: Math.round(sizeFor(pdays) * 0.82 * (f.imp ? 0.38 : 0.48)),
        pIconTop: f.imp ? '62%' : '50%',
        pSize: Math.round(sizeFor(pdays) * 0.82),
        hasDate: pdays !== null,
        noDate: pdays === null,
        clearDate: () => patchForm({ date: '' }),
        pColor: pc.color,
        pDark: pc.dark,
        dateOpen: f.pop === 'date',
        timeOpen: f.pop === 'time',
        dateExpanded: f.pop === 'date' ? 'true' : 'false',
        timeExpanded: f.pop === 'time' ? 'true' : 'false',
        dateBorder: f.pop === 'date' ? pc.color : pal.fieldBorder,
        timeBorder: f.pop === 'time' ? pc.color : pal.fieldBorder,
        toggleDate: () => patchForm({ pop: this.state.form && this.state.form.pop === 'date' ? null : 'date' }),
        toggleTime: () => patchForm({ pop: this.state.form && this.state.form.pop === 'time' ? null : 'time' }),
        closePop: () => patchForm({ pop: null }),
        dateText: validDate(f.date) ? (() => { const z = f.date.split('-').map(Number); return new Date(z[0], z[1] - 1, z[2]).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); })() : 'No deadline',
        dateColor: validDate(f.date) ? pal.ink : pal.ink3,
        whenLabel: whenLabel,
        quick: quick,
        monthLabel: monthNames[vm] + ' ' + vy,
        days: calDays,
        atMin: atMin,
        prevOp: atMin ? 0.35 : 1,
        prevMonth: () => { if (!atMin) shiftMonth(-1); },
        nextMonth: () => shiftMonth(1),
        timeLabel: fmt12(tm),
        timeEarlier: () => stepTime(-15),
        timeLater: () => stepTime(15),
        presets: presets,
        hours: wheelHours,
        minutes: wheelMinutes,
        ampms: wheelAmpm,
        hourScroll: wheelScroll('hour', 12),
        minuteScroll: wheelScroll('minute', 12),
        ampmScroll: wheelScroll('ampm', 2),
        hourRef: wheelRef(hIdx),
        minuteRef: wheelRef(mIdx),
        ampmRef: wheelRef(apIdx),
        pText: 'Shows up in ' + pc.name + ' as ' + (f.imp ? 'an important' : 'a routine') + ' task, ' + when + '.' + (pdays === null ? ' It stays small until you give it a date.' : ' It grows as the day gets closer.') + ' The icon is picked from the name, and you can change it from the task bubble.'
      };
    }

    const addTask = () => {
      const fm = this.state.form;
      if (!fm) return;
      if (!fm.title.trim()) { patchForm({ tried: true }); return; }
      const live = this.allTasks().filter((t) => !this.state.done[t.id]);
      const same = live.filter((t) => t.cat === fm.cat);
      const byIdL = {};
      live.forEach((t) => { byIdL[t.id] = t; });
      const segs = this.links().filter((l) => byIdL[l[0]] && byIdL[l[1]]).map((l) => [byIdL[l[0]], byIdL[l[1]]]);
      const cross = (p1, p2, p3, p4) => {
        const o = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        const d1 = o(p3, p4, p1), d2 = o(p3, p4, p2), d3 = o(p1, p2, p3), d4 = o(p1, p2, p4);
        return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
      };
      const segDist = (p, a, b) => {
        const dx = b.x - a.x, dy = b.y - a.y;
        const L = dx * dx + dy * dy || 1;
        const u = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / L));
        return Math.hypot(p.x - (a.x + u * dx), p.y - (a.y + u * dy));
      };
      const linkCost = (p, q) => {
        let c = 0;
        segs.forEach((sg) => {
          if (sg[0] === q || sg[1] === q) return;
          if (cross(p, q, sg[0], sg[1])) c += 1;
        });
        live.forEach((t) => { if (t !== q && segDist(t, p, q) < 30) c += 1; });
        return c;
      };
      const pickLinks = (p) => {
        const cand = (same.length ? same : live).map((t) => ({ t: t, d: Math.hypot(t.x - p.x, t.y - p.y) })).sort((x, y) => x.d - y.d);
        const clean = cand.filter((c) => c.d < 230 && linkCost(p, c.t) === 0).slice(0, 2);
        if (clean.length) return clean.map((c) => c.t);
        return cand.length ? [cand[0].t] : [];
      };
      let best = null, bestScore = Infinity;
      const isCustom = ['domestic', 'health', 'school', 'work'].indexOf(fm.cat) === -1;
      const wcx = live.length ? live.reduce((acc, t) => acc + t.x, 0) / live.length : 500;
      const wcy = live.length ? live.reduce((acc, t) => acc + t.y, 0) / live.length : 320;
      const fromWeb = (x, y) => Math.hypot((x - wcx) * 0.8, y - wcy);
      const ownCx = same.length ? same.reduce((acc, t) => acc + t.x, 0) / same.length : wcx;
      const ownCy = same.length ? same.reduce((acc, t) => acc + t.y, 0) / same.length : wcy;
      const otherCentroids = {};
      live.forEach((t) => { if (t.cat !== fm.cat) { const o = otherCentroids[t.cat] || (otherCentroids[t.cat] = { x: 0, y: 0, n: 0 }); o.x += t.x; o.y += t.y; o.n += 1; } });
      const uiBlocked = (x, y) => (x < 340 && y < 50) || (x > 830 && y < 40) || (x < 560 && y > 600) || (x > 620 && y > 600);
      let bx0 = Infinity, bx1 = -Infinity, by0 = Infinity, by1 = -Infinity;
      live.forEach((t) => { bx0 = Math.min(bx0, t.x); bx1 = Math.max(bx1, t.x); by0 = Math.min(by0, t.y); by1 = Math.max(by1, t.y); });
      const placedCustom = (this.state.customCats || []).filter((c) => c.placed).length;
      const side = ['right', 'left', 'top'][placedCustom % 3];
      const onSide = (x, y) => side === 'right' ? x > bx1 + 40 : side === 'left' ? x < bx0 - 40 : y < by0 - 40;
      const x0 = isCustom ? -200 : 70, x1 = isCustom ? 1200 : 930, y0 = isCustom ? -110 : 60, y1 = isCustom ? 750 : 590;
      for (let x = x0; x <= x1; x += 18) {
        for (let y = y0; y <= y1; y += 18) {
          const p = { x: x, y: y };
          let dmin = Infinity, nearOther = Infinity;
          live.forEach((t) => {
            const d = Math.hypot(t.x - x, t.y - y);
            if (d < dmin) dmin = d;
            if (t.cat !== fm.cat && d < nearOther) nearOther = d;
          });
          if (dmin < 70) continue;
          let score = 0;
          if (same.length) {
            const ds = same.map((t) => Math.hypot(t.x - x, t.y - y)).sort((m, n) => m - n);
            score += Math.abs(ds[0] - 95);
            if (ds[1] !== undefined) score += 0.4 * Math.abs(ds[1] - 125);
            if (nearOther < ds[0]) score += 70;
            const targets = same.map((t) => ({ t: t, d: Math.hypot(t.x - x, t.y - y) })).sort((m, n) => m.d - n.d).slice(0, 2);
            targets.forEach((g) => { score += 90 * linkCost(p, g.t); });
            if (isCustom) {
              score -= 0.1 * (fromWeb(x, y) - fromWeb(ownCx, ownCy));
              if (nearOther < ds[0] * 1.3) score += 90;
              Object.keys(otherCentroids).forEach((k) => {
                const o = otherCentroids[k], dc = Math.hypot(o.x / o.n - x, o.y / o.n - y);
                if (dc < Math.hypot(ownCx - x, ownCy - y)) score += 60;
              });
            }
          } else {
            if (dmin < 110) continue;
            if (isCustom && live.length && !onSide(x, y)) score += 1000;
            score += Math.abs(dmin - 150);
            score -= 0.35 * fromWeb(x, y);
          }
          if (isCustom && uiBlocked(x, y)) score += 400;
          segs.forEach((sg) => { if (segDist(p, sg[0], sg[1]) < 24) score += 60; });
          if (score < bestScore) { bestScore = score; best = p; }
        }
      }
      const spot = best || { x: 500, y: 320 };
      const id = 'n' + Date.now().toString(36);
      const tagList = (fm.tags || '').split(',').map((x) => x.trim().replace(/^#/, '')).filter(Boolean);
      const task = {
        id: id, cat: fm.cat, title: fm.title.trim(),
        due: validDate(fm.date) ? fm.date + 'T' + (validTime(fm.time) ? fm.time : '17:00') : null,
        repeat: fm.repeat && fm.repeat !== 'never' ? fm.repeat : null,
        imp: !!fm.imp, x: Math.round(spot.x), y: Math.round(spot.y), rot: fm.imp ? Math.round(Math.random() * 12 - 6) : 0,
        loc: (fm.loc || '').trim() || null,
        tags: tagList.length ? tagList : ['new'],
        desc: (fm.desc || '').trim() || 'No description yet.',
        fresh: true
      };
      const near = pickLinks({ x: task.x, y: task.y }).map((n) => [task.id, n.id]);
      let customCats = this.state.customCats || [];
      const cc = customCats.find((c) => c.key === fm.cat);
      if (cc && !cc.placed) {
        const nb = {};
        near.forEach((pr) => { const t = live.find((x) => x.id === pr[1]); if (t && t.cat !== fm.cat) nb[t.cat] = true; });
        live.forEach((t) => { if (t.cat !== fm.cat && Math.hypot(t.x - task.x, t.y - task.y) < 240) nb[t.cat] = true; });
        const used = Object.keys(nb).map((k) => this.stitchFor(k));
        let pick = cc.stitch || 'running';
        if (used.indexOf(pick) !== -1) {
          const all4 = ['running', 'back', 'zigzag', 'chain', 'wave', 'seed'];
          const free = all4.filter((x) => used.indexOf(x) === -1);
          if (free.length) pick = free[0];
          else pick = all4.slice().sort((x, y) => used.filter((u) => u === x).length - used.filter((u) => u === y).length)[0];
        }
        customCats = customCats.map((c) => c.key === fm.cat ? Object.assign({}, c, { stitch: pick, placed: true }) : c);
      }
      this.setState({
        customCats: customCats,
        added: (this.state.added || []).concat([task]),
        addedLinks: (this.state.addedLinks || []).concat(near),
        hidden: Object.assign({}, this.state.hidden, { [fm.cat]: false }),
        form: null,
        sel: id,
        sewing: id
      });
      clearTimeout(this._sewT);
      this._sewT = setTimeout(() => this.setState({ sewing: null }), 950);
      setTimeout(() => this.fitIfOverflow(), 80);
      this.sfx('sew', { delay: 0.05 });
    };

    return {
      cats: cats,
      soon: soon,
      nodes: nodes,
      edges: edges,
      b: b,
      hasBubble: !!selTask,
      emptyStates: emptyStates,
      groups: groups,
      openCount: all.length,
      drawerX: s.listOpen ? '0px' : '100%',
      drawerVis: s.listOpen ? 'visible' : 'hidden',
      drawerPe: s.listOpen ? 'auto' : 'none',
      drawerTr: s.listOpen ? 'box-shadow .3s ease, visibility 0s linear 0s' : 'box-shadow .3s ease, visibility 0s linear .5s',
      _sync: (s.listOpen && typeof setTimeout !== 'undefined' && this._listEl) ? (setTimeout(() => this.syncList(), 0), '') : '',
      drawerShadow: s.listOpen ? '-14px 14px 36px rgba(92,62,40,0.16)' : 'none',
      listExpanded: s.listOpen ? 'true' : 'false',
      listLabel: s.listOpen ? 'Close task list' : 'Open task list',
      toggleList: () => { this.setState({ listOpen: !this.state.listOpen }); setTimeout(() => this.syncList(), 30); },
      listRef: (el) => { if (el) { this._listEl = el; setTimeout(() => this.syncList(), 0); } },
      trackRef: (el) => { if (el) this._trackEl = el; },
      thumbRef: (el) => { if (el) this._thumbEl = el; },
      listScroll: () => this.syncList(),
      thumbDown: (e) => {
        const el = this._listEl, tr = this._trackEl, th = this._thumbEl;
        if (!el || !tr || !th || typeof window === 'undefined') return;
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        const startY = e.clientY, startTop = el.scrollTop;
        const ratio = (el.scrollHeight - el.clientHeight) / Math.max(1, tr.clientHeight - th.offsetHeight);
        const mv = (ev) => { el.scrollTop = startTop + (ev.clientY - startY) * ratio; };
        const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); th.classList.remove('drag'); };
        th.classList.add('drag');
        window.addEventListener('pointermove', mv);
        window.addEventListener('pointerup', up);
      },
      trackDown: (e) => {
        const el = this._listEl, tr = this._trackEl, th = this._thumbEl;
        if (!el || !tr || (th && th.contains(e.target))) return;
        const r = tr.getBoundingClientRect();
        const f = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
        el.scrollTo({ top: f * (el.scrollHeight - el.clientHeight), behavior: 'smooth' });
      },
      namesPressed: s.names ? 'true' : 'false',
      namesLabel: s.names ? 'Hide all tasks' : 'Show all tasks',
      namesBg: s.names ? (pal.soundDark || pal.inv) : pal.menu,
      namesFg: s.names ? (pal.soundLight || pal.invfg) : pal.ink,
      namesBorder: s.names ? (pal.soundDark ? 'rgba(245,230,211,0.3)' : pal.inv) : pal.border,
      toggleNames: () => this.setState({ names: !this.state.names }),
      soundPressed: s.sound !== false ? 'true' : 'false',
      soundBg: s.sound !== false ? (pal.soundOn || pal.soundDark || '#1F1915') : (pal.soundLight || '#FFFFFF'),
      soundFg: s.sound !== false ? (pal.soundOnFg || pal.soundLight || '#FFFFFF') : (pal.soundDark || '#1F1915'),
      soundBorder: s.sound !== false ? (pal.soundOn ? 'rgba(43,28,18,0.35)' : 'rgba(245,230,211,0.3)') : (pal.soundDark || '#1F1915'),
      soundStitch: s.sound !== false ? (pal.soundOn ? 'rgba(43,28,18,0.4)' : 'rgba(245,230,211,0.3)') : 'rgba(20,8,1,0.35)',
      soundLabel: s.sound !== false ? 'Sounds on' : 'Sounds off',
      soundWaves: s.sound !== false ? 'M12.5 6.5a3.5 3.5 0 0 1 0 5M14.5 4.5a6.5 6.5 0 0 1 0 9' : 'M12.5 7l4 4M16.5 7l-4 4',
      toggleSound: () => { const on = this.state.sound === false; this.setState({ sound: on }); if (on) setTimeout(() => this.sfx('tock'), 0); },
      keyOpen: !!s.keyOpen,
      keyExpanded: s.keyOpen ? 'true' : 'false',
      toggleKey: () => this.setState({ keyOpen: !this.state.keyOpen, catForm: null, urgentOpen: false }),
      keyColor: pal.ink3,
      btnTriD: 'M20 3.5C21.6 3.5 22.7 4.3 23.6 5.8L37.2 30.2C38.6 32.7 37.2 35.5 34.2 35.5L5.8 35.5C2.8 35.5 1.4 32.7 2.8 30.2L16.4 5.8C17.3 4.3 18.4 3.5 20 3.5Z',
      catFormOpen: !!s.catForm,
      catFormExpanded: s.catForm ? 'true' : 'false',
      openCatForm: () => {
        if (this.state.catForm) { this.setState({ catForm: null }); return; }
        const used = (this.state.customCats || []).map((c) => c.base);
        const cols = this.customColors();
        let ci = cols.findIndex((c) => used.indexOf(c[0]) === -1);
        if (ci < 0) ci = 0;
        this.setState({ catForm: { name: '', color: ci, err: '' }, form: null, urgentOpen: false });
      },
      catForm: catFormVals,
      todayDay: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      todayDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      tex: this.texVals(s),
      zoom: { k: s.zoom.k, x: Math.round(s.zoom.x), y: Math.round(s.zoom.y), tr: (s.dragging || s.wheeling) ? 'none' : (s.autoFit ? 'transform 1.1s cubic-bezier(.3,.7,.2,1)' : 'transform .3s cubic-bezier(.2,.8,.2,1)'), cursor: s.dragging ? 'grabbing' : 'grab', wc: (s.dragging || s.wheeling || this.pinch) ? 'transform' : 'auto' },
      zoomPct: Math.round(s.zoom.k * 100),
      zoomLabel: Math.round(s.zoom.k * 100) + '%',
      zoomFill: Math.round((s.zoom.k - 0.5) / 2 * 1000) / 10,
      pinsOpen: !!s.pinsOpen,
      pinsExpanded: s.pinsOpen ? 'true' : 'false',
      pinsChevron: s.pinsOpen ? '180deg' : '0deg',
      togglePins: () => this.setState({ pinsOpen: !this.state.pinsOpen, keyOpen: false, urgentOpen: false }),
      pins: [
        { label: 'New task', color: C.domestic.color, delay: '0s', pick: () => this.setState({ pinsOpen: false, form: { title: '', cat: 'school', imp: true, date: '', time: '17:00', loc: '', desc: '', tags: '', tried: false }, listOpen: false }) },
        { label: 'New category', color: C.work.color, delay: '0.06s', pick: () => {
          const used = (this.state.customCats || []).map((c) => c.base);
          const cols = this.customColors();
          let ci = cols.findIndex((c) => used.indexOf(c[0]) === -1);
          if (ci < 0) ci = 0;
          this.setState({ pinsOpen: false, catForm: { name: '', color: ci, err: '' }, form: null, urgentOpen: false });
        } },
        { label: s.names ? 'Hide all tasks' : 'Show all tasks', color: C.health.color, delay: '0.12s', pick: () => this.setState({ pinsOpen: false, names: !this.state.names }) }
      ],
      stitchKey: order.map((k) => {
        const st = stitchOf(k);
        const sm = this.stitchSample(st);
        return { name: C[k].name, color: C[k].color, d: sm.d, dash: sm.dash, stitch: sm.name };
      }),
      zoomIn: () => this.setZoom(this.state.zoom.k + 0.25),
      zoomOut: () => this.setZoom(this.state.zoom.k - 0.25),
      zoomSlide: (e) => {
        const v = Number(e && e.target ? e.target.value : e);
        if (isNaN(v)) return;
        const prev = Math.round(this.state.zoom.k * 100);
        if (v !== prev) {
          const now = Date.now();
          if (!this._tapeAt || now - this._tapeAt > 26) { this._tapeAt = now; this.sfx('tape', { up: v > prev }); }
        }
        this.setZoom(v / 100);
      },
      zoomReset: () => this.setState({ zoom: { k: 1, x: 0, y: 0 }, dragging: false }),
      vpRef: (el) => {
        if (!el || el === this.vpEl) return;
        this.vpEl = el;
        // measure only when the size actually changes (reading sizes every render forces extra layout)
        const measure = () => {
          const w = el.clientWidth, h = el.clientHeight, l = el.offsetLeft, t = el.offsetTop;
          const m = this.mainEl, mw = m ? m.clientWidth : 1440, mh = m ? m.clientHeight : 900;
          if (w !== this.vpW || h !== this.vpH || l !== this.vpL || t !== this.vpT || mw !== this.mainW || mh !== this.mainH) {
            this.vpW = w; this.vpH = h; this.vpL = l; this.vpT = t; this.mainW = mw; this.mainH = mh;
            this.forceUpdate();
          }
        };
        measure();
        if (typeof ResizeObserver !== 'undefined') { this._ro = new ResizeObserver(measure); this._ro.observe(el); if (this.mainEl) this._ro.observe(this.mainEl); }
        else if (typeof window !== 'undefined') window.addEventListener('resize', measure);
      },
      needleRef: (el) => { if (el) this.needleEl = el; },
      trailRef: (el) => { if (el) this.trailEl = el; },
      needleHide: () => { if (this.needleEl) this.needleEl.style.opacity = '0'; },
      trailColor: C.domestic ? C.domestic.color : pal.ink,
      rootRef: (el) => {
        if (!el || el._clickBound) return;
        el._clickBound = true;
        if (typeof window !== 'undefined') window.addEventListener('resize', () => this.forceUpdate());
        const tick = () => {
          const now = new Date();
          const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
          clearTimeout(this._dayT);
          this._dayT = setTimeout(() => { this.forceUpdate(); tick(); }, Math.min(next - now, 3600000));
        };
        tick();
        if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (!document.hidden) this.forceUpdate(); });
        try { this._touch = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(hover: none)').matches; } catch (e) { this._touch = false; }
        const setMode = (touch) => {
          if (this._touch === touch) return;
          this._touch = touch;
          this._lastSel = undefined;
          if (touch && this.state.hover) this.setState({ hover: null });
          this.kick();
        };
        el.addEventListener('pointerdown', (ev) => setMode(ev.pointerType === 'touch' || ev.pointerType === 'pen'), true);
        el.addEventListener('pointermove', (ev) => { if (ev.pointerType === 'mouse' && this._touch && (Math.abs(ev.movementX) + Math.abs(ev.movementY) > 0)) setMode(false); }, true);
        // Drawn needle cursor: an image that follows the pointer, so no browser or host
        // cursor rule can swap it back to the arrow (e.g. over the task list).
        const NEEDLE_CURSOR = false; // needle cursor turned off for now; set to true to bring it back
        if (NEEDLE_CURSOR && typeof document !== 'undefined' && document.body && !document.getElementById('weave-needle')) {
          const SRC = 'assets/needle.png', SRC_DOWN = 'assets/needle-click.png';
          const cur = document.createElement('img');
          cur.id = 'weave-needle';
          cur.alt = '';
          cur.setAttribute('aria-hidden', 'true');
          cur.style.cssText = 'position:fixed;left:0;top:0;width:32px;height:32px;pointer-events:none;z-index:2147483647;display:none;will-change:transform;user-select:none;filter:drop-shadow(0 0 0.7px #fff) drop-shadow(0 0 0.7px #fff) drop-shadow(0 0 0.5px #fff) drop-shadow(0 1.5px 1.5px rgba(0,0,0,0.6))';
          const pre = new Image(); pre.src = SRC_DOWN;
          let down = false, ready = false, x = -100, y = -100;
          const isText = (t) => !!t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && /^(text|search|email|url|number|)$/i.test(t.type || '')));
          const place = () => {
            const hx = down ? 4 : 2, hy = down ? 28 : 30;
            cur.style.transform = 'translate(' + (x - hx) + 'px,' + (y - hy) + 'px)';
          };
          cur.onload = () => {
            if (ready) return;
            ready = true;
            document.documentElement.classList.add('softcursor');
          };
          cur.src = SRC;
          document.body.appendChild(cur);
          const move = (ev) => {
            x = ev.clientX; y = ev.clientY;
            cur.style.display = ready && !isText(ev.target) ? 'block' : 'none';
            place();
          };
          document.addEventListener('pointermove', move, true);
          document.addEventListener('pointerover', move, true);
          document.addEventListener('pointerdown', (ev) => { down = true; cur.src = SRC_DOWN; move(ev); }, true);
          document.addEventListener('pointerup', (ev) => { down = false; cur.src = SRC; move(ev); }, true);
          document.addEventListener('pointercancel', () => { down = false; cur.src = SRC; }, true);
          document.documentElement.addEventListener('pointerleave', () => { cur.style.display = 'none'; });
          if (typeof window !== 'undefined') window.addEventListener('blur', () => { cur.style.display = 'none'; });
        }
        el.addEventListener('click', (ev) => {
          const b = ev.target && ev.target.closest ? ev.target.closest('button, [role="button"], label.pill') : null;
          if (!b || b.disabled || b.classList.contains('node')) return;
          this.sfx('click');
        }, true);
      },
      texRef: (el) => { this._tx = el; if (el) this.bakeFabric(el); },
      zoomLayerRef: (el) => { this._zl = el; },
      bubbleRef: (el) => { this._bb = el; },
      rangeRef: (el) => { this._rg = el; },
      pctRef: (el) => { this._pc = el; },
      mainRef: (el) => {
        if (el) this.mainEl = el;
        if (el && this._ro && !el._roObs) { el._roObs = true; this._ro.observe(el); }
        if (el && !el._wheelBound) {
          el._wheelBound = true;
          el.addEventListener('wheel', (ev) => this.onWheel(ev), { passive: false });
          el.addEventListener('touchstart', (ev) => this.onTouch(ev, 'start'), { passive: false });
          el.addEventListener('touchmove', (ev) => this.onTouch(ev, 'move'), { passive: false });
          el.addEventListener('touchend', (ev) => this.onTouch(ev, 'end'));
          el.addEventListener('touchcancel', (ev) => this.onTouch(ev, 'end'));
        }
      },
      panDown: (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        const tg = e.target;
        if (tg && tg.closest && tg.closest('button, input, textarea, select, a, [role="dialog"], [role="group"], [role="status"]')) return;
        const z = this.state.zoom;
        this.drag = { sx: e.clientX, sy: e.clientY, x0: z.x, y0: z.y, moved: false };
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { }
        this.setState({ dragging: true });
      },
      panMove: (e) => {
        if (!this.drag) return;
        const z = this._live || this.state.zoom;
        if (Math.abs(e.clientX - this.drag.sx) + Math.abs(e.clientY - this.drag.sy) > 4) this.drag.moved = true;
        if (!this.drag.moved) return;
        const p = this.clampPan(z.k, this.drag.x0 + e.clientX - this.drag.sx, this.drag.y0 + e.clientY - this.drag.sy);
        this.liveZoom({ k: z.k, x: p.x, y: p.y });
      },
      panUp: () => {
        if (!this.drag || this.pinch) return;
        const tapped = !this.drag.moved;
        this.drag = null;
        if (tapped) this.commitZoom({ dragging: false, sel: null, iconsFor: null, urgentOpen: false, catForm: null, keyOpen: false, pinsOpen: false });
        else this.commitZoom({ dragging: false });
      },
      hasUrgent: urgentList.length > 0,
      urgentLabel: urgentList.length + ' due by tomorrow',
      urgentBorder: pal.urgentBg ? 'rgba(255,246,238,0.35)' : (s.urgentOpen ? pal.warn : pal.warnLine),
      urgentBg: pal.urgentBg || pal.warn,
      urgentFg: pal.urgentFg || '#FFFFFF',
      urgentRing: pal.urgentBg ? 'rgba(255,240,225,0.28)' : 'rgba(255,255,255,0.35)',
      urgentIcon: pal.iconOn || '#FFFFFF',
      urgentAvatars: urgentList.slice(0, 3).map((t, i) => ({ color: C[t.cat].color, tint: C[t.cat].tint, dark: C[t.cat].dark, iconD: ICONS[this.iconFor(t)].d, z: 3 - i })),
      urgentNext: urgentNext ? urgentNext.title : '',
      urgentAria: urgentList.length + (urgentList.length === 1 ? ' task' : ' tasks') + ' due by tomorrow. Show list',
      urgentPick: () => { if (urgentNext) this.focusTask(urgentNext); },
      urgentOpen: !!s.urgentOpen,
      urgentExpanded: s.urgentOpen ? 'true' : 'false',
      urgentChevron: s.urgentOpen ? '180deg' : '0deg',
      urgentToggle: () => this.setState({ urgentOpen: !this.state.urgentOpen }),
      urgentItems: urgentList.map((t) => {
        const c = C[t.cat];
        return {
          title: t.title, color: c.color, tint: c.tint, dark: c.dark,
          iconD: ICONS[this.iconFor(t)].d,
          sub: c.name + ' · ' + (t.imp ? 'Important' : 'Routine') + ' · ' + t.dueDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          rel: relOf(t.days),
          pick: () => this.focusTask(t, { urgentOpen: false })
        };
      }),
      nightChecked: s.night ? 'true' : 'false',
      knobX: s.night ? '40px' : '0px',
      sunColor: s.night ? pal.ink3 : pal.ink,
      moonColor: s.night ? pal.ink : pal.ink3,
      toggleNight: () => this.setState({ night: !this.state.night }),
      pal: pal,
      formOpen: !!f,
      nf: nf,
      openForm: () => this.setState({ form: Object.assign({}, FORM0), listOpen: false }),
      closeForm: () => this.setState({ form: null }),
      addTask: addTask,
      toastColor: (() => { const lt = this.allTasks().find((t) => t.id === s.lastDone); const cc = lt ? this.cats()[lt.cat] : null; return cc ? cc.color : pal.ink; })(),
      toastFg: pal.iconOn || pal.onColor,
      toastBg: pal.raised || pal.inv,
      newBg: pal.newBg || '#3b2a20',
      newFg: pal.newFg || '#FFFFFF',
      newStitch: pal.newStitch || 'rgba(255,255,255,0.4)',
      hasToast: !!lastTask && !!s.done[s.lastDone],
      toastTitle: lastTask ? lastTask.title + (s.lastClone && (s.added || []).find((t) => t.id === s.lastClone) ? ' · next one sewn on for ' + new Date((s.added || []).find((t) => t.id === s.lastClone).due).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '') : '',
      close: () => this.setState({ sel: null }),
      done: () => {
        if (!selTask) return;
        markDone(selTask.id);
      },
      snooze: () => {
        if (!selTask) return;
        this.setState({ snooze: Object.assign({}, s.snooze, { [selTask.id]: (s.snooze[selTask.id] || 0) + 1 }) });
      },
      undo: () => {
        if (!s.lastDone) return;
        const id = s.lastDone;
        const next = Object.assign({}, s.done);
        delete next[id];
        const cid = s.lastClone;
        const added = cid ? (s.added || []).filter((t) => t.id !== cid) : s.added;
        const addedLinks = cid ? (s.addedLinks || []).filter((l) => l[0] !== cid && l[1] !== cid) : s.addedLinks;
        this.sfx('sew');
        this.setState({ done: next, sel: id, lastDone: null, lastClone: null, added: added, addedLinks: addedLinks, sewing: id });
        clearTimeout(this._sewT);
        this._sewT = setTimeout(() => this.setState({ sewing: null }), 950);
        setTimeout(() => this.fitIfOverflow(), 80);
      }
    };
  }
}

window.WeaveComponent = Component;

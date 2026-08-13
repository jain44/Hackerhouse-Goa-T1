// Each recognized role/stack maps to its OWN pool of fun builder-class titles.
// A title is picked "randomly" from that role's pool — but the pick is
// deterministically seeded off the name + stack, so a given person always
// sees the same title on refresh, while different people (even with the
// same stack) can land on different titles from that role's pool.

interface RolePool {
  match: RegExp;
  titles: string[];
  color: string;
}

const ROLE_POOLS: RolePool[] = [
  {
    match: /(mern)/,
    titles: ['THE MERN MERCENARY', 'THE MONGO MAGE', 'THE REACT RONIN', 'THE NODE NOMAD', 'THE EXPRESS OUTLAW'],
    color: '#159a72',
  },
  {
    match: /(mean\b)/,
    titles: ['THE ANGULAR ARCHER', 'THE MEAN MACHINE', 'THE NODE NAVIGATOR', 'THE MONGO MARSHAL'],
    color: '#ff1683',
  },
  {
    match: /(full ?stack)/,
    titles: ['THE PRODUCT SHIPPER', 'THE END TO ENDER', 'THE STACK SLAYER', 'THE FULL SEND ENGINEER', 'THE OMNI BUILDER'],
    color: '#ffd31a',
  },
  {
    match: /(ai|ml|machine learning|deep learning)/,
    titles: ['THE MODEL TAMER', 'THE NEURAL NOMAD', 'THE GRADIENT GURU', 'THE PROMPT PALADIN', 'THE TENSOR TITAN'],
    color: '#159a72',
  },
  {
    match: /(cyber|security)/,
    titles: ['THE SYSTEM GUARDIAN', 'THE FIREWALL PHANTOM', 'THE EXPLOIT HUNTER', 'THE ZERO DAY KNIGHT'],
    color: '#ff1683',
  },
  {
    match: /(frontend|front-end|^ui$|^ux$)/,
    titles: ['THE PIXEL ARCHITECT', 'THE LAYOUT LEGEND', 'THE CSS SORCERER', 'THE COMPONENT CRAFTER'],
    color: '#ff1683',
  },
  {
    match: /(backend|back-end|\bapi\b)/,
    titles: ['THE API ALCHEMIST', 'THE ENDPOINT ENFORCER', 'THE SERVER SAGE', 'THE QUERY QUEEN', 'THE ROUTE RONIN'],
    color: '#159a72',
  },
  {
    match: /(devops|infrastructure|cloud|sre)/,
    titles: ['THE DEPLOYMENT WIZARD', 'THE PIPELINE PILOT', 'THE UPTIME KEEPER', 'THE CONTAINER COMMANDER'],
    color: '#159a72',
  },
  {
    match: /(product|\bpm\b|manager)/,
    titles: ['THE IDEA SHIPPER', 'THE ROADMAP RONIN', 'THE SPRINT SHEPHERD', 'THE BACKLOG BOSS'],
    color: '#ffd31a',
  },
  {
    match: /(blockchain|web3|crypto|solidity)/,
    titles: ['THE CHAIN BUILDER', 'THE GAS FEE GHOST', 'THE SMART CONTRACT SAGE', 'THE LEDGER LEGEND'],
    color: '#ffd31a',
  },
  {
    match: /(mobile|ios|android|flutter|react native)/,
    titles: ['THE APP CRAFTER', 'THE GESTURE GENIUS', 'THE VIEWPORT VOYAGER', 'THE NATIVE NOMAD'],
    color: '#ff9f2f',
  },
  {
    match: /(data|analytics|data science)/,
    titles: ['THE DATA WHISPERER', 'THE INSIGHT ENGINE', 'THE DASHBOARD DRUID', 'THE PATTERN PROPHET'],
    color: '#7d68d8',
  },
  {
    match: /(game|unity|unreal)/,
    titles: ['THE WORLD BUILDER', 'THE SHADER SHAMAN', 'THE PHYSICS PIRATE', 'THE LEVEL LORD'],
    color: '#ffd31a',
  },
  {
    match: /(design|figma|graphic)/,
    titles: ['THE DESIGN ALCHEMIST', 'THE PROTOTYPE POET', 'THE GRID GUARDIAN', 'THE VISUAL VOYAGER'],
    color: '#ff1683',
  },
  {
    match: /(embedded|iot|hardware)/,
    titles: ['THE HARDWARE HACKER', 'THE CIRCUIT SORCERER', 'THE SENSOR SMITH', 'THE FIRMWARE FURY'],
    color: '#159a72',
  },
  {
    match: /(rust|\bsystems\b)/,
    titles: ['THE SYSTEMS ARCHITECT', 'THE MEMORY MARSHAL', 'THE BORROW CHECKER BARON', 'THE COMPILER CRUSADER'],
    color: '#ff9f2f',
  },
  {
    match: /(python)/,
    titles: ['THE PYTHON SORCERER', 'THE SCRIPT SHAMAN', 'THE INDENTATION IMPERATOR', 'THE SNAKE CHARMER'],
    color: '#ffd31a',
  },
  {
    match: /(java|spring)/,
    titles: ['THE ENTERPRISE ARCHITECT', 'THE BEAN FACTORY BARON', 'THE VERBOSE VANGUARD', 'THE CLASS COMMANDER'],
    color: '#ff9f2f',
  },
  {
    match: /(\bgo\b|golang)/,
    titles: ['THE CONCURRENCY MASTER', 'THE GOROUTINE GHOST', 'THE CHANNEL CHIEF', 'THE SIMPLICITY SAGE'],
    color: '#159a72',
  },
  {

    match: /(software|developer|engineer|programmer|coder)/,
    titles: ['THE BUILD ARCHITECT', 'THE CODE CRAFTER', 'THE SHIPPER', 'THE LOGIC SMITH', 'THE DEBUG DIVER'],
    color: '#ffd31a',
  },
  {
    match: /(devrel|developer relations|community)/,
    titles: ['THE COMMUNITY CATALYST', 'THE DEV CONNECTOR', 'THE BUILDER BRIDGE', 'THE OPEN SOURCE ORBITER'],
    color: '#ff1683',
  },
  {
    match: /(qa|tester|testing|quality)/,
    titles: ['THE BUG BOUNTY HUNTER', 'THE QUALITY KEEPER', 'THE EDGE CASE EXPLORER', 'THE TESTING TACTICIAN'],
    color: '#ffd31a',
  },
  {
    match: /(database|sql|postgres|mysql|mongodb|mongo)/,
    titles: ['THE DATA ARCHITECT', 'THE QUERY SMITH', 'THE SCHEMA SHAPER', 'THE DATABASE DIVER'],
    color: '#159a72',
  },
  {
    match: /(research|researcher)/,
    titles: ['THE IDEA EXPLORER', 'THE SIGNAL SEEKER', 'THE HYPOTHESIS HACKER', 'THE DISCOVERY ENGINE'],
    color: '#7d68d8',
  },
  {
    match: /(business|analyst|consult)/,
    titles: ['THE PROBLEM SOLVER', 'THE INSIGHT HUNTER', 'THE STRATEGY SMITH', 'THE SIGNAL ANALYST'],
    color: '#ffd31a',
  },
];

const DEFAULT_TITLES = [
  'THE CODE ARTISAN',
  'THE CODE CHEMIST',
  'THE NIGHT KNIGHT',
  'THE BUG SLAYER',
  'THE PIXEL PIRATE',
  'THE CHAOS WIZARD',
  'THE SYNTAX SAMURAI',
  'THE COMMIT CRUSADER',
  'THE STACK SORCERER',
  'THE MERGE MONK',
];

// Small deterministic string hash (djb2) so the "random" pick is stable
// for a given name + stack across re-renders, but varies across people.
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function findPool(stackLower: string): RolePool | null {
  for (const pool of ROLE_POOLS) {
    if (pool.match.test(stackLower)) return pool;
  }
  return null;
}

export function generateBuilderTitle(stack: string, name: string = ''): string {
  if (!stack.trim()) return '';

  const stackLower = stack.toLowerCase();
  const seed = `${name.trim().toLowerCase()}::${stackLower}`;
  const pool = findPool(stackLower);
  const titles = pool ? pool.titles : DEFAULT_TITLES;

  const index = hashString(seed) % titles.length;
  return titles[index];
}

export function getAccentColor(stack: string): string {
  const stackLower = stack.toLowerCase();
  const pool = findPool(stackLower);
  return pool ? pool.color : '#ffd31a';
}

// Returns the full pool of possible titles for a given stack/role — used to
// power the auto-cycling "Builder Class" display.
export function getTitlePool(stack: string): string[] {
  const stackLower = stack.toLowerCase();
  const pool = findPool(stackLower);
  return pool ? pool.titles : DEFAULT_TITLES;
}

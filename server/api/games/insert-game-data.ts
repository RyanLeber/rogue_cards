import { createPool } from '@vercel/postgres'

const relics = [
  {name: "Protection", desc : "prevents first player hp loss"},
  {name: "Frontloaded", desc : "On first turn +2 draw and +1 energy"},
  {name: "Punishment", desc : "add 3 curses to an opponents deck"},
  {name: "Cream of the crop", desc : "choose up to 3 from 5 cards"},
  {name: "Exile", desc : "remove up to 3 cards"},
  {name: "Quick", desc : "+1 draw"},
  {name: "Buff", desc : "+3 Strength"},
  {name: "Healer", desc : "+3 Heal Power"},
  {name: "Endurance", desc : "+1 Energy Capacity"},
  {name: "Oh Shit", desc : "with half hp, +3 Strength, +1 Draw"},
  {name: "Emergency Plan", desc : "with half hp, +3 Heal Power, +1 Energy Capacity"},
  {name: "Body Double", desc : "first unit death is put in discard"},
  {name: "Forethought", desc : "retain 1 card"},
  {name: "Duality", desc : "can play matching dmg and heal cards at the same time"},
  {name: "Feedback Damper", desc : "incoming reverse spell dmg is halved"},
  {name: "Snake Eyes", desc : "if opponent plays double can choose whos deck to add curse too"},
  {name: "Terminate", desc : "remove a card from oppenents deck, can not remove oppenents only trump"},
  {name: "Living on a curse", desc : "At the end of turn Hero heals for 1 hp per curse player has"},
  {name: "Cursed Echo", desc : "if oppenent plays two defensive spells in one turn they get a curse"},
  {name: "Frozen Echo", desc : "if oppenent plays two defensive spells in one turn, apply 1 stack of frozen to them"},
  {name: "Sparking Echo", desc : "if oppenent plays two defensive spells in one turn, exhaust top card on draw pile"},
  {name: "Poison Echo", desc : "if oppenent plays two defensive spells in one turn apply 2 stacks of poison to them"},
  {name: "Horcrux", desc : "permanently convert any number of hero hp to curses"},
  {name: "Minor healing orb", desc : "heal 3 hp to a unit or hero at the start of every turn"},
  {name: "Over Heal", desc : "Player can heal Hero past full hp. Over Healed hp is halved"},
  {name: "Icy aura", desc : "if attacked twice in 1 turn apply 1 stack of frozen to opponent"},
  {name: "Flame aura", desc : "if opponent attacks you twice in one turn exhaust last card they played"},
  {name: "Poisonous Aura", desc : "if opponent attacks you twice in one turn apply 2 stacks of poison to them"},
  {name: "Well-nourished", desc : "+10 max hp"}
]

const trumps = [
  { energy : 1, name: "Curse", desc : "add 2 curse to any players deck"},
  { energy : 1, name: "Time skip", desc : "take an extra turn, both players redraw"},
  { energy : 1, name: "Disable", desc : "exhausy an oppenents card"},
  { energy : 1, name: "Firestarter", desc : "exhaust the last 2 cards played by the opponent"},
  { energy : 3, name: "Wildfire", desc : "exhaust the next 5 cards oppenent plays"},
  { energy : 2, name: "Sacrifice", desc : "kill one of your units, deal 20 dmg"},
  { energy : 1, name: "Muliply", desc : "next card played twice"},
  { energy : 2, name: "AOE", desc : "next card has aoe"},
  { energy : 0, name: "Armor", desc : "apply 5 to unit"},
  { energy : 1, name: "Good armor", desc : "apply 10"},
  { energy : 3, name: "Great armor", desc : "apply 20 armor"},
  { energy : 4, name: "Force field", desc : "apply 20 armor to all"},
  { energy : 1, name: "Spikes", desc : "deal 2 damage back when you take damage"},
  { energy : 0, name: "Gut reaction", desc : "play the top card in draw pile"},
  { energy : 3, name: "Armegeddon", desc : "kill all units"},
  { energy : 0, name: "Tactical suicide", desc : "set your player hp to 0, get 2 upgrades after battle"},
  { energy : 2, name: "Cursed strength: add 2 curse into discard pile strength equals = # of curse in deck while cursed strength is active"},
  { energy : 2, name: "Cursed heal", desc : "add 2 curse into discard pile strength equals = # of curse in deck while cursed heal is active"},
  { energy : 2, name: "Cursed hero", desc : "add 2 curse, get 2 extra hero hp for each curse while cursed hero is active"},
  { energy : 2, name: "Resourceful", desc : "retain all cards"},
  { energy : 2, name: "Revenge", desc : "next hp loss converted to strength"},
  { energy : 1, name: "Cauterize", desc : "heal for nxt dmg"},
  { energy : 0, name: "Reset", desc : "reshuffle discard into draw pile"},
  { energy : 2, name: "Warding", desc : "negates all spells this turn"},
  { energy : 1, name: "Hell strike", desc : "exhaust a card in hand to play it for double damages"},
  { energy : 1, name: "Diversion", desc : "excess dmg hits hero hp instead of another unit"},
  { energy : 1, name: "Sharpen", desc : "gain 3 strength"},
  { energy : 1, name: "Miracle", desc : "gain 3 heal power"},
  { energy : 3, name: "Detonate", desc : "take normal damage of next attack but do triple damage"},
  { energy : 2, name: "Major healing orb", desc : "heal 10 hp to unit or hero at the start of every turn"},
  { energy : 1, name: "Dmg orb", desc : "deal 3 AOE dmg at the start of every turn"},
  { energy : 3, name: "Ice blast", desc : "target gets 5 stacks of frozen"},
  { energy : 3, name: "Poison blast", desc : "inflict 7 stacks of poison"},
  { energy : 1, name: "Mortal blessing", desc : "Allows you to play heals in hand for regular cost to be used as spells for damage blockage"},
  { energy : 1, name: "Snowfall", desc : "next card oppenent plays adds 2 frozen to them"},
  { energy : 1, name: "Poison spike trap", desc : "next card oppenent plays adds 2 poison to them"},
]


const potions = [
  { gold: 10, name : "Antidote", desc : "remove poison stacks"},
  { gold: 10, name : "Grog", desc : "remove frozen stacks"},
  { gold: 10, name : "milk", desc : "remove exhaust stacks"},
  { gold: 10, name : "blood", desc : "heal 10 hp"},
  { gold: 20, name : "fire", desc : "deal 10 dmg"},
  { gold: 10, name : "explosive", desc : "deal 5 AOE dmg"},
  { gold: 10, name : "strength", desc : "gain 3 str"},
  { gold: 10, name : "fortify", desc : "gain 10 armor"},
  { gold: 10, name : "heal power", desc : "gain 3 hp power"},
  { gold: 10, name : "reverse", desc : "like reverse spell"},
  { gold: 10, name : "skip", desc : "like skip spell"},
  { gold: 10, name : "speed", desc : "draw 2 once"},
  { gold: 10, name : "juice", desc : "+1 energy once"},
  { gold: 10, name : "invigorate", desc : "play a trump ability (still costs energy)"},
  { gold: 10, name : "suicide", desc : "kill yourself"}
]

const classes = [
  {
    name : "Young Adventurer",
    health : 20,
    energy : 1,
    draw : 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name : "Quick learner", desc : "Get an extra relic on first upgrade. (Boss) Get another extra relic."},
    trump: {energy: 0, name : "Quick thinking", desc : "draw 3"}
  },
  {
    name: "Priest",
    health: 16,
    energy: 1,
    draw: 3,
    cards: "All 2,3,5. 1 Ace",
    relic: {name: "Salvation", desc: "On death self revive and heal to half hp. (Boss) heal to full hp"},
    trump: {energy: 0, name: "Faith", desc: "+5 Heal Power"}
  },
  {
    name: "Sorcerer",
    health: 15,
    energy: 1,
    draw: 3,
    cards: "All 2,3,6. 1 reverse, 1 skip. 1 Ace",
    relic: {name: "Intuition", desc: "Start with 2 defensive spells played on the board, can retain 1 trump card. (Boss) Start with all defensive spells played"},
    trump: {energy: 0, name: "Channel", desc: "All activated defensive spells are shuffled into draw pile"}
  },
  {
    name: "Demon",
    health: 30,
    energy: 1,
    draw: 3,
    cards: "All 3,6. 4 curses. 1 Ace",
    relic: {name: "Hellborn", desc: "Can play curses for 0 cost. Upon playing a curse, gain 1 energy. All healing is halved. (Boss) Remove healing reduction"},
    trump: {energy: 0, name: "Demon Might", desc: "+3 Strength"}
  },
  {
    name: "Sludge Mass",
    health: 40,
    energy: 1,
    draw: 2,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Toxicity", desc: "upon receiving dmg deal 5 dmg back. (Boss) 10 dmg back"},
    trump: {energy: 0, name: "Split", desc: "sludge mass is split into 2 entities. Each gets one turn. Health and draw are divided amongst them. Each retain original energy."}
  },
  {
    name: "Automaton",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Alloyed Metals", desc: "+2 Resistance. (Boss) +6 Resistance"},
    trump: {energy: 0, name: "Power Cell", desc: "+2 Energy Capacity"}
  },
  {
    name: "Necromancer",
    health: 18,
    energy: 1,
    draw: 3,
    cards: "All 2,4. 2 Black 6, 1 Red 6, 1 Black Jack, 1 Ace",
    relic: {name: "Necromancy", desc: "Wilds do not exhaust and cannot resurrect trump cards. (Boss) Wilds can now resurrect trump cards."},
    trump: {energy: 0, name: "Resurrect", desc: "Resurrect 1 unit"}
  },
  {
    name: "Vampire",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4. 1 Black 6, 2 Red 6, 1 Red Jack",
    relic: {name: "Feed", desc: "Heal 2 hp each time you deal dmg to enemy health. (Boss) Heal 8"},
    trump: {energy: 0, name: "consume", desc: "devour any number of your units on field, add their max hp to yours for the battle. Heal for their max hp."}
  },
  {
    name: "Summoner",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4. 1 Black 6, 1 Red 6. 1 Jack of each color. 1 Ace",
    relic: {name: "Empower", desc: "+1 draw per unit on field. (Boss) +2 draw per unit"},
    trump: {energy: 0, name: "Soul Blast", desc: "Deal 5 AOE dmg per unit you have on the field"}
  },
  {
    name: "Lord",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4. 1 Black 6, 1 Red 6. 1 Jack of each color, 1 Ace",
    relic: {name: "Bannermen", desc: "1 Red and 1 Black Jack start played. (Boss) all jacks start played"},
    trump: {energy: 0, name: "Rousing speech", desc: "restore 5 hp to all units and hero"}
  },
  {
    name: "Hardened Warrior",
    health: 15,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Faithful armor", desc: "Start with 15 armor. (Boss) 30 armor"},
    trump: {energy: 0, name: "Rage", desc: "When hero loses hp gain +1 strength"}
  },
  {
    name: "Treekyn",
    health: 50,
    energy: 0,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Growth", desc: "At start of turn accumulate +1 draw. At end of turn heal 1 hp per of card in hand. Retain 1 trump card. (Boss) heal for 2 hp per card in hand"},
    trump: {energy: 0, name: "Mobilize", desc: "Disable growth, lose half of remaining hp. Gain energy = 1/3 cards in hand for the rest of battle"}
  },
  {
    name: "Shadowthief",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Remain Hidden", desc: "Can not be attacked until the hero plays a card. (Boss) can play trump cards and remain hidden"},
    trump: {energy: 0, name: "Pickpocket", desc: "Take card from opponents discard pile for the rest of battle. opponent may not look."}
  },
  {
    name: "Cursed Armor",
    health: 0,
    energy: 1,
    draw: 3,
    cards: "All 6. 1 Black 2. 1 Black 4. 4 Curses. 1 Ace",
    relic: {name: "Sentient Steel", desc: "Start with 50 armor. Upon receiving dmg, choose to add 1 curse to your own deck. Hp = 1/4 of total curses in discard pile. (Boss) add 2 curses at once."},
    trump: {energy: 0, name: "Fabricate Armor", desc: "Exhaust all curses in deck, gain 1 armor for each."}
  },
  {
    name: "Flesh Monster",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Compile Flesh", desc: "Upon getting a kill +5 Max hp and +5 Heal Power. (Boss) +10 Max hp"},
    trump: {energy: 0, name: "Flesh Rocket", desc: "convert stat boosts from compile flesh into dmg for a single attack"}
  },
  {
    name: "Psycho Freak",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "2,4,6. 1 Ace",
    relic: {name: "Murder Boner", desc: "Upon getting a kill gain 1 energy. (Boss) and 1 draw"},
    trump: {energy: 0, name: "Murderize", desc: "Quarter current hp, gain 10 strength for the that turn"}
  },
  {
    name: "Archer",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "2,4,6. 1 Ace",
    relic: {name: "True Shot", desc: "If you attack the foe whom you attacked last, +1 dmg. (Boss) +2 dmg"},
    trump: {energy: 0, name: "Crippling Shot", desc: "Next attack causes opponent to lose 4 Strength"}
  },
  {
    name: "Hellbat",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "2,4,6. 1 Ace",
    relic: {name: "Flight", desc: "Player Rolls a dice, if its a 1 or 3; dmg taken is halved and roll again. If a 1 is rolled no dmg is taken. (Boss) If the first rolls is a 1, no dmg is taken"},
    trump: {energy: 0, name: "Screech", desc: "Disable an opponents next trump card. Opponent must play a trump card to remove debuff, disabled trump card will not exhaust."}
  },
  {
    name: "Monk",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Collected Mind", desc: "Scry 2 at start of turn, after hand has been drawn. (Boss) scry 4. Note: Scry allows player to view top cards in draw pile."},
    trump: {energy: 0, name: "Balancing Act", desc: "Target loses 4 Heal Power"}
  },
  {
    name: "Ice Wraith",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Encased in ice", desc: "Player starts with 10 armor. Upon breaking armor apply 2 Frozen. (Boss) 20 armor, apply 4 Frozen"},
    trump: {energy: 0, name: "Ice beam", desc: "+1 stack of Frozen to target. Frozen decrease at end of targets turn. For each stack -1 draw."}
  },
  {
    name: "Pyromancer",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Flame Siphon", desc: "For every 2 cards in exhaust pile gain +1 Strength. (Boss) +2 Strength"},
    trump: {energy: 0, name: "Engulf", desc: "exhaust top 3 cards in opponents draw pile"}
  },
  {
    name: "Poison Lurker",
    health: 20,
    energy: 1,
    draw: 3,
    cards: "All 2,4,6. 1 Ace",
    relic: {name: "Poison Cloud", desc: "At the start of battle afflict all opponents with 3 stacks of Poison. (Boss) 6 stacks of Poison"},
    trump: {energy: 0, name: "Weapon Coating", desc: "Each attack this turn applies 2 stacks of poison"}
  }
]




export default defineEventHandler(async () => {
  const db = createPool({connectionString: process.env.POSTGRES_URL_NO_SSL}); 
  const client = await db.connect()

  try {
    for (const relic of relics) {
      await client.sql`INSERT INTO game_relics (relic_name, relic_description) VALUES (${relic.name}, ${relic.desc})`
    }
    for (const card of trumps) {
      await client.sql`INSERT INTO game_trump_cards (trump_name, trump_description, energy) VALUES (${card.name}, ${card.desc}, ${card.energy})`
    }
    for (const p of potions) {
      await client.sql`INSERT INTO game_potions (potion_name, potion_description, gold) VALUES (${p.name}, ${p.desc}, ${p.gold})`
    }
    for (const hero of classes) {
      await client.sql`INSERT INTO game_classes 
      (name, health, energy, draw, cards, relic, trump) 
      VALUES (${hero.name}, ${hero.health}, ${hero.energy},${hero.draw}, ${hero.cards}, ${JSON.stringify(hero.relic)}, ${JSON.stringify(hero.trump)})`
    }
    return {message : "Seeding Successful"}
  } catch (error) {
    console.error(error);
    // Properly format the error response
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error'});
  } finally {
    client.release()
  }
});

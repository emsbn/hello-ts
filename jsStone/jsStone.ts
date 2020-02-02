interface Card {
  att: number;
  hp: number;
  mine: boolean;
  field: boolean;
  cost?: number;
  hero?: boolean;
}
class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: true;
  public mine: boolean;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}

class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean) {
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}

interface Player {
  hero: HTMLDivElement;
  deck: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Sub[];
  heroData?: Hero | null;
  fieldData: Sub[];
  chosenCard?: HTMLDivElement | null;
  chosenCardData?: Card | null;
}

const opponent: Player = {
  hero: document.getElementById("rival-hero") as HTMLDivElement,
  deck: document.getElementById("rival-deck") as HTMLDivElement,
  field: document.getElementById("rival-cards") as HTMLDivElement,
  cost: document.getElementById("rival-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const me: Player = {
  hero: document.getElementById("my-hero") as HTMLDivElement,
  deck: document.getElementById("my-deck") as HTMLDivElement,
  field: document.getElementById("my-cards") as HTMLDivElement,
  cost: document.getElementById("my-cost") as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null
};

const turnButton = document.getElementById("turn-btn") as HTMLButtonElement;
let turn = true; // true면 내 턴, false면 상대 턴

function initiate() {
  [opponent, me].forEach(item => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });

  // createDeck({mine: false, count: 5});
  // createDeck();
  createHero({ mine: false });
  createHero({ mine: true });
  redrawScreen({ mine: true });
  redrawScreen({ mine: false });
}

function createDeck({ mine, count }: { mine: boolean; count: number }) {}

function createHero({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}

interface A {
  data: Card;
  DOM: HTMLDivElement;
  hero?: boolean;
}
function connectCardDOM({ data, DOM, hero = false }: A) {
  const cardEl = document
    .querySelector(".card-hidden .card")!
    .cloneNode(true) as HTMLDivElement;
  cardEl.querySelector(".card-att")!.textContent = String(data.att);
  cardEl.querySelector(".card-hp")!.textContent = String(data.hp);

  if (hero) {
    (cardEl.querySelector(".card-cost") as HTMLDivElement).style.display =
      "none";
    const name = document.createElement("div");
    name.textContent = "영웅";
    cardEl.appendChild(name);
  }
  DOM.appendChild(cardEl);
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawHero(target: Player) {
  if (!target.heroData) {
    throw new Error("heroData가 없습니다.");
  }
  target.hero.innerHTML = "";
  connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}

function btnLink(type) {
  switch(type) {
    case 1:
      return window.location.href = window.location.origin
    case 2:
      return window.location.href = window.location.origin+'/discord'
    case 3:
      return window.location.href = 'https://discord.com/oauth2/authorize?client_id=470180228908449792&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FzG83r6M&scope=bot'
  }
}

function btnActive(el) {
  let arrow = document.getElementById('btn-box-'+el.dataset.id);
  arrow.style.color = 'rgba(255,255,255,0.8)';
  el.style.color = 'white';
  arrow.style.animation = 'btn-glow 2s linear infinite alternate'
}

function btnDeactive(el) {
  let arrow = document.getElementById('btn-box-'+el.dataset.id);
  arrow.style.color = 'transparent';
  el.style.color = 'rgba(255,255,255,0.5)';
  arrow.style.animation = 'none'
}

const facts = [
  "Many oranges are actually green.",
  "The King of Hearts is the only king in a deck of cards without a mustache.",
  "It's possible to turn peanut butter into diamonds.",
  "Apple seeds contain cyanide.",
  "The real name of Monopoly mascot Uncle Pennybags is Milburn Pennybags.",
  "The infinity sign is called a lemniscate.",
  "The inventor of Pringles is buried in a Pringles can.",
  "Dr. Seuss invented the word \"nerd.\"",
  "There's a city called \"Rome\" on every continent except Antarctica",
  "Octopuses and squid have three hearts.",
  "Ketchup was used medicinally in the early 1800s.",
  "Movie trailers got their name because they were originally shown after the movie.",
  "Ravens know when someone is spying on them.",
  "The U.S. Air Force introduced Bob Ross to painting.",
  "In old Christian art, good angels were red and Satan was blue.",
  "There is a metallic asteroid shaped like a dog bone named \"Kleopatra.\"",
  "A British teen changed his name to \"Captain Fantastic Faster Than Superman Spiderman Batman Wolverine Hulk And The Flash Combined.\"",
  "A paper cannot be folded in half more than 9 times.",
  "The majority of dust in your home consists of your own dead skin.",
  "A duck's quack will not have echos,the reason til now is unknown.",
  "Coke was originally green in colour.",
  "Thomas Edison is afraid of the dark. (So that's why he invented the lightbulb)",
  "It is impossible to sneeze with your eyes open.",
  "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra's \"Its A Wonderful Life\"",
  "Humans and bananas share about 50 percent of the same DNA.",
  "A Human has fewer chromosomes than a potato."
];

window.addEventListener('mousemove', e => {
  let x = e.clientX,
  y = e.clientY;
  document.getElementById('darken').style.background = "radial-gradient(circle at "+x+"px "+y+"px ,transparent, rgba(50,50,50,0.5) 30%)"
});

setInterval(() => {
  if(Math.random() > 0.4) return;
  let BGstyle = document.getElementById('darken').style.background;
  document.getElementById('darken').style.background = 'rgba(50,50,50,0.5)'
  setTimeout(() => {
    if(document.getElementById('darken').style.background.startsWith('rgba'))
      document.getElementById('darken').style.background = BGstyle
  }, Math.random() * (100 - 10) + 10)
}, 500);

document.getElementById('fact').innerHTML = facts[Math.floor(Math.random() * facts.length)]

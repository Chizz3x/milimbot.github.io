const defImages = [
  'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
  'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png',
  'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png',
  'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
  'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png'
];

let frag = new URLSearchParams(window.location.hash.slice(1));
let img = document.getElementById('profile-image'),
username = document.getElementById('profile-username'),
discr = document.getElementById('profile-discr');
if(frag.has('access_token')) {
  console.log("Logged-in");

  fetch('https://discordapp.com/api/users/@me', {
    headers: {
			authorization: `${frag.get('token_type')} ${frag.get('access_token')}`
		}
  })
  .then(resp => resp.json())
  .then(res => {
    img.classList.add('logged-in');
    console.log(res)
  })
  .catch(console.error)
} else {
  console.log("Not logged-in");
  img.src = defImages[Math.floor(Math.random() * defImages.length)];
  username.innerHTML = 'Guest'; /* max 15 letters */
  discr.innerHTML = '#0000'
}

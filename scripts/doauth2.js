const defImages = [
  'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
  'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png',
  'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png',
  'https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png',
  'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png'
];

let frag = new URLSearchParams(window.location.hash.slice(1));
let img = document.getElementById('profile-image'),
imgText = document.getElementById('profile-image-text');

if((frag.has('access_token') || !!localStorage.oauth2_access_token) && (frag.has('token_type') || !!localStorage.oauth2_token_type)) {
  let token = frag.has('access_token') ? frag.get('access_token') : localStorage.oauth2.access_token,
  tokenType = frag.has('token_type') ? frag.get('token_type') : localStorage.oauth2.token_type;

  window.history.pushState("object or string", "Title", "/");
  let username = document.getElementById('profile-username'),
  discr = document.getElementById('profile-discr'),
  box = document.getElementById('profile-box');

  console.log("Logged-in");

  fetch('https://discordapp.com/api/users/@me', {
    headers: {
			authorization: `${tokenType} ${token}`
		}
  })
  .then(resp => resp.json())
  .then(res => {
    if(res.hasOwnProperty('code')) {
      console.log("Token expired : not logged-in");
      localStorage.removeItem('oauth2_access_token');
      localStorage.removeItem('oauth2_token_type');
      img.src = defImages[Math.floor(Math.random() * defImages.length)];
    } else {
      img.classList.add('logged-in');

      if(!localStorage.oauth2_access_token) localStorage.oauth2_access_token = token;
      if(!localStorage.oauth2_token_type) localStorage.oauth2_token_type = tokenType;

      imgText.innerHTML = "";
      img.src = `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.webp?size=2048`;
      username.innerHTML = res.username.length > 13 ? res.username.slice(0, -(res.username - 13)) + '...' : res.username;
      discr.innerHTML = '#'+res.discriminator;
      box.style['border-right'] = 'solid 5px #39cc48';
    }
  })
  .catch(console.error)
} else {
  console.log("Not logged-in");
  img.src = defImages[Math.floor(Math.random() * defImages.length)];
}

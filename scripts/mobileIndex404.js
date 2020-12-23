function btnLink(type) {
  switch(type) {
    case 1:
      return window.location.href = 'https://discord.com/oauth2/authorize?client_id=470180228908449792&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FzG83r6M&scope=bot'
    case 2:
      return window.location.href = window.location.origin+'/discord'
    case 3:
      return window.location.href = window.location.origin
  }
}

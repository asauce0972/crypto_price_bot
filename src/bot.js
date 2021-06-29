const { Client } = require('discord.js')
const fetch = require("node-fetch");

require('dotenv').config()

const client = new Client()

const API_URL = 'https://'
const TOKEN_ADDRESS = ''

var token = {
  Price: 0,
  Load: async function () {
  let response = await fetch(API_URL);
    if (response.ok) {
      let pairs = await response.json();
      for (var i=0; i<pairs.length; i++){
          if(pairs[i].lp_mint==TOKEN_ADDRESS){
              break;
          }
      }
      token.Price = parseFloat(pairs[i].price).toFixed(2)
      console.log(parseFloat(pairs[i].price).toFixed(2))
    }
  }
}

const priceUpdate = async () => {
  token.Load()
  const server = await client.guilds.fetch(process.env.DISCORD_SERVER_ID)
  const bot = await server.members.fetch(client.user.id)
  bot.setNickname(`Token: $${token.price}`)
}

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in!`)
  priceUpdate()
})

client.setInterval(() => priceUpdate(), process.env.UPDATE_FREQUENCY * 1000)

client.login(process.env.DISCORDJS_BOT_TOKEN)

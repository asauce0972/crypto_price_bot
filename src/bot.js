const { Client } = require('discord.js')
const fetch = require("node-fetch");

require('dotenv').config()

const client = new Client()

const RAYDIUM_URL = 'https://api.raydium.io/pairs'
const COPE_USDC_PAIR = 'Cz1kUvHw98imKkrqqu95GQB9h1frY8RikxPojMwWKGXf'

var Cope = {
  Price: 0,
  Load: async function () {
  let response = await fetch(RAYDIUM_URL);
    if (response.ok) {
      let pairs = await response.json();
      for (var i=0; i<pairs.length; i++){
          if(pairs[i].lp_mint==COPE_USDC_PAIR){
              break;
          }
      }
      Cope.Price = parseFloat(pairs[i].price).toFixed(2)
      console.log(parseFloat(pairs[i].price).toFixed(2))
    }
  }
}

const priceUpdate = async () => {
  Cope.Load()
  const server = await client.guilds.fetch(process.env.DISCORD_SERVER_ID)
  const bot = await server.members.fetch(client.user.id)
  bot.setNickname(`COPE: $${Cope.price}`)
}

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in!`)
  priceUpdate()
})

client.setInterval(() => priceUpdate(), process.env.UPDATE_FREQUENCY * 1000)

client.login(process.env.DISCORDJS_BOT_TOKEN)
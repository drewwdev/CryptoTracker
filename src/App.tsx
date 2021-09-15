import React, { useEffect, useState } from 'react'

export function App() {
  type coinType = {
    id: string
    symbol: string
    priceUsd: number
    changePercent24Hr: number
  }
  const [coins, setCoins] = useState<coinType[]>([])
  const url = 'https://api.coincap.io/v2/assets'

  useEffect(function () {
    async function GetCoins() {
      const response = await fetch(url)

      if (response.ok) {
        const { data } = await response.json()

        const sortedCoins = [...data].sort((a, b) => {
          return b.priceUsd - a.priceUsd
        })
        setCoins(sortedCoins)
      }
    }
    GetCoins()
  }, [])

  useEffect(function () {
    const timerInterval = setInterval(function () {}, 60000)
    function teardown() {
      clearInterval(timerInterval)
    }
    return teardown
  }, [])

  return (
    <div>
      <header>
        <div className="appName">CryptoTicker</div>
        <a href="https://github.com/drewwdev">
          <img className="github" src="./src/images/GitHub-Mark-32px.png"></img>
        </a>
      </header>
      <div className="app">
        <h1>Top 100 Cryptocurrency prices</h1>
        <article>
          {coins.map((coin) => {
            return (
              <div key={coin.id} className="crypto">
                <div className="identifier">
                  <p className="coinid">{coin.id}</p>
                  <p>{coin.symbol}</p>
                </div>
                <div className="price">
                  <p>${Math.round(coin.priceUsd * 100) / 100}</p>
                  <p>{Math.round(coin.changePercent24Hr * 100) / 100}%</p>
                </div>
              </div>
            )
          })}
        </article>
      </div>
    </div>
  )
}

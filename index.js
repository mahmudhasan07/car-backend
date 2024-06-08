const express = require("express")
const cors = require('cors')
const app = express()
// const localStorage  = window.localStorage
const port = 5000
app.use(cors(['http://localhost:5173', 'https://darling-phoenix-126707.netlify.app']))
app.use(express.json())

app.get("/", async (req, res) => {
    res.send("Welcome to the server")
})

// {
//     duration_week: '1',
//     duration_day: '5',
//     duration_hour: null,
//     rate: { hourly: 15, daily: 70, weekly: 400 }
//   }


// async function Data() {
//     // const res = await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList')
//     // const allCars = await res.json()
//     // console.log(data.data);

// }

// Data()



app.post("/rents", async (req, res) => {
    const data = req.body
    console.log(data);

    if (data?.duration_hour) {
        const totalCostOfHour = parseInt(data?.duration_hour) * parseInt(data?.rate?.hourly)
        console.log(totalCostOfHour);
        if (totalCostOfHour >= data?.rate?.daily) {
            const day = 1
            const daily = data?.rate?.daily
            const totalCostOfDay = data?.rate?.daily

            const totalCost = { day, daily, totalCostOfDay }
            return res.send(totalCost)
        }
        const hour = data?.duration_hour
        const hourly = data?.rate?.hourly
        const totalCost = { totalCostOfHour, hour, hourly }
        res.send(totalCost)
    }
    else {
        const totalCostOfDay = parseInt(data?.duration_day) * parseInt(data?.rate?.daily)
        const totalCostOfWeek = parseInt(data?.duration_week) * parseInt(data?.rate?.weekly)
        const day = data?.duration_day
        const week = data?.duration_week
        const daily = data?.rate?.daily
        const weekly = data?.rate?.weekly
        console.log(totalCostOfDay, totalCostOfWeek);
        const totalCost = { totalCostOfWeek, totalCostOfDay, weekly, daily, week, day }
        // const totalCost = [totalCostOfDay, totalCostOfWeek, weekly, daily]
        res.send(totalCost)

    }



})

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
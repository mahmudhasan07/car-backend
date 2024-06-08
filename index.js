const express = require("express")
const cors = require('cors')
const app = express()
// const localStorage  = window.localStorage
const port = 5000
app.use(cors(['http://localhost:5173']))
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


async function Data() {
    const res = await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList')
    const allCars = await res.json()
    // console.log(data.data);
    
    app.post("/rents", async (req, res) => {
        const data = req.body
        console.log(data);

        if(data?.duration_hour){
            const totalCostOfHour = parseInt(data?.duration_hour)* parseInt(data?.rate?.hourly)
            console.log(totalCostOfHour);
            res.send(totalCostOfHour)
        }
        else{
            const totalCostOfDay = parseInt(data?.duration_day)* parseInt(data?.rate?.daily)
            const totalCostOfWeek = parseInt(data?.duration_week)* parseInt(data?.rate?.weekly)
            console.log(totalCostOfDay,totalCostOfWeek);
            const totalCost = [totalCostOfDay,totalCostOfWeek]
            res.send(totalCost)

        }



    })
}

Data()

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
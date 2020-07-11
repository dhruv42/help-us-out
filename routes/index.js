const router = require('express').Router();
let data = [
    {
        id:"dhrumil_popat",
        name:"Dhrumil Popat",
        color:"#FF7272",
        message:"stuck in orchestration"
    },
    {
        id:"saransh_jain",
        name:"Saransh Jain",
        color:"#9BF983",
        message:"cart pre-order changes"
    },
    {
        id:"ashish_kadam",
        name:"Ashish Kadam",
        color:"#F5C02E",
        message:"Gateway issue"
    },
    {
        id:"manpreet_krishan",
        name:"Manpreet Krishan",
        color:"",
        message:"Godam Push"
    },
    {
        id:"tejas_sharma",
        name:"Tejas Sharma",
        color:"#F5C02E",
        message:"Commission Issue, need to check with Sagar"
    }
]

const getData = async (req,res) => {
    console.log("Api called ----")
    res.send(data)
}

const updateData = async (req,res) => {
    console.log(req.body);
    // data = {...data,...req.data};
    data = data.map((i)=>{
        if(i.id == req.body.id) {
            return req.body
        }
        return i
    })
    console.log(data);
    res.status(200).send({code:200});
    // res.send({code:200});
};

router.get('/',getData);
router.put('/update',updateData);


module.exports = router
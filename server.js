const express=require('express')
const bodyparser=require('body-parser')
const MongoClient=require('mongodb').MongoClient 




app=express();



MongoClient.connect('mongodb+srv://kipoech88:Hosea1234@cluster0.8t6s65h.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology:true
},
(err,client)=>{
    
    if(err) return console.log(err)
    console.log("Connected to Database")
    const db=client.db('star-wars-quotes')
    const quotesCollection=db.collection('quotes')

    app.set('view engine', 'ejs')


    app.use(bodyparser.urlencoded({extended:true}))

    app.get('/',(req,res)=>{
        db.collection('quotes').find().toArray()
            .then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        res.render('index.ejs')
    })

    
    app.post('/quotes', (req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result=>{
            res.redirect('/')
        })
        .catch(err=> console.log(err))
        console.log(req.body)
    })
    
    app.listen(3000,()=>{
        console.log("Server running on port 3000")
    })

})


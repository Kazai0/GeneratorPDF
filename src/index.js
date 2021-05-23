const express = require('express');

const app = express();
const pdf = require("html-pdf")
const ejs = require("ejs");
const { response } = require('express');

app.use(express.json());
   





app.get('/', (req, res)=>{


    ejs.renderFile('./templates/index.ejs', {name: 'Prescrição médica', patient: 'Jose da Silva',
    description: "O Paciente deve tomar o remédio duas vezes ao dia", medicine: 'Amoxilina',
    reason: 'O paciente tem uma infecção leve estomago',date: new Date()
    }
    , (err, html)=>{

    if(err){
        return res.status(500).json({message: 'Error server'})

    }
 
    const options = {
        format: 'A4',
        border:{
            right: '8'
        }
    }

    pdf.create(html, options).toFile('./uploads/report.pdf', (error, response)=>{
        if(!error){
            return res.json({message: "pdf generated"});
        
        }
        else{
            return res.json({message: 'Fail in Generated PDF.' })
        }
    })

});

app.get('/download', (req, res)=>{

    res.type('pdf');
    res.download('./uploads/report.pdf');
})

    
});


app.listen(3333);
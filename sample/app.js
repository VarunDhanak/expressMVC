const fs = require('fs');
const path = require('path');

const getInformation = (cd) =>{
    const p = 'productsInfo.json';
    fs.readFile(p,(err, fileContent) =>{
        if(err){
            return cd([]);
        } else{
            const data =cd(JSON.parse(fileContent))
            console.log(data)
        } 
    })

};

class Porducts {

    constructor(titleName, description, price){
        this.title = titleName;
        //this.description = description;
        //this.price = price;
    }

    save(){
        
        getInformation((products) => {
            
            products.push(this);
            const p ='productsInfo.json';
            fs.writeFile(p, JSON.stringify(products), (err) =>{
                if (err) throw err;
            });
        });
    }

    fetchAll(){
        getInformation((cd) =>{
            console.log(cd)
        });
    }

};

const products = new Porducts('Apple')
products.save()
products.fetchAll()



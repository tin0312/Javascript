// Sunglasses Object has an array of models, lenses and frames
let sunglassesOptions = {
    models: [
        {
            name: "aviator",
            price: 300,
            thumbImg: "thumb-aviator.png",
            cssClass: "frame-aviator",
        },
        {      
            name: "half-frame",
            price: 200,
            thumbImg: "thumb-half-frame.png",
            cssClass: "frame-half",
        },
        {
            name: "round",  
            price: 250,
            thumbImg: "thumb-round.png",
            cssClass: "frame-round",
        },
        {  
            name: "wayfarer",
            price: 250,
            thumbImg: "thumb-wayfarer.png",
            cssClass: "frame-wayfarer",
        }],
    lenses: [
        {
            color: "sepia",
            price: 20,
            cssClass: "color-sepia",
        },
        {
            color: "rainbow",
            price: 50,
            cssClass: "color-rainbow",
        },
        {
            color: "iridescent",
            price: 30,
            cssClass: "color-iridescent",
        }],
    frames: [
        {
            color: "charcoal",
            price: 0,
            cssClass: "color-charcoal",
        },
        {
            color: "tan",
            price: 0,
            cssClass: "color-tan",
        },
        {
            color: "rose",
            price: 0,
            cssClass: "color-rose",
        },
    ],
}

let sunglasses = {
    model: {
        name: "aviator",
        price: 300,
        thumbImg: "./images/thumb-aviator.png",
        cssClass: "frame-aviator",
    },
    lenses: {
        color: "sepia",
        price: 20,
        cssClass: "color-sepia",
    },
    frame: {
        color: "charcoal",
        price: 0,
        cssClass: "color-charcoal",
    }     
}



const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]
let sunglassesNew = ''
//this function takes sunglassesNew as a parameter and give it a default value of sunglasses,then return the sunglassesNew
function setSunglasses(sunglassesNew = sunglasses) {
    return sunglassesNew
}
/*function render(sunglassesNew) {
    
     sunglassesNew = {
        model: {
            name: sunglassesNew.model.name,
            price: sunglassesNew.model.price,
            thumbImg: sunglassesNew.model.thumbImg,
            cssClass: sunglassesNew.model.cssClass,
        },
        lenses: {
            color: sunglassesNew.lenses.color,
            price: sunglassesNew.lenses.price,
            cssClass: sunglassesNew.lenses.cssClass,
        },
        frame: {
            color: sunglassesNew.frame.color,
            price: sunglassesNew.frame.price,
            cssClass: sunglassesNew.frame.cssClass,
        }     
    }*/
function render(sunglassesNew){
    const {
        model : {name, price, thumbImg, cssClass},
        lenses: {color:lensColor, price: lensPrice, cssClass: lenseCssClass },
        frame: {color: frameColor, price: framePrice, cssClass: frameCssClass}
    } = sunglassesNew
    
    let totalPrice = `$${price + sunglassesOptions.lenses.find(len => len.color === lensColor).price + sunglassesOptions.frames.find(frame => frame.color === frameColor).price}`

  /* grap the elements and its texts to display on the page with information from sunglassesNew object
    productDetailsEl.innerHTML = 
    "<h1>" + {sunglassesNew.model.name} + "</h1>" +
    "<p>Custom: "  + sunglassesNew.lenses.color + " lenses, " + sunglassesNew.frame.color + " frames</p>" +
    "<p>" + price + "</p>"*/
    
    productDetailsEl.innerHTML = 

    `<h1>  ${name}  </h1> 
    <p>Custom:   ${lensColor} lenses, ${frameColor}  frames</p> 
    <p> ${totalPrice} </p>`
    
    let currClass = productImage.classList[1]// this targets frame-aviator
    productImage.classList.replace(currClass, cssClass)// replace frame-aviator with its cssClass
    
    let currFramesClass = productFrames.classList[1]//this targets color-charcoal
    productFrames.classList.replace(currFramesClass, frameCssClass)//replace color-charcoal with its cssClass
    
    let currLensesClass = productLenses.classList[1]// this targets color-sepia
    productLenses.classList.replace(currLensesClass, lenseCssClass)//relace color-sepia with its cssClass
    
}

//Highlight current selection
//There are selected class to display, if an item is clicked, remove selected class 
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        let siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", function(event) {

    let clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    else if (clickedItem.classList.contains("product-thumb")) {

        let currName = clickedItem.dataset.name

        let modelOptions = sunglassesOptions.models
        .filter(function(item) {
            return item.name === currName
        })[0]
        
        /*let name = modelOptions.name
        let price = modelOptions.price
        let thumbImg = modelOptions.thumbImg
        let cssClass = modelOptions.cssClass*/
        const {name, price, thumbImg, cssClass} = modelOptions
    
    
        

        sunglassesNew = {
            model: {
                name,
                price,
                thumbImg,
                cssClass
            },
            lenses: {
                color: sunglassesNew.lenses.color,
                price: sunglassesNew.lenses.price,
                cssClass: sunglassesNew.lenses.cssClass,
            },
            frame: {
                color: sunglassesNew.frame.color,
                price: sunglassesNew.frame.price,
                cssClass: sunglassesNew.frame.cssClass,
            }     
        }
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    else if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            const colorOptions = sunglassesOptions.lenses
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            /*let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass*/
            const {color, price, cssClass} = colorOptions
        
            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color,
                    price,
                    cssClass
                },
                frame: {
                    color: sunglassesNew.frame.color,
                    price: sunglassesNew.frame.price,
                    cssClass: sunglassesNew.frame.cssClass,
                }     
            }
        } 
        
        //frames
    else {
            let colorOptions = sunglassesOptions.frames
            .filter(function(item) {
                return item.color === currColor
            })[0]
            
            /*let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass*/
            const {color, price, cssClass} = colorOptions
            
            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color: sunglassesNew.lenses.color,
                    price: sunglassesNew.lenses.price,
                    cssClass: sunglassesNew.lenses.cssClass,
                },
                frame: {
                    color,
                    price,
                    cssClass
                }     
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)
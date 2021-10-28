
   let throwncards_set = new Set();
   let throwncards_set_valuesuit = new Set();
   let playerone_deckturn = false;
   let finishedbox = 0;
   var game;
   var playerone_name;
   let colorchange_counter = 0;
   let callfinish = false;



   
class Card{
  
    constructor(value ,suit , color )
    {
    
      this.value = value;     this.suit = suit;      this.color = color;
     }
       
       get tostring() {       return this.print_info;         }
         
      
      print_info(){
         
           return `Value =   ${this.value}  Suit =  ${this.suit}  Color =  ${this.color} `; 
      
      }
      
  
    }
  
  
class gameComponents {
  
       constructor()
       {
  
        this.Deck = new Map();      
        this.Player_one = new Map();    
        this.Player_two = new Map();
        this.Image_src = [];
        this.Droppped = [];
  
       }
  
  
     print_all_size() {
         
       console.log(`Deck = ${this.Deck.size} \nPlayer_one = ${this.Player_one.size} \nPlayer_two = ${this.Player_two.size}
               \nImg_src = ${this.Image_src.length} `);
     }

     buildDeck() {
  
      const values = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13);
      const suit = new Array('diamonds', 'hearts' , 'spades' , 'clubs' , 'jocker');
      const color = new Array('red' , 'black');
      
        // To build the corresponding image src on very iteration
     var img_src_builder1 = "IMAGES/";     var img_src_builder2 = "_of_";      var img_src_builder3 = ".png"; 
     
      let j = 0 ;
      
       for(let i of values)
       {
         
         
           let c = 0;  let s = 0 ;
          
           if(i == 0)
           {
             let temp_suit =  suit[4] ;
               
                while(c<2)
                {
                    let temp_color = color[c];
                   
                      let temp_src = img_src_builder1 + color[c] + "_" + i + img_src_builder3;
                      
                        let temp_card = new Card(i , temp_suit , temp_color );
                      
                   
                    this.Image_src[j] = temp_src;
                    this.Deck.set(temp_src , temp_card);
                        c++;        j++;
                      
                }
                
                c = 0 ;     
       
              }

     else
     {
       
        while(s<4){
          
          let temp_suit = suit[s];    let temp_color = color[1];
          
            if(temp_suit == "diamonds" || temp_suit == "hearts" )
            {     temp_color = color[0];    }
           
            
           let temp_src = img_src_builder1 + i + img_src_builder2 + temp_suit + img_src_builder3; 
           
            let temp_card = new Card( i , temp_suit , temp_color );
            
            this.Image_src[j] = temp_src;
            this.Deck.set(temp_src , temp_card );
                s++;    j++;
                
        }
        
       
     }
     
    } 
   
     
  }       
  
    
        createPlayers() {
 
              while(this.Player_two.size < 10 )
              {
                 let i = Math.floor(Math.random() * this.Deck.size);
                 
                     let temp_object = Object.assign( {} , this.Deck.get(this.Image_src[i] ) );
                     
                     
                 this.Player_two.set(this.Image_src[i] , temp_object );
                     this.Deck.delete(this.Image_src[i]);
                         this.Image_src.splice( i , 1);
              }
  
                                      
                while(this.Player_one.size < 11 )
       {
          let i = Math.floor(Math.random() * this.Deck.size);
          
               let temp_object = Object.assign( {} , this.Deck.get(this.Image_src[i] ) );
              
              
          this.Player_one.set(this.Image_src[i] , temp_object );
              this.Deck.delete(this.Image_src[i]);
                  this.Image_src.splice( i , 1);
       } 
            
    
                }
  
       
              }


   suffleDeck = () => {
    let tempdecksrc = [];
 
    for(let deck of game.Deck){  tempdecksrc.push(deck[0]);  }

  //  console.log("deck size before shuffle: " +game.Deck.size);
         while(tempdecksrc.length > 0)
         {
                 let i ;
           if(tempdecksrc.length !== 1)
           {
            i = Math.floor(Math.random() * tempdecksrc.length);
           }

           else { i = 0;  }

           let img = document.createElement("img");
    $(img).attr({
           "data-value":game.Deck.get(tempdecksrc[i]).value,
           "data-suit" : game.Deck.get(tempdecksrc[i]).suit
         })
           img.src = "https://gdurl.com/Wnnl";
           img.id = tempdecksrc[i];
           let img_wrapper = document.getElementById("deck");

           $(img).attr("draggable", "false").addClass("deckImg");
           img_wrapper.appendChild(img);

           tempdecksrc.splice(i,1);
         }

         tempdecksrc = [];
    console.log("after shuffle: " +game.Deck.size);
  //  console.log("deck size" + document.querySelectorAll("#deck > img").length)


   }

start_game = () => {
   
   
     game = new gameComponents();
     
        game.buildDeck();
     //   game.shuffle_deck();
        game.createPlayers();
        
        var counter = 0;
    
       for(let j of game.Player_one)
       {
  
         let img = document.createElement("Img");
         $(img).attr({
          "data-value":j[1].value,
          "data-suit" : j[1].suit
        })
  
        img.src = j[0];
        
           if(counter < 5){
        let playerOne_top = document.getElementById("playerOne_top");

        let img_wrapper = document.createElement("div");

        $(img_wrapper).addClass("draggable").attr("draggable", "true");

        $(img).attr("draggable", "false");

        img_wrapper.appendChild(img);
        playerOne_top.appendChild(img_wrapper);
     
        counter++;

           } else {
            let playerOne_bottom = document.getElementById("playerOne_bottom");

            let img_wrapper = document.createElement("div");
    
            $(img_wrapper).addClass("draggable").attr("draggable", "true");
    
            $(img).attr("draggable", "false");
            
    
            img_wrapper.appendChild(img);
            playerOne_bottom.appendChild(img_wrapper);
            counter++;
    
           }
       }
  
       for(let j of game.Player_two) 
       {
 
            let img = document.createElement("Img");
  
            img.src = "IMAGES/single.png";
            img.id = j[0];
    
            $(img).click(() => {     console.log(img.id);      })
            
            let img_wrapper = document.getElementById("playerTwo_wrapper");
    
            $(img).attr("draggable", "false").addClass("playerTwo_img");g
            $(img).attr({
              "data-value":j[1].value,
              "data-suit" : j[1].suit
            })
    
            img_wrapper.appendChild(img);
    
       
       }

     suffleDeck();
   /*
       for(let deck of game.Deck){
         let img = document.createElement("img");
         $(img).attr({
          "data-value":deck[1].value,
          "data-suit" : deck[1].suit
        })
         img.src = "IMAGES/single.png";
         img.id = deck[0];
         let img_wrapper = document.getElementById("deck");

         $(img).attr("draggable", "false").addClass("deckImg");
         img_wrapper.appendChild(img);
       }
  
      var player_name = prompt("Enter your name/alis/avatar!!");
  
      let player_name_p = document.createElement("p");
      let player_name_txtnode = document.createTextNode(player_name);
  
          player_name_p.appendChild(player_name_txtnode);
       //document.querySelector("#playertwo").appendChild(player_name_p);
  
         game.print_all_size();
         
     */
  
    }
  

  /*if the card sent to be checked cant be found in the game.player1 then playerone 
  got that card from deck so search card in game.deck  */ 

  /* if card is still not found then search in game.playertwo since this means playerone
     got card from droped cards thrown by player two  */

/*
    findInDeck = value => { return game.Deck.get(value); }
    findInPlayerOne = value => { return game.Player_one.get(value); }
    findInPlayerTwo = value => { return game.Player_Two.get(value); }

    */

    getplayerOne_name = () => {
      playerone_name = prompt("Enter your name/alis/avatar!!");

            $("#start_screen").slideUp(600);
            $("#play_screen").slideDown(1500);
    }

    checkMatch =  (cards) => {
      
       if($(cards[0]).attr("data-value") == $(cards[1]).attr("data-value") && $(cards[1]).attr("data-value") == $(cards[2]).attr("data-value"))
             {  return true;  }
        
        if($(cards[0]).attr("data-suit") == $(cards[1]).attr("data-suit")  && $(cards[1]).attr("data-suit") == $(cards[2]).attr("data-suit"))
           {
             let xvalue = parseInt($(cards[0]).attr("data-value") ) + 1;
             let yvalue = parseInt($(cards[1]).attr("data-value"))  + 1;
        if(parseInt($(cards[1]
        ).attr("data-value") ) == xvalue &&
        parseInt($(cards[2]).attr("data-value") ) == yvalue )
             {   return true;  }

           

           
       return false;

    }
  }


/*----------------------------------------------------------------------------------------------*/
     //----------------------------------------------------------------------------------

     playPlayerTwo_Tries = () =>{
      let playerTwo = document.querySelectorAll("section#playerTwo_wrapper > img");
       let tries_map = new Map();
       let card_index = [];
       let values_array = [];

       let k = 0;
   

       playerTwo.forEach(i => {
    let temp_value_i = $(i).attr("data-value");

        
        if(undefined === values_array.find(temp_val => temp_val ==temp_value_i)) {  
       

           for(let j=k+1 ; j<playerTwo.length ;j++){
             if(temp_value_i === $(playerTwo[j]).attr("data-value"))
             {
                   card_index.push(j);
             }

           
            }

           if(card_index.length === 1)
            { values_array.push(temp_value_i);  }

           if(card_index.length > 1)
           {
           card_index.push(k);
           tries_map.set(temp_value_i , card_index.sort());
           values_array.push(temp_value_i);
           }

           card_index = [];

       }

       k++;
      
     })  


   
     //console.table(Object.fromEntries(tries_map))
     //console.dir(values_array)

 playerTwoFinish(tries_map);  
 playPlayerTwo_SquentialTries()
    }

    //squential tries
    /*Groups all the cards based on their suit since cards need to have 
    the same suit to be sequential tries   */

    /*after grouping them in arrays put the location of the values
     if the arrays length is greater than 2 since we need atleast 3 cards to make
     a tries with the same suit in
    a map using the suit name as a key  and the location array as values*/
    
    //call custom sort to sort map(since we need to sort numbers and not strings)
    //.sort() sorts arrays

    //send that map to be checked for sequence using checkSequence()

    playerTwoFinish = triesMap => {
      let imgs = document.querySelectorAll("section#playerTwo_wrapper > img");
  

      for(let index of triesMap.values() ){
        for(let i = 0 ; i< index.length ; i++){
          let imgs_src = $(imgs[index[i]]).attr("id");
          $(imgs[index[i]]).addClass("delete_list");

          let img = document.createElement("img");
          img.src = imgs_src;

          $(img).attr({
            "id":$(imgs[index[i]]).attr("id") ,
            "draggable":"false",
            "data-value" : $(imgs[index[i]]).attr("data-value"),
            "data-suit" : $(imgs[index[i]]).attr("data-suit")
          })
           $(img).css("margin-left","0.4rem")

           if(index.length === 4) 
           {  document.getElementById("finishZone_six").appendChild(img)  }
 
            else{

              if(document.querySelectorAll("#box_bottom_one > img").length < 3)
              {  document.getElementById("box_bottom_one").appendChild(img)  }
      
              else if(document.querySelectorAll("#box_bottom_one > img").length === 3 && document.querySelectorAll("#box_bottom_two > img").length < 3 )
              {  document.getElementById("box_bottom_two").appendChild(img)  }
      
              else if(document.querySelectorAll("#finishZone_six > img").length < 4)
              {  document.getElementById("finishZone_six").appendChild(img) }
         console.log("sequential tries")
            }
        }

      }

      $(".delete_list").remove();

     }

    playPlayerTwo_SquentialTries = () => {
      let playerTwo = document.querySelectorAll("section#playerTwo_wrapper > img");
      let heartarr = [];
      let diamondarr = [];
      let spadearr = [];
      let clubarr = [];
      let suitsarr = new Map();
      let position_value = new Map();
      
      let counter = 0;
      for(let tempp2 of playerTwo){
        if($(tempp2).attr("data-suit") == "hearts") { heartarr.push(counter) 
        }
        if($(tempp2).attr("data-suit") == "diamonds") { diamondarr.push(counter) 
        }
        if($(tempp2).attr("data-suit") == "clubs") { clubarr.push(counter) 
        }
        if($(tempp2).attr("data-suit") == "spades") { spadearr.push(counter) 
        }
      counter++;

      }
    
     
      if(heartarr.length >= 3) { suitsarr.set("heart", heartarr) 
        for(let i = 0 ; i < heartarr.length ; i++)
        {
          position_value.set(heartarr[i],$(playerTwo[heartarr[i]]).attr("data-value") )
        }
    }
      if(diamondarr.length >= 3) { suitsarr.set("diamond", diamondarr) 
      for(let i = 0 ; i < diamondarr.length ; i++)
      {
        position_value.set(diamondarr[i],$(playerTwo[diamondarr[i]]).attr("data-value") )
      }
    }
      if(clubarr.length >= 3) {  suitsarr.set("club", clubarr) 
      for(let i = 0 ; i < clubarr.length ; i++)
      {
        position_value.set(clubarr[i],$(playerTwo[clubarr[i]]).attr("data-value") )
      }
    }
      if(spadearr.length >= 3) { suitsarr.set("spade" , spadearr) 
      for(let i = 0 ; i < spadearr.length ; i++)
      {
        position_value.set(spadearr[i],$(playerTwo[spadearr[i]]).attr("data-value") )
      }
    }
  
         heartarr = []; diamondarr=[]; spadearr=[];  clubarr=[];
/*     console.table(Object.fromEntries(suitsarr))
     console.log(`position value: ${[...position_value.values()]}`);
     console.log(`position -----: ${[...position_value.keys()]}`);
*/
     let tempv = [];
     if(position_value.size > 0)
     {
       for(let i of suitsarr.entries())
       {
         for(let k = 0 ; k < i[1].length ; k++){
           tempv.push(position_value.get(i[1][k] ))
         }  
        customSort(tempv);
      
         let check_sequence = checkSequence(tempv);
       //  console.log("ck seq : "+ check_sequence)
         tempv = []
              if(check_sequence != false){
      

                for(let ii = 0 ; ii< check_sequence.length ; ii++){
                for(let checktemp of position_value.entries())
                {
                  if(checktemp[1].toString() == check_sequence[ii].toString() )
                  { tempv.push(checktemp[0]); }
                }
              }
            }

      

        let newtemparr = tempv.filter(function(value){
            return i[1].includes(value);
        }) 

 //console.log("tempv " + tempv)
 //console.log("new temp " + newtemparr);
            playerTwoFinish_sequence(newtemparr);
     tempv = []
       }
     }
    }
  
    //cunstom sort for numeric array
   customSort = arr => {
    arr.sort(function(a,b){
      return a-b;
    });
   }

    checkSequence = arr => {
    
      //since array holds thee elements in string form parse it to int
      let temparr = arr.map(function(value){
           return parseInt(value);
      })

//now that elements are sorted and parsed into int 
/* arr.length is 3 check that they are sequential
  else five the first three squential elements (if found) add them to tries array
      check if the rest of the elements suceed or come before the last and first elements in tries array */
      let triesarr = [];
      let morethanOneTries = [];
            if(arr.length === 3){
              if(temparr[1] === temparr[0] + 1 && temparr[1] === temparr[2]-1){
                return true;
              }
        }

        else{
          for(let i = 0 ; i < arr.length ; i++){

            if(triesarr.length === 0){
          if(temparr[i] === temparr[i+1] -1 && temparr[i] === temparr[i+2] - 2 ){
          triesarr.push(temparr[i],temparr[i+1],temparr[i+2]);   
            
            i += 2;
          }
     
        }

        else {
          if( triesarr[triesarr.length-1] === arr[i] - 1 )
          {  triesarr.push(temparr[i])}
          else
          {  if(arr.length - (i+1) > 2) 
            {   i--;   morethanOneTries = triesarr; triesarr = [] }
          }
         }

      
      }
      if(morethanOneTries.length !== 0) { return morethanOneTries; }
        
      if(triesarr.length !== 0) { return triesarr; }
        }


        return false;

    }
    ///this will take the tries map and concatinate the cards to finishzone
    //and remove the same cards from player two zone

  

     playerTwoFinish_sequence = sequence_arr => {
      let imgs = document.querySelectorAll("section#playerTwo_wrapper > img");

      for(let i = 0 ; i< sequence_arr.length ; i++){
        $(imgs[sequence_arr[i]]).addClass("delete_list");

        let img = document.createElement("img");        
        $(img).attr({
              "src" : $(imgs[sequence_arr[i]]).attr("id"),
              "id" : $(imgs[sequence_arr[i]]).attr("id"),
              "data-value" : $(imgs[sequence_arr[i]]).attr("data-value"),
              "data-suit" : $(imgs[sequence_arr[i]]).attr("data-suit"),
              "draggable"  : "false"
            }).css("margin-left","0.4rem")

         if(sequence_arr.length === 4) 
         {  document.getElementById("finishZone_six").appendChild(img) }
          
         else{
          

          if(document.querySelectorAll("#box_bottom_one > img").length < 3)
          {  document.getElementById("box_bottom_one").appendChild(img)  }
  
          else if(document.querySelectorAll("#box_bottom_one > img").length === 3 && document.querySelectorAll("#box_bottom_two > img").length < 3)
          {  document.getElementById("box_bottom_two").appendChild(img)  }
  
          else if(document.querySelectorAll("#finishZone_six > img").length < 4)
          {  document.getElementById("finishZone_six").appendChild(img) }
         console.log("p2 tries")
          
     
        }
      }

     
      $(".delete_list").remove();

     }

  //function to decide whice card is useless so it can be thrown

  playerTwo_chechToThrow = () => {
   let ptwo_imgs = document.querySelectorAll("section#playerTwo_wrapper > img") 
     let values = new Set();


            for(let i=0;i<ptwo_imgs.length ; i++){
              if($(ptwo_imgs[i]).attr("data-suit") === 'jocker' ) { continue; }

              for(let j=0; j<ptwo_imgs.length ; j++){
                if(i !== j && $(ptwo_imgs[i]).attr('data-value') === $(ptwo_imgs[j]).attr('data-value') )
                {
                  j=100;
                }

                if(j === ptwo_imgs.length - 1) {
                  values.add(i);
                }
              }
            }

        if(values.size > 0){
          for (const tempv of values) {
            
          for(let i=0;i<ptwo_imgs.length ; i++){
              if(tempv !== i){
                if($(ptwo_imgs[tempv]).attr('data-suit') === $(ptwo_imgs[i]).attr('data-suit'))
                {
                  if(parseInt($(ptwo_imgs[tempv]).attr('data-value')) === parseInt($(ptwo_imgs[i]).attr('data-value'))+ 1 || parseInt($(ptwo_imgs[tempv]).attr('data-value')) === parseInt($(ptwo_imgs[i]).attr('data-value'))+ 2 || parseInt($(ptwo_imgs[tempv]).attr('data-value')) === parseInt($(ptwo_imgs[i]).attr('data-value'))- 1 ||
                  parseInt($(ptwo_imgs[tempv]).attr('data-value')) === parseInt($(ptwo_imgs[i]).attr('data-value')) - 2    )
                  {
                    values.delete(tempv)
                  }
                }
              }
          }
        }
      }

    
      if(values.size > 0) {
        let temparr = [];
       for(let v of values)
       {
          temparr.push(v);
       }

       let div = document.createElement("div");
       let img = document.createElement("img");

          img.src = $(ptwo_imgs[temparr[0]]).attr("id");
          img.id = $(ptwo_imgs[temparr[0]]).attr("id");

                $(div).addClass("draggable").attr("draggable","true");
          $(div).attr("id","throwncardd");

            $(img).attr({
              "data-value": $(ptwo_imgs[temparr[0]]).attr("data-value"),
              "data-suit": $(ptwo_imgs[temparr[0]]).attr("data-suit"),

        })
        $(img).css("margin-left","0.2rem").attr("draggable", "false");

          div.appendChild(img);
          //console.log($("#throwZone div").last().html());
        div.addEventListener("click", playerone_takeThrownCard);
        //$(div).insertAfter($("#throwZone div").last())
        if($("#throwZone").find("img").attr("src") !== undefined){
          throwncards_set.add($("#throwZone").find("img").attr("src"))
          
          let tempv = $("#throwZone").find("img").attr("data-value")
          let temps = $("#throwZone").find("img").attr("data-suit")

          if(throwncards_set.size == 0)
          {throwncards_set_valuesuit.add([tempv,temps]);  }
          else {
            let foundinSet = false;
            throwncards_set_valuesuit.forEach(card => {
              if(card[0] === tempv && card[1] === temps)
              {  foundinSet = true; }

          
    })
    if(foundinSet === false) {
      throwncards_set_valuesuit.add([tempv,temps])
      console.log("-----------------")
  console.dir(throwncards_set_valuesuit);
       console.log("-----------------")
  console.log(throwncards_set);
    }
  }
  
}
  
  
$("#throwZone").html(div)
        $(ptwo_imgs[temparr[0]]).remove();

      }

   else {
    let div = document.createElement("div");
    let img = document.createElement("img");

    if($(ptwo_imgs[0]).attr("data-suit") === 'jocker' &&
    document.querySelectorAll("section#playerTwo_wrapper > img").length !== 1 )
      { 
        if($(ptwo_imgs[1]).attr("data-suit") === 'jocker' &&
        document.querySelectorAll("section#playerTwo_wrapper > img").length !==2)
        {
          img.src = $(ptwo_imgs[2]).attr("id"); 
            img.id =  $(ptwo_imgs[2]).attr("id"); 
            $(img).attr({
              "data-value" : $(ptwo_imgs[2]).attr("data-value"),
              "data-suit" : $(ptwo_imgs[2]).attr("data-suit")
            })
            $(ptwo_imgs[1]).remove();
        }
        else {
            img.src = $(ptwo_imgs[1]).attr("id"); 
            img.id =  $(ptwo_imgs[1]).attr("id"); 
            $(img).attr({
              "data-value" : $(ptwo_imgs[1]).attr("data-value"),
              "data-suit" : $(ptwo_imgs[1]).attr("data-suit")
            })
            $(ptwo_imgs[1]).remove();
        }
      }
    
    else 
     { 
            img.src = $(ptwo_imgs[0]).attr("id");
            img.id =  $(ptwo_imgs[0]).attr("id"); 
            $(img).attr({
              "data-value" : $(ptwo_imgs[0]).attr("data-value"),
              "data-suit" : $(ptwo_imgs[0]).attr("data-suit")
            })
            $(ptwo_imgs[0]).remove();
     }
    

    $(img).css("margin-left","0.2rem");

    div.appendChild(img);
    div.addEventListener("click", playerone_takeThrownCard);

    if($("#throwZone").find("img").attr("src") !== undefined){
      throwncards_set.add($("#throwZone").find("img").attr("src"))
      
      let tempv = $("#throwZone").find("img").attr("data-value")
      let temps = $("#throwZone").find("img").attr("data-suit")
    
      if(throwncards_set.size == 0)
      {throwncards_set_valuesuit.add([tempv,temps]);  }
      else {
        let foundinSet = false;
        throwncards_set_valuesuit.forEach(card => {
          if(card[0] === tempv && card[1] === temps)
          {  foundinSet = true; }
    
       
        })
        if(foundinSet === false) {
          throwncards_set_valuesuit.add([tempv,temps])
          console.log("-----------------")
      console.dir(throwncards_set_valuesuit);
           console.log("-----------------")
      console.log(throwncards_set);
        }
      }
      
    }
  
    $("#throwZone").html(div);
 

     console.log("cant find card to throw")
   }

      ptwo_imgs = document.querySelectorAll("section#playerTwo_wrapper > img") 

    if(ptwo_imgs.length === 0 && callfinish === false)
    {       callfinish = setTimeout(()=>{  finishGame("loser"); }, 2000)  }

      console.log("before src change" + ptwo_imgs[ptwo_imgs.length - 1].src)
    ptwo_imgs[ptwo_imgs.length - 1].src = "IMAGES/single.png";
     
      playerone_deckturn = true;
     
   }

   
   playerTwo_checkThrownCard = () => {
     let div = document.querySelector("div#throwZone > div");

     let imgvalue = $(div).find('img').attr('data-value');
     let imgsuit = $(div).find('img').attr('data-suit');

     let ptwo_imgs = document.querySelectorAll("section#playerTwo_wrapper > img") 
     let iftries = false;

     if(imgsuit === 'jocker') {   appendThrownCardTo_Playertwo();  return true;  }

     for(let i = 0;i< ptwo_imgs.length ; i++){
        if($(ptwo_imgs[i]).attr('data-value') == imgvalue){
           appendThrownCardTo_Playertwo();
           iftries = true;
           return true;
        }
     }

     if(!iftries)
      {
        imgvalue = parseInt($(div).find('img').attr('data-value'));

        for(let i = 0; i < ptwo_imgs.length ; i++){
          if($(ptwo_imgs[i]).attr('data-suit') === imgsuit){
            if(imgvalue === parseInt($(ptwo_imgs[i]).attr('data-value'))+ 1 || 
            imgvalue === parseInt($(ptwo_imgs[i]).attr('data-value'))+ 2 || 
            imgvalue === parseInt($(ptwo_imgs[i]).attr('data-value'))- 1 ||
            imgvalue === parseInt($(ptwo_imgs[i]).attr('data-value')) - 2    )
            {   appendThrownCardTo_Playertwo();   return true;  }
          }
        }
      }     

      return false;
   }

     appendThrownCardTo_Playertwo = () => {

      let playerTwo_cards =  document.querySelectorAll("div#box_bottom_one > img").length +  
      document.querySelectorAll("div#box_bottom_two > img").length +  
      document.querySelectorAll("section#playerTwo_wrapper > img").length + 
      document.querySelectorAll("div#finishZone_six > img").length;

      if(playerTwo_cards < 11){
     let img = document.querySelector("div#throwZone > div >img");

         /* let img = document.createElement("img");
                
                img.src =   "IMAGES/single.png";
                img.id = $(div).find('img').attr("src");
      img.id =  $(div).find('img').attr("src");

        

    $(img).attr("draggable", "false").addClass("playerTwo_img");
    $(img).attr({
    "data-value" : $(div).last().find('img').attr("data-value"),
    "data-suit" :  $(div).last().find('img').attr("data-suit")
    })
    */
    let img_wrapper = document.getElementById("playerTwo_wrapper");
   img.id = $(img).attr("src");
   
   img.src = "IMAGES/single.png";

    img_wrapper.appendChild(img);

  }

     }
  
  

     playerone_takeThrownCard = () => {

      if(
        document.querySelectorAll("div#playerOne_top > div").length + 
        document.querySelectorAll("div#playerOne_bottom > div").length  + 
        document.querySelectorAll("div#firstFinishZone > div").length +
        document.querySelectorAll("div#secondFinishZone > div").length +
        document.querySelectorAll("div#finishZone_four > div").length  < 11  
         ){
let div = document.createElement("div");
let img = document.createElement("img");

$(div).addClass("draggable").attr("draggable", "true");

 $(img).attr("src", document.querySelector("#throwZone > div > img").src).attr("draggable","false");
 $(img).attr({
   "data-value" : $(document.querySelector("#throwZone > div > img")).attr("data-value"),
   "data-suit" : $(document.querySelector("#throwZone > div > img")).attr("data-suit")
 })

   addDragEvent(div);
 $(div).append(img)
 document.getElementById("playerOne_bottom").appendChild(div);
    
     }
   
    }
  
checkJockerSequence = (nonjocker_indexarray, jocker_indexarray) => {

  let ptwo_cards = document.querySelectorAll("section#playerTwo_wrapper > img");

    i = 0;
  if(nonjocker_indexarray.length === 3)
  {
    
      if($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") === $(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value")  )
      {
        playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i],nonjocker_indexarray[i+1]]);
      }

      else  if($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") === $(ptwo_cards[nonjocker_indexarray[i+2]]).attr("data-value")  )
      {
        playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i],nonjocker_indexarray[i+2]]);
        i = 4;
      }

      else if($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-suit") === $(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-suit"))
      {
          if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) - 1 )
          {
        playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i],nonjocker_indexarray[i+1]]);
       
          }

          else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) + 1 )
          {
        playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i+1],nonjocker_indexarray[i]]);
       
          }

          else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) - 2 )
          {
        playerTwoFinish_sequence([nonjocker_indexarray[i],jocker_indexarray[0],nonjocker_indexarray[i+1]]);
       
          }

          else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) + 2 )
          {
        playerTwoFinish_sequence([nonjocker_indexarray[i+1],jocker_indexarray[0],nonjocker_indexarray[i]]);
       
          }


      }

    
  }

  if(nonjocker_indexarray.length === 2 )
  {console.log("joker 2")
    if($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") === $(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value")  )
    {
      playerTwoFinish_sequence([nonjocker_indexarray[i],nonjocker_indexarray[i+1],jocker_indexarray[0]]);
    }

    
    else if($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-suit") === $(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-suit"))
    {
        if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) - 1 )
        {
      playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i],nonjocker_indexarray[i+1]]);
        }

        else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) + 1 )
        {
      playerTwoFinish_sequence([jocker_indexarray[0],nonjocker_indexarray[i+1],nonjocker_indexarray[i]]);
        }

        else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) - 2 )
        {
      playerTwoFinish_sequence([nonjocker_indexarray[i],jocker_indexarray[0],nonjocker_indexarray[i+1]]);
        }

        else if(parseInt($(ptwo_cards[nonjocker_indexarray[i]]).attr("data-value") ) === parseInt($(ptwo_cards[nonjocker_indexarray[i+1]]).attr("data-value") ) + 2 )
        {
      playerTwoFinish_sequence([nonjocker_indexarray[i+1],jocker_indexarray[0],nonjocker_indexarray[i]]);
     
        }


    }

}

}

appendJockerAsFourth = joker => {
  $((document.querySelectorAll("section#playerTwo_wrapper > img")[joker] )).css("margin-left",".4rem").attr(
    {"src" : 
        $(document.querySelectorAll("section#playerTwo_wrapper > img")[joker] ).attr("id"),
      "id" : 
        $(document.querySelectorAll("section#playerTwo_wrapper > img")[joker] ).attr("id")
  });
    $("#finishZone_six").append(document.querySelectorAll("section#playerTwo_wrapper > img")[joker] )
 
} 
  
playerone_appendMatchToFinishZone = () => {
  let finishhtml = $("#firstFinishZone").html();

 if($("#secondFinishZone").html() == ''){
 //$("#secondFinishZone").css("display", "block");

 var old_element = document.getElementById("secondFinishZone");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);

 $("#secondFinishZone").html(finishhtml);
         
     $("#firstFinishZone").html("")
     playerone_AddFourthTries_dragoverEvent(document.getElementById("secondFinishZone"))
}


else if($("#finishZone_four").html() == ''){
 //$("#finishZone_four").css("display", "block");

 var old_element = document.getElementById("finishZone_four");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);

 $("#finishZone_four").html(finishhtml);
 $("#firstFinishZone").html("")

 playerone_AddFourthTries_dragoverEvent(document.getElementById("finishZone_four"))
 

}
  else {
      $("#firstFinishZone").css("border-color","red");
     var old_element = document.getElementById("firstFinishZone");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
playerone_AddFourthTries_dragoverEvent(document.getElementById("firstFinishZone"))

  }


}


playerone_appendJockerAsThird = (jokerarr, nonjockerarr) => {
  let cards = document.querySelectorAll("div#firstFinishZone > div.draggable > img");

  if(jokerarr.length === 2 || $(cards[nonjockerarr[0]] ).attr("data-value") === $(cards[nonjockerarr[1]] ).attr("data-value") )
  {
    playerone_appendMatchToFinishZone();
  }

  if(jokerarr.length === 1)
  {
    if( $(cards[nonjockerarr[0]] ).attr("data-suit") ===  $(cards[nonjockerarr[1]] ).attr("data-suit")  )
    {
       if(parseInt( $(cards[nonjockerarr[0]] ).attr("data-value")) === parseInt( $(cards[nonjockerarr[1]] ).attr("data-value")) - 1)
       {
         if(( $(cards[0]).attr("data-suit") === "jocker" || $(cards[2]).attr("data-suit") === "jocker") )
         {         playerone_appendMatchToFinishZone();           }
       }
     
       else if(parseInt( $(cards[nonjockerarr[0]] ).attr("data-value")) === parseInt( $(cards[nonjockerarr[1]] ).attr("data-value")) + 2 || parseInt( $(cards[nonjockerarr[0]] ).attr("data-value")) === parseInt( $(cards[nonjockerarr[1]] ).attr("data-value")) - 2)
       {console.log("yep")
         if(( $(cards[1]).attr("data-suit") === "jocker" && parseInt($(cards[0]).attr("data-value") ) < parseInt($(cards[2]).attr("data-value") )) )
         {         playerone_appendMatchToFinishZone();           }
       }

    }
  } 
   
}
  
playertwo_checkboxfour = () => {
  console.log("check four");
  if(document.querySelectorAll("#finishZone_six > img").length > 4)
  {
    let img = $("#finishZone_six").find("img").last();
    $("#playerTwo_wrapper").append(img);
     let boxone_img = document.querySelectorAll("#box_bottom_one > img").length;
     let boxtwo_img = document.querySelectorAll("#box_bottom_two > img").length;
   //  let boxthree_img = document.querySelectorAll("#finishZone_five").length;

     for(let i = 3; i > 0 ; i--)
     
     {
       if(boxone_img === 0){

       while( document.querySelectorAll("#box_bottom_one > img").length < 3)
       {
        let index = document.querySelectorAll("#finishZone_six > img").length - i;
         $("#box_bottom_one").append(document.querySelectorAll("#finishZone_six > img")[index]);
       }
       }

       else if(boxtwo_img === 0 ){
       while(document.querySelectorAll("#box_bottom_two > img").length < 3)
       {
        let index = document.querySelectorAll("#finishZone_six > img").length - i;
         $("#box_bottom_two").append(document.querySelectorAll("#finishZone_six > img")[index]);
       }
       }

      
     }
  }
}


finishGame = winner_bool => {

   callfinish = true;

  $("#play_screen").hide(500);
  $("#end_screen").show(800).css({
    "display":"flex",
    "flex-direction": "column",
    "justify-content":"center",
    "align-items":"center"
  })



 const winlose = {
   
  winner : () => {
     $("#end_screen").html('<h1>Seka</h1><p>💪💪 You won , ' + playerone_name + '<br>Congratulations !!! 😎😎 <p/><button id="newgame">New Game</button>');

  },

  loser : () => {
    $("#end_screen").html('<h1>Seka</h1><p>You lost , ' + playerone_name + '😰<br>Try again !!!😭</p><button id="newgame">New Game</button>');
  },
}

 winlose[winner_bool]();
 
let interval = setInterval(() => {
  if(colorchange_counter % 2 === 0 )
  {  $("#end_screen").find("p").css("color","red"); }
  else { $("#end_screen").find("p").css("color","blue")}
colorchange_counter++;

}, 800);

      document.getElementById("newgame").addEventListener("click", ()=> {

        $("#playerOne_top").html("");
        $("#playerOne_bottom").html("");
        $("#firstFinishZone").html("");
        $("#secondFinishZone").html("");
        $("#finishZone_four").html("");
        $("#finishZone_six").html("");
        $("#throwZone").html("");
        $("#deck").html("");
        $("#box_bottom_one").html("");
        $("#box_bottom_two").html("");
        $("#playerTwo_wrapper").html("");

         throwncards_set = new Set();
         throwncards_set_valuesuit = new Set();
         playerone_deckturn = false;
         finishedbox = 0;
         colorchange_counter = 0;
         playerone_takenFromDeck_counter = 0;
         callfinish = false;
      
     
                  start_game();
                  draggables = document.querySelectorAll(".draggable");
                  containers = document.querySelectorAll(".container");
              
                  draggablesAddEvent();
                  throwZone_AddEvent();
                  containersAddEvent();

              $("#end_screen").hide(300);
              $("#play_screen").show(400);

                  console.log("new game");
      } );

 
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

var playerone_takenFromDeck_counter = 0;
let draggables = document.querySelectorAll(".draggable");
let containers = document.querySelectorAll(".container");

setDeckOnOff = () => { 
    playerone_takenFromDeck_counter = 0;

// console.log(" Deck size -----" +document.querySelectorAll("div#deck > img").length );$(this).find("img").attr("src")

//check if player one has 13 card by adding the cards he has
// player one top bottom and cards in the finish area if any 
//then if playerone cards total is less than 14 then check the throw area to see if it', his turn
//then check deckhover_counter to see if player has already taken from deck
   if(playerone_deckturn === true &&
      document.querySelectorAll("div#playerOne_top > div").length + 
      document.querySelectorAll("div#playerOne_bottom > div").length  + 
      document.querySelectorAll("div#firstFinishZone > div").length +
      document.querySelectorAll("div#secondFinishZone > div").length +
      document.querySelectorAll("div#finishZone_four > div").length  < 11
       ){
        playerone_takenFromDeck_counter++;
            if(playerone_takenFromDeck_counter === 1)
            {
                $( "body" ).on( "click", "#deck", playerOne_takeFromDeck );    
                console.log("deck on" + playerone_takenFromDeck_counter);
            } 
        }else {
        $( "body" ).off( "click", "#deck", playerOne_takeFromDeck );
        playerone_takenFromDeck_counter = 0;
        console.log("deck off" + playerone_takenFromDeck_counter);
        }
      //  console.log( $(".deckImg").last())
       //
console.log( $(".deckImg").last())

    }
    

appendFromDeck = (player) => {

    let div = document.createElement("div");
    let img = document.createElement("img");

        $(div).addClass("draggable").attr("draggable", "true").css("margin-left",".2rem");


        $(img).css("margin-left",".2rem");

        $(img).attr({
            "draggable": "false",
            "id" : $(".deckImg").last().attr("id"),
            "data-value" : $(".deckImg").last().attr("data-value"),
            "data-suit" : $(".deckImg").last().attr("data-suit")
        })


    if(player === "playerone" && playerone_deckturn==true)
    { 
      $(img).attr("src", $(".deckImg").last().attr("id"));
      $(div).append(img);
     // div.appendChild(img);
      
      addDragEvent(div);
    document.getElementById("playerOne_bottom").appendChild(div);
    $("#deck img:last").remove();
     // div.appendChild(img);
playerone_deckturn = false;
    }

    else if(player === "playertwo") {
   //console.log("psssssssssssssssss
   $(img).attr("src", "IMAGES/single.png");
    $(img).attr("class", "playerTwo_img")
   
$(img).attr("src" , "IMAGES/single.png");

document.getElementById("playerTwo_wrapper").appendChild(img);
$("#playerTwo_wrapper").find("img").last().attr("src", "IMAGES/single.png")
   
$("#deck img:last").remove();
console.log("last deck " + $("#deck img:last").attr("data-value"))
console.log("ptwo last " + $("#playerTwo_wrapper").find("img").last().attr("src"))

                            }
          //                  console.clear();
    console.log("deckkkkk" + document.querySelectorAll("div#deck > img").length )

if(document.querySelectorAll("div#deck > img").length === 0){

    let valuesuit = [];
    for(let vs of throwncards_set_valuesuit ){
               valuesuit.push(vs[0]);
               valuesuit.push(vs[1]);

    }
   let marginleft = 3;
    let i=0;

  throwncards_set.forEach(src => {
    let img = document.createElement("img");
       $(img).addClass("deckImg").attr("draggable","false");

       $(img).attr({
           "src" : "IMAGES/single.png",
           "id" : src,
           "data-value": valuesuit[i],
           "data-suit" : valuesuit[i+1]
       })
       i = i + 2;  
   $("#deck").append(img);
  })

}
}

playerOne_takeFromDeck = () => {
    game.print_all_size();

      
//console.log("throw area length : " + document.querySelectorAll("div#throwZone > div.draggable").length % 2);

   let p2 = document.querySelectorAll("div#playerOne_top > div").length + 
   document.querySelectorAll("div#playerOne_bottom > div").length  + 
   document.querySelectorAll("div#firstFinishZone > div").length +
   document.querySelectorAll("div#secondFinishZone > div").length +
   document.querySelectorAll("div#finishZone_four > div").length;

if(p2  < 11 ){

                    $(".deckImg").first().click(() => {
                console.log("playertwo length on click" + p2 )
                        appendFromDeck("playerone");
                  //  playerone_deckturn = false;

                })
}
}

playerTwo_takeFromDeck = () => {

let playerTwo_cards =  document.querySelectorAll("div#box_bottom_one > img").length +  
        document.querySelectorAll("div#box_bottom_two > img").length +  
        document.querySelectorAll("section#playerTwo_wrapper > img").length + 
        document.querySelectorAll("div#finishZone_six > img").length;


        if(playerTwo_cards < 11){
            appendFromDeck("playertwo");
            playertwo_AddFourthTries_FromDeck();
        }
}

    let player_name_p = document.createElement("p");
    $("#deck").click( function(){  console.log($("#finishZone_third").html() == "")})

    
checkTries = () => {
    let cards = document.querySelectorAll("div#firstFinishZone > div > img");

    if(cards.length === 0) {  $("#firstFinishZone").css("border", "1px solid purple")   }
    else if(cards.length === 1 || cards.length === 2){ $("#firstFinishZone").css("border", "1px solid green") } else if (cards.length === 3)
    { 
        $("#firstFinishZone").css("border", "1px solid white")

    let x=[]; let c=0;
    let jocker_indexarray = [];
    let nonjocker_indexarray = [];

        cards.forEach(card => {
               x[c] = $(card).find('img').attr("src");
               if($(card).attr("data-suit") === "jocker")
               {  jocker_indexarray.push(c); }
               else {
                 nonjocker_indexarray.push(c);
               }
               c++;
        })
  //  console.trace("check tries "+ checkMatch(cards))
    
        if(jocker_indexarray.length > 0)
        { console.log("jk length " + jocker_indexarray.length )
            playerone_appendJockerAsThird(jocker_indexarray,nonjocker_indexarray);
        }

        else if(checkMatch(cards)){
          finishedbox++;
          console.log("finished boxxes" + finishedbox)
          playerone_appendMatchToFinishZone();
            $(cards).remove();
        }
    }
    else { 
        console.log("----------" + cards.length);

 $(".finishZone_left:eq(0)").css("border", "1px solid white")
    }
}

/*
$(document).ready(function(){

const ptwo_imgs = document.querySelectorAll(".playerTwo_img");

var left = 0;
ptwo_imgs.forEach(ptwo_img => {
$(ptwo_img).css("left" , left + "rem");
left += 2;
})

//left = 3;

const deckImgs = document.querySelectorAll(".deckImg");

 deckImgs.forEach(deckI => {
    // $(deckI).css("left", left + "rem");
     //left += 0.03;
 })
})
*/
playertwo_AddFourthTries_FromDeck = () => {
    let img = $("#playerTwo_wrapper").find("img").last();
    $(img).attr("src",  $(img).attr("id") );


    if(document.querySelectorAll("#finishZone_six > img").length === 0){
      if(document.querySelectorAll("#box_bottom_one > img").length > 0)
      {
      let imgs = document.querySelectorAll("#box_bottom_one > img");
      if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
      {
        if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
        {
           
         //let tempimg =  $("#playerTwo_wrapper").find("img").last();
         $("#finishZone_six").append(img).html($("#finishZone_six").html() + $("#box_bottom_one").html());

         $("#box_bottom_one").html("");
      //   $(img).remove();
        }


      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
      parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
        {
          //appendThrownCardTo_Playertwo();
       // let img =  $("#playerTwo_wrapper").find("img").last();
        $("#finishZone_six").html( $("#box_bottom_one").html() );
        $("#finishZone_six").append(img);

        $("#box_bottom_one").html("")
         //$(img).remove();
          
        }
        console.log("same suit")
    }

    else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
      {
   
        $(img).css("margin-left" , "0.4rem");
        $("#finishZone_six").html($("#box_bottom_one").html() ).append(img);

       $("#box_bottom_one").html("")
      // $(img).remove();
        console.log("same value")

      }

     else {
       console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

     }
      
      }

      if(document.querySelectorAll("#finishZone_six > img").length === 0 && document.querySelectorAll("#box_bottom_two > img").length > 0)
      { 
        let imgs = document.querySelectorAll("#box_bottom_two > img");
        if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
        {
          if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
          parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
          {
           $("#finishZone_six").append(img).html($("#finishZone_six").html() + $("#box_bottom_two").html());
           
           $("#box_bottom_two").html("")
          // $(img).remove();
          }


        if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value")) + 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
          {
           
          $("#finishZone_six").html( $("#box_bottom_two").html() );
          $("#finishZone_six").append(img);

          $("#box_bottom_two").html("")
         // $(img).remove();


          }
          console.log("same suit")
      }

      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
        {
          
          $(img).css("margin-left" , "0.4rem");

          $("#finishZone_six").html($("#box_bottom_two").html() ).append(img);
 
         
         $("#box_bottom_two").html("")
          console.log("same value")

        }

       else {
        console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

       }
      }

    }
    
    else if(document.querySelectorAll("#finishZone_six > img").length === 3){

      if(document.querySelectorAll("#box_bottom_one > img").length > 0)
      {
      let imgs = document.querySelectorAll("#box_bottom_one > img");
      if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
      {
        if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
        {
           
          let six_imgs = $("#finishZone_six").html();
          let one_imgs = $("#box_bottom_one").html();
          
          $("#finishZone_six").html("");
         $("#finishZone_six").append(img).html($("#finishZone_six").html() + one_imgs);
         $("#box_bottom_one").html($(six_imgs))

         //$(img).remove();
        }


      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
      parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
        {
                   
          let six_imgs = $("#finishZone_six").html();
          let one_imgs = $("#box_bottom_one").html();
        $("#finishZone_six").html( $(one_imgs) );
        $("#finishZone_six").append(img);

        $("#box_bottom_one").html("")
        $("#box_bottom_one").html($(six_imgs))
        // $(img).remove();


        }
        console.log("same suit")
    }

    else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
      {
        let six_imgs = $("#finishZone_six").html();
        let one_imgs = $("#box_bottom_one").html();

        $(img).css("margin-left" , "0.4rem");
        $("#finishZone_six").html($(one_imgs) ).append(img);

       $("#box_bottom_one").html(six_imgs)
        console.log("same value")
       //  $(img).remove();

      }

     else {
       console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

     }
    }

  if(document.querySelectorAll("#box_bottom_two > img").length > 0)
   {
   let imgs = document.querySelectorAll("#box_bottom_two > img");
   if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
   {
     if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
     parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
     {
        
       let six_imgs = $("#finishZone_six").html();
       let one_imgs = $("#box_bottom_two").html();
       
       $("#finishZone_six").html("");
      $("#finishZone_six").append(img).html($("#finishZone_six").html() + one_imgs);
      $("#box_bottom_two").html($(six_imgs))

     // $(img).remove();
     }


   else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
   parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
     {
                
       let six_imgs = $("#finishZone_six").html();
       let one_imgs = $("#box_bottom_two").html();
     $("#finishZone_six").html( $(one_imgs) );
     $("#finishZone_six").append(img);

     $("#box_bottom_two").html($(six_imgs))
     //$(img).remove();


     }
     console.log("same suit")
 }

 else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
   {
     let six_imgs = $("#finishZone_six").html();
     let one_imgs = $("#box_bottom_two").html();

     $(img).css("margin-left" , "0.4rem");
     $("#finishZone_six").html($(one_imgs) ).append(img);

    $("#box_bottom_two").html(six_imgs)
     console.log("same value")

   }

  else {
    console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

  }
 }


if( document.querySelectorAll("div#finishZone_six > img").length  > 0)
{
let imgs = document.querySelectorAll("#finishZone_six > img");
if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
{
  if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
  parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
  {
     
    let six_imgs = $("#finishZone_six").html();
    
    $("#finishZone_six").html("");
   $("#finishZone_six").append(img).html($("#finishZone_six").html() + six_imgs);
  // $(img).remove();
  }


else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
  {
             
  $("#finishZone_six").append(img);


  }
  console.log("same suit")
}

else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
{

  $(img).css("margin-left" , "0.4rem");
  $("#finishZone_six").append(img);

  console.log("same value")

}

else {
 console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

}
}

      }



}

playertwo_AddFourthTries_FromThrown = () => {
    let img = document.querySelector("div#throwZone > div >img");

     if(document.querySelectorAll("#finishZone_six > img").length === 0){
        
      if(document.querySelectorAll("#box_bottom_one > img").length > 0)
      {
      let imgs = document.querySelectorAll("#box_bottom_one > img");
        if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
        {
          if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
          parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
          {
          //  appendThrownCardTo_Playertwo();
           //let tempimg =  $("#playerTwo_wrapper").find("img").last();
           $("#finishZone_six").append(img).html($("#finishZone_six").html() + $("#box_bottom_one").html());

           $("#box_bottom_one").html("");

          // $(img).remove();
          }


        else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
          {
           // appendThrownCardTo_Playertwo();

         // let tempimg =  $("#playerTwo_wrapper").find("img").last();
          $("#finishZone_six").html( $("#box_bottom_one").html() );
          $("#finishZone_six").append(img);

          $("#box_bottom_one").html("")
          //$(tempimg).remove();


          }
          console.log("same suit")
      }

      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
        {
        //  appendThrownCardTo_Playertwo();
         // let tempimg =  $("#playerTwo_wrapper").find("img").last();
          $(img).css("margin-left" , "0.4rem");

          $("#finishZone_six").html($("#box_bottom_one").html() )
          $("#finishZone_six").append(img);
 
         $("#box_bottom_one").html("")
          console.log("same value")
         //  $(tempimg).remove();

        }

       else {
         console.log(`imgs info thrown ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-suit")}`);

       }
        
      }

      if(document.querySelectorAll("#finishZone_six > img").length === 0 && document.querySelectorAll("#box_bottom_two > img").length > 0)
      { 
        let imgs = document.querySelectorAll("#box_bottom_two > img");
        if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
        {
          if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
          parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
          {
           // appendThrownCardTo_Playertwo();
           //let tempimg =  $("#playerTwo_wrapper").find("img").last();

           $("#finishZone_six").append(img).html($("#finishZone_six").html() + $("#box_bottom_two").html());
           
           $("#box_bottom_two").html("")
          // $(tempimg).remove();
          }


        if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value")) + 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
          {
           // appendThrownCardTo_Playertwo();
         // let tempimg =  $("#playerTwo_wrapper").find("img").last();
          $("#finishZone_six").html( $("#box_bottom_two").html() ).append(img);
        
          $("#box_bottom_two").html("")

        //  $(img).remove();
      
          }
          console.log("same suit")
      }

      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
        {
          //appendThrownCardTo_Playertwo();
         // let tempimg =  $("#playerTwo_wrapper").find("img").last();
         // $(tempimg).css("margin-left" , "0.4rem");

          $("#finishZone_six").html($("#box_bottom_two").html() ).append(img);
 
         
         $("#box_bottom_two").html("")
          console.log("same value")
         // $(tempimg).remove();

        }

       else {
         console.log(`imgs info thrown ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-suit")}`);

       }
      }

    }
//------------------------------stoppped here =============================================//
    else if(document.querySelectorAll("#finishZone_six > img").length === 3){

      if(document.querySelectorAll("#box_bottom_one > img").length > 0)
      {
      let imgs = document.querySelectorAll("#box_bottom_one > img");
      if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
      {
        if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
        parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
        {
          //appendThrownCardTo_Playertwo();
          let tempimg =  $("#throwZone").find("img");
         // $(tempimg).attr("src", $(tempimg).attr("id"));

          let six_imgs = $("#finishZone_six").html();
          let one_imgs = $("#box_bottom_one").html();
          
          $("#finishZone_six").html("");
         $("#finishZone_six").append(tempimg).html($("#finishZone_six").html() + one_imgs);
         $("#box_bottom_one").html(six_imgs)

        // $(tempimg).remove();
        }


      else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
      parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
        {
         // appendThrownCardTo_Playertwo();
         let tempimg =  $("#throwZone").find("img");

          let six_imgs = $("#finishZone_six").html();
          let one_imgs = $("#box_bottom_one").html();

          $(tempimg).attr("src", $(tempimg).attr("id"));

        $("#finishZone_six").html( one_imgs );
        $("#finishZone_six").append(tempimg);

        $("#box_bottom_one").html(six_imgs)

          //  $(tempimg).remove();
        }
        console.log("same suit")
    }

    else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
      {
       // appendThrownCardTo_Playertwo();
       let tempimg =  $("#throwZone").find("img");

        let six_imgs = $("#finishZone_six").html();
        let one_imgs = $("#box_bottom_one").html();

        $(tempimg).attr("src", $(tempimg).attr("id"));
    
        $("#finishZone_six").html(one_imgs ).append(tempimg);

       $("#box_bottom_one").html(six_imgs)
        console.log("same value")
          //$(tempimg).remove();

      }

     else {
       console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

     }
    }

     if(document.querySelectorAll("#box_bottom_two > img").length > 0)
   {
   let imgs = document.querySelectorAll("#box_bottom_two > img");
   if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
   {
     if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
     parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
     {
      //appendThrownCardTo_Playertwo();
      let tempimg =  $("#throwZone").find("img");
        
       let six_imgs = $("#finishZone_six").html();
       let two_imgs = $("#box_bottom_two").html();

       $(tempimg).attr("src", $(tempimg).attr("id"));

       
       $("#finishZone_six").html("");
      $("#finishZone_six").append(tempimg).html($("#finishZone_six").html() + two_imgs);
      $("#box_bottom_two").html(six_imgs)

     // $(tempimg).remove();
     }


   else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
   parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
     {
      //appendThrownCardTo_Playertwo();
          let tempimg =  $("#throwZone").find("img");
                
       let six_imgs = $("#finishZone_six").html();
       let one_imgs = $("#box_bottom_two").html();
       $(tempimg).attr("src", $(tempimg).attr("id"));

     $("#finishZone_six").html( one_imgs );
     $("#finishZone_six").append(tempimg);

     $("#box_bottom_two").html(six_imgs)


     }
     console.log("same suit")
 }

 else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
   {
    //appendThrownCardTo_Playertwo();
    let tempimg =  $("#throwZone").find("img");

     let six_imgs = $("#finishZone_six").html();
     let one_imgs = $("#box_bottom_two").html();

    // $(tempimg).attr("src", $(tempimg).attr("id"));

     $("#finishZone_six").html(one_imgs ).append(tempimg);

    $("#box_bottom_two").html(six_imgs)
     console.log("same value")
    // $(tempimg).remove();

   }

  else {
    console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

  }
   }


  else( document.querySelectorAll("div#finishZone_six > img").length  > 0)
{
let imgs = document.querySelectorAll("#finishZone_six > img");
if($(imgs[0]).attr("data-suit") === $(img).attr("data-suit"))
{
  if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) - 1 &&
  parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) - 2 )
  {
//appendThrownCardTo_Playertwo();
    let tempimg =  $("#throwZone").find("img");

    let six_imgs = $("#finishZone_six").html();
   // $(tempimg).attr("src", $(tempimg).attr("id"));
    
    $("#finishZone_six").html("");
   $("#finishZone_six").append(tempimg).html($("#finishZone_six").html() + six_imgs);
 //  $(tempimg).remove();
  }


else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[2]).attr("data-value"))+ 1 &&
parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) + 2 )
  {
   // appendThrownCardTo_Playertwo();
    let tempimg =  $("#throwZone").find("img");

     //     $(tempimg).attr("src", $(tempimg).attr("id"));
             
  $("#finishZone_six").append(tempimg);
   $(tempimg).remove();


  }
  console.log("same suit")
}

else if(parseInt($(img).attr("data-value")) === parseInt($(imgs[0]).attr("data-value")) && parseInt($(img).attr("data-value")) === parseInt($(imgs[1]).attr("data-value")) )
{
 // appendThrownCardTo_Playertwo();
          let tempimg =  $("#throwZone").find("img");
           
 // $(tempimg).attr("src", $(tempimg).attr("id"));

  $("#finishZone_six").append(tempimg);

  console.log("same value")
     //$(tempimg).remove();

}

else {
 console.log(`imgs info thrown ${$(img).attr("data-value")} --- ${$(img).attr("data-suit")} compared to ${$(imgs[0]).attr("data-value")} --- ${$(imgs[0]).attr("data-suit")}`);

}
}

      }

    else {  console.log("finish zone six size : " + document.querySelectorAll("#finishZone_six > img").length )}
  }


  playerone_AddFourthTries_dragoverEvent = x => {
 x.addEventListener("dragover",() =>{

  //  cosole.log("draggged over here")
        let tempdraggable = document.querySelector(".dragging > img");
       
       if( $("#finishZone_four").html() == "" )
  {
    

    if($(tempdraggable).attr("data-suit") === $(x).find("img:eq(0)").attr("data-suit") && $(tempdraggable).attr("data-suit") === $(x).find("img:eq(1)").attr("data-suit"))
    {
      if( parseInt($(tempdraggable).attr("data-value") ) === parseInt($(x).find("img:eq(0)").attr("data-value") ) -1 ) 
      {
        
                    let div = document.querySelector(".dragging");
              document.getElementById("finishZone_four").appendChild(div);
            $("#finishZone_four").html(
                $("#finishZone_four").html() + $(x).html());
                $(x).html("");
        
   
        }

        else if( parseInt( $(tempdraggable).attr("data-value")) === parseInt($(x).find("img:eq(2)").attr("data-value") ) + 1  )
        {
            let div = document.querySelector(".dragging");
            $("#finishZone_four").html($(x).html());
            document.getElementById("finishZone_four").appendChild(div);

                $(x).html("");
        
        }
    }

   
    else if((parseInt($(tempdraggable).attr("data-value") ) === 
    parseInt($(x).find("img:eq(0)").attr("data-value") ) && 
    parseInt($(tempdraggable).attr("data-value") ) ===
    parseInt($(x).find("img:eq(1)").attr("data-value") ) ) || $(tempdraggable).attr("data-suit") === "jocker"  )
    {

        console.log("same value")
        let div = document.querySelector(".dragging");
            $("#finishZone_four").html($(x).html());
            document.getElementById("finishZone_four").appendChild(div);

                $(x).html("");
    }  
  }

  else if(document.querySelectorAll("#finishZone_four > div > img").length === 3)
  {
    if(x ===  document.getElementById("finishZone_four"))
    {
           console.log("fourth contINER HOVERED OVER")
    if($(tempdraggable).attr("data-suit") === $(x).find("img:eq(0)").attr("data-suit") && $(tempdraggable).attr("data-suit") === $(x).find("img:eq(1)").attr("data-suit") )
    {
      if( parseInt($(tempdraggable).attr("data-value") ) === parseInt($(x).find("img:eq(0)").attr("data-value") ) -1 ) 
      {
        
                    let div = document.querySelector(".dragging");
                    let temp = $("#finishZone_four").html();
              $("#finishZone_four").html("").append(div).html(  $("#finishZone_four").html() + temp);
        
   
        }

        else if( parseInt( $(tempdraggable).attr("data-value")) === parseInt($(x).find("img:eq(2)").attr("data-value") ) + 1  )
        {
            let div = document.querySelector(".dragging");
            document.getElementById("finishZone_four").appendChild(div);
        }
    }

    else if((parseInt($(tempdraggable).attr("data-value") ) === 
    parseInt($(x).find("img:eq(0)").attr("data-value") ) && 
    parseInt($(tempdraggable).attr("data-value") ) ===
    parseInt($(x).find("img:eq(1)").attr("data-value") ) ) || $(tempdraggable).attr("data-suit") === "jocker"  )
    {

        let div = document.querySelector(".dragging");
            document.getElementById("finishZone_four").appendChild(div);
    } 
    }

    else {
      if($(tempdraggable).attr("data-suit") === $(x).find("img:eq(0)").attr("data-suit") )
      {
        if( parseInt($(tempdraggable).attr("data-value") ) === parseInt($(x).find("img:eq(0)").attr("data-value") ) -1 ) 
        {
          
                      let div = document.querySelector(".dragging");
                      let tempfourth = $("#finishZone_four").html();
                      let tempx = $(x).html();
                $("#finishZone_four").html("").append(div).html(  $("#finishZone_four").html() + tempx);
                $(x).html(tempfourth);
          
     
          }
  
          else if( parseInt( $(tempdraggable).attr("data-value")) === parseInt($(x).find("img:eq(2)").attr("data-value") ) + 1  )
          {
            let div = document.querySelector(".dragging");
            let tempfourth = $("#finishZone_four").html();
            let tempx = $(x).html();
            $("#finishZone_four").html(tempx).append(div);
            $(x).html(tempfourth);
          }
      }

      else if((parseInt($(tempdraggable).attr("data-value") ) === 
      parseInt($(x).find("img:eq(0)").attr("data-value") ) && 
      parseInt($(tempdraggable).attr("data-value") ) ===
      parseInt($(x).find("img:eq(1)").attr("data-value") ) ) || $(tempdraggable).attr("data-suit") === "jocker"  )
      {
        let div = document.querySelector(".dragging");
        let tempfourth = $("#finishZone_four").html();
        let tempx = $(x).html();
        $("#finishZone_four").html(tempx).append(div);
        $(x).html(tempfourth);
   
      } 



    }
  }
    else {
        $(x).css("border-color", "black")

    }
 })
}

addDragEvent = x => {

    x.addEventListener('dragstart', () => {
    //console.log($(x).className);
        x.classList.add("dragging");
      });

    x.addEventListener('dragend', () => {
          x.classList.remove("dragging");
    //console.log("end");
      })

}

draggablesAddEvent= () => {
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
  //console.log("drag start");
  
      draggable.classList.add("dragging");
    });
  
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove("dragging");
  //console.log("end");
  
    })
  })
  
}

throwZone_AddEvent = () => {
  document.getElementById("throwZone").addEventListener("dragover", function(){
  
    if(finishedbox > 2 && (
    document.querySelectorAll("div#firstFinishZone > div").length +
    document.querySelectorAll("div#secondFinishZone > div").length +
    document.querySelectorAll("div#finishZone_four > div").length  === 10))  
    {  
     if(!callfinish) 
     {      callfinish = setTimeout(() => {  finishGame("winner"); },1000)   }
  
    }
  
  
    console.log("throwp2 ")
  console.log(  
    document.querySelectorAll("div#firstFinishZone > div").length +
    document.querySelectorAll("div#secondFinishZone > div").length +
    document.querySelectorAll("div#finishZone_four > div").length )
  
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
  //    console.log($("#throwZone").find("img"))
  //console.log(throwncards_set_valuesuit);
       let playerOne_cards = document.querySelectorAll("div#playerOne_top > div").length + 
        document.querySelectorAll("div#playerOne_bottom > div").length  + 
        document.querySelectorAll("div#firstFinishZone > div").length +
        document.querySelectorAll("div#secondFinishZone > div").length +
        document.querySelectorAll("div#finishZone_four > div").length ;
  
    if(playerOne_cards === 11){
        let div = document.querySelector(".dragging");
  
    $("#throwZone").html(div); 
   console.log("taken from deck" + playerTwo_checkThrownCard() );
     
    let playerTwo_cards = document.querySelectorAll("div#box_bottom_one > img").length +  
                          document.querySelectorAll("div#box_bottom_two > img").length +  
                          document.querySelectorAll("section#playerTwo_wrapper > img").length + 
                          document.querySelectorAll("div#finishZone_six > img").length;
  
      //    console.log("playertwoo " + playerTwo_cards)
    if(playerTwo_cards < 11 ){
      console.log("query " )
          playertwo_AddFourthTries_FromThrown();
        
        
          playerTwo_takeFromDeck("playertwo");
       }
  
         playerTwo_cards = document.querySelectorAll("div#box_bottom_one > img").length +  
                          document.querySelectorAll("div#box_bottom_two > img").length +  
                          document.querySelectorAll("section#playerTwo_wrapper > img").length + 
                          document.querySelectorAll("div#finishZone_six > img").length;
  
       playPlayerTwo_Tries();
  
     
       if(document.querySelectorAll("section#playerTwo_wrapper > img").length <= 4) {
        let tempp2 =  document.querySelectorAll("section#playerTwo_wrapper > img");
  
              let card_counter = 0;
              let nonjocker_indexarray = [];
              let jocker_indexarray = [];
  
  
              tempp2.forEach(x => {
                if($(x).attr("data-suit") !== "jocker")
                {
                  nonjocker_indexarray.push(card_counter);
                }
                else ( jocker_indexarray.push(card_counter));
  
                card_counter++;
            })
       console.log(`joker length : ${jocker_indexarray.length}  non joker : ${nonjocker_indexarray.length}`)
  
            if(document.querySelectorAll("section#playerTwo_wrapper > img").length === 2 && jocker_indexarray.length > 0)
            {
              appendJockerAsFourth(jocker_indexarray[0]);
            }
            else if( nonjocker_indexarray.length < 4 && jocker_indexarray.length > 0)
            {   checkJockerSequence(nonjocker_indexarray, jocker_indexarray);   }
            nonjocker_indexarray = [];
            jocker_indexarray = [];
          }
        
          playertwo_checkboxfour();
  
            if(playerTwo_cards === 11){
                console.log("cards length " + playerTwo_cards)
               playerTwo_chechToThrow();
            }
    }
  })
}

containersAddEvent = () => {
  containers.forEach(container => {
  container.addEventListener('dragover', e => {
      e.preventDefault();


      const afterElement = getDragAfterElement(container , e.clientY , e.clientX);
      const draggable = document.querySelector(".dragging");

         if(afterElement == null){

      container.appendChild(draggable);
         } else {

             container.insertBefore(draggable,afterElement);              
         }
        
         
  })
})
  containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
  
  
        const afterElement = getDragAfterElement(container , e.clientY , e.clientX);
        const draggable = document.querySelector(".dragging");
  
           if(afterElement == null){
  
        container.appendChild(draggable);
           } else {
  
               container.insertBefore(draggable,afterElement);              
           }
          
           
    })
  })
}



function getDragAfterElement(container,y,x) {
  const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

 return draggableElements.reduce((closest , child)=> {
      const box = child.getBoundingClientRect();

     const offset = x - box.right - box.width / 2;
              
    if(offset < 0 && offset > closest.offset){
            
            return { offset : offset , element: child}
      }
      else {     return closest;   }
      
  }, {  offset: Number.NEGATIVE_INFINITY }).element

}

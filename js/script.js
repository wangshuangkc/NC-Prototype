let deckAvailable = cards.filter(card => card.state === 'available')
.map(card =>
  `<div class='card'>
    <div class='card-header'>
     <h5 contenteditable="true" ><input type='checkbox' class='select-tile'/> ${card.title} </h5>
     <code contenteditable="true"> ${card.entities === 1 ?
        card.entities + ` ` :
        card.entities + ` `} </code>
    </div>

    <div class='card-body'>
      <!-- <p>${card.state}</p> -->
      <p contenteditable="true">${ card.entities === 1 ?
         card.entities + ` entity` :
         card.entities + ` entities on ${card.clusterAffected} clusters`}
      </p>
      <h4>Updated ${card.updated}</h4>
      <a class='edit-popup' href='#'> edit </a>
    </div>
  </div>`
);


let deckUpdated = cards.filter(card => card.state !== 'available')
.map(card =>
  `<div class='card'>
    <div class='card-header'>
     <h5 contenteditable="true" > ${card.title} </h5>
    </div>

    <div class='card-body'>
      <!--<p>${card.state}</p>-->
      <p contenteditable="true" >${card.entities} entities on ${card.clusterAffected} clusters </p>
      <h4>Updated ${card.updated}</h4>
      <a class='edit-popup' href='#'> edit </a>
    </div>
  </div>`
);


//buttons

let buttonGroup = buttons.map(button =>
  button.arrow == false ?
  `<button class= "${button.class} ${button.secondClass}">
    ${button.title}
  </button>`
  :
  `<div class =${button.secondClass}>
    <button class= ${button.class}>${button.title}</button>
    <button class='arrow'></button>
  </div>`
);


//checkbox

function checkCheck(){
  let checkbox =$(this).find(".card-header h5 input");
  let checked = checkbox.prop('checked') ? false : true;
  checkbox.prop('checked', checked);
  $('.selected-text').html($('input:checked').length !== 0 ? `/ ` +  $('input:checked').length + ` modules selected  ·  ${`<a class='clear'>clear</a>`}`: '');
  $('.card-body a').click(event => event.stopPropagation());
  $('.clear').click(clearCheck);
 };

function initialCheck(){
  $('.card-body a').click();
  $('.card:eq(0)').click();
}

function clearCheck(){
  $('.card').find(".card-header h5 input").prop('checked', false);
  $('.selected-text').html($('input:checked').length !== 0 ? `/ ` +  $('input:checked').length + ` modules selected ${`<a class='clear'>clear</a>`}`: '');
}

function popupCreator(header, body, footer){

  $('body').after(popBase);
  $('html').css('overflow','hidden');
  $('.overlay').fadeIn();
  $('.popup').append(header, body, footer);
  $('.popup-header, .cancel').click(()=> {
    $('.overlay').fadeOut("slow",() => $('.overlay').remove());
    $('html').css('overflow','');
    }
  );
}

function notificationTip(type, error){
  $('header').append(`
    <div class='notification'>
        <h4>${type}</h4>
        <div class='${error}'>${error}</div>
        <hr>
        <a class='auth'> Authenticate </a>
    <div>`
  ).slideDown('slow', function() {
    $('.auth').click(()=> popupCreator(header[2],body[2], footer[0]));
    setTimeout(()=> $('.notification').fadeOut('slow'), 3000);
  })
}

let errorTitle = `Password Required`;
let errorContent = `please authenticate your vCenter`;
//docready

$(document).ready(function() {
   $('.button-group').append(buttonGroup);
   $(`.section[data-type='available']`).append(deckAvailable);
   $(`.section[data-type='updated']`).append(deckUpdated);
   $('.card').click(checkCheck);
   $('.options-popup').click(()=> popupCreator(header[0],body[0], footer[0]));
   $('.schedule-popup').click(()=> notificationTip(errorTitle, errorContent));
   $('.multi-primary').click(()=> popupCreator(header[2],body[2], footer[0]));
   initialCheck();
   $('.edit-popup').click(()=>popupCreator(header[1],body[1], footer[0]));
});

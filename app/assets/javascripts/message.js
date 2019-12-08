$(function(){   
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
         <div class="upper-message__user-name">
           ${message.user_name}
        </div>
        <div class="upper-message__date">
           ${message.date}
        </div>
      </div>
       <div class="lower-message">
         <p class="lower-message__content">
           ${message.content}
         </p>
       </div>
       <img src=${message.image} >
     </div>`
    return html;
  } else {
    var html = //メッセージに画像が含まれない場合のHTMLを作る
     `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
     </div>`
    return html;
      };
    }



  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html); 
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');        
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  });
});





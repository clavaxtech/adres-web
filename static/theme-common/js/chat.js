// var left_page_size = 10;
// var left_page = 1;

// var right_page_size = 10;
// var right_page = 1;

// var leftMsgProcessing;
// var leftMessageList=true;

// var rightMsgProcessing;
// var rightMessageList=true;

// var leftScrollPos=0;
// var rightScrollPos=0;


// $(document).ready(function(){
// $('.select').chosen();
// $('#chat_listings li:first').trigger('click');
//     window.setInterval(function(){

//         var master_id = $('#chat_master_id').val();
//         var last_msg_id = $('#last_msg_id').val();
//         var first_master_id = $('#first_master_id').val();
//         if(master_id != "" && last_msg_id != ""){
//             checkNewConversation(master_id, last_msg_id);
//             //remove_duplicate_left_msg();
//         }
//         if(first_master_id != ""){
//             checkNewChat(first_master_id);
//         }
//     }, 7000);
//     $(".chat-sidebar").scroll(function(e){
//         if(leftMsgProcessing)
//             return false;

//         if(leftScrollPos != $(".chat-sidebar").scrollTop()){
//             if(leftScrollPos >= $(".chat-sidebar").scrollTop()){
//                 leftScrollPos = $(".chat-sidebar").scrollTop();
//                 return false;
//             }else{
//                 leftScrollPos = $(".chat-sidebar").scrollTop();
//             }
//         }


//         if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {

//             leftMsgProcessing = true;
//             leftScrollData();
//         }

//     });
//     $(".chat-middle").scroll(function(e){

//         if(rightMsgProcessing)
//             return false;

//         /*if(rightScrollPos != $(".chat-middle").scrollTop()){
//             if(rightScrollPos >= $(".chat-middle").scrollTop()){
//                 rightScrollPos = $(".chat-middle").scrollTop();
//                 return false;
//             }else{
//                 rightScrollPos = $(".chat-middle").scrollTop();
//             }
//         }*/

//         if($(this).scrollTop() <= 0) {

//             rightMsgProcessing = true;
//             rightScrollData();
//         }

//     });
//     $(document).on('keypress', '#chat_message_input', function(e){

//         if(e.keyCode === 13){
//             $('#send_msg_btn').trigger('click');
//         }
//         $('#chat_message_input-error').css('display', 'none');
//     });
// });
// function leftScrollData() {
//     if(leftMessageList){
//         var messageId = $("#last_master_id").val();
//         getChatListing(messageId);
//     }
// }
// function rightScrollData() {
//     if(rightMessageList){
//         var messageId = $("#chat_master_id").val();
//         var lastMessageId = $("#first_msg_id").val();
//         loadConversation(messageId, lastMessageId);
//     }
// }
// function getChatListing(messageId){
//     try{
//         var filter_chat = $('#filter_chat').val();
//     }catch(ex){
//         //console.log(ex);
//         var filter_chat = '';
//     }
//     $.ajax({
//         url: '/chat/',
//         type: 'post',
//         dataType: 'json',
//         cache: false,
//         data: {'page': left_page, 'page_size': left_page_size, 'last_msg_id': messageId, 'filter_chat': filter_chat},
//         beforeSend: function(){
//             $('.overlay').show();
//         },
//         success: function(response){
//             $('.overlay').hide();
//             if(response.error == 0){
//                 $("#chat_listings").append(response.chat_listing_html);
//                 if(response.last_master_id){
//                     $('#last_master_id').val(response.last_master_id);
//                 }
//                 leftMsgProcessing = false;
//                 var msg = response.last_master_id;
//                 if(msg){
//                 leftMessageList=true;
//                 }else{
//                  leftMessageList=false;
//                 }

//             }
//         }
//     });
// }
// function loadConversation(messageId, lastMessageId) {
//     if(messageId){
//         master_read_message(messageId);
//     }
//     $.ajax({
//         url: '/chat/chat-history/',
//         type: 'post',
//         dataType: 'json',
//         cache: false,
//         data: {'page': right_page, 'page_size': right_page_size, 'last_msg_id': lastMessageId, 'master_id': messageId},
//         beforeSend: function(){
//             $('.overlay').show();
//         },
//         success: function(response){
//             $('.overlay').hide();
//             if(response.error == 0){
//                 if(lastMessageId){
//                     $("#chat_list").prepend(response.chat_listing_html);
//                 }else{
//                     $("#chat_list").html(response.chat_listing_html);
//                     if(response.last_msg_id){
//                         $('#last_msg_id').val(response.last_msg_id);
//                     }
//                 }

//                 if(response.first_msg_id){
//                     $('#first_msg_id').val(response.first_msg_id);
//                 }


//                 rightMsgProcessing = false;
//                 var msg = response.first_msg_id;
//                 if(msg){
//                 rightMessageList=true;
//                 }else{
//                  rightMessageList=false;
//                 }
//                 // $('.chat-middle').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
//                 // var scrl_top = $('.chat-middle')[0].scrollHeight;
//                 // $(".chat-middle").scrollTop(scrl_top);
//                 $(".chat-middle").scrollTop($(".chat-middle")[0].scrollHeight);
//             }
//         }
//     });
//     }

// function active_chatroom(element){
//     $('.chat_rooms').removeClass('active');
//     $(element).addClass('active');
//     var roomName = $(element).attr('data-id');
//     var masterChatName = $(element).attr('data-name');
//     var masterChatImg = $(element).find('img').attr('src');
//     var activeChatEmail = '<i class="fas fa-envelope"></i> '+$(element).attr('data-email');
//     var activeChatPhone = '<i class="fas fa-phone-alt"></i> '+formatPhoneNumber($(element).attr('data-phone'));
//     var masterChatPropId = $(element).attr('data-property');
//     var masterChatPropName = $(element).attr('data-property-name');
//     if(masterChatPropId){
//         var chat_name = masterChatName+'<br><span><a href="/asset-details/?property_id='+masterChatPropId+'" target="_blank">'+masterChatPropName+'</a><span>';
//         $('.chat_name').html(chat_name);
//     }else{
//         $('.chat_name').html(masterChatName);
//     }
//     $('#chat_master_id').val(roomName);
//     $('#active_chat_img').attr('src',masterChatImg);
//     $('#active_chat_email').html(activeChatEmail);
//     $('#active_chat_phone').html(activeChatPhone);
//     $(".chat-top-active").css('display', 'flex');
//     $(".chat-bottom-fixed").show();
//     loadConversation(roomName, '');
// }
// function save_chat_message(){
//     var usr_msg = $('#chat_message_input').val();
//     var master_id = $('#chat_master_id').val();
//     if(usr_msg.trim() != "" && master_id != "" && !$('#send_msg_btn').attr('disabled')){
//         $("#chat_message_input-error").css('display','none');
//         $.ajax({
//             url: '/chat/save-chat-message/',
//             type: 'post',
//             dataType: 'json',
//             cache: false,
//             data: {'master_id': master_id, 'message': usr_msg},
//             beforeSend: function(){
//                 $('#send_msg_btn').attr('disabled', 'disabled').html('Sending...');
//             },
//             success: function(response){
//                 //$('.overlay').hide();
//                 $('#send_msg_btn').removeAttr('disabled').html('Send');
//                 if(response.error == 0){
//                     $('#chat_message_input').val('');
//                     $("#chat_list").append(response.chat_listing_html);
//                     if(response.last_msg_id){
//                         $('#last_msg_id').val(response.last_msg_id);
//                     }
//                     // $('.chat-middle').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
//                     // var scrl_top = $('.chat-middle')[0].scrollHeight;
//                     // $(".chat-middle").scrollTop(scrl_top);
//                     $(".chat-middle").scrollTop($(".chat-middle")[0].scrollHeight);
//                 }
//             }
//         });
//     } else{
//         $("#chat_message_input-error").css('display','block');
//     }
// }
// function checkNewConversation(messageId, lastMessageId) {

//     if(messageId && lastMessageId){
//         master_read_message(messageId);
//         $.ajax({
//             url: '/chat/chat-history/',
//             type: 'post',
//             dataType: 'json',
//             cache: false,
//             data: {'page': right_page, 'page_size': right_page_size, 'last_msg_id': lastMessageId, 'master_id': messageId, 'msg_type': 'post_msg'},
//             beforeSend: function(){
//                 //$('.overlay').show();
//             },
//             success: function(response){
//                 //$('.overlay').hide();
//                 if(response.error == 0){
//                     var current_id = $('#last_msg_id').val();
//                     if(parseInt(response.last_msg_id) > parseInt(current_id)){
//                         $('#last_msg_id').val(response.last_msg_id);
//                         $("#chat_list").append(response.chat_listing_html);
//                         // $('.chat-middle').mCustomScrollbar("scrollTo","bottom",{scrollInertia:0});
//                         $(".chat-middle").scrollTop($(".chat-middle")[0].scrollHeight);

//                     }

//                 }
//             }
//         });
//     }
// }
// function checkNewChat(messageId) {
//     try{
//         var filter_chat = $('#filter_chat').val();
//     }catch(ex){
//         //console.log(ex);
//         var filter_chat = '';
//     }
//     if(messageId){
//         $.ajax({
//             url: '/chat/',
//             type: 'post',
//             dataType: 'json',
//             cache: false,
//             data: {'page': left_page, 'page_size': left_page_size, 'last_msg_id': messageId, 'msg_type':'post_msg', 'filter_chat': filter_chat},
//             beforeSend: function(){
//                // $('.overlay').show();
//             },
//             success: function(response){
//                 //$('.overlay').hide();
//                 if(response.error == 0){
//                     var current_id = $('#first_master_id').val();
//                     if(response.first_master_id && (parseInt(response.first_master_id) > parseInt(current_id))){
//                         $("#chat_listings").prepend(response.chat_listing_html);
//                         if(response.first_master_id){
//                             $('#first_master_id').val(response.first_master_id);
//                         }
//                     }


//                 }
//             }
//         });
//     }
// }
// function formatPhoneNumber(phoneNumberString) {
//   var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
//   var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//   if (match) {
//     return '(' + match[1] + ') ' + match[2] + '-' + match[3];
//   }
//   return null;
// }
// function master_read_message(messageId){
//     $('.chat_rooms').each(function() {
//         if(parseInt($(this).attr('data-id')) == parseInt(messageId)){
//             $(this).removeClass('unread');
//             $(this).find('.circle').hide();
//         }
//     });
// }
// function filterChatListing(){
//     try{
//         var filter_chat = $('#filter_chat').val();
//     }catch(ex){
//         //console.log(ex);
//         var filter_chat = '';
//     }
//     $.ajax({
//         url: '/chat/',
//         type: 'post',
//         dataType: 'json',
//         cache: false,
//         data: {'page': left_page, 'page_size': left_page_size, 'last_msg_id': '', 'filter_chat': filter_chat},
//         beforeSend: function(){
//             $('.overlay').show();
//         },
//         success: function(response){
//             $('.overlay').hide();
//             if(response.error == 0){
//                 $("#chat_list").empty();
//                 $(".chat-top-active").css('display', 'none');
//                 $(".chat-bottom-fixed").css('display', 'none');
//                 $("#chat_listings").empty();
//                 $("#chat_listings").html(response.chat_listing_html);
//                 $('#chat_master_id').val('');
//                 $('#first_msg_id').val('');
//                 $('#last_msg_id').val('');
//                 if(response.first_master_id){
//                     $('#first_master_id').val(response.first_master_id);
//                 }else{
//                     $('#first_master_id').val('');
//                 }
//                 if(response.last_master_id){
//                     $('#last_master_id').val(response.last_master_id);
//                 }else{
//                     $('#last_master_id').val('');
//                 }
//                 try{
//                     $('#chat_listings li:first').trigger('click');
//                 }catch(ex){
//                     //console.log(ex);
//                 }
//                 leftMsgProcessing = false;
//                 var msg = response.last_master_id;
//                 if(msg){
//                 leftMessageList=true;
//                 }else{
//                  leftMessageList=false;
//                 }

//             }
//         }
//     });
// }
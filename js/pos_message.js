var telephone_list = new Array();
var telephone_result = new Array();
$(function(){
        $("#con1,#con2").click(function(){
            var btn_text = $(this).text();
            var html = "";
            $("#msg_kind li").removeClass('on');
            if(btn_text == "즉시전송"){
              html = '<div class="ms_tbl_cell"><span class="focus_red">*</span>날짜</div>'+
              '<div class="ms_tbl_cell"><input type="text" readonly /></div>';
              $(this).addClass('on');
              $('#date_area').empty();
              $('#date_area').append(html);
            }else{
              html ='<div class="ms_tbl_cell"><span class="focus_red">*</span>날짜</div>'+
                '<div class="ms_tbl_cell date_form"><input type="date" id="reservation_date"/><select id="reservation_si">'+
                '<option value="">시간</option><option>10</option><option>11</option>'+
                '<option>12</option><option>13</option><option>14</option>'+
              '  <option>15</option>  <option>16</option>  <option>17</option>'+
                '<option>18</option><option>19</option> </select> '+
                '  <select id="reservation_mm"><option value="">분</option><option>00</option><option>05</option>'+
                '  <option>10</option><option>15</option><option>20</option>'+
                '  <option>25</option><option>30</option><option>35</option>'+
                '  <option>40</option><option>45</option><option>50</option>'+
                '  <option>55</option>  </select>  </div>';

              $('#date_area').empty();
              $('#date_area').append(html);
              $(this).addClass('on');
            }

        });
        $(document).on('click','#checkall',function(){
                //클릭되었으면
                if($("#checkall").prop("checked")){
                    $("input[name=chk]").prop("checked",true);
                }else{
                    $("input[name=chk]").prop("checked",false);
                }
            })

		$(".tab-contents02 .tab_menu li").click(function(){
            $(".tab-contents02 .tab_menu li").removeClass('on');
            $(".tab-contents02 .conBox").removeClass('on');
            $(this).addClass('on');
            $("#"+$(this).data('id')).addClass('on');
        });
    });

$(document).ready(function(){
  var session_data = sessionStorage.getItem('item');
	session_data = JSON.parse(session_data);
  $('#sms_telephone').text(session_data['list'][0]['sms_telephone']);
  $('#send_sms_telephone').text(session_data['list'][0]['sms_telephone']);
  $('#use_sms_telephone').text(session_data['list'][0]['sms_telephone']);
  $('#sms_telephone').text(session_data['list'][0]['sms_telephone']);
  var sms_telephone = session_data['list'][0]['sms_telephone'];

    if(sms_telephone == '' || sms_telephone == undefined){
      messagebox('문자는 발신번호를 등록하여야지만 사용가능합니다.\n관리자에게 문의 바랍니다.');
    }
  $('#shop_name').text(session_data['list'][0]['display_name']);
  $('#member_list').click(function(){
    var user_access_code = session_data['list'][0]['access_code'];
    var html = '<div class="ms_tbl_row"><div class="ms_tbl_cell"><input type="checkbox" id="checkall" /></div>'+
        '<div class="ms_tbl_cell">이름</div><div class="ms_tbl_cell">전화번호</div>'+
    '  <div class="ms_tbl_cell" id="visit_count_btn">방문횟수<img src="../images/up_btn.png"/><!--<img src="../images/down_btn.png"/>--></div>'+
      '<div class="ms_tbl_cell" id="visit_date_btn">마지막 방문일<img src="../images/up_btn.png"/><!--<img src="../images/down_btn.png"/>--></div>'+
      '</div>';


    $.ajax({
         url:'https://piick.co.kr',
         type:'post',
         data:{"_action":"user","_plugin":"user","_action_type":"load","_user_access_code":user_access_code },
         success:function(data){
            console.log(data);

            for(var i=0; i < data['list'].length; i++){
              var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
              if(session_data['list'][0]['franchisee_status'] == 'lite' && name != ''){
                var name = name.substr( 0, 1 );
                var name = name+"**";
              }
                html += 	'<div class="ms_tbl_row addr_list_focus" id="user_row" data-r-field="row">'+
                    '<div class="ms_tbl_cell"> <input type="checkbox" name="chk"/></div>'+
                    '<div class="ms_tbl_cell" data-r-field="name">'+name+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="user_code">'+data['list'][i]['user_code']+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="visit_count">'+data['list'][i]['visit_count']+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="last_registered">'+data['list'][i]['last_registered']+'</div>'+
                  '</div>';
            }
            $('#join_list').empty();
            $('#join_list').append(html);
         }
     })

  });

  $('#member_search').click(function(){
    var user_access_code = session_data['list'][0]['access_code'];
    var member_select =$('#member_select option:selected').val();
    var member_search_value = $('#member_search_value').val();
    var search = new Array();
    search[0] = {"search_key":member_select,"search_value":member_search_value};
    var html = '<div class="ms_tbl_row"><div class="ms_tbl_cell"><input type="checkbox" id="checkall" /></div>'+
        '<div class="ms_tbl_cell">이름</div><div class="ms_tbl_cell">전화번호</div>'+
    '  <div class="ms_tbl_cell" id="visit_count_btn">방문횟수<img src="../images/up_btn.png"/><!--<img src="../images/down_btn.png"/>--></div>'+
      '<div class="ms_tbl_cell" id="visit_date_btn">마지막 방문일<img src="../images/up_btn.png"/><!--<img src="../images/down_btn.png"/>--></div>'+
      '</div>';


    $.ajax({
         url:'https://piick.co.kr',
         type:'post',
         data:{"_action":"user","_plugin":"user","_action_type":"load","_user_access_code":user_access_code,"_search": search },
         success:function(data){

            for(var i=0; i < data['list'].length; i++){
              var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
                html += 	'<div class="ms_tbl_row addr_list_focus" id="user_row" data-r-field="row">'+
                    '<div class="ms_tbl_cell"> <input type="checkbox" name="chk"/></div>'+
                    '<div class="ms_tbl_cell" data-r-field="name">'+name+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="user_code">'+data['list'][i]['user_code']+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="visit_count">'+data['list'][i]['visit_count']+'</div>'+
                    '<div class="ms_tbl_cell" data-r-field="last_registered">'+data['list'][i]['last_registered']+'</div>'+
                  '</div>';
            }
            $('#join_list').empty();
            $('#join_list').append(html);
         }
     })
  });
	$(".message_title").click(function(){
		if($(this).hasClass("off")){
			$(this).addClass("on");
			$(this).removeClass("off");
			$(".title_insert").fadeIn(1)
		}else{
			$(".title_insert").fadeOut(1)
			$(this).addClass("off");
			$(this).removeClass("on");
		}

	});

	$(".message_gwang").click(function(){
		if($(this).hasClass("off")){
			$(this).addClass("on");
			$(this).removeClass("off");
			$(".gwang_insert, .telnone_insert").fadeIn(1)
		}else{
			$(".gwang_insert, .telnone_insert").fadeOut(1)
			$(this).addClass("off");
			$(this).removeClass("on");
		}

	});

	$(".message_img").click(function(){
		if($('.img_insert').css("display") == "none"){
			$(".message_pop ,.img_pop_con").fadeIn();

		}else{
			messagebox('이미지는 한개만 전송이 가능합니다.');
		}

	});
	$('.pop_insert_btn').click(function(){
		var radio_value = $(':radio[name="insert_img"]:checked').val();
		var file_name = $('#upload_name').val();
		var html ='';

		if(radio_value != undefined){
			var img_src = $(':radio[name="insert_img"]:checked').parents().children().eq(1).children().first().attr('src');
			html = "<img src='"+img_src+"' id='img_insert'/><div class='img_delete_btn'>사진삭제</div>";
			$('.img_insert').append(html);
			$(".message_pop ,.img_pop_con").fadeOut();
			$('.img_insert').fadeIn();
			$(".message_img").addClass("on");
			$(".message_img").removeClass("off");
		}else if(file_name != ''){
      var formData = new FormData();
      formData.append('_action', 'upload_image');
      formData.append('_plugin', 'file');
      formData.append("upload",$("input[name=upload_file]")[0].files[0]);

      $.ajax({
               url: 'https://piick.co.kr',
               processData: false,
              contentType: false,
               data: formData,
               type: 'POST',
               success: function(result){
                 console.log(result);
                 var src = "https://piick.co.kr/"+result['link'];
                     html = "<img src='"+src+"' id='img_insert'/><div class='img_delete_btn'>사진삭제</div>";
                    $('.img_insert').append(html);
                    $(".message_pop ,.img_pop_con").fadeOut();
                    $('.img_insert').fadeIn();
                    $(".message_img").addClass("on");
                    $(".message_img").removeClass("off");
               }
       });
		}else{
			messagebox("등록하실 이미지를 선택해 주세요.");
		}
	});

	$(document).on( "click" , ".img_delete_btn" , function(){
		$('.img_insert').empty().css({"display":"none"});
		$(".message_img").addClass("off");
		$(".message_img").removeClass("on");
	});

	$(".send_btn span").click(function(){
    var subject = $('.title_input').val();
    var advertisement = $('.gwang_insert').css('display') == 'none' ? '' : '(광고) '+$('#shop_name').text();
    var img_src = $('.img_insert').css('display') == 'none' ? '' : $('#img_insert').attr('src');
    var content = $('#real_content').val();
    var html = '<div class="ms_tbl_row"><div class="ms_tbl_cell">이름</div>'+
                '<div class="ms_tbl_cell">번호</div><div class="ms_tbl_cell">삭제</div></div>';

    if(telephone_list.length == 0){
      messagebox('발송할 번호를 추가하여 주십시오.');
      return false;
    }
    if(subject == ''){
      $('.insert_title').hide();
    }else{
      $('.insert_title').text(subject);
      $('.insert_title').show();
    }

    if(img_src == ''){
      $('.insert_image').hide();
    }else{
      $('.insert_image').children().first().attr('src',img_src);
      $('.insert_image').show();
    }

    if(advertisement == ''){
      $('.insert_gwang').hide();
      $('.insert_telnone').hide();
    }else{
      $('.insert_gwang').text(advertisement);
      $('.insert_gwang').show();
      $('.insert_telnone').show();
    }
    $('.insert_summery').text(content);
    $('#telephone_list_count').text(telephone_list.length);
    if($('#con2').hasClass('on')){
      var reservation_date = $('#reservation_date').val();
      var reservation_si = $('#reservation_si option:selected').val();
      var reservation_mm = $('#reservation_mm option:selected').val();
      var reservation = reservation_date+" "+reservation_si+":"+reservation_mm;
      if(reservation_date !='' || reservation_si !='' || reservation_mm != ''){
        $('#reservation_time').text(reservation);
        $('#reservation_li').show();
      }else{
        messagebox('예약시간을 제대로 선택하여 주십시오.');
        return false;
      }

    }else{
      $('#reservation_li').hide();
    }
    for(var r=0; r < telephone_list.length; r++){
      html += '<div class="ms_tbl_row"><div class="ms_tbl_cell">'+telephone_list[r]['name']+'</div>'+
        '<div class="ms_tbl_cell">'+telephone_list[r]['phone']+'</div>'+
        '<div class="ms_tbl_cell"><span class="user_delete">삭제</span></div></div>';

    }
    $('#telephone_list_area').empty();
    $('#telephone_list_area').append(html);
    $(".message_pop ,.send_ok_pop").fadeIn();
	});

	/*전송하기 팝업 -> 전송 버튼 클릭시*/
	$(".pop_send_btn").click(function(){
    var msg_subject = $('.title_input').val();
    var message= $('#real_content').val();
    var img_file= $('.img_insert').css('display') == 'none' ? '' : $('#img_insert').attr('src');
    var advertisement = $('.gwang_insert').css('display') == 'none' ? '' : '(광고)'+$('#shop_name').text();
    var all_count= telephone_list.length;
    var sender = $('#sms_telephone').val();
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    sender = sender.replace(regExp, "");
    var phone='';
    message = message.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    if(advertisement == ''){
      message = message
    }else{
      message= advertisement+"<br/>"+message+"<br/>무료수신거부:080-881-7403";
    }
    var message_byte = byteCheck(message);
    for(var m=0; m < all_count; m++){
      if(m == Number(all_count)-1){
        phone += telephone_list[m]['phone'];
      }else{
        phone += telephone_list[m]['phone']+",";
      }
    }
    if(!$('#con2').hasClass('on')){
      var submit_data = {"msg_subject":msg_subject,"message":message,"img_file":img_file,"all_count":all_count,"sender":sender,"receiver":phone,"message_byte":message_byte};
    }else{
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
      var date = now.getDate();


      //mm = now.getMinutes(mm);
      if((month + "").length < 2){        //2자리가 아니면 0을 붙여줌.
           month = "0" + month;
      }
      var now_time = year+'-'+month+'-'+date;
      var reservation_date = $('#reservation_date').val();
      var reservation_si = $('#reservation_si option:selected').val();
      var reservation_mm = $('#reservation_mm option:selected').val();
      var reservation = reservation_date+" "+reservation_si+":"+reservation_mm;
      var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
      var rdate = reservation_date.replace(regExp, "");
      var rtime = reservation_si+reservation_mm;


      var submit_data = {"msg_subject":msg_subject,"message":message,"img_file":img_file,"all_count":all_count,"sender":sender,"receiver":phone,"message_byte":message_byte,"rdate":rdate,"rtime":rtime,"reservation_registered":reservation};

    }

    $.ajax({
      url: 'https://piick.co.kr',
      type: 'POST',
      data: {"_plugin":'common',"_action_type":'aligo',"_action":'send_sms',"_submit_data":submit_data,"message_byte":message_byte},
      success: function(data) {
        if(data['code'] == 000){
           $(".send_ok_pop").fadeOut();
      		 	   $(".pop_send_ok").fadeIn();

        }else{
          alerlt(data['message_ko']);
        }

      }
    });

	});

/*전송하기안에 삭제버튼*/
$(document).on('click','.user_delete',function(){
var mobile = $(this).parent().prev().text();
var index = telephone_list.findIndex(i => i.phone == mobile);
telephone_list.splice(index,1);
var html = '<div class="ms_tbl_row"><div class="ms_tbl_cell">이름</div>'+
            '<div class="ms_tbl_cell">번호</div><div class="ms_tbl_cell">삭제</div></div>';
for(var r=0; r < telephone_list.length; r++){
  html += '<div class="ms_tbl_row"><div class="ms_tbl_cell">'+telephone_list[r]['name']+'</div>'+
    '<div class="ms_tbl_cell">'+telephone_list[r]['phone']+'</div>'+
    '<div class="ms_tbl_cell"><span class="user_delete">삭제</span></div></div>';

}
$('#telephone_list_area').empty();
$('#telephone_list_area').append(html);
$('#telephone_list_count').text(telephone_list.length);
});
/*전송하기안에삭제버튼end*/



	/*자동문자 설정 설명팝업*/
	$(".ms_info_btn").click(function(){
		$(".message_pop, .ms_setting_pop_con").fadeIn()
	});

	/*pop-up off*/

	$(".pop_close_btn").click(function(){
		$(".img_pop_con").fadeOut();
		$(".send_ok_pop").fadeOut();
		$(".message_pop").fadeOut();
		$(".use_pop_con").fadeOut();
		$(".ms_setting_pop_con").fadeOut();
	});

	// $(".tamp_btn span").click(function(){
	// 	$(".message_pop ,.tamp_insert_ok").fadeIn();
	// });
	$(".pop_ok_btn").click(function(){
		$(".message_pop ,.tamp_insert_ok,.pop_send_ok").fadeOut();

	});

	$(".tamp_pop_close").click(function(){
		$(".message_pop ,.tamp_pop_con").fadeOut();
	});

	/*birth on off*/
	var check = $(".birth_on label input[type='checkbox']");
	check.click(function(){

    if($('#birth_on_btn').css('display') == "inline-block"){
      //off일떄

      var submit_data = {"birth_auto_message_status":false};
      $.ajax({
       url: 'https://piick.co.kr',
       type: 'POST',
       data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
       success: function(data) {
         console.log(data);
         if(data['code'] == 000){

           $.ajax({
            url: 'https://piick.co.kr',
            type: 'POST',
            data: {"_plugin":'common',"_action_type":'birth_aligo_reservation_cancel',"_action":'sms'},
            success: function(data) {
              messagebox(data['message_ko']);
              $("#birth_on_off").css({'background-color': '#ddd'});
              $(".slide_cycle").css({'transform': 'translateX(0px)'});
              $('#birth_off_btn').show();
              $('#birth_on_btn').hide();
            }
           });
         }else{
           messagebox('실패하였습니다.관리자에게 문의바랍니다.');
         }
       }
      });
    }else{
      var setting_data = localStorage.getItem('user_information');
      setting_data = JSON.parse(setting_data);
      if(setting_data['list'][0]['birth_auto_message_content'] == undefined || setting_data['list'][0]['birth_auto_message_time'] == undefined || setting_data['list'][0]['birth_auto_message_time'] == ''||setting_data['list'][0]['birth_auto_message_content'] == ''){
        messagebox('자동으로 보낼 문자를 설정해주세요.');
        return false;
      }else{
      var submit_data = {"birth_auto_message_status":true};
          $.ajax({
           url: 'https://piick.co.kr',
           type: 'POST',
           data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
           success: function(data) {
             console.log(data);
             if(data['code'] == 000){
               messagebox('매일 자동으로 설정한 시간에 설정한 내용으로\n 해당 회원에게 문자가 발송됩니다.')
               $("#birth_on_off").css({'background-color': '#2196F3'});
               $(".slide_cycle").css({'transform': 'translateX(30px)'});
               $('#birth_off_btn').hide();
               $('#birth_on_btn').show();
             }else{
               messagebox('실패하였습니다.\n관리자에게 문의바랍니다.');
             }
           }
          });
      }
    }

	});
/*환경설정 버튼*/
$('#setting_btn').click(function(){
  $.ajax({
    url: 'https://piick.co.kr',
    type: 'POST',
    data: {"_plugin":'user',"_action_type":'my_information',"_action":'user'},
    success: function(data) {
      console.log(data);
      localStorage.setItem('user_information',JSON.stringify(data));
      if(data['list'][0]['birth_auto_message_status'] == true){

        $("#birth_on_off").css({'background-color': '#2196F3'});
        $(".slide_cycle").css({'transform': 'translateX(30px)'});
        $('#birth_off_btn').hide();
        $('#birth_on_btn').show();
      }else{
        $("#birth_on_off").css({'background-color': '#ccc'});
        $(".slide_cycle").css({'transform': 'translateX(0px)'});
        $('#birth_off_btn').show();
        $('#birth_on_btn').hide();
      }

      var birth_img_src = data['list'][0]['birth_auto_message_img_file'] == '' ||data['list'][0]['birth_auto_message_img_file'] == undefined ? "../images/img_guaid_line.jpg":"https://piick.co.kr/"+data['list'][0]['birth_auto_message_img_file'] ;
      //$('.birth_insert_img').children().first().attr('src',birth_img_src);
      $('.birth_insert_img').empty();
      $('.birth_insert_img').append('<img src='+birth_img_src+' />');
      $('#birth_textarea').val(data['list'][0]['birth_auto_message_content']);
      $('#birth_shop_name').text(data['list'][0]['display_name']);
      if(data['list'][0]['birth_auto_message_time'] != undefined){
      var split_birth_auto_message_time = data['list'][0]['birth_auto_message_time'].split(':');
      $('#birth_si_select').val(split_birth_auto_message_time[0]);
      $('#birth_mm_select').val(split_birth_auto_message_time[1]);
    }
      if(data['list'][0]['visit_auto_message_status'] == true){
        $("#visit_on_off").css({'background-color': '#2196F3'});
        $(".slide_cycle2").css({'transform': 'translateX(30px)'});
        $('#visit_off_btn').hide();
        $('#visit_on_btn').show();
      }else{
        $("#visit_on_off").css({'background-color': '#ccc'});
        $(".slide_cycle2").css({'transform': 'translateX(0px)'});
        $('#visit_off_btn').show();
        $('#visit_on_btn').hide();
      }
      $('#visit_shop_name').text(data['list'][0]['display_name'])
      var visit_img_src = data['list'][0]['visit_auto_message_img_file'] == '' ||data['list'][0]['visit_auto_message_img_file'] == undefined ? "../images/img_guaid_line.jpg":"https://piick.co.kr/"+data['list'][0]['visit_auto_message_img_file'] ;
      $('.find_insert_img').empty();
      $('.find_insert_img').append('<img src='+visit_img_src+' />');
      $('.find_insert_img').children().first().attr('src',birth_img_src);
      $('#visit_textarea').val(data['list'][0]['visit_auto_message_content']);
      if(data['list'][0]['visit_auto_message_time'] != undefined){
      var split_visit_auto_message_time = data['list'][0]['visit_auto_message_time'].split(':');
      $('#visit_si_select').val(split_visit_auto_message_time[0]);
      $('#visit_mm_select').val(split_visit_auto_message_time[1]);
      $('#visit_date_select').val(data['list'][0]['visit_auto_message_date']);
    }
    }
  });
});

/*환경설정 버튼end*/
	/*find on off*/
	var check2 = $(".find_on label input[type='checkbox']");
	check2.click(function(){


    if($('#visit_on_btn').css('display') == "inline-block"){
      //off일떄

      var submit_data = {"visit_auto_message_status":false};
      $.ajax({
       url: 'https://piick.co.kr',
       type: 'POST',
       data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
       success: function(data) {
         console.log(data);
         if(data['code'] == 000){

           $.ajax({
            url: 'https://piick.co.kr',
            type: 'POST',
            data: {"_plugin":'common',"_action_type":'visit_aligo_reservation_cancel',"_action":'sms'},
            success: function(data) {
              messagebox(data['message_ko']);
              $("#visit_on_off").css({'background-color': '#ccc'});
              $(".slide_cycle2").css({'transform': 'translateX(0px)'});
              $('#visit_off_btn').show();
              $('#visit_on_btn').hide();
            }
           });
         }else{
           messagebox('실패하였습니다.관리자에게 문의바랍니다.');
         }
       }
      });
    }else{
      var setting_data = localStorage.getItem('user_information');
      setting_data = JSON.parse(setting_data);
      if(setting_data['list'][0]['visit_auto_message_content'] == undefined || setting_data['list'][0]['visit_auto_message_time'] == undefined || setting_data['list'][0]['visit_auto_message_time'] == ''||setting_data['list'][0]['visit_auto_message_content'] == ''){
        messagebox('자동으로 보낼 문자를 설정해주세요.');
        return false;
      }else{
      var submit_data = {"visit_auto_message_status":true};
          $.ajax({
           url: 'https://piick.co.kr',
           type: 'POST',
           data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
           success: function(data) {
             console.log(data);
             if(data['code'] == 000){
               messagebox('매일 자동으로 설정한 시간에 설정한 내용으로\n 해당 회원에게 문자가 발송됩니다.')
               $("#visit_on_off").css({'background-color': '#2196F3'});
               $(".slide_cycle2").css({'transform': 'translateX(30px)'});
               $('#visit_off_btn').hide();
               $('#visit_on_btn').show();
             }else{
               messagebox('실패하였습니다.\n관리자에게 문의바랍니다.');
             }
           }
          });
      }
    }
	});


  $(".birth_insert_setting_btn").click(function(){
      $(".message_pop ,.birth_insert_setting_box").fadeIn();
   });

   $(".find_insert_setting_btn").click(function(){
      $(".message_pop ,.find_insert_setting_box").fadeIn();
   });

   $(".set_close_btn").click(function(){
      $(".message_pop, .birth_insert_setting_box, .find_insert_setting_box").fadeOut();
   });
});

/*------------------------------------------------------*/
$(document).ready(function(){
/*---------템플릿 저장버튼----------*/
  $('.tamp_btn').click(function(){
    var content = $('#real_content').val();
    var subject = $('.title_input').val();
    var img_src = $('#img_insert').attr('src') == undefined ? '' : $('#img_insert').attr('src');
    var advertisement = $('.gwang_insert').css('display') == 'none' ? '' : '(광고)'+$('#shop_name').text();
    var submit_data = {"msg_subject":subject,"msg_content":content,"img_file":img_src,"advertisement":advertisement};

      $.ajax({
        url: 'https://piick.co.kr',
        type: 'POST',
        data: {"_plugin":'common',"_action_type":'template_insert',"_action":'send_sms',"_submit_data":submit_data},
        success: function(data) {
            if(data['code'] == 000){
              $(".message_pop ,.tamp_insert_ok").fadeIn();
              location.reroad();
            }else{
              messagebox('실패하였습니다. 관리자에게 문의바랍니다.');
            }

        }
      });
  });
/*---------템플릿 저장버튼end----------*/
/*---------템플릿리스트----------*/
$('.message_tamp').click(function(){
  var html ="";
  $.ajax({
    url: 'https://piick.co.kr',
    type: 'POST',
    data: {"_plugin":'common',"_action_type":'template_list',"_action":'send_sms'},
    success: function(data) {
        console.log(data);
          if(data['list'] !=undefined){
            localStorage.setItem('template_list', JSON.stringify(data['list']));
            console.log(data)
          for(var i=0; i < data['list'].length; i++){
            html += ' <li class="tamp_con_form"><div class="tamp_con">'+
                  ' <div class="tamp_insert_title">'+data['list'][i]['msg_subject']+'</div>';
                  if(!(data['list'][i]['img_file'] =='' || data['list'][i]['img_file'] == undefined)){
                    html +=  ' <div class="tamp_insert_image"><img src="'+data['list'][i]['img_file']+'"></div>';
                  }
                  if(!(data['list'][i]['advertisement'] =='' || data['list'][i]['advertisement'] == undefined)){
                    html +=  '<div class="tamp_insert_gwang">'+data['list'][i]['advertisement'] +'</div>';
                  }
                  html += ' <div class="tamp_insert_summery">'+data['list'][i]['msg_content']+'</div>';
                  if(!(data['list'][i]['advertisement'] =='' || data['list'][i]['advertisement'] == undefined)){
                    html +=  ' <div class="tamp_insert_telnone">무료수신거부 : <span>080-881-7403</span></div>';
                  }
                  html += ' </div><div class="tamp_pop_btn" idx="'+data['list'][i]['idx']+'"><div class="tamp_delete_btn"><span>삭제</span></div> '+
                          ' <div class="tamp_insert_btn"><span>적용</span></div></div></li>';
            }
            $('.tamp_list').empty();
            $('.tamp_list').append(html);
      }
    }
  });
  $(".message_pop, .tamp_pop_con").fadeIn()

});
/*---------템플릿리스트end----------*/
/*--------------템플릿삭제----------*/
$(document).on('click','.tamp_delete_btn',function(){
  var idx = $(this).parent().attr('idx');
  var submit_data = {"idx":idx};
  $.ajax({
    url: 'https://piick.co.kr',
    type: 'POST',
    data: {"_plugin":'common',"_action_type":'template_delete',"_action":'send_sms',"_submit_data":submit_data},
    success: function(data) {
      console.log(data);
        if(data['code'] == 000){

          messagebox('삭제되었습니다.')
            location.reload();

        }else{
          messagebox('실패하였습니다. 관리자에게 문의바랍니다.');
        }

    }
  });

});
/*------------템플리삭제end-------------*/
/*--------------템플릿적용----------*/
$(document).on('click','.tamp_insert_btn',function(){
  var template_list = localStorage.getItem('template_list');
  template_list = JSON.parse(template_list);
  var idx = $(this).parent().attr('idx');
  var subject = template_list[idx]['msg_subject'];
  var img_src = template_list[idx]['img_file'];
  var advertisement = template_list[idx]['advertisement'];
  var content = template_list[idx]['msg_content'];

  if(subject != '' && subject != undefined){
    $('.title_input').val(subject);
    $('.title_insert').fadeIn();
  }else{
    $('.title_input').val('');
    $('.title_insert').fadeOut();
  }

  if(img_src != '' && img_src != undefined){
    var html = "<img src='"+img_src+"' id='img_insert' /><div class='img_delete_btn'>사진삭제</div>";
    $('.img_insert').empty();
    $('.img_insert').append(html);
    $('.img_insert').fadeIn();
  }else{
    $('.img_insert').empty();
    $('.img_insert').fadeOut();
  }

  if(advertisement != '' && advertisement != undefined){
    $('.telnone_insert').fadeIn();
    $('.gwang_insert').fadeIn();
  }else{
    $('.telnone_insert').fadeOut();
    $('.gwang_insert').fadeOut();
  }
  $('#real_content').val(content);
$('.message_pop').fadeOut();
});
/*------------템플리적용end-------------*/

/*-----------번호 직접입력 번호추가&삭제--------------*/
$('.send_input_insert').click(function(){
    var html = '<div class="ms_tbl_row"><div class="ms_tbl_cell"></div>'+
        '<div class="ms_tbl_cell"><input type="text" placeholder="번호만 입력해 주세요." id="new_list_mobile" /></div>'+
        '<div class="ms_tbl_cell" id="new_list_drop"><span>삭제</span></div></div>';

      $('#new_number_list').append(html);
});

$(document).on('click','#new_list_drop',function(){
  var phone = $(this).prev().children().first().val();
  var index = telephone_list.findIndex(i => i.phone == phone);
  telephone_list.splice(index,1);
  $(this).parent().remove();

});

$(document).on('focusout','#new_list_mobile',function(){
  var mobile = $(this).val();
  var send_count = $('#send_count').val();
  var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  if(!regExp.test(mobile)){
    messagebox('올바른 번호를 넣어주세요.');
  }else{
    if(telephone_list.findIndex(i => i.phone == mobile) == -1){
      telephone_list.push({"name":'',"phone":mobile});
      telephone_list = texDupArr(telephone_list);
      $('#send_count').val(telephone_list.length);

    }else{
      messagebox('해당번호는 이미 있습니다.');
      $(this).val('');
    }

  }
});
/*-----------번호 직접입력 번호추가&삭제end--------------*/

/*-------------회원목록 정렬--------------------*/
$(document).on("click",'#visit_count_btn,#visit_date_btn',function(){
    var btn_text = $(this).text();
    var btn_img_src = $(this).children().first().attr('src');
    var search_value = '';
    var order = '';



    if(btn_text == "방문횟수"){
      search_value="visit_count";
    }else{
      search_value="last_registered";
    }

    if(btn_img_src == "../images/up_btn.png"){

      $(this).children().first().attr('src',"../images/down_btn.png");
      btn_img_src =   $(this).children().first().attr('src');
      order = 'desc';
    }else{
      $(this).children().first().attr('src',"../images/up_btn.png");
      order = 'asc';
      btn_img_src =   $(this).children().first().attr('src');
    }
    var html = '	<div class="ms_tbl_row"><div class="ms_tbl_cell"><input type="checkbox" id="checkall" /></div>'+
        '<div class="ms_tbl_cell">이름</div><div class="ms_tbl_cell">전화번호</div>'+
        '<div class="ms_tbl_cell" id="visit_count_btn">방문횟수 <img src="'+btn_img_src+'"/></div>'+
        '<div class="ms_tbl_cell" id="visit_date_btn">마지막 방문일 <img src="'+btn_img_src+'"/></div></div>';

    $.ajax({
      url: 'https://piick.co.kr',
      type: 'POST',
      data: {"_plugin":'user',"_action_type":'load',"_action":'user',"search_value":search_value,"order":order},
      success: function(data) {
        console.log(data);
        for(var i=0; i < data['list'].length; i++){
          var name = data['list'][i]['name'] == undefined ? '' : data['list'][i]['name'];
        html += '<div class="ms_tbl_row addr_list_focus" data-r-field="row">'+
          '<div class="ms_tbl_cell"> <input type="checkbox" name="chk"/></div>'+
          '<div class="ms_tbl_cell" data-r-field="name">'+name+'</div>'+
          '<div class="ms_tbl_cell" data-r-field="user_code">'+data['list'][i]['user_code']+'</div>'+
          '<div class="ms_tbl_cell" data-r-field="visit_count">'+data['list'][i]['visit_count']+'</div>'+
          '<div class="ms_tbl_cell" data-r-field="last_registered">'+data['list'][i]['last_registered']+'</div></div>';

        }
        $('#join_list').empty();
        $('#join_list').append(html);
      }
    });
});


/*----------------회원목록 정렬 end-------------*/
/*---------------회원번호추가버튼-------------*/
$(document).on('click','#user_row',function(){
  if($(this).children().first().children().first().is(":checked") == true) {
    $(this).children().first().children().first().prop("checked", false);
  }else{
    $(this).children().first().children().first().prop("checked", true);
  }
});

$('.addr_list_input_btn').click(function(){
  $('input:checkbox[name="chk"]').each(function() {
    if($(this).is(":checked") == true) {
      var check_name = $(this).parent().parent().children().eq(1).text();
      var check_phone = $(this).parent().parent().children().eq(2).text();
      telephone_list.push({"name":check_name,"phone":check_phone});

    }

    });
    telephone_list = texDupArr(telephone_list);
    $('#send_count').val(telephone_list.length);

messagebox('등록 되었습니다.\n중복번호는 자동으로 제거 됩니다.');
});
/*-------------회원번호추가버튼end-----------------*/


/*--------------사용내역-------------------------*/
$('#use_list').click(function(){
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
  var date = now.getDate();
  var html = '<div class="ms_tbl_row">'+
    '<div class="ms_tbl_cell">제목</div>'+
    '<div class="ms_tbl_cell">내용</div>'+
    '<div class="ms_tbl_cell">발송시간</div>'+
    '<div class="ms_tbl_cell">건수</div>'+
    '<div class="ms_tbl_cell">타입</div>'+
    '</div>';
  if((month + "").length < 2){        //2자리가 아니면 0을 붙여줌.
       month = "0" + month;
  }
  if((date + "").length < 2){        //2자리가 아니면 0을 붙여줌.
       date = "0" + date;
  }
$('#start_date').val(year+"-"+month+"-01");
$('#end_date').val(year+"-"+month+"-"+date);

$.ajax({
  url: 'https://piick.co.kr',
  type: 'POST',
  data: {"_plugin":'common',"_action_type":'load',"_action":'sms'},
  success: function(data) {
    if(data['list'] != undefined){
      console.log(data);
      for(var i=0; i < data['list'].length; i++){
        var reservation_registered = data['list'][i]['reservation_registered'] == '' ? data['list'][i]['insert_registered']:data['list'][i]['reservation_registered']
        var img_file = data['list'][i]['img_file'] == '' ? '':data['list'][i]['img_file'];
          html += '<div class="ms_tbl_row use_list_select" id="use_select" src="'+img_file+'" mid="'+data['list'][i]['msg_id']+'">'+
            '<div class="ms_tbl_cell"><span>'+data['list'][i]['msg_subject']+'</span></div>'+
            '<div class="ms_tbl_cell"><span>'+data['list'][i]['message']+'</span></div>'+
            '<div class="ms_tbl_cell">'+reservation_registered+'</div>'+
            '<div class="ms_tbl_cell">'+data['list'][i]['all_count']+'</div>'+
            '<div class="ms_tbl_cell">'+data['list'][i]['msg_type']+'</div>'+
          '</div>';
      }
      $('#use_list_area').empty();
      $('#use_list_area').append(html);
    }
  }
});

});
$('#use_serach_btn').click(function(){
  var start_date = $('#start_date').val();
  var end_date = $('#end_date').val();
  var html = '<div class="ms_tbl_row">'+
    '<div class="ms_tbl_cell">제목</div>'+
    '<div class="ms_tbl_cell">내용</div>'+
    '<div class="ms_tbl_cell">발송시간</div>'+
    '<div class="ms_tbl_cell">건수</div>'+
    '<div class="ms_tbl_cell">타입</div>'+
    '</div>';
    var search = new Array();
    search[0] = {"search_key":"start_date","search_value":start_date};
	  search[1] = {"search_key":"end_date","search_value":end_date};
    $.ajax({
      url: 'https://piick.co.kr',
      type: 'POST',
      data: {"_plugin":'common',"_action_type":'load',"_action":'sms',"_search":search},
      success: function(data) {

        console.log(data);
        if(data['list'] != undefined){

          for(var i=0; i < data['list'].length; i++){
            var reservation_registered = data['list'][i]['reservation_registered'] == '' ? data['list'][i]['insert_registered']:data['list'][i]['reservation_registered']
            var img_file = data['list'][i]['img_file'] == '' ? '':data['list'][i]['img_file'];
              html += '<div class="ms_tbl_row use_list_select" id="use_select" src="'+img_file+'" mid="'+data['list'][i]['msg_id']+'">'+
                '<div class="ms_tbl_cell"><span>'+data['list'][i]['msg_subject']+'</span></div>'+
                '<div class="ms_tbl_cell"><span>'+data['list'][i]['message']+'</span></div>'+
                '<div class="ms_tbl_cell">'+reservation_registered+'</div>'+
                '<div class="ms_tbl_cell">'+data['list'][i]['all_count']+'</div>'+
                '<div class="ms_tbl_cell">'+data['list'][i]['msg_type']+'</div>'+
              '</div>';
          }
          $('#use_list_area').empty();
          $('#use_list_area').append(html);
        }
      }
    });
});
$(document).on('click','#use_select',function(){
  var mid = $(this).attr('mid');
  var subject = $(this).children().first().children().first().text();
  var img_src =$(this).attr('src');
  var content = $(this).children().eq(1).children().first().text();

  if(subject == ''){
    $('.use_insert_title').hide();
  }else{
    $('.use_insert_title').text(subject);
    $('.use_insert_title').show();
  }
  if(img_src == ''){
    $('.use_insert_image').hide();
  }else{
    $('.use_insert_image').children().first().attr('src',img_src);
    $('.use_insert_image').show();
  }
  $('.use_insert_summery').text(content);
  var html = '<div class="ms_tbl_row">'+
    '<div class="ms_tbl_cell">번호</div>'+
    '<div class="ms_tbl_cell">상태</div>'+
  '  <div class="ms_tbl_cell">사유</div>'+
  '  </div>';
  $.ajax({
    url: 'https://piick.co.kr',
    type: 'POST',
    data: {"_plugin":'common',"_action_type":'aligo_sms_result',"_action":'sms',"mid":mid},
    success: function(data) {
      console.log(data);
      var success_count = 0;
      var error_count = 0;
      var waiting_count =0;
      for(var i=0; i < data['list'].length; i++){
        var status = data['list_message'] == 'success' ? '' : data['list_message'];
        if(data['list'][i]['sms_state'] == "발송완료"){
          success_count++;
        }else if(data['list'][i]['sms_state'] == "전송중"){
          waiting_count++;
        }else{
          error_count++;
        }
        html += '<div class="ms_tbl_row">'+
          '<div class="ms_tbl_cell">'+data['list'][i]['receiver']+'</div>'+
          '<div class="ms_tbl_cell"><span class="send_wating_focus">'+data['list'][i]['sms_state']+'</span></div>'+
          '<div class="ms_tbl_cell">'+status+'</div>'+
        '</div>';

      }
      if(waiting_count > 0){
        $('.use_delete_btn').show();
      }else{
          $('.use_delete_btn').hide();
      }
      $('#use_all_count').attr('mid',mid);
      $('#use_all_count').text(data['list'].length);
      $('#use_success__count').text(success_count);
      $('#use_error_count').text(error_count);
      $('#use_waiting_count').text(waiting_count);
      $('#use_check_list_area').empty();
      $('#use_check_list_area').append(html);
    }
  });

		$(".message_pop, .use_pop_con").fadeIn()

});

/*-----------------사용내역end-----------------------*/
/*----------------예약취소----------------------*/
$('.use_delete_btn').click(function(){
  var mid = $('#use_all_count').attr('mid');
  $.ajax({
   url: 'https://piick.co.kr',
   type: 'POST',
   data: {"_plugin":'common',"_action_type":'aligo_reservation_cancel',"_action":'sms','mid':mid},
   success: function(data) {
     messagebox(data['message_ko']);
     location.reload();
   }
  });
});

/*-------------------환경설정 생일------------------*/
$('#birth-file').on("change",handleImgFileSelect);
$('#visit-file').on("change",handleImgFileSelect2);
$('#birth_img_delete_btn').click(function(){
  $('.birth_insert_img').children().first().attr('src','views/shop/images/img_guaid_line.jpg');
  $('#birth_file_name').val('');
});
$('#visit_img_delete_btn').click(function(){
  $('.find_insert_img').children().first().attr('src','views/shop/images/img_guaid_line.jpg');
  $('#visit_file_name').val('');
});

$('#birth_insert_btn').click(function(){
  var img_name = $('#birth_file_name').val();
  var img_src='';
  var birth_si_select = $('#birth_si_select option:selected').val();
  var birth_mm_select = $('#birth_mm_select option:selected').val();
  var massage = $('#birth_textarea').val();
    if(birth_si_select == '' || birth_mm_select == ''){
      messagebox('시간설정을 해주세요');
      return false;
    }
    if(massage == ''){
      messagebox('내용을 입력해주세요.');
      return false;
    }

    if(img_name !='' && img_name !="파일명"){
      var formData = new FormData();
      formData.append('_action', 'upload_image');
      formData.append('_plugin', 'file');
      formData.append("upload",$("input[name=birth_file]")[0].files[0]);

      $.ajax({
               url: 'https://piick.co.kr',
               processData: false,
              contentType: false,
               data: formData,
               type: 'POST',
               success: function(result){
                 console.log(result);
                 if(result['code'] == 000){
                   img_src = result['link'];
                   var times = birth_si_select+":"+birth_mm_select;
                   var submit_data = {"birth_auto_message_img_file":img_src,"birth_auto_message_time":times,"birth_auto_message_content":massage};
                   $.ajax({
                    url: 'https://piick.co.kr',
                    type: 'POST',
                    data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
                    success: function(data) {
                      console.log(data);
                        if(data['code'] == 000){
                          messagebox('저장되었습니다.');
                          location.reload();
                        }
                    }
                  });
                 }else{
                  messagebox(result['message_ko']);
                   return false;
                 }

               }
       });
    }else{

      var times = birth_si_select+":"+birth_mm_select;
      var submit_data = {"birth_auto_message_img_file":img_src,"birth_auto_message_time":times,"birth_auto_message_content":massage};
      $.ajax({
       url: 'https://piick.co.kr',
       type: 'POST',
       data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
       success: function(data) {
         if(data['code'] == 000){
           messagebox('저장되었습니다.');
           location.reload();
         }

       }
     });
}


});
/*--------------------환경설정생일 end------------------------*/
/*-------------------환경설정 방문---------------------*/
$('#visit_insert_btn').click(function(){
  var img_name = $('#visit_file_name').val();
  var img_src='';
  var visit_si_select = $('#visit_si_select option:selected').val();
  var visit_mm_select = $('#visit_mm_select option:selected').val();
  var visit_date_select = $('#visit_date_select option:selected').val();
  var massage = $('#visit_textarea').val();
    if(visit_si_select == '' || visit_mm_select == '' || visit_date_select == ''){
      messagebox('날짜시간을설정을 해주세요');
      return false;
    }
    if(massage == ''){
      messagebox('내용을 입력해주세요.');
      return false;
    }
    if(img_name !='' && img_name !="파일명"){
      var formData = new FormData();
      formData.append('_action', 'upload_image');
      formData.append('_plugin', 'file');
      formData.append("upload",$("input[name=visit_file]")[0].files[0]);

      $.ajax({
               url: 'https://piick.co.kr',
               processData: false,
              contentType: false,
               data: formData,
               type: 'POST',
               success: function(result){
                 console.log(result);
                 if(result['code'] == 000){
                   img_src = result['link'];
                   var times = visit_si_select+":"+visit_mm_select;
                   var submit_data = {"visit_auto_message_img_file":img_src,"visit_auto_message_time":times,"visit_auto_message_content":massage,"visit_auto_message_date":visit_date_select};
                   $.ajax({
                    url: 'https://piick.co.kr',
                    type: 'POST',
                    data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
                    success: function(data) {
                      console.log(data);
                        if(data['code'] == 000){
                          messagebox('저장되었습니다.');
                          location.reload();
                        }
                    }
                  });
                 }else{
                   messagebox(result['message_ko']);
                   return false;
                 }

               }
       });
    }else{
      var times = visit_si_select+":"+visit_mm_select;
      var submit_data = {"visit_auto_message_img_file":img_src,"visit_auto_message_time":times,"visit_auto_message_content":massage,"visit_auto_message_date":visit_date_select};
      $.ajax({
       url: 'https://piick.co.kr',
       type: 'POST',
       data: {"_plugin":'user',"_action_type":'submit',"_action":'user',"_submit_type":'update',"_submit_data":submit_data,"_mode":"auto"},
       success: function(data) {
         if(data['code'] == 000){
           messagebox('저장되었습니다.');
           location.reload();
         }

       }
     });
}


});


/*---------이미지 업로드 유효성검사----------*/
var upload = document.querySelector('#upload_file');
   upload.addEventListener('change',function (e) {
       var get_file = e.target.files;
       console.log(get_file[0]['type']);
       if(!(get_file[0]['type'] == 'image/jpeg' || get_file[0]['type'] == "image/png")){
         messagebox('jpeg/png 파일만 됩니다.')
         $('#upload_file').val('');
         $('#upload_name').val('');
       }

   })
/*---------이미지 업로드 유효성검사end----------*/
});
function texDupArr(arr){
  for(var i=0; i<arr.length; i++){
    var checkDobl = 0;
    for(var j=0; j<arr.length; j++){
      if(arr[i].phone != arr[j].phone){
        continue;
      }else {
        checkDobl++;
        if(checkDobl>1){

          arr.splice(j,1);
        }
      }
    }
  }
  return arr;
}
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.length; idx++) {
        var oneChar = escape(el.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}
function encodeBase64ImageTagviaFileReader (url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onload = () => {
      let reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
function handleImgFileSelect(e){
  var files = e.target.files;
  var filesArr = Array.prototype.slice.call(files);


  filesArr.forEach(function(f){
    if(!f.type.match("image.*")){
      messagebox("확장자는 이미지만 가능합니다.");
      return false;
    }

    sel_file =f;

    var reader = new FileReader();
    reader.onload = function(e){
      $('.birth_insert_img').empty();
      $('.birth_insert_img').append('<img src='+e.target.result+' />');
      //$('.birth_insert_img').children().first().attr('src',e.target.result);
    }
    reader.readAsDataURL(f);
  });
}
function handleImgFileSelect2(e){
  var files = e.target.files;
  var filesArr = Array.prototype.slice.call(files);


  filesArr.forEach(function(f){
    if(!f.type.match("image.*")){
      messagebox("확장자는 이미지만 가능합니다.");
      return false;
    }

    sel_file =f;

    var reader = new FileReader();
    reader.onload = function(e){
      $('.find_insert_img').empty();
      $('.find_insert_img').append('<img src='+e.target.result+' />');
      //$('.find_insert_img').children().first().attr('src',e.target.result);
    }
    reader.readAsDataURL(f);
  });
}
function messagebox(content){
  $('.tamp_ok_txt').text(content);
  $(".message_pop ,.tamp_insert_ok").fadeIn();

}
// $(document).on('render_callback', '#user_row', function(event) {
//     var row_data = rune(this).setting('row_data');
//     var name = row_data.name;
//     var franchisee_status = rune.config('franchisee_status');
//     if(franchisee_status == 'lite'){
//           if(name != undefined){
//             var first_name = name.substr( 0, 1 );
//             rune(this).find('[data-r-field="name"]').text(first_name+"**");
//           }
//       }
//   });
// rune().beforePlugin(function(){
// var sms_telephone = rune.config('sms_telephone');
//
//   if(sms_telephone == ''){
//     rune().showMessage('문자는 발신번호를 등록하여야지만 사용가능합니다.<br>관리자에게 문의 바랍니다.');
//   }
//
//
// });

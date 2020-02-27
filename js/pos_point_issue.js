var comma = function(str) {
   str = String(str);
   return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
$(document).ready(function(){
	$(".setting_btn").click(function(){
		$(".slide_form").animate({"left":"0"});
	});
	$(".point_delete_btn").click(function(){
		$(".slide_form").animate({"left":"-50%"});
	});
	$("#point_ok_btn").click(function(){
		var phone_num = $('#phone_num').val();
		var amount = $('#amount').val();
		var coin_rate = session_data['list'][0]['coin_rate'] != undefined ? session_data['list'][0]['coin_rate']:0;
		console.log(coin_rate);
		if(phone_num == ''){
			alert('핸드폰 번호를 입력해주세요.');
			$('#phone_num').focus();
			return false;
		}
		if(amount == ''){
			alert('발행금액을 입력해주세요.');
			$('#amount').focus();
			return false;
		}

		$('#user_code').text(phone_num);
		$('#points').text(amount);
		$('#last_amount').text(Number(amount * coin_rate)/100);
		$(".pop_form").fadeIn();
	});
	// $(".keypad_ok").click(function(){
	// 	$(".pop_form").fadeIn();
	// });
	$(".issue_belete").click(function(){
		$(".pop_form").fadeOut();
	});
	$(".issue_ok_btn").click(function(){
		$(".issue_info").fadeOut();
		$(".ok_info").fadeIn();
	});
	$(".ok_info_check").click(function(){
		$(".pop_form").fadeOut();
	});
//--------------------------------------------

  var session_data = sessionStorage.getItem('item');
	session_data = JSON.parse(session_data);
	console.log(session_data);
  var point_button1 = session_data['list'][0]['point_button1'] ? session_data['list'][0]['point_button1'] : 0;
  var point_button2 = session_data['list'][0]['point_button2'] ? session_data['list'][0]['point_button2'] : 0;
  var point_button3 = session_data['list'][0]['point_button3'] ? session_data['list'][0]['point_button3'] : 0;
  var point_button4 = session_data['list'][0]['point_button4'] ? session_data['list'][0]['point_button4'] : 0;
  var point_button5 = session_data['list'][0]['point_button5'] ? session_data['list'][0]['point_button5'] : 0;
  var point_button6 = session_data['list'][0]['point_button6'] ? session_data['list'][0]['point_button6'] : 0;

	$('#point_button1,#setting_now_button1').text(comma(point_button1));
	$('#point_button2,#setting_now_button2').text(comma(point_button2));
	$('#point_button3,#setting_now_button3').text(comma(point_button3));
	$('#point_button4,#setting_now_button4').text(comma(point_button4));
	$('#point_button5,#setting_now_button5').text(comma(point_button5));
  $('#point_button6,#setting_now_button6').text(comma(point_button6));
	$('.number_input').focus(function(){
		var focus_id = $(this).attr('id');
		sessionStorage.setItem('focus_id', focus_id);
	});
	$('.point_cell').click(function(){
			var num = $(this).text();
			var focus_id = $.trim(sessionStorage.getItem('focus_id'));
			var focus_jquery_id = '#'+focus_id;
			var focus_val = $(focus_jquery_id).val();
      if(num == "←"){
        focus_val = focus_val.slice(0,-1);
        $(focus_jquery_id).val(focus_val);
      }else if(num == "적립"){
        var phone_num = $('#phone_num').val();
    		var amount = $('#amount').val();
    		var coin_rate = session_data['list'][0]['coin_rate'] != undefined ? session_data['list'][0]['coin_rate']:0;

    		if(phone_num == ''){
    			alert('핸드폰 번호를 입력해주세요.');
    			return false;
    		}
    		if(amount == ''){
    			alert('발행금액을 입력해주세요.');
    			return false;
    		}

    		$('#user_code').text(phone_num);
    		$('#points').text(amount);
    		$('#last_amount').text(Number(amount * coin_rate)/100);
    		$(".pop_form").fadeIn();

      }else if(num == "취소"){
        $('#phone_num').val('');
        $('#amount').val('');
      }else{
        $(focus_jquery_id).val(focus_val+num);
      }

	});
$('#point_button1,#point_button2,#point_button3,#point_button4,#point_button5,#point_button6').click(function(){
  $('#amount').val($(this).text().replace(/[^0-9]/g,""));
})



$('#setting_btn').click(function(){
  var point1 = $('#setting_update_button1').val();
  var point2 = $('#setting_update_button2').val();
  var point3 = $('#setting_update_button3').val();
  var point4 = $('#setting_update_button4').val();
  var point5 = $('#setting_update_button5').val();
  var point6 = $('#setting_update_button6').val();
  var session_data = sessionStorage.getItem('item');
  session_data = JSON.parse(session_data);
  var user_access_code = session_data['list'][0]['access_code'];
  var submit_data = '{"point_button1":"'+point1+'","point_button2":"'+point2+'","point_button3":"'+point3+'","point_button4":"'+point4+'","point_button5":"'+point5+'","point_button6":"'+point6+'"}';
  $.ajax({
       url:'https://piick.co.kr',
       type:'post',
       data:{"_action":"user","_plugin":"user","_action_type":"submit","_submit_type":"update","_user_access_code":user_access_code,"_submit_data":submit_data },
       success:function(data){
          console.log(data);
             if(data['code'] == '000'){
               alert('수정되었습니다.');
               sessionStorage.setItem('item',JSON.stringify(data));
               location.reload();
             }else{
               alert(data['message']);
               return false;
             }
       }
   })
});
$('#cancel_btn').click(function(){
    $.ajax({
     url: 'https://piick.co.kr',
     type: 'POST',
     data: {"_plugin":'point',"_action_type":'cancel',"_action":'point',"status":false},
     success: function(data) {
       if(data['code'] == 000){
         alert('취소되었습니다.');
         location.reload();
       }

     }
   });
});
	$('#point_btn').click(function(){
  var session_data = sessionStorage.getItem('item');
  session_data = JSON.parse(session_data)
  var user_code = $('#user_code').text();
  user_code = user_code.replace(/[^0-9]/g,"");
  var points = $('#points').text();
  points = comma(points.replace(/[^0-9]/g,"")) + "P";
  var submit_data = '{"user_code":"'+user_code+'","points":"'+points+'"}';
  var user_access_code = session_data['list'][0]['access_code']
  $.ajax({
       url:'https://piick.co.kr',
       type:'post',
       data:{"_action":"point","_plugin":"point","_action_type":"submit","_submit_type":"insert","_user_access_code":user_access_code,"_submit_data":submit_data },
       success:function(data){
            if(data['code'] == '000'){
              alert('발행되었습니다.');
              location.reload();
            }else{
              alert(data['message']);
              return false;
            }
       }
   })
})
});

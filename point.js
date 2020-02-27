//콤마함수
var comma = function(str) {
   str = String(str);
   return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}




// 핸드폰 번호 4자리수 자동 focus
var phone_input = function(ele1, ele2) {
   ele1.keyup (function () {
       var charLimit = $(this).attr("maxlength");
       if (this.value.length >= charLimit) {
           $(this).next().next('.phone_number3').focus();
           return false;
       }
   });

   ele2.keyup(function() {
       var charLimit = $(this).attr("maxlength");
       if(this.value.length >= charLimit){
           $(this).closest('.memberStorePoint__inner').find('.js-Issue_input').focus();
           return false;
       }
   });
}

//  포인트 7자리숫자 이상 못 쓰기
var jsIssueInput = function(ele) {
   ele.keyup(function(){
       if($(this).val().length > 7) {
           $(this).val($(this).val().substring(0, 7));
       }
   });
};



// 포인터 발행 버튼
var point_set = function(ele1, ele2) {
   // 포인터 발행 버튼 경우의 수 채크
   ele1.on('click', function(){
       var msg = "";
       var amount = "";

       if($('.phone_number2').val() === ""){
           alert("휴대폰 번호 입력해주세요");
           return false;
       }

       if($('.phone_number3').val() === ""){
           alert("휴대폰 번호 입력해주세요");
           return false;
       }

       if($('.Issue_input').val() === ""){
           alert("발행금액을 입력해주세요");
           return false;
       }

       if($('.phone_input').val() !== ""){
           $('.pop_up').show();
           msg += $('.phone_input_option option:selected').val()+"-";
           msg += $('.phone_number2').val()+"-";
           msg += $('.phone_number3').val();
           amount += Number($('.Issue_input').val())+"P";

           $('.pop_up--phoneSet').html(msg)
           $('.pop_up--amountSet').html(comma(amount));
       }
   });

   // 취소 버튼 클릭시 hide
   ele2.on('click', function(){
       $('.pop_up').hide();
   });
}

// 파일 찾기 버튼 활성화
var eventChange = function(ele) {
   ele.on('change', function(e){
       e.stopPropagation();
       if(window.FileReader){
           var filename = $(this)[0].files[0].name;
       } else {
           var filename = $(this).val().split('/').pop().split('\\').pop();
       }
       $(this).siblings('.filename').html(filename).css('color','#333');
   });
}





$(function() {
   var $fileTarget = $('.upload-hidden'),
       $phone_input = $('.phone_input'),
       $phone_number3 = $('.phone_number3'),
       $jsBtn = $('.js-btn'),
       $jsCancell = $('.js-cancell'),
       $jsIssueInput = $('.js-Issue_input');


   eventChange($fileTarget);
   phone_input($phone_input, $phone_number3);
   point_set($jsBtn, $jsCancell);
   jsIssueInput($jsIssueInput);
});

$(document).ready(function(){
 $(".pay_choice").click(function(){
   $(".pay_choice").not(this).css({"background":"#fff","color":"#333"});
   $(this).css({"background":"#174672","color":"#fff"});
   var point = $(this).attr('value');
   $('.Issue_input').val(point);

 });
 $(".out_btn").click(function(){
   $(".out_btn").css({"background":"#174672","color":"#fff"});
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
       url:'https://its-point.com',
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

var session_data = sessionStorage.getItem('item');
session_data = JSON.parse(session_data);
var user_access_code = session_data['list'][0]['access_code'];
$.ajax({
     url:'https://its-point.com',
     type:'post',
     data:{"_action":"point","_plugin":"point","_action_type":"load","_user_access_code":user_access_code},
     success:function(data){
          if(data['metadata']['total_rows'] > 0){
            var html = ''
            var data_count = data['metadata']['total_rows'] > 20 ? 20 : data['metadata']['total_rows'];
            for(var i=0; i < data_count; i++){
              html += "<div class='tbl-row' ><div class='tbl-cell tw01'>"+data['list'][i]['registered']+"</div><div class='tbl-cell tw01'>"+data['list'][i]['user_code']+"</div><div class='tbl-cell tw01'>"+comma(data['list'][i]['points'])+"P</div></div>";
            }

            $('#point_list').append(html);
          }else{
            $('#point_list').append("<div>이력이 없습니다.</div>");
          }
     }
 })
});

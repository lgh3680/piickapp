$(document).ready(function(){
	$(".customer_view_btn").click(function(){
		$(".pop_form").fadeIn();
	});
	$(".pop_close_btn").click(function(){
		$(".pop_form").fadeOut();
	});

	var session_data = sessionStorage.getItem('item');
	session_data = JSON.parse(session_data);
	var user_access_code = session_data['list'][0]['access_code'];

	$.ajax({
       url:'https://piick.co.kr',
       type:'post',
       data:{"_action":"user","_plugin":"user","_action_type":"load","_user_access_code":user_access_code },
       success:function(data){
          console.log(data);
					var html = '<div class="point_row"><div class="point_cell">번호</div>	<div class="point_cell">이름</div>'+
							'	<div class="point_cell">핸드폰 번호</div><div class="point_cell">생년월일</div>'+
						'	<div class="point_cell">발행횟수</div><div class="point_cell">방문횟수</div>'+
						'	<div class="point_cell">최근 방문일자</div>	<div class="point_cell">상세정보</div></div>	';

						for(var i=0; i < data['list'].length; i++){
							var amount = data['list'][i]['amount'] ? data['list'][i]['amount'] : 0;
							var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
							var birth = data['list'][i]['birth'] ? data['list'][i]['birth'] : '';
							html += '<div class="point_row"><div class="point_cell">'+(i+1)+'</div>'+
										'<div class="point_cell">'+name+'</div><div class="point_cell">'+data['list'][i]['user_code']+'</div>'+
								'<div class="point_cell">'+birth+'</div><div class="point_cell">'+data['list'][i]['point_count']+'</div>'+
								'	<div class="point_cell">'+data['list'][i]['visit_count']+'</div><div class="point_cell">'+data['list'][i]['last_registered']+'</div>'+
								'<div class="point_cell customer_view_btn" id="zz">상세보기</div></div>';


						}
						$('#list_area').empty();
						$('#list_area').append(html);

       }
   })

	 $('.search_btn_form').click(function(){

	 	var search_select = $('#search_select option:selected').val();
	 	var search_value = $('#search_value').val();
	 	var search = new Array();

	 	search[0] = {"search_key":search_select,"search_value":search_value};

	 	$.ajax({
	 			 url:'https://piick.co.kr',
	 			 type:'post',
	 			 data:{"_action":"user","_plugin":"user","_action_type":"load","_user_access_code":user_access_code,"_search": search},
	 			 success:function(data){
	 					console.log(data);
						var html = '<div class="point_row"><div class="point_cell">번호</div>	<div class="point_cell">이름</div>'+
								'	<div class="point_cell">핸드폰 번호</div><div class="point_cell">생년월일</div>'+
							'	<div class="point_cell">발행횟수</div><div class="point_cell">방문횟수</div>'+
							'	<div class="point_cell">최근 방문일자</div>	<div class="point_cell">상세정보</div></div>	';
						if(data['list']){
						for(var i=0; i < data['list'].length; i++){
							var amount = data['list'][i]['amount'] ? data['list'][i]['amount'] : 0;
							var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
							var birth = data['list'][i]['birth'] ? data['list'][i]['birth'] : '';
							html += '<div class="point_row"><div class="point_cell">'+(i+1)+'</div>'+
										'<div class="point_cell">'+name+'</div><div class="point_cell">'+data['list'][i]['user_code']+'</div>'+
								'<div class="point_cell">'+birth+'</div><div class="point_cell">'+data['list'][i]['point_count']+'</div>'+
								'	<div class="point_cell">'+data['list'][i]['visit_count']+'</div><div class="point_cell">'+data['list'][i]['last_registered']+'</div>'+
								'<div class="point_cell customer_view_btn" id="zz">상세보기</div></div>';


						}
						$('#list_area').empty();
						$('#list_area').append(html);
					}else{
						var html = '<div class="point_row"><div class="point_cell">번호</div>	<div class="point_cell">이름</div>'+
								'	<div class="point_cell">핸드폰 번호</div><div class="point_cell">생년월일</div>'+
							'	<div class="point_cell">발행횟수</div><div class="point_cell">방문횟수</div>'+
							'	<div class="point_cell">최근 방문일자</div>	<div class="point_cell">상세정보</div></div>	';
						$('#list_area').empty();
						$('#list_area').append(html);
					}
	 			 }
	 	 })

	 })
});
$(document).on('click','#zz',function(){
	var user_code = $(this).parent().children().eq(2).text();
	var user_name = $(this).parent().children().eq(1).text();
	var registered = $(this).parent().children().eq(6).text();
	var visit_count = $(this).parent().children().eq(5).text();
	var html='<div class="point_row"><div class="point_cell thead">이름</div><div class="point_cell thead">방문일자</div></div>';

	$('#user_code').text(user_code);
	$('#user_name').text(user_name);
	$('#registered').text(registered);
	$('#visit_count').text(visit_count);

		$.ajax({
			url: 'https://piick.co.kr',
			type: 'POST',
			data: {"_plugin":'user',"_action_type":'visit_list',"_action":'user',"user_code":user_code},
			success: function(data) {
				console.log(data);
				console.log();
				for(var i=0; i<data['list']['length']; i++){
				html +=	'<div class="point_row"><div class="point_cell">'+data['list'][i]['name']+'</div><div class="point_cell">'+data['list'][i]['registered']+'</div></div>';

				}
				$('#visit_tbl').empty();
				$('#visit_tbl').append(html);

			}
		});
	$(".pop_form").fadeIn();
});

$(document).ready(function(){
	$(".contents .point_list_form .point_list_box .point_tab ul li").click(function(){
		$(this).css({"background":"#404040","color":"#fff"});
		$(".contents .point_list_form .point_list_box .point_tab ul li").not(this).css({"background":"#fff","color":"#333"});
		$('.point_status').val($(this).attr('value'));
	});
	$(".overview_btn").click(function(){
		$(".point_graph_form").animate({"height":"62vh"});
		$(".overview_btn").fadeOut(function(){
			$(".reflash_btn").fadeIn();
		});


	});
	$(".reflash_btn").click(function(){
		$(".point_graph_form").animate({"height":"34vh"});
		$(".reflash_btn").fadeOut(function(){
			$(".overview_btn").fadeIn();
		});
	});
	var session_data = sessionStorage.getItem('item');
  session_data = JSON.parse(session_data);
	var user_access_code = session_data['list'][0]['access_code'];
	var html = '	<div class="point_row"><div class="point_cell">번호</div>	<div class="point_cell">이름</div>'+
			'<div class="point_cell">핸드폰 번호</div><div class="point_cell">포인트</div><div class="point_cell">캐시</div>'+
		'<div class="point_cell">날짜</div></div>';
	$.ajax({
       url:'https://piick.co.kr',
       type:'post',
       data:{"_action":"point","_plugin":"point","_action_type":"load","_user_access_code":user_access_code },
       success:function(data){
          console.log(data);

						for(var i=0; i < data['list'].length; i++){
							var amount = data['list'][i]['amount'] ? data['list'][i]['amount'] : 0;
							var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
							if(session_data['list'][0]['franchisee_status'] == 'lite' && name != ''){
								var name = name.substr( 0, 1 );
								var name = name+"**";
							}
							html += '<div class="point_row"><div class="point_cell">'+(i+1)+'</div>'+
									'<div class="point_cell">'+name+'</div><div class="point_cell">'+data['list'][i]['mobile']+'</div>'+
								'<div class="point_cell"><span>'+data['list'][i]['points']+'</span>P</div><div class="point_cell"><span>'+amount+'</span>원</div>'+
								'<div class="point_cell">'+data['list'][i]['registered']+'</div></div>';
						}
						$('#list_area').empty();
						$('#list_area').append(html);
					$('#points_sum').text(data['points_sum']);
					$('#amount_sum').text(data['amount_sum']);
					$('#point_count').text(data['point_count']);
       }
   })

$('.search_btn').click(function(){
	var point_status = $('.point_status').val();
	var start_date = $('#start_date').val();
	var end_date = $('#end_date').val();
	var search_select = $('#search_select option:selected').val();
	var search_value = $('#search_value').val();
	var search = new Array();
	console.log(point_status);
	var html = '	<div class="point_row"><div class="point_cell">번호</div>	<div class="point_cell">이름</div>'+
			'<div class="point_cell">핸드폰 번호</div><div class="point_cell">포인트</div><div class="point_cell">캐시</div>'+
		'<div class="point_cell">날짜</div></div>';
	search[0] = {"search_key":search_select,"search_value":point_status};
	search[1] = {"search_key":search_select,"search_value":start_date};
	search[2] = {"search_key":search_select,"search_value":end_date};
	search[3] = {"search_key":search_select,"search_value":search_value};
	$.ajax({
			 url:'https://piick.co.kr',
			 type:'post',
			 data:{"_action":"point","_plugin":"point","_action_type":"load","_user_access_code":user_access_code,"_search": search},
			 success:function(data){
					console.log(data);

						for(var i=0; i < data['list'].length; i++){
							var amount = data['list'][i]['amount'] ? data['list'][i]['amount'] : 0;
							var name = data['list'][i]['name'] ? data['list'][i]['name'] : '';
							html += '<div class="point_row"><div class="point_cell">'+(i+1)+'</div>'+
									'<div class="point_cell">'+name+'</div><div class="point_cell">'+data['list'][i]['mobile']+'</div>'+
								'<div class="point_cell"><span>'+data['list'][i]['points']+'</span>P</div><div class="point_cell"><span>'+amount+'</span>원</div>'+
								'<div class="point_cell">'+data['list'][i]['registered']+'</div></div>';
						}
						$('#list_area').empty();
						$('#list_area').append(html);
					$('#points_sum').text(data['points_sum']);
					$('#amount_sum').text(data['amount_sum']);
					$('#point_count').text(data['point_count']);
			 }
	 })

})

});

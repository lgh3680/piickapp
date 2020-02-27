$(document).ready(function(){
	$(".viwer_btn").click(function(){
		$(".contents .calculate_form .calculate_graph_form .cal_graph").animate({"height":"56vh"}, function(){
			$(".point_list_search_form").slideDown();
			$(".viwer_btn").fadeOut(function(){
				$(".viwer_back_btn").fadeIn();
			});
		});

	});
	$(".viwer_back_btn").click(function(){
		$(".contents .calculate_form .calculate_graph_form .cal_graph").animate({"height":"24vh"}, function(){
			$(".point_list_search_form").slideUp();
			$(".viwer_back_btn").fadeOut(function(){
				$(".viwer_btn").fadeIn();
			});
		});

	});




	var date = new Date();
	var now_month = date.getMonth()+1;
	var now_year = date.getFullYear();
	var now_day = date.getDate();
	var last_month = now_month == 1 ? 12 : date.getMonth();
	var last_year = last_month == 12 ? now_year-1 : now_year;
	now_month = now_month>10 ? now_month : '0'+now_month;
	now_day = now_day>10 ? now_day : '0'+now_day;
	$('#start_date').val(last_year+"-"+last_month+"-01");
	$('#end_date').val(now_year+"-"+now_month+"-"+now_day);
	var start_date = 	last_year+"-"+last_month+"-01";
	var end_date = now_year+"-"+now_month+"-"+now_day;

	var submit_data = {'start_date':start_date,'end_date':end_date};

	$.ajax({
		url: 'https://piick.co.kr',
		type: 'POST',
		data: {"_plugin":'point',"_action_type":'calculate',"_action":'point',"sub_data":submit_data},
		success: function(data) {

			var html='';
			for(var i=data['ajax_list'].length; i > 0; i--){

				var status_class = data['ajax_list'][i-1]["ajax_status"] == "완료" ? "pay_on" : data['ajax_list'][i-1]["ajax_status"] == "미납" ? "pay_off" : "pay_expected";
				var status_text = data['ajax_list'][i-1]["ajax_status"] == "완료" ? "결제완료" : data['ajax_list'][i-1]["ajax_status"] == "미납" ? "결제미납" : "결제예정";
				var amount = data['ajax_list'][i-1]["ajax_amount"] == '' ? 0 : data['ajax_list'][i-1]["ajax_amount"];
				html += 	'<div class="point_row"><div class="point_cell">'+i+'</div>	<div class="point_cell">'+amount+'</div>'+
						'<div class="point_cell">0</div><div class="point_cell">'+amount+'</div>'+
						'<div class="point_cell">'+data['ajax_list'][i-1]["ajax_tuesday"]+'</div>'+
					'<div class="point_cell viwe_pop_btn detail_btn"><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_start"] +'"/><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_end"] +'"/>상세내역</div>'+
					'<div class="point_cell"><span class="'+status_class+'">'+status_text+'</span></div></div>';

			}

			$('#point_tbl').append(html);

			$('#points').text(data['list'][0]["prepayment_residual_point"]);//보유포인트
			$('#amount').text(data['list'][0]["amount"]);//보유캐쉬
			$('#sum_amount').text(data['list'][0]["schedule_sum_amount"]);//결제예정금액
			$('#schedule_start_date').text(data['list'][0]["schedule_start_date"]);//결제예정 정산 시작일
			$('#schedule_end_date').text(data['list'][0]["schedule_end_date"]);//결제예정 정산 마감일
			$('#schedule_tuesday_date').text(data['list'][0]["schedule_tuesday_date"]);//결제예정 납부예정일
			$('#unpaid_amount').text(data['list'][0]["unpaid_sum_amount"]);//미납금액
			$('#unpaid_start_date').text(data['list'][0]["unpaid_start_date"]);//결제미납 시작일
			$('#unpaid_end_date').text(data['list'][0]["unpaid_end_date"]);//결제미납 마지막일
			$('#unpaid_tuesday_date').text(data['list'][0]["schedule_tuesday_date"]);//결제미납 납부일시
		}
	});
});
$(document).ready(function(){
	$(".point_list_form .click_searh_box ul li").click(function(){
		$(this).css({"background":"#404040","color":"#fff"});
		$(".point_list_form .click_searh_box ul li").not(this).css({"background":"#fff","color":"#333"});
	});

$(".pop_close_btn").click(function(){
	$(".pop_box").fadeOut();
	$(".expected_pop").fadeOut();
	$(".unpaid_pop").fadeOut();
	$(".viewer_pop").fadeOut();
});
$(document).on("click",'.expected_btn,.unpaid_btn,.detail_btn',function(){
	var this_class = $(this).attr('class');
	var detail_start_date,detail_end_date,detail_title;
	var html = '<div class="point_row"><div class="point_cell">사용날짜</div><div class="point_cell">캐시발행</div>'+
					'	<div class="point_cell"><div class="sms_form"><div>문자사용</div>'+
					'	<ul class="sms_box">	<li class="sms_con">SMS</li><li class="sms_con">LMS</li>'+
					'	<li class="sms_con">MMS</li>	</ul></div></div><div class="point_cell">사용금액</div></div>';



	if(this_class == 'expected_btn'){
		detail_start_date = $('#schedule_start_date').text();
		detail_end_date = $('#schedule_end_date').text();
		detail_title = "결제예정 금액";
	}else if(this_class == 'unpaid_btn'){
		detail_start_date = $('#unpaid_start_date').text();
		detail_end_date = $('#unpaid_end_date').text();
		detail_title = "결제미납 금액";
	}else{
		detail_start_date = $(this).children().eq(0).val();
		detail_end_date = $(this).children().eq(1).val();
		detail_title = "요금상세 내역";
	}

	var submit_data = {"start_date":detail_start_date,"end_date":detail_end_date};
	$.ajax({
	url: 'https://piick.co.kr',
	type: 'POST',
	data: {"_plugin":'point',"_action_type":'calculate_detail',"_action":'point',"sub_data":submit_data},
	success: function(data) {

		for(var i=0; i < data['list'].length; i++){
			html += '<div class="point_row"><div class="point_cell">'+data['list'][i]['registered']+'</div><div class="point_cell"><span>'+data['list'][i]['amount']+'</span>원</div>'+
					'<div class="point_cell">	<div class="sms_form">	<ul class="sms_box">	<li class="sms_con"><span>0</span> 회</li>'+
					'	<li class="sms_con"><span>0</span> 회</li>	<li class="sms_con"><span>0</span> 회</li></ul>'+
				'</div></div><div class="point_cell"><span>'+data['list'][i]['amount']+'</span> 원</div></div>';

		}
		$('#expected_pop_tlb').empty();
		$('#expected_pop_tlb').append(html);

	}
});

	$('#detail_start_date').text(detail_start_date);
	$('#detail_end_date').text(detail_end_date);
	$('#detail_title').text(detail_title);

	$(".pop_box").fadeIn();
	$(".expected_pop").fadeIn();
});


$('.input_search_btn').click(function(){
	var status = $('#status_select option:selected').val();
	var start_date = $('#start_date').val();
	var end_date = $('#end_date').val();
	var submit_data = {"status":status,"start_date":start_date,"end_date":end_date};
	$.ajax({
	url: 'https://piick.co.kr',
	type: 'POST',
	data: {"_plugin":'point',"_action_type":'calculate_search',"_action":'point',"sub_data":submit_data},
	success: function(data) {

		var html='<div class="point_row"><div class="point_cell">번호</div><div class="point_cell">캐쉬발행</div>'+
					'<div class="point_cell">문자사용</div><div class="point_cell">총 사용금액</div>	<div class="point_cell">납부일시</div>'+
				'	<div class="point_cell">상세내역</div><div class="point_cell"><select id="status_select">	<option value="all">상태</option>'+
					'<option value="unpad">결제미납</option><option value="schedule">결제예정</option><option value="completion">결제완료</option>'+
				'	</select></div></div>';

		for(var i=data['ajax_list'].length; i > 0; i--){

			var status_class = data['ajax_list'][i-1]["ajax_status"] == "완료" ? "pay_on" : data['ajax_list'][i-1]["ajax_status"] == "미납" ? "pay_off" : "pay_expected";
			var status_text = data['ajax_list'][i-1]["ajax_status"] == "완료" ? "결제완료" : data['ajax_list'][i-1]["ajax_status"] == "미납" ? "결제미납" : "결제예정";
			var amount = data['ajax_list'][i-1]["ajax_amount"] == '' ? 0 : data['ajax_list'][i-1]["ajax_amount"];
			if(status == "all"){
				html += 	'<div class="point_row"><div class="point_cell">'+i+'</div>	<div class="point_cell">'+amount+'</div>'+
						'<div class="point_cell">0</div><div class="point_cell">'+amount+'</div>'+
						'<div class="point_cell">'+data['ajax_list'][i-1]["ajax_tuesday"]+'</div>'+
					'<div class="point_cell viwe_pop_btn detail_btn"><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_start"] +'"/><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_end"] +'"/>상세내역</div>'+
					'<div class="point_cell"><span class="'+status_class+'">'+status_text+'</span></div></div>';

			}else if(status == "unpad"){
				if(status_class == "pay_off"){
					html += 	'<div class="point_row"><div class="point_cell">'+i+'</div>	<div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">0</div><div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">'+data['ajax_list'][i-1]["ajax_tuesday"]+'</div>'+
						'<div class="point_cell viwe_pop_btn detail_btn"><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_start"] +'"/><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_end"] +'"/>상세내역</div>'+
						'<div class="point_cell"><span class="'+status_class+'">'+status_text+'</span></div></div>';

				}
			}else if(status == "schedule"){
				if(status_class == "pay_expected"){
					html += 	'<div class="point_row"><div class="point_cell">'+i+'</div>	<div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">0</div><div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">'+data['ajax_list'][i-1]["ajax_tuesday"]+'</div>'+
						'<div class="point_cell viwe_pop_btn detail_btn"><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_start"] +'"/><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_end"] +'"/>상세내역</div>'+
						'<div class="point_cell"><span class="'+status_class+'">'+status_text+'</span></div></div>';

				}
			}else if(status == "completion"){
				if(status_class == "pay_on"){
					html += 	'<div class="point_row"><div class="point_cell">'+i+'</div>	<div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">0</div><div class="point_cell">'+amount+'</div>'+
							'<div class="point_cell">'+data['ajax_list'][i-1]["ajax_tuesday"]+'</div>'+
						'<div class="point_cell viwe_pop_btn detail_btn"><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_start"] +'"/><input type="hidden" value="'+data['ajax_list'][i-1]["ajax_end"] +'"/>상세내역</div>'+
						'<div class="point_cell"><span class="'+status_class+'">'+status_text+'</span></div></div>';

				}
			}


		}
		$('#point_tbl').empty();
		$('#point_tbl').append(html);
		$('#status_select').val(status).attr("selected","selected");
	}
	});

});
});

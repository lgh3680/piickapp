$(document).ready(function(){
	$(function(){
        $(".tab-contents ul li").click(function(){
            $(".tab-contents ul li").removeClass('on');
            $(".tab-contents .conBox").removeClass('on');
            $(this).addClass('on');
            $("#"+$(this).data('id')).addClass('on');
        });
    });

	// $(".img_box").click(function(){
	// 	$(".pop_form").fadeIn();
	// 	$(".img_insert_pop").fadeIn();
	// });

	$(".insert_btn").click(function(){
		$(".pop_form").fadeIn();
		$(".auction_summery_pop").fadeIn();
	});

	// $(".auction_btn span").click(function(){
	// 	$(".pop_form").fadeIn();
	// 	$(".auction_ok_pop").fadeIn();
	// });

	$(".pop_close_btn").click(function(){
		$(".pop_form").fadeOut();
		$(".img_insert_pop").fadeOut();
		$(".auction_summery_pop").fadeOut();
		$(".auction_ok_pop").fadeOut();
	});

$('#img_btn1,#img_btn2').click(function(){
	if($(this).attr('id') == 'img_btn1'){
		var img_name = $('#upload_name').val();
	}else{
		var img_name = $('#upload_name2').val();
	}

	var id_val = $(this).attr('id');
	if(img_name == ''){
		alert('사진 파일을 등록해주시기 바랍니다.');
		return false;
	}
	var formData = new FormData();
	formData.append('_action', 'upload_image');
	formData.append('_plugin', 'file');
	if($(this).attr('id') == 'img_btn1'){
		formData.append("upload",$("input[name=upload_file]")[0].files[0]);
	}else{
		formData.append("upload",$("input[name=upload_file2]")[0].files[0]);
	}


	$.ajax({
					 url: 'https://piick.co.kr',
					 processData: false,
					contentType: false,
					 data: formData,
					 type: 'POST',
					 success: function(result){
						 console.log(result);
						 var src = "https://piick.co.kr/"+result['link'];

								if(id_val == 'img_btn1'){
									$('#image0').attr('src',src);
									$(".pop_form ,#img_pop1").fadeOut();
								}else{
									$('#image1').attr('src',src);
									$(".pop_form ,#img_pop2").fadeOut();
								}


					 }
	 });
});

	$(document).on('click','.img_delete',function(){
		$('#image0').attr('src','');
		$('#upload_name').val('');
	});
	$(document).on('click','.img_delete2',function(){
		$('#image1').attr('src','');
		$('#upload_name2').val('');
	});
$('#cost').focusout(function(){
	var cost = $('#cost').val();
	$('#auction_maximum_point').val(Math.round((cost/2)/100)*100);
	if(cost < 10000){
			$('#auction_subtraction_point').val(0);
	}else if(cost < 50000){
		$('#auction_subtraction_point').val(50);
	}else if(cost < 100000){
		$('#auction_subtraction_point').val(100);
	}else if(cost < 300000){
		$('#auction_subtraction_point').val(300);
	}else if(cost < 1000000){
		$('#auction_subtraction_point').val(500);
	}else if(cost > 1000000){
		$('#auction_subtraction_point').val(1000);
	}

});


$(document).on('click','#cancel',function(){
	var submit_data = {"auction_status":"cancel"};
	var idx = $(this).attr('idx');
	var text = $(this).parent().prev().children().first().text();
	session_data = sessionStorage.getItem('item');
	session_data = JSON.parse(session_data);
	var user_access_code = session_data['list'][0]['access_code'];
	if(text != "승인대기" && text != "경매대기"){
		$(".pop_form").fadeIn();
		$('.auction_ok_pop').fadeIn();
		$('.auction_ok_title').text('경고창');
		$('.auction_ok_subtxt').text('취소할 수 없습니다.');

		return false;
	}

	$.ajax({
		url: 'https://piick.co.kr',
		type: 'POST',
		data: {"_plugin":'product',"_action":'product',"_submit_type":"update","_action_type":'submit','_submit_data':submit_data,"_user_access_code":user_access_code,"_idx":idx},
		success: function(data) {
			if (data['code'] == '000') {
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('확인창');
				$('.auction_ok_subtxt').text('취소되었습니다.');

				location.reload();
			} else if (data['message']) {
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text(data['message']);

			} else {
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('취소 실패하였습니다. 관리자에게 문의바랍니다.');
				
			}

		}
	});


})
$('#auction_btn').click(function(){

		var auction_badge = $('#auction_badge').val();
		var hot_badge = $('#hot_badge').val();
		var new_badge = $('#new_badge').val();
		var category0 = $('#category0').val();
		var category1 = $('#category1').val();
		var auction_subtraction_point = $('#auction_subtraction_point').val();
		var auction_chance = $('#auction_chance').val();
		var not_for_sale = $('#not_for_sale').val();
		var lowest_price = $('#lowest_price').val();
		var maximum_payment_point = $('#maximum_payment_point').val();
		var discount_rate = $('#discount_rate').val();
		var registration_infomation = $('#registration_infomation').val();
		var origin_country = $('#origin_country').val();
		var maker = $('#maker').val();
		var product_price = $('#product_price').val();
		var auction_status = $('#auction_status').val();
		var product_name = $('#product_name').val();
		var provided_type = $('#provided_type option:selected').val();
		var cost = $('#cost').val();
		var auction_minimum_point = $('#auction_minimum_point').val();
		var auction_maximum_point = $('#auction_maximum_point').val();
		var auction_bidding_start_date = $('#auction_bidding_start_date').val();
		var auction_bidding_end_date = $('#auction_bidding_end_date').val();
		var coupon_validity_day = $('#coupon_validity_day').val();
		var image0 = $('#image0').attr('src');
		var image1 = $('#image1').attr('src');
		var description = $('.nicEdit-main ').html();
		var submit_data = {};
		submit_data['auction_badge'] = auction_badge;
		submit_data['hot_badge'] = hot_badge;
		submit_data['new_badge'] = new_badge;
		submit_data['category0'] = category0;
		submit_data['category1'] = category1;
		submit_data['auction_subtraction_point'] = auction_subtraction_point;
		submit_data['auction_chance'] = auction_chance;
		submit_data['not_for_sale'] = not_for_sale;
		submit_data['lowest_price'] = lowest_price;
		submit_data['maximum_payment_point'] = maximum_payment_point;
		submit_data['discount_rate'] = discount_rate;
		submit_data['registration_infomation'] = registration_infomation;
		submit_data['origin_country'] = origin_country;
		submit_data['maker'] = maker;
		submit_data['product_price'] = product_price;
		submit_data['auction_status'] = auction_status;
		submit_data['product_name'] = product_name;
		submit_data['provided_type'] = provided_type;
		submit_data['cost'] = cost;
		submit_data['auction_minimum_point'] = auction_minimum_point;
		submit_data['auction_maximum_point'] = auction_maximum_point;
		submit_data['auction_bidding_start_date'] = auction_bidding_start_date;
		submit_data['auction_bidding_end_date'] = auction_bidding_end_date;
		submit_data['coupon_validity_day'] = coupon_validity_day;
		submit_data['image0'] = image0;
		submit_data['image1'] = image1;
		submit_data['description'] = description;
		session_data = sessionStorage.getItem('item');
		session_data = JSON.parse(session_data);
		var user_access_code = session_data['list'][0]['access_code'];
		var sdt = new Date(auction_bidding_start_date);
		var edt = new Date(auction_bidding_end_date);
		var dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
		dateDiff = dateDiff+1;
		//var dateDiff = dateDiff(auction_bidding_start_date,auction_bidding_end_date);
		var today = new Date();
		var today_dateDiff = Math.ceil((sdt.getTime()-today.getTime())/(1000*3600*24))

		if(product_name == ''){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('상품명을 입력해주세요.');
			//$('#product_name').focus();
			return false;
		}
		if(cost == ''){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('판매가를 입력해주세요');
			return false;
		}
		if(auction_bidding_start_date == ''){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('경매시작날짜를 입력해주세요.');
			return false;
		}
		if(auction_bidding_end_date == ''){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('경매마감날짜를 입력해주세요.');
			return false;
		}
		if(image0 == ''){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('썸네일사진을 등록해주세요.');
			return false;
		}
		if(cost < 10000){
			if(dateDiff > 15){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 15일까지만 가능합니다.');
				return false;
			}
		}else if(cost < 50000){
			if(dateDiff > 30){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 30일까지만 가능합니다.');
				return false;
			}
		}else if(cost < 100000){
			if(dateDiff > 30){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 30일까지만 가능합니다.');
				return false;
			}
		}else if(cost < 300000){
			if(dateDiff > 30){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 30일까지만 가능합니다.');
				return false;
			}
		}else if(cost < 1000000){
			if(dateDiff > 60){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 60일까지만 가능합니다.');
				return false;
			}
		}else if(cost > 1000000){
			if(dateDiff > 90){
				$(".pop_form").fadeIn();
				$('.auction_ok_pop').fadeIn();
				$('.auction_ok_title').text('경고창');
				$('.auction_ok_subtxt').text('경매기간은 최대 90일까지만 가능합니다.');
				return false;
			}
		}
		if(today_dateDiff < 0){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('시작 날짜는 오늘 이전으로 하실 수 없습니다.');
			return false;
		}

		if(dateDiff < 0){
			$(".pop_form").fadeIn();
			$('.auction_ok_pop').fadeIn();
			$('.auction_ok_title').text('경고창');
			$('.auction_ok_subtxt').text('마감 날짜가 시작날짜보다 빠를 순 없습니다.');
			return false;
		}
		$.ajax({
			url: 'https://piick.co.kr',
			type: 'POST',
			data: {"_plugin":'product',"_action":'product',"_submit_type":"insert","_action_type":'submit','_submit_data':submit_data,"_user_access_code":user_access_code},
			success: function(data) {
				console.log(data);
				if(data['code'] == 000){
					$(".pop_form").fadeIn();
					$('.auction_ok_pop').fadeIn();
					$('.auction_ok_title').text('경매 등록 완료');
					$('.auction_ok_subtxt').text('경매에 등록하신 내용을 확인 후, 승인 절차를 걸쳐 상품이 올라갑니다.');
					location.reload();
				}else{
					alert(data['message_ko'])
				}

			}
		});


	});
});

$(function () {
	$('#img_box1').click(function () {
		$(".pop_form").fadeIn();
		$("#img_pop1").fadeIn();
	});
});

$(function () {
	$('#img_box2').click(function () {
		$(".pop_form").fadeIn();
		$("#img_pop2").fadeIn();
	});

/*------------------------------------*/
session_data = sessionStorage.getItem('item');
session_data = JSON.parse(session_data);
var user_access_code = session_data['list'][0]['access_code'];
$.ajax({
	url: 'https://piick.co.kr',
	type: 'POST',
	data: {"_plugin":'product',"_action":'product',"_action_type":'load',"_user_access_code":user_access_code},
	success: function(data) {
		console.log(data);
		var html = '<div class="auction_row"><div class="auction_cell">상품/제품명</div>'+
			'<div class="auction_cell">입찰최대값</div><div class="auction_cell">경매기간</div>'+
			'<div class="auction_cell">상태</div><div class="auction_cell">취소</div></div>';
		for(var i=0; i < data['list'].length; i++){
			if(data['list'][i]['auction_status'] == 'waiting'){
				var auction_status ='승인대기';
				var auction_class = 'auction_ty01';
			}else if(data['list'][i]['auction_status'] == 'success' && auction_bidding_start_date.format('YYYY-MM-DD') > st_date){
				var auction_status ='경매대기';
				var auction_class = 'auction_ty05';
			}else if(data['list'][i]['auction_status'] == 'success' && auction_bidding_start_date.format('YYYY-MM-DD') <= st_date && auction_bidding_end_date.format('YYYY-MM-DD') >= st_date){
				var auction_status ='경매진행';
				var auction_class = 'auction_ty02';
			}else if(data['list'][i]['auction_status'] == 'success' && auction_bidding_end_date.format('YYYY-MM-DD') < st_date){
				var auction_status ='경매종료';
				var auction_class = 'auction_ty03';
			}else if(data['list'][i]['auction_status'] == 'refusal'){
				var auction_status ='승인거절';
				var auction_class = 'auction_ty04';
			}
			if(data['list'][i]['auction_status'] != 'cancel'){
				html += '<div class="auction_row" id="auction_row" >'+
					'<div class="auction_cell" data-r-field="product_name">'+data['list'][i]['product_name']+'</div>'+
					'<div class="auction_cell" data-r-field="auction_maximum_point">'+data['list'][i]['auction_maximum_point']+'</div>'+
					'<div class="auction_cell"><span data-r-field="auction_bidding_start_date">'+data['list'][i]['auction_bidding_start_date']+'</span> ~ <span data-r-field="auction_bidding_end_date">'+data['list'][i]['auction_bidding_end_date']+'</span></div>'+
					'<div class="auction_cell"><span class="'+auction_class+'" data-r-field="auction_status">'+auction_status+'</span></div>'+
					'<div class="auction_cell"><span id="cancel" idx="'+data['list'][i]['idx']+'">취소</span></div>'+
				'</div> ';
			}
		}
		$('.auction_tbl').empty();
		$('.auction_tbl').append(html);
	}
});
});



function date_add(sDate, nDays) {
    var yy = parseInt(sDate.substr(0, 4), 10);
    var mm = parseInt(sDate.substr(5, 2), 10);
    var dd = parseInt(sDate.substr(8), 10);
    d = new Date(yy, mm - 1, dd + nDays);
    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
    return '' + yy + '-' +  mm  + '-' + dd;
}

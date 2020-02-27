$(document).ready(function(){
	$(".coin_delete_btn").click(function(){
		$(".slide_form").animate({"left":"-50%"});
	});

	$(".ok_info_check").click(function(){
		location.leload();
	});
	$('.number_input').focus(function(){
			var focus_id = $(this).attr('id');
			sessionStorage.setItem('focus_id', focus_id);
			console.log(focus_id);
		});
	$('.point_cell').click(function(){
				var num = $(this).text();
				var focus_id = $.trim(sessionStorage.getItem('focus_id'));
				var focus_jquery_id = '#'+focus_id;
				var focus_val = $(focus_jquery_id).val();

	      if(num == "←"){
	        focus_val = focus_val.slice(0,-1);
	        $(focus_jquery_id).val(focus_val);
	      }else if(num == "확인"){
					var phone = $('#phone_num').val();
					if(phone == ''){
						alert('번호를 입력해주세요.');
						$('#phone_num').focus();
						return false;
					}

					$.ajax({
						url: 'https://piick.co.kr',
						type: 'POST',
						data: {"_plugin":'user',"_action_type":'phone_search','search_data':phone,"_action":'user'},
						success: function(data) {
							var html='<ul class="point_row"><li class="point_cell">번호</li><li class="point_cell">이름</li><li class="point_cell">전화번호</li></ul>';
							sessionStorage.setItem('user_data', JSON. stringify(data) );
							console.log(data);
							if(data['list'] != undefined){
								for(var i=0; i < data['list'].length; i++){
									html += '<ul class="point_row point_cursor" idx_code='+data['list'][i]['identification_code']+'><li class="point_cell" id="user_list_cell">'+(i+1)+'</li><li class="point_cell" id="user_list_cell">'+data['list'][i]['display_name']+'</li>'+
										'<li class="point_cell" id="user_list_cell">'+data['list'][i]['phone']+'</li></ul>'

								}
							}else{
								$('#user_list').empty();
								alert('회원이 없습니다.');
							}

							$('#user_list').empty();
							$('#user_list').append(html);
						}
					});

	      }else if(num == "취소"){
	        $('.number_input').val('');
	      }else{

	        $(focus_jquery_id).val(focus_val+num);
	      }

		});

		$(document).on('click','#user_list_cell',function(){
			var idx = Number($(this).parent().children().first().text() - 1);
			var data = sessionStorage.getItem('user_data');
			json_data = JSON.parse(data);
			var user_code = json_data['list'][idx]['phone'];
			$('.coupon_search').attr('idx_code',$(this).parent().attr('idx_code'));
			$.ajax({
				url: 'https://piick.co.kr',
				type: 'POST',
				data: {"_plugin":'transfer',"_action_type":'search',"_action":'transfer',"user_code":user_code},
				success: function(data) {
					if(data['list'][0]['SUM(amount)'] > 0){
							$('#amount').text(data['list'][0]['SUM(amount)']);
					}else{
							$('#amount').text(0);
					}

				}
			});
				$(".slide_form").animate({"left":"0"});
				$('#amount_use').focus();
			$('#display_name').text(json_data['list'][idx]['display_name']);
			$('#mobile').text(json_data['list'][idx]['phone']);
			$('#amount').text(json_data['list'][idx]['amount']);
		});

		$('#coin_btn').click(function(){
	    var amount_use = $('#amount_use').val();
	    var mobile = $('#mobile').text();
	    if(amount_use > $('#amount').text() ){
	      alert('보유적립금이 작습니다.');
	      $('#amount_use').focus();
	      return false;
	    }
	    $.ajax({
	      url: 'https://piick.co.kr',
	      type: 'POST',
	      data: {"_plugin":'transfer',"_action_type":'submit',"_action":'transfer',"_submit_type":'insert',"_mode":'use',"amount":amount_use,"mobile":mobile},
	      success: function(data) {
	          $(".pop_form").fadeIn();
						$(".ok_info").fadeOut();


	      }
	    });
	  });
		$(".coupon_search").click(function(){
			$(".pop_form").fadeIn();
			$(".coupon_pop").fadeIn();
		});

		$(".coupon_pop_close").click(function(){
			$(".pop_form").fadeOut();
			$(".coupon_pop").fadeOut();
		});
		$(".coupon_btn").click(function(){
			$(".coupon_pop").fadeOut();
			$(".ok_info").fadeIn();
		});

		$('.coupon_search').click(function(){
			var idx_code = $(this).attr('idx_code');
			var coupon_class = '';
			var html = '<div class="coupon_row"><div class="coupon_cell">쿠폰명</div><div class="coupon_cell">쿠폰번호</div>'+
									'<div class="coupon_cell">유효기간</div><div class="coupon_cell">쿠폰상태</div></div>';
			session_data = sessionStorage.getItem('item');
			session_data = JSON.parse(session_data);
			var user_access_code = session_data['list'][0]['access_code'];
									$.ajax({
					  	      url: 'https://piick.co.kr',
					  	      type: 'POST',
					  	      data: {"_plugin":'product',"_action":'order',"_action_type":'coupon_list',"_identification_code":idx_code,"_user_access_code":user_access_code},
					  	      success: function(data) {
											console.log(idx_code);
											for(var i=0; i < data['list'].length; i++){
												coupon_status = data['list'][i]['coupon_status'];
												if(coupon_status == "true"){
													coupon_text = "사용가능"
													coupon_class = "coupon_btn";
												}else{
													coupon_text = "사용완료"
													coupon_class = "coupon_none";
												}
												html += '<div class="coupon_row" >'+
													'<div class="coupon_cell" id="product_name">'+data['list'][i]['product_name']+'</div>'+
													'<div class="coupon_cell" id="coupon_number">'+data['list'][i]['coupon_number']+'</div>'+
													'<div class="coupon_cell" id="coupon_validity">'+data['list'][i]['coupon_validity']+'</div>'+
													'<div class="coupon_cell"><span class="'+coupon_class+'" id="coupon_status" idx='+data['list'][i]['idx']+'>'+coupon_text+'</span></div>'+
													'</div>';

											}
											$('#coupon_list').empty();
											$('#coupon_list').append(html);


					  	      }
					  	    });



		});

		$(document).on('click','#coupon_status',function(){
			var idx = $(this).attr('idx');
			var submit_data = {"coupon_status":false};
			var text = $(this).text();
			session_data = sessionStorage.getItem('item');
			session_data = JSON.parse(session_data);
			var user_access_code = session_data['list'][0]['access_code'];
			if(text == "사용완료"){
				alert('사용할 수 없습니다.');
				return false;
			}

			$.ajax({
	      url: 'https://piick.co.kr',
	      type: 'POST',
	      data: {"_plugin":'product',"_action_type":'submit',"_action":'order',"_submit_type":'submit',"_idx":idx,"__submit_data":_submit_data,"_user_access_code":user_access_code},
	      success: function(data) {
					if (data['code'] == '000') {
						alert('사용되었습니다.');
						location.reload();
					} else if (data['message']) {
						alert(data['message']);
					} else {
						alert('사용 실패하였습니다. 관리자에게 문의바랍니다.');
					}
	      }
	    });
			rune(this).api({
				'_action': 'order',
				'_plugin': 'product',
				'_action_type': 'submit',
				'_submit_type': 'submit',
				'_idx': idx,
				'_submit_data': submit_data,
				'_callback': function(data) {

				}
			});
		})





});

$(document).ready(function(){
  var session_data = sessionStorage.getItem('item');
  session_data = JSON.parse(session_data);

  $('#coin_use').click(function(){
    if(session_data['list'][0]['franchisee_status'] == 'lite'){
      alert('캐쉬사용은 베이직회원만 사용하실 수 있습니다.');
      return false;
    }
  });
  $('#coin_use').click(function(){
    if(session_data['list'][0]['franchisee_status'] == 'lite'){
      alert('캐쉬사용은 베이직회원만 사용하실 수 있습니다.');
      return false;
    }
  });

  $('#member_list').click(function(){
    if(session_data['list'][0]['franchisee_status'] == 'lite'){
      alert('고객관리는 베이직회원만 사용하실 수 있습니다.');
      return false;
    }
  });
});

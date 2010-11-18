function setCookie(name, value) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 356); // +1 year
	if (!name || !value) return false;
	document.cookie = name + '=' + encodeURIComponent(value) + '; expires='+ exdate.toUTCString() + '; path=/'
	return true
}

function getCookie(name) {
	var pattern = "(?:; )?" + name + "=([^;]*);?"
	var regexp  = new RegExp(pattern)
	 
	if (regexp.test(document.cookie)) return decodeURIComponent(RegExp["$1"])
	return false
}

function change_field_player_uniform() {
	newfp_value = prompt("�������� ����� ��������", field_player_img_src);
	if (newfp_value) {
		field_player_img_src = newfp_value;
		setCookie("fp_uniform", newfp_value);
		$('#fp_uniform_image').attr('src', newfp_value);
		fillTextarea();
	}
}

function change_goalkeeper_uniform() {
	newfp_value = prompt("�������� ����� ��������", goalkeeper_player_img_src);
	if (newfp_value) {
		goalkeeper_player_img_src = newfp_value;
		setCookie("gk_uniform", newfp_value);
		$('#gk_uniform_image').attr('src', newfp_value);
		fillTextarea();	
	}
}

function fillTextarea() {
		var td_st = '[td valign=top width=20% bgcolor=#C9F8B7]'
		var td_fn = '[/td]';

		preparedhtml = '';
		preparedhtml += '[b]��������� ������:[/b]';
		preparedhtml += '[table]';

		// ���������
		preparedhtml += '[tr]';
		
		// 1
		preparedhtml += '[td width=20% height=50] [/td]';
		
		for(j=0;j<3;j++) {

			if (sostav[23+j]) {
				preparedhtml += td_st + '[table width=100% bgcolor=#A3DE8F]';
				playerid = sostav[23+j];
				var playergames = players[playerid]["games"]
				var playermom = players[playerid]["mom"]
				var playergoals = players[playerid]["goals"]
				var playerpasses = players[playerid]["passes"]

				preparedhtml += '[tr][td colspan=2][b]' + players[playerid]["firstname"][0] + '.' + (players[playerid]["secondname"]).replace(' ','') + '[/b][/td][/tr]';
				preparedhtml += '[tr][td][player=' + playerid + '][img]'+ field_player_img_src +'[/img][/player][/td]';
				preparedhtml += '[td valign=top align=center height=41 ]';
				if (playergames != 0) {
					preparedhtml += 'CP' + players[playerid]["ratingav"] + '\n';
					preparedhtml += '� ' + playergames;
					preparedhtml += (playermom != 0 ? '(' + playermom + ')\n' : '');
					preparedhtml += (playergoals != 0 || playerpasses != 0 ? '��/' + playergoals + '+' + playerpasses : '');
				} else {
					preparedhtml += ' ';
				}
				preparedhtml += '[/td][/tr]';
				preparedhtml += '[tr][td colspan=2 align=right][b]���' + players[playerid]["form"] + ' ���' + players[playerid]["morale"] + '[/td][/tr]';
				preparedhtml += '[/table]' + td_fn;
			} else {
				preparedhtml += '[td width=20% height=50] [/td]';
			}

		}
		
		// 5
		preparedhtml += '[td width=20% height=50] [/td]';
		preparedhtml += '[/tr]';
		
		// ��� // AM // MF // DM // DF
		for(k=0;k<20;k+=5) {
			preparedhtml += '[tr]';
			
			for(j=0;j<5;j++) {
				preparedhtml += td_st;
				if (! sostav[18-k] && ! sostav[19-k] && ! sostav[20-k] && ! sostav[21-k] && !sostav[22-k]) {
					preparedhtml += ' height=50';
				}
				preparedhtml += '][center]';
				if (sostav[18-k+j]) {
					playerid = sostav[18-k+j];
					playertext = players[playerid]["firstname"] + ' ' + players[playerid]["secondname"];
					playertext = '[img]'+ field_player_img_src +'[/img]'+ "\n" + playertext;
					preparedhtml += playertext;
				} else {
					preparedhtml += ' ';
				}
				preparedhtml += td_fn;
			}
			
			preparedhtml += '[/tr]';
		}
		
		for(k=2;k>0;k--) {
		
			preparedhtml += '[tr]';
			
			for(j=0;j<2;j++) {
				preparedhtml += '[td width=20%';
				if (! sostav[k]) {
					preparedhtml += ' height=50';
				}
				preparedhtml += ']';
				preparedhtml += ' ';
				preparedhtml += '[/td]';
			}
			
			preparedhtml += td_st;
			
			if ( sostav[k] ) {
				playerid = sostav[k];
				playertext = players[playerid]["firstname"] + ' ' + players[playerid]["secondname"];
				if (k == 1) {
					playertext = '[img]'+ goalkeeper_player_img_src +'[/img]'+ "\n" + playertext;
				} else {
					playertext = '[img]'+ field_player_img_src +'[/img]'+ "\n" + playertext;
				}
				preparedhtml += playertext;
			} else {
				preparedhtml += ' ';
			}
			preparedhtml += td_fn;
			
			for(j=0;j<2;j++) {
				preparedhtml += '[td width=20%]';
				preparedhtml += ' ';
				preparedhtml += '[/td]';
			}
			
			preparedhtml += '[/tr]';
				
		}
				
		preparedhtml += '[/table]';
		
		preparedhtml += "\n\n";
		preparedhtml += '[b]�������� ��������:[/b]';
		preparedhtml += '[table]';
		preparedhtml += '[tr]';
		
		for(j=12;j<=16;j++) {
		preparedhtml += td_st;
			
			if ( pids[j] ) {
				playerid = pids[j];
				playertext = players[playerid]["firstname"] + ' ' + players[playerid]["secondname"];
				if (players[playerid]["position"] == "GK") {
					playertext = '[img]'+ goalkeeper_player_img_src +'[/img]'+ "\n" + playertext;
				} else {
					playertext = '[img]'+ field_player_img_src +'[/img]'+ "\n" + playertext;
				}
				preparedhtml += playertext;
			} else {
				preparedhtml += ' ';
			}
			preparedhtml += td_fn;
			
		}
		
		preparedhtml += '[/tr]';
		preparedhtml += '[/table]';
		
		$('#sostav_na_match').html(preparedhtml);
}

var data_assoc = [];
var pids = [];		// id �������, ���������� � ������
var players = []; // ������ �������, � ������� ���� ������� - id ������, � ������ - ������ ��� ����� ������
var sostav = []; // ������, � ������� ���� - ������� �� ����, � �������� - id ������
var positions = [];
var field_player_img_src = '/field/img/146cd60f8c4985270b74f7839e98059a.png';
fp_cookie_value = getCookie("fp_uniform");
if (fp_cookie_value) {
	field_player_img_src = fp_cookie_value;
}
var goalkeeper_player_img_src = '/field/img/41ccf2617ef2be4688e36fefa1eefcb7.png';	
gk_cookie_value = getCookie("gk_uniform");
if (gk_cookie_value) {
	goalkeeper_player_img_src = gk_cookie_value;
}
	
$().ready(function() {
		
	$('.back4').html('<table border="0" cellspacing="0" cellpadding="10" width="100%" height="100%"><tr><td valign="top" class="contentframer"></td></tr></table>');
	$.get('fieldnew.php', {}, function(data){
		var dataarray = data.split('&');
		
		// ����� �� ����� ������� dataarray
		// � ��������������� ��� � �������������, ��������:
		// data_assoc["corners9"] = 9;
		// � ��� �����
		var i = 0;
		while(dataarray[i] != null) {
			tmparr = dataarray[i].split('=');
			var tmpkey = tmparr[0];
			var tmpvalue = tmparr[1];
			data_assoc[tmpkey] = tmpvalue;
			i++;
		}
		
		// ������ �� �������� id ���� �������, ���������� � ������
		for(i=1;i<=16;i++) {
			pids[i] = data_assoc["pid" + i];
			var position = data_assoc["p0_" + i];
			sostav[position] = pids[i]; // ��������� ������� �� ����
		}
		
		// ������ �������� ������ �� �������
		var num_players = data_assoc["n"];
		
		for(i=0;i<num_players;i++) {
			// ���� ������ ��� � �������
			var tmpplayer = [];
			tmpplayer["firstname"] = data_assoc["firstname"+i];
			tmpplayer["secondname"] = data_assoc["secondname"+i];
			tmpplayer["position"] = data_assoc["position"+i];
			tmpplayer["ratingav"] = data_assoc["ratingav"+i];
			tmpplayer["games"] = data_assoc["games"+i];
			tmpplayer["mom"] = data_assoc["mom"+i];
			tmpplayer["goals"] = data_assoc["goals"+i];
			tmpplayer["passes"] = data_assoc["passes"+i];
			var playerid = data_assoc["id" + i];
			players[playerid] = tmpplayer;
		}
		
		
		// ���� ������ ��������, ����� ��������
		preparedhtml = '';
		preparedhtml += '����� �������� ������:<br />';
		preparedhtml += '<img src="'+ field_player_img_src +'" alt="" id="fp_uniform_image" /><br />';
		preparedhtml += '<a href="javascript: change_field_player_uniform();">��������</a><br />';
		
		preparedhtml += '����� �������:<br />';
		preparedhtml += '<img src="'+ goalkeeper_player_img_src +'" alt="" id="gk_uniform_image" /><br />';
		preparedhtml += '<a href="javascript: change_goalkeeper_uniform();">��������</a><br /><br />';
		
		preparedhtml += '<textarea rows="10" cols="60" readonly="readonly" id="sostav_na_match">';
		preparedhtml += '</textarea>';
		$('.contentframer').html(preparedhtml);	
		fillTextarea();
		
	});
	
}, false);
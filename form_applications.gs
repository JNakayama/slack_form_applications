function BenkyokaishowStatus() {
  // シートを取得
  var spreadSheetURL = "[シートのURL]";

  // 取り扱いたいスプレッドシートのURL
  var spreadSheet = SpreadsheetApp.openByUrl(spreadSheetURL);
  // シートを指定
  var sheet = spreadSheet.getSheetByName("[シート名]");

  var message = '';
  var arr = sheet.getRange("[対象範囲]").getValues();
  var list = {};
  var count = 0;

  // ラベルを除いた対象行数を取得
  var lastRow = sheet.getLastRow();
  var length = lastRow - 1;

  for (var i=0 ;i <= length ; i++) {
    if (arr[i][2] =='参加します') {
      list[i] = arr[i][1];
    }
  }

  if (length > 0) {
    var datetime = Utilities.formatDate(new Date(), "Asia/Tokyo", "HH:mm")
    message = datetime + '現在の参加者数 ： ' + length + '人 :bakushou: \n';
    message = message + "<" + spreadSheetURL + "|詳細はこちら>\r\n"
    BenkyokaislackPost(message);
  } 
}

function BenkyokaislackPost(message) {
  
  //slack_token
  var token = "[Slack APIのトークン]";

  var slackApp = SlackApp.create(token);
  var ChannelId = "[投稿するSlackのチャンネル]";
  var botName = "[投稿するbot名]";
  var Options = {
      username: botName,
  }
  slackApp.postMessage(ChannelId, message, Options);
}



var page = 0;
var current_page = page + 1;
var query = document.getElementById('gbqfq').value;

var qiita = new QiitaRequest();

function init() {
    $right_col = $("<div/>").attr("id","right_col");
    $("div#center_col").after($right_col);
//     $("body").append($right_col);

    $qiita_header = $("<div/>").attr("id", "qiita_header");
    $qiita_link = "<a href='http://qiita.com'>Qiita</a>";
    $qiita_header.html($qiita_link);
    $right_col.append($qiita_header);

    $search_list = $("<ul/>").attr("id", "search_list");
    $right_col.append($search_list);

}
init();

function searchByQiita(query, page) {
    qiita.search(query, page, 10, function(result){
        console.log(result);

        $search_list.html("");
        for (var i=0; i<result.length; i++) {
            $list = $("<li/>");

            $article = $("<div/>");
            $article_html = "<a class='title' href='" + result[i].url + "'>" +result[i].title + "</a>";
            $article.html($article_html);

            $content = $("<div/>");
            //             $content_html = "<span>" + result[i].body + "</span>";
            $content_html = trimTinyWord(result[i].body, 100);
            $content.text($content_html);

            $article.append($content);
            $list.append($article);
            
            $tags = $("<div/>").css("margin","0 0 0 20px");
            var tags_str = '<ul class="count"><li>ストック数：'+result[i].stock_count+'</li><li>コメント数：'+result[i].comment_count+'</li></ul><p class="clear"></p>';
            tags_str += '<span style="float:left; font-size:11px">関連タグ：</span><ul class="tags">';
            for (var j=0; j<result[i].tags.length; j++) {
                tags_str += '<a href="http://qiita.com/tags/"' + result[i].tags[j].name + '><li>'+result[i].tags[j].name+'</li></a>';
            };
            tags_str += '</ul><p class="clear"></p></div>';
            $tags.html(tags_str);
            $list.append($tags);

            $search_list.append($list);
        }

    });
}


var search_button = document.getElementById('gbqfb').
    query = document.getElementById('gbqfq').value;
addEventListener('click', function() {
    searchByQiita(query, 0);
}, true);

searchByQiita(query, 0);


function trimTinyWord(string, count) {
    var no_tag_html = string.replace(/<\/?[^>]+>/gi, "");
    return no_tag_html.substring(0, count)+" ...";
}

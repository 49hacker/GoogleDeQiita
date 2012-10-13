

var QiitaRequest = function(){

    this.search = function(query, page, per_page, callback) {

        var xhr = new XMLHttpRequest();

        var query = query.replace(/(\ )+/g, "+");
        //console.log(query);

        xhr.open('GET', 'https://qiita.com/api/v1/search?q='+query+'&page='+page+'&per_page='+per_page, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                console.log(JSON.parse(xhr.responseText));
                var result = JSON.parse(xhr.responseText); 
				callback(result);
            }
        };
        xhr.send(null);

    }


}

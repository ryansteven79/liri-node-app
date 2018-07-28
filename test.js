<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>



    function showHeadlines() {
        $.ajax({
            url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=c8fc0a8d03454541870dac3aa43217cb",
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    };



    showHeadlines();

    
'use strict';

(function() {
    var langs = ['en', 'zh'];

    var fetchFeed = function(lang) {
        var host = 'http://' + lang + '.wikipedia.org/';
        var url = host + 'w/api.php?action=featuredfeed&feed=onthisday&feedformat=rss';
        $.ajax({
            url: '//api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url),
            dataType: 'jsonp',
            success: function(data) {
                var items = data.items;
                var feeds = '';
                for (var i = items.length - 1; i > 0; i--) {
                    feeds = feeds + items[i].content + '<hr>';
                }

                // fix wikipedia links
                feeds = feeds.replace(/\/(wiki\/[%\w]+)/g, host + '$1');

                $('.wikifeed.' + lang).html(feeds);
            }
        });
    };

    langs.forEach(function(lang) {
        fetchFeed(lang);
    });
})();

'use strict';

(function() {
    var langs = ['en', 'zh'];

    var fetchFeed = function(lang) {
        var host = 'http://' + lang + '.wikipedia.org/';
        var url = host + 'w/api.php?action=featuredfeed&feed=onthisday&feedformat=rss';
        $.ajax({
            url: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + encodeURIComponent(url),
            dataType: 'jsonp',
            success: function(data) {
                var entries = data.responseData.feed.entries;
                var feeds = '';
                for (var i = entries.length - 1; i > 0; i--) {
                    feeds = feeds + entries[i].content + '<hr>';
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

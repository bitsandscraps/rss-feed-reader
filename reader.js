// The feed title looks like "CATEGORH • TITLE". We need to get rid of the first part.
var header_length = (CATEGORY + " • ").length;
function getTitle(raw_text) {
        return raw_text.slice(header_length);
}

$(document).ready(function(){
        $.get("http://sisrel.kaist.ac.kr/phpBB3/app.php/feed", function(data){
                var notice_fragment = document.createDocumentFragment();
                $(data).find("entry").filter(function(){
                        return $(this).find("category").attr("term") === CATEGORY;
                }).slice(0, MAXLENGTH).each(function(){
                        var entry = $(this);
                        var title = getTitle(entry.find("title").text());
                        var url = entry.find("id").text();
                        // <a href="URL"> TITLE </a>
                        var link_to_post = document.createElement("a");
                        link_to_post.setAttribute("href", url);
                        link_to_post.appendChild(document.createTextNode(title));
                        // <p> LINK_TO_POST </p>
                        var list_element = document.createElement("p");
                        list_element.appendChild(link_to_post);
                        notice_fragment.appendChild(list_element);
                });
                document.getElementById(ELEMENT_ID).appendChild(notice_fragment);
        });
});

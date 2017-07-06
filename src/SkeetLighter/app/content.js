$(setup);

var hits = 0;
var original_title;

var domainMemberIds = [];

function setup() {
    domainMemberIds.push({ Host: "stackoverflow.com", MemberID: "22656" });
    domainMemberIds.push({ Host: "meta.stackoverflow.com", MemberID: "22656" });
    domainMemberIds.push({ Host: "superuser.com", MemberID: "410" });
    domainMemberIds.push({ Host: "programmers.stackexchange.com", MemberID: "8958" });
    domainMemberIds.push({ Host: "serverfault.com", MemberID: "173" });
    domainMemberIds.push({ Host: "codereview.stackexchange.com", MemberID: "16031" });
    domainMemberIds.push({ Host: "stackapps.com", MemberID: "69" });
    domainMemberIds.push({ Host: "codegolf.stackexchange.com", MemberID: "2576" });
    domainMemberIds.push({ Host: "english.stackexchange.com", MemberID: "11452" });
    domainMemberIds.push({ Host: "boardgames.stackexchange.com", MemberID: "173" });
    domainMemberIds.push({ Host: "webapps.stackexchange.com", MemberID: "44" });

    original_title = document.title;
    findSkeets();

    var mainbar = $("#mainbar");
    var observer = new MutationSummary({
        callback: findSkeets,
        queries: [{element: "div.question, div.answer, tr.comment, div.question-summary"}]
    });
}

//Find any answers/comments made by Jon Skeet and highlight them.
function findSkeets()
{
    //Debug: Add the Number of function hits to the title bar
    //hits++;
    //document.title = "(" + hits + ") " + original_title;

    //First, get the UserID for the current domain.
    var id = getMemberId();

    if (id != null)
    {        
        //answers
        var answers = $("div.answer:has(td.post-signature:has(a[href^='/users/" + id + "']):has(div.user-action-time:contains('answered'))) > table > tbody > tr:first:not(.skeet-Lighter)");
        answers.addClass("skeet-Lighter");

        //questions
        var questions = $("div.question:has(td.owner a[href^='/users/" + id + "']) > table > tbody > tr:first:not(.skeet-Lighter)");
        questions.addClass("skeet-Lighter");

        //comments
        var comments = $("tr.comment:not(.skeet-Lighter):has(a.comment-user[href^='/users/" + id + "'])")
        comments.addClass("skeet-Lighter");

        //Summary items
        var summary = $("div.question-summary:not(.skeet-Lighter):has(a[href^='/users/" + id + "'])");
        summary.addClass("skeet-Lighter");

        if (answers.length > 0 || comments.length > 0 || questions.length > 0) {
            //Show Skeets Icon in the Title when he has activity on the post.
            $("div[id='question-header']").addClass("skeet-Header");
        }        
    }

}

//Get the MemberId for this domain.
function getMemberId()
{
    var items = $.grep(domainMemberIds, function (e) { return e.Host == location.host; });
    var id = null;

    if (items.length == 1) id = items[0].MemberID;

    console.log(location.host + ": " + id);
    
    return id;
}

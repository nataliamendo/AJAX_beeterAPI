var API_BASE_URL = "http://localhost:8080/beeter-api/stings";
var USERNAME = "alicia";
var PASSWORD = "alicia";


$("#button_get_stings").click(function(e) {
	e.preventDefault();
    $("#get_repo_result").text('Get Stings');
	getStings();
});

$("#button_get_sting").click(function(e) {
	e.preventDefault();
	getSting($("#stingid_name").val());
});

$("#button_to_create").click(function(e) {
    e.preventDefault();
                             
    var newSting = new Object();
    newSting.username = $("#username_to_string").val();
    newSting.Subject = $("#subject_to_string").val();
    newSting.Subject = $("#content_to_string").val();
    newSting.homepage = "https://localhost:8080";
    newSting.private = false;
    newSting.has_issues = true;
    newSting.has_wiki = true;
    newSting.has_downloads = true;
                            
    createSting(newSting);
});

$("#button_get_sting_to_edit").click(function(e) {
	e.preventDefault();
	getStingToEdit($("#stingid_get").val());
});


$("#button_edit_sting").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.content = $("#content_to_edit").val()
	newRepo.subject = $("#subject_to_edit").val()
	newRepo.stingid = $("#stingid_get").val()
	
	updateSting(newRepo);
});




$("#button_del_repo").click(function(e) {
    e.preventDefault();
    deleteRepo($("#repository_name").val());
});


function getStings() {
	var url = API_BASE_URL;
	$("#stings_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
        username : "alicia",
        password : "alicia",
           
	}).done(function(data, status, jqxhr) {
            var sting = data;
            
            $("#sting_result").text('');
            $('<h4> Username: ' + sting.author + '</h4>').appendTo($('#sting_result'));
            $('<p>').appendTo($('#get_repo_result'));
            $('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#sting_result'));
            $('<strong> lastModified: </strong> ' + repo.lastModified+ '<br>').appendTo($('#sting_result'));
            $('<strong> subject: </strong> ' + repo.subject + '<br>').appendTo($('#sting_result'));
            $('<strong> content: </strong> ' + repo.content + '<br>').appendTo($('#sting_result));
            $('</p>').appendTo($('#get_repo_result'));
            
	}).fail(function() {
		$("#stings_result").text("No stings.");
	});

}

function getSting(stingid) {
	var url = API_BASE_URL + stingid ;
	$("#get_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
           username : "alicia",
           password : "alicia",
           
	}).done(function(data, status, jqxhr) {

				var sting = data;

				$("#get_repo_result").text('');
				$('<h4> Username: ' + sting.author + '</h4>').appendTo($('#get_repo_result'));
				$('<p>').appendTo($('#get_repo_result'));	
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo($('#get_repo_result'));
				$('<strong> lastModified: </strong> ' + repo.lastModified+ '<br>').appendTo($('#get_repo_result'));
				$('<strong> subject: </strong> ' + repo.subject + '<br>').appendTo($('#get_repo_result'));
                $('<strong> content: </strong> ' + repo.content + '<br>').appendTo($('#get_repo_result'));
				$('</p>').appendTo($('#get_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#get_repo_result"));
	});

}
function createSting(Sting) {
	var url = API_BASE_URL;
	var data = JSON.stringify(Sting);
    
	$("#create_result").text('');
    
	$.ajax({
           url : url,
           type : 'POST',
           crossDomain : true,
           dataType : 'json',
           data : data,
           username: "alicia",
           password: "alicia",
           
           }).done(function(data, status, jqxhr) {
                   $('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));
                   }).fail(function() {
                           $('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
                           });
    
}

function getStingToEdit(sintgid) {
	var url = API_BASE_URL + sintgid;
	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		username: "alicia",
		password: "alicia",
		
	}).done(function(data, status, jqxhr) {
		
				var repo = data;
				
				$("#update_result").text('');
				$("#content_to_edit").val(repo.content);
				$("#subject_to_edit").val(repo.subject);

	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_result"));
	});

}

function updateSting(Sting) {
	var url = API_BASE_URL + Sting.sintgid;
	var data = JSON.stringify(Sting);

	$("#update_result").text('');

	$.ajax({
		url : url,
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		data : data,
		username: "alicia",
		password: "alicia",
		
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#update_result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}





function deleteRepo(stingid) {
	var url = API_BASE_URL + stingid
	$("#update_result").text('');
    
	$.ajax({
           url : url,
           type : 'DELETE',
           crossDomain : true,
           dataType : 'json',
   			username: "alicia",
   			password: "alicia",
           
           }).done(function(data, status, jqxhr) {
                   
        	   $('<div class="alert alert-danger"> <strong>OK!</strong> It works! </div>').appendTo($("#update_result"));    
                   
          }).fail(function() {
                           $('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#update_result"));
      });
    
}


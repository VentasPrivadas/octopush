function goLive(element) {
    var $el = $(element),
        jobId = $el.data('jobId'),
        moduleName = $el.data('jobTargetModule'),
        moduleVersion = $el.data('jobTargetVersion'),
        message = 'Are you sure you want to go live with [' + moduleName + '] version ' + moduleVersion + '?',
        answer = confirm(message);


    if (answer == true) {
        var url = '/jobs/' + jobId + '/golive',
            $icon = $el.find('i');
        
        $icon.removeAttr('class');
        $icon.addClass('fa').addClass('fa-spinner').addClass('fa-spin');

        $.get(url)
            .done(function() {
                getJobs();
            })
            .fail(function() {
                alert("An error occurred, if you don't see the job deploying, please try again");
            });
    }
}

function rollback(element) {
    var $el = $(element),
        moduleName = $el.data('jobTargetModule'),
        moduleVersion = $el.data('jobTargetVersion'),
        jobId = $el.data('jobId'),
        message = 'Are you sure you want to rollback [' + moduleName + '] version ' + moduleVersion + '?',
        answer = confirm(message);

    if (answer == true) {
        var url = '/jobs/' + jobId + '/rollback',
            $icon = $el.find('i');
        
        $icon.removeAttr('class');
        $icon.addClass('fa').addClass('fa-spinner').addClass('fa-spin');
        
        $.get(url)
                .done(function() {
                    getJobs();
                })
                .fail(function() {
                    alert("An error occurred, if you don't see the job rolling back, please try again");
                });
    }
}

function myComponents() {
    var url,
        btnClass = $('#my-components').attr('class');

    if(btnClass.indexOf('btn-on') >= 0){
        url = '/mycomponents/btn-off';
    }else{
        url = '/mycomponents/btn-on';
    }
    
    $.get(url)
        .done(function() {
            location.reload();
        })
        .fail(function() {
            alert("An error occurred, please try again");
        });
}

$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $(".container").on('click', "[data-job-go-live]", function (e) {
        goLive(this);
        return false;
    });
    $(".container").on('click', "[data-job-rollback]", function (e) {
        rollback(this);
        return false;
    });

    $('.container').on('click', "#my-components", function (e) {
        e.preventDefault();
        myComponents();
    });
});
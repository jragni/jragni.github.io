var engineerFlag = 0;

// Default flags for toggle buttons on start-up;
var _isAboutShow = true;
var _isPortfolioShow = false;
var _isResumeShow = false;
var _isContactShow = false;
// get the value of Resume detail
var _isBrief;
// 

///////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
    console.log('works')
    // Hide on start up.
    $('#portfolio-wrapper').hide();
    $('#resume-content').hide();

    // Hero Image Text change
    var changeEngineer = setInterval(changeEngineerType,1500);

    // about me toggle hide/show
    $('#about-me-toggle').on("click",(e)=>{

        e.preventDefault();
        // if it is showing on click.. hide  and change icon to expan more 
        // if it is not showing on click.. show

        if(_isAboutShow === true){
            $('#bio').hide();
            // change flag to false;
            _isAboutShow = false;

            $('#about-me-toggle').html("expand_more")
        }
        else if(_isAboutShow === false){
            $('#bio').show();
            _isAboutShow = true;
            $('#about-me-toggle').html("expand_less")

        }
    });
    //Resume content toggle
    $('#resume-toggle').on("click",(e)=>{
        e.preventDefault();
        if(_isResumeShow === true){
            $('#resume-content').hide();
            // change flag to false;
            _isResumeShow = false;

            $('#resume-toggle').html("expand_more");
        }
        else if(_isResumeShow === false){
            $('#resume-content').show();
            _isResumeShow = true;
            $('#resume-toggle').html("expand_less");
        }
    });
    // portfolio toggle
    $('#portfolio-toggle').on("click",(e)=>{
        e.preventDefault();
        if(_isPortfolioShow === true){
            $('#portfolio-wrapper').hide();
            _isPortfolioShow = false;

            $('#portfolio-toggle').html("expand_more");
        }
        else if(_isPortfolioShow === false){
            $('#portfolio-wrapper').show();
            _isPortfolioShow = true;
            $('#portfolio-toggle').html("expand_less");
        }
    });

    //Detailed Resume Switch
    $('.lever').on("click",(e)=>{
        _isBrief = $("#isDetailed").is(':checked');
        if(_isBrief === false){
            $(".detailed").hide();
        }
        else if(_isBrief === true){
            $(".detailed").show();
        };

    });


    $('#aboutLink').on('click',(e)=>{
        e.preventDefault();
        $('#bio').show();
        $('#portfolio-wrapper').hide();
        $('#resume-content').hide();
    });
    
    $('#resumeLink').on('click',(e)=>{
        e.preventDefault();
        $('#bio').hide();
        $('#portfolio-wrapper').hide();
        $('#resume-content').show();
    });

    $('#portfolioLink').on('click',(e)=>{
        e.preventDefault()
        $('#bio').hide();
        $('#portfolio-wrapper').show();
        $('#resume-content').hide();
    });

});

// function for hero image changing the words after ' I am a' 
function changeEngineerType(){
    var engineerType = ["Robotics Engineer", "Leader", "Software Engineer", "Collaborator", "Investor","Mechanical Engineer", "Powerlifter", "Roboticist","Innovator","10X"];
    var engineerObj = document.getElementById("engineer-type");
    engineerObj.innerHTML = engineerType[engineerFlag]
    if(engineerFlag >= engineerType.length-1){
        engineerFlag = 0;  // reset flag
    }
    else{
        engineerFlag++;
    }
}

// {/* <li><a id="aboutLink" href="#about-me"> About</a></li>
// <li><a id="resumeLink" href="#resume">Resume</a href="#"> </li>
// <li><a id="portfolioLink" href="#portfolio">Portfolio</a href="#"></li>
// <li><a id="contactLink" href="#contact-info">Contact Me</a href="#"></li> */}



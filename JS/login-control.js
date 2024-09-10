var dr ={
//DUALREPA, everything there is
        init:function(){
        //initializes all references and objects
                //load div references
                dr.browser.init();

                dr.browser.session.loginForm =$id('loginForm');
                dr.browser.session.username =$name('username')[0];
                dr.browser.session.password =$name('password')[0];
                dr.browser.session.submit =$id('btn');
                dr.browser.session.username.onkeyup
                =dr.browser.session.password.onkeyup
                =dr.browser.session.submit.onkeyup
                =function(e){
                        e.preventDefault();
                        if (e.keyCode ===13) {// Number 13 is "Enter"
                                dr.browser.session.login()
                        }
                };
                dr.browser.session.submit.onclick =function(e){
                        dr.browser.session.login()
                };
        setTimeout(function(){$id('dCreds').className='';}, 500);
                return true
        },
        browser:{
        //contains everything related to browser
                init:function(){
                        dr.browser.vendor.get();
                        dr.browser.vendor.fix();
                },
                vendor:{
                //contains things related to browser versioning and browser patching
                        name:null,
                        get:function(){
                        //finds vendor of browser rg. chrome and saves result into dr.browser.vendor.name
                                if(dr.browser.vendor.name !==null) return;
                                dr.browser.vendor.name =getBrowserVendor();
                        },
                        fix:function(){
                        //applies necessary fixes decided by dr.browser.vendor.name
                                var brwsr =dr.browser.vendor.name;
                                if(brwsr ===undefined){
                                        console.log("dr.browser.vendor.fix: browser type is unknown, no fix applied!");
                                        return;
                                }
                                var cssId = "fixCss";
                                if (!$id(cssId))
                                {
                                        var head  = $tag("head")[0];
                                        var link  = $create("link");
                                        link.id   = cssId;
                                        link.rel  = "stylesheet";
                                        link.type = "text/css";
                                        //link.media = '"all";
                                }

                                if(brwsr ==="ie"){
                                        link.href = "CSS/fix/login-theme-ie.css";
                                }
                                if(brwsr ==="edge"){
                                        link.href = "CSS/fix/login-theme-edge.css";
                                }
                                if(brwsr ==="firefox"){
                                        link.href = "CSS/fix/login-theme-firefox.css";
                                }
                                if(brwsr ==="safari"){
                                        link.href = "CSS/fix/login-theme-safari.css";
                                }
                                if(brwsr ==="safari-ios"){
                                        link.href = "CSS/fix/login-theme-safari-ios.css";
                                }
                                if(brwsr ==="blink chrome" ||brwsr ==="blink opera" ||brwsr ==="chrome"){
                                        link.href = "CSS/fix/login-theme-blink.css";
                                }
                                if(brwsr ==="opera"){
                                        link.href = "CSS/fix/login-theme-opera.css";
                                }
                                head.appendChild(link);
                                console.log("dr.browser.vendor.fix: applied fix for browser type "+dr.browser.vendor.name);
                        }
                },
                session:{
                //contains everything related to session
                        loginForm:undefined,
                        username:undefined,
                        password:undefined,
                        submit:undefined,
                        login:function(){
                                console.log("dr.browser.session.login: logging in user: " +dr.browser.session.username.value);
                                loginForm.submit();
                        },
                        logout:function(){
                                console.log("dr.browser.session.logout: logging user out");
                                window.location.href="php/logout.php"
                                return;
                        },
                        forgottenPassword:function(){
                                alert("I told you to use KeePass! Bud did you listen? Did you?! This could've been avoided...");
                                window.location.href ='mailto:m.lenko@t-systems.com\
                                &subject=DualRepa%20-%20Forgotten%20password\
                                &cc=martin.matta@t-systems.com%3Bjakub.hanula@t-systems.com\
                                &body=Dear%20admin%20Michal%2C%0AI%20am%20a%20huge%20dingus%20and%20managed%20to%20ignore%20all%20advices%20about%20using%20KeePass.%20Now%2C%20I%20call%20for%20your%20help%2C%20to%20help%20me%20recover%20my%20password.%20Thing%20that%20I%20was%20supposed%20to%20keep%20safe.%20I%20do%20not%20know%20how%20I%20was%20able%20to%20live%20for%20this%20long%20in%20IT%20company%20without%20such%20basics.%0A%0AI%20do%20agree%20that%20I%20am%20a%20huge%20retard%20and%20acknowledge%20that%20I%20will%20buy%20you%20both%20a%20beer%20for%20helping%20me%20to%20recover%20my%20password.%20%3C3%0A%0AI%20really%20appreciate%20your%20help%2C%20very%2C%20very%20much.%0AThank%20you%20kind%20sir.';
                        }
                }
        }
}

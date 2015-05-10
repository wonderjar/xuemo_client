angular.module("service.config",[])
    .constant("URL_CONFIG",{
        status:"online",
        host:{
          normalHost:"http://192.168.2.5:3001",
          imgHost:"http://192.168.2.5:3001"
        },
        common:{
            imgApi:"/images",
            courseComments:{
                "online":"/courseRatings"
            },
            courseAppointment:{
                "online":"/appointments"
            },
            districts:{
                "online":"./json/widget/districts.json"
            },
            courseCategories:{
                "online":"./json/widget/course_categories.json"
            },
            personalInfo:{
                "online":"/users"
            }
        },
        app:{
            learn:{
                courseList:{
                    "dev":"./json/learn/course_list.json",
                    "online":"/courses"
                },
                relatedCourseList:{
                    "online":"/courses"
                }
            },
            teach: {
                uploadCoursePhotoToken:{
                    "online":"/files/uploadToken"
                },
                postCourseStep1:{
                    "online":"/courses"
                }
            }
        }
    });
// 手机端路由文件
export default [
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../global/login'], resolve),
        meta: {title: '登录', roleHost: true},
    },
    {
        path: '/connect',
        name: 'connect',
        component: resolve => require(['../global/connect'], resolve),
        meta: {title: '正在加载中', requireAuth: true, roleHost: true},
    },
    //公共路由
    {
        path: '/user/select',
        name: 'user_select',
        component: resolve => require(['../components-page/yd-user-select/test'], resolve),
        meta: {title: '用户选择器', roleHost: true},
    },
    {
        path: '/no/user',
        name: 'no_user',
        component: resolve => require(['../global/no-user'], resolve),
        meta: {title: '暂无此用户', requireAuth: false, roleHost: true},
    },
    {
        path: '/404',
        name: '404',
        component: resolve => require(['../global/tip-404'], resolve),
        meta: {title: '404页面找不到', roleHost: true},
    },
    {
        path: '/logout',
        name: 'logout',
        component: resolve => require(['../global/tip-logout'], resolve),
        meta: {title: '退出登录成功', roleHost: true},
    },
    {
        path: '/server/error',
        name: 'server_error',
        component: resolve => require(['../global/tip-server-error'], resolve),
        meta: {title: '服务器异常', roleHost: true},
    },
    {
        path: '/permissions/error',
        name: 'permissions_error',
        component: resolve => require(['../global/tip-permissions-error'], resolve),
        meta: {title: '权限异常', roleHost: true},
    },
    //角色路由
    {
        path: '/',
        name: 'layout',
        component: resolve => {
            require(['../mobile/layout/layout'], resolve)
        },
        meta: {title: '首页', requireAuth: true},
        children: [
            //学生
            {
                path: '/students',
                name: 'students',
                component: resolve => {
                    require(['../page/index/students'], resolve)
                },
                meta: {title: '学生', requireAuth: true},
                redirect: '/home',
                children: [
                    {
                        path: 'home',
                        name: 'students_home',
                        component: resolve => {
                            require(['../mobile/students/home'], resolve)
                        },
                        meta: {title: '首页', requireAuth: true}
                    },
                    //基本信息
                    {
                        path: 'students-info',
                        name: 'students_info',
                        component: resolve => {
                            require(['../mobile/students/studentInfo'], resolve)
                        },
                        meta: {title: '基本信息', requireAuth: true},
                    },
                    //基本信息修改
                    {
                        path: 'students-info-edit/:xsid',
                        name: 'students_info_edit',
                        component: resolve => {
                            require(['../mobile/students/studentInfoEdit'], resolve)
                        },
                        meta: {title: '基本信息修改', requireAuth: true},
                    },
                    {
                        path: 'search/schedule',
                        name: 'students_schedule',
                        component: resolve => require(['../mobile/students/search-schedule.vue'], resolve),
                        meta: {title: '课程表查询', requireAuth: true},
                    },
                    //成绩查询
                    {
                        path: 'courseSelect',
                        name: 'course_elect',
                        component: resolve => require(['../mobile/students/courseSelect.vue'], resolve),
                        meta: {title: '成绩查询', requireAuth: true},
                    },
                    //评教任务
                    {
                        path: 'EvaluationOfTeaching',
                        name: 'evaluation_of_teaching',
                        component: resolve => require(['../mobile/students/evaluationOfTeaching.vue'], resolve),
                        meta: {title: '评教任务', requireAuth: true},
                    },
                    //开始评教
                    {
                        path: 'beginEvaluation/:rwid',
                        name: 'begin_evaluation',
                        component: resolve => require(['../mobile/students/beginEvaluation.vue'], resolve),
                        meta: {title: '开始评教', requireAuth: true},
                    },
                    //历史评教
                    {
                        path: 'historyEvaluation',
                        name: 'history_evaluation',
                        component: resolve => require(['../mobile/students/historyEvaluation.vue'], resolve),
                        meta: {title: '开始评教', requireAuth: true},
                    },
                    //评教详情
                    {
                        path: 'detailEvaluation/:pfid',
                        name: 'detail_evaluation',
                        component: resolve => require(['../mobile/students/detailEvaluation.vue'], resolve),
                        meta: {title: '评教详情', requireAuth: true},
                    },
                    {
                        path: 'search/grade',
                        name: 'students_grade',
                        component: resolve => {
                            require(['../mobile/students/search-grade'], resolve)
                        },
                        meta: {title: '成绩查询', requireAuth: true}
                    },
                    {
                        path: 'message_board',
                        name: 'students_message_board',
                        component: resolve => {
                            require(['../mobile/students/message-board-list'], resolve)
                        },
                        meta: {title: '留言板', requireAuth: true}
                    },
                ]
            },
            //教师
            {
                path: '/teacher',
                name: 'teacher',
                component: resolve => require(['../page/index/teacher'], resolve),
                meta: {title: '教师', requireAuth: true},
                redirect: '/home',
                children: [
                    {
                        path: 'home',
                        name: 'teacher_home',
                        component: resolve => {
                            require(['../mobile/teacher/home'], resolve)
                        },
                        meta: {title: '首页', requireAuth: true,},
                    },
                    {
                        path: 'search/schedule',
                        name: 'teacher_schedule',
                        component: resolve => require(['../mobile/teacher/search-schedule.vue'], resolve),
                        meta: {title: '课程表查询', requireAuth: true},
                    },
                    {
                        path: 'select/score',
                        name: 'select_score',
                        component: resolve => {
                            require(['../mobile/teacher/select-course-class'], resolve)
                        },
                        meta: {title: '成绩查询', requireAuth: true},
                    },
                    {
                      path: 'score/list',
                      name: 'select_score_list',
                      component: resolve => {
                        require(['../mobile/teacher/select-score-list'], resolve)
                      },
                      meta: {title: '成绩列表', requireAuth: true},
                    },
                    {
                        path: 'select/score/detail',
                        name: 'select_score_detail',
                        component: resolve => {
                            require(['../mobile/teacher/select-score-details'], resolve)
                        },
                        meta: {title: '成绩查询详情', requireAuth: true},
                    },
                    {
                        path: 'teaching/list',
                        name: 'teaching_list',
                        component: resolve => {
                            require(['../mobile/teacher/teaching-list'], resolve)
                        },
                        meta: {title: '评教查询列表', requireAuth: true},
                    },
                    {
                        path: 'teaching/detail',
                        name: 'teaching_detail',
                        component: resolve => {
                            require(['../mobile/teacher/teaching-detail'], resolve)
                        },
                        meta: {title: '评教查询详情', requireAuth: true},
                    },
                    {
                        path: 'entering/score/list',
                        name: 'entering_score_list',
                        component: resolve => {
                            require(['../mobile/teacher/entering-score-list'], resolve)
                        },
                        meta: {title: '成绩录入列表', requireAuth: true},
                    },
                    {
                        path: 'entering/score/detail/',
                        name: 'entering_score_detail',
                        component: resolve => {
                            require(['../mobile/teacher/entering-score-detail'], resolve)
                        },
                        meta: {title: '成绩录入详情', requireAuth: true},
                    },
                    {
                        path: 'history/enteringlist',
                        name: 'history_entering_list',
                        component: resolve => {
                            require(['../mobile/teacher/historyEnteringList'], resolve)
                        },
                        meta: {title: '审核结果通知', requireAuth: true},
                    },
                    {
                        path: 'message/board/list',
                        name: 'message_board_list',
                        component: resolve => {
                            require(['../mobile/teacher/message-board-list'], resolve)
                        },
                        meta: {title: '留言板列表', requireAuth: true},
                    },
                    {
                        path: 'edit/message',
                        name: 'edit_message',
                        component: resolve => {
                            require(['../mobile/teacher/edit-message-board'], resolve)
                        },
                        meta: {title: '发布留言', requireAuth: true},
                    },
                    //基本信息
                    {
                        path: 'teacher-info',
                        name: 'teacher_info',
                        component: resolve => {
                            require(['../mobile/teacher/teacherInfo'], resolve)
                        },
                        meta: {title: '基本信息', requireAuth: true},
                    },
                    //基本信息修改
                    {
                        path: 'teacher-info-edit/:jsid',
                        name: 'teacher_info_edit',
                        component: resolve => {
                            require(['../mobile/teacher/teacherInfoEdit'], resolve)
                        },
                        meta: {title: '基本信息修改', requireAuth: true},
                    },
                    //消息通知
                    {
                        path: 'message-notice',
                        name: 'message_notice',
                        component: resolve => {
                            require(['../mobile/teacher/messageNotice'], resolve)
                        },
                        meta: {title: '消息通知', requireAuth: true},
                    },
                ]
            },
            //index 公共的
            /*   {
                 path: 'talent/list/detail/:id',
                 name: 'talent_list_detail',
                 component: resolve => {
                   require(["../mobile/index/components/talent-list-detail"], resolve)
                 },
                 meta: {title: "人才培养计划详情", requireAuth: true},
               },*/
            {
                path: 'article/list',
                name: 'article_list',
                component: resolve => {
                    require(['../mobile/teacher/notification-announcement'], resolve)
                },
                meta: {title: '公告列表', requireAuth: true},
            },
            {
                path: 'article/list/detail/:id',
                name: 'article_list_detail',
                component: resolve => {
                    require(['../mobile/teacher/notification-detail'], resolve)
                },
                meta: {title: '公告详情', requireAuth: true},
            },
            {
                path: 'message_board_add',
                name: 'students_message_board_add',
                component: resolve => {
                    require(['../components-mobile/message-board-add'], resolve)
                },
                meta: {title: '留言板添加', requireAuth: true,},
            },
            {
              path: 'password',
              name: 'update_password',
              component: resolve => {
                require(['../mobile/students/updatePassword'], resolve)
              },
              meta: {title: '修改密码', requireAuth: true},
            },
            {
              path: 'no/explanation',
              name: 'no_explanation',
              component: resolve => {
                require(['../global/tip-no-explanation.vue'], resolve)
              },
              meta: {title: '提示', requireAuth: true},
            },
        ],
    },
]

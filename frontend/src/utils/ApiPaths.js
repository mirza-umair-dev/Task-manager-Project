export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/profile"
    },
    USERS:{
        GET_ALL_USERS:"/api/users",
        GET_TEAM_MEMBERS:"/api/users/team-members",
        GET_USER_BY_ID:(userId) => `/api/users/${userId}`,
        CREATE_USER:"/api/users" ,
        UPDATE_USER:(userId) => `/api/users/${userId}`,
        DELETE_USER:(userId) => `/api/users/${userId}`
    },
    TASKS:{
        GET_ALL_TASKS:"/api/tasks",
        GET_TASK_BY_ID:(taskId) => `/api/tasks/${taskId}`,
        DELETE_TASK:(taskId) => `/api/tasks/${taskId}`,
        CREATE_TASK:"/api/tasks" ,
        UPDATE_TASK:(taskId) => `/api/tasks/${taskId}`,

        UPDATE_STATUS:(taskId) => `/api/tasks/${taskId}/status`,
        UPDATE_CHECKLIST:(taskId) => `/api/tasks/${taskId}/checklist`,

        GET_DASHBOARD_DATA:"/api/tasks/dashboard",
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard"
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image"
    }

    };



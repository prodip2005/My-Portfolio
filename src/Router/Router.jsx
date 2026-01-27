import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import SkillSection from "../Components/Skills/SkillSection";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomeEditor from "../Pages/Dashboard/HomeEditor";
import UserUpdate from "../Pages/Dashboard/UserUpdate";
import AboutEdit from "../Pages/Dashboard/AboutEdit";
import SkillEdit from "../Pages/Dashboard/SkillEdit";
import ExperienceEdit from "../Pages/Dashboard/ExperienceEdit";
import ProjectEdit from "../Pages/Dashboard/ProjectEdit";
import PrivateRoute from "../Private/PrivateRoute";
import AllProjects from "../Components/Projects/AllProjects";
import AchievementEdit from "../Pages/Dashboard/AchievementEdit";
import CertificateEdit from "../Pages/Dashboard/CertificateEdit";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/allProjects',
                Component:AllProjects
            }

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            {
                path: 'homeEdit',
                Component: HomeEditor
            },
            {
                path: 'userUpdate',
                Component: UserUpdate
            },
            {
                path: 'aboutEdit',
                Component: AboutEdit
            },
            {
                path: 'skillEdit',
                Component: SkillEdit
            },
            {
                path: 'experienceEdit',
                Component: ExperienceEdit
            },
            {
                path: 'projectEdit',
                Component: ProjectEdit
            },
            {
                path: 'achievementEdit',
                Component:AchievementEdit
            },
            {
                path: 'certificateEdit',
                Component:CertificateEdit
            }

        ]
    }
])

export default router;
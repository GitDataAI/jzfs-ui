import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../app/dashboard/Layout.tsx";
import AuthLayout from "../app/auth/Layout.tsx";
import Login from "../app/auth/Login.tsx";
import Apply from "../app/auth/Apply.tsx";
import PublicLayout from "../app/dashboard/public/Layout.tsx";
import PrivateLayout from "../app/dashboard/private/Layout.tsx";
import SourceLayout from "../app/dashboard/source/Layout.tsx";
import ForksLayout from "../app/dashboard/forks/Layout.tsx";
import ArchiveLayout from "../app/dashboard/archived/layout.tsx";
import MirrorLayout from "../app/dashboard/mirrors/Layout.tsx";
import TemplatesLayout from "../app/dashboard/templates/Layout.tsx";
import JobsLayout from "../app/dashboard/jobs/Layout.tsx";
import PipelineLayout from "../app/dashboard/pipeline/Layout.tsx";
import ArtifacetsLayout from "../app/dashboard/artifacts/layout.tsx";
import LayoutSettings from "../app/dashboard/settings/Layout.tsx";
import MembersLayout from "../app/dashboard/members/Layout.tsx";
import WebHooksLayout from "../app/dashboard/webhooks/Layout.tsx";
import {ExportLayout} from "../app/dashboard/export/Layout.tsx";

const Routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <DashboardLayout/>,
            children: [
                {
                    path: "explore",
                    element: <ExportLayout/>
                },
                {
                    path: "public",
                    element: <PublicLayout/>
                },
                {
                    path: "private",
                    element: <PrivateLayout/>
                },
                {
                    path: "source",
                    element: <SourceLayout/>
                },
                {
                    path: "forks",
                    element: <ForksLayout/>
                },
                {
                    path: "archived",
                    element: <ArchiveLayout/>
                },
                {
                    path: "mirrors",
                    element: <MirrorLayout/>
                },
                {
                    path: "templates",
                    element: <TemplatesLayout/>
                },
                {
                    path: "jobs",
                    element: <JobsLayout/>
                },
                {
                    path: "pipeline",
                    element: <PipelineLayout/>
                },
                {
                    path: "artifacts",
                    element: <ArtifacetsLayout/>
                },
                {
                    path: "settings",
                    element: <LayoutSettings/>
                },
                {
                    path: "members",
                    element: <MembersLayout/>
                },
                {
                    path: "webhooks",
                    element: <WebHooksLayout/>
                }
            ]
        },
        {
            path: "auth",
            element: <AuthLayout/>,
            children: [
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'apply',
                    element: <Apply/>
                }
            ]
        }
    ])
}


export default Routes;
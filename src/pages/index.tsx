import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {WithLoginConfigContext} from "../lib/hooks/conf";
import React, { Suspense } from 'react';
import Loadingpage from '../lib/components/loading'
const Repositories = React.lazy(() => import('./repositories'));
const Login = React.lazy(() => import('./login'));
const Register = React.lazy(() => import('./register'));

export const IndexPage = () => {
    return (
        <Router>
            <WithLoginConfigContext>
                <Suspense fallback={<Loadingpage />}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/repositories"/>} />
                        <Route path="/repositories/*" element={<Repositories/>} />
                        <Route path="/login/*" element={<Login/>} />
                        <Route path="/register/*" element={<Register/>} />
                        <Route path="*" element={<Navigate to="/repositories" replace />} />
                    </Routes>
                </Suspense>
            </WithLoginConfigContext>
        </Router>
    );
};
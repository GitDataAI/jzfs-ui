import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {WithLoginConfigContext} from "../lib/hooks/conf";
import React, { Suspense } from 'react';

const Repositories = React.lazy(() => import('./repositories'));
const Auth = React.lazy(() => import('./auth'));
const Setup = React.lazy(() => import('./setup'));

export const IndexPage = () => {
    return (
        <Router>
            <WithLoginConfigContext>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/repositories"/>} />
                        <Route path="/repositories/*" element={<Repositories/>} />
                        <Route path="/auth/*" element={<Auth/>} />
                        <Route path="/setup/*" element={<Setup/>} />
                        <Route path="*" element={<Navigate to="/repositories" replace />} />
                    </Routes>
                </Suspense>
            </WithLoginConfigContext>
        </Router>
    );
};
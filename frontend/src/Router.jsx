import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router';

import AppLayout from './layout/AppLayout';

import TablePage from './pages/TablePage';
import OrderPage from './pages/OrderPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Navigate to={"./app"} />} />
            <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate to={"./table"} />} />
                <Route path="table" element={<TablePage />} />
                <Route path="table/:tableId" element={<OrderPage />} />
            </Route>
        </Route>
    )
)

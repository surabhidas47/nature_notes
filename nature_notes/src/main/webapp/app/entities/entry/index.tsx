import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Entry from './entry';
import EntryDetail from './entry-detail';
import EntryUpdate from './entry-update';
import EntryDeleteDialog from './entry-delete-dialog';

const EntryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Entry />} />
    <Route path="new" element={<EntryUpdate />} />
    <Route path=":id">
      <Route index element={<EntryDetail />} />
      <Route path="edit" element={<EntryUpdate />} />
      <Route path="delete" element={<EntryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EntryRoutes;

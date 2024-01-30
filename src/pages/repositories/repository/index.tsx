import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import RepositoryObjectsPage from "./repo-comp/objects/objects";
import RepositoryChangesPage from "./repo-comp/changes/changes";
import RepositoryBranchesPage from "./repo-comp/branches/branches";
import RepositoryCommitsIndexPage from "./commits";
import RepositoryGeneralSettingsPage from "./settings/general";
import RepositoryObjectsViewPage from "./repo-comp/objects/objectViewer";
import { RefContextProvider } from "../../../lib/hooks/repo";
import { StorageConfigProvider } from "../../../lib/hooks/storageConfig";

const RepositoryPage = () => {
  return (
    <RefContextProvider>
      <StorageConfigProvider>
        <Routes>
          <Route path="objects/*" element={<RepositoryObjectsPage />} />
          <Route path="object/*" element={<RepositoryObjectsViewPage />} />
          <Route path="changes/*" element={<RepositoryChangesPage />} />
          <Route path="commits/*" element={<RepositoryCommitsIndexPage />} />
          <Route path="branches/*" element={<RepositoryBranchesPage />} />
          <Route
            path="settings/*"
            element={<RepositoryGeneralSettingsPage />}
          />
          <Route
            path="settings/general/*"
            element={<RepositoryGeneralSettingsPage />}
          />
          <Route path="/" element={<Navigate to=":user/" />} />
        </Routes>
      </StorageConfigProvider>
    </RefContextProvider>
  );
};

export default RepositoryPage;

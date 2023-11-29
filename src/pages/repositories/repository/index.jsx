import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import RepositoryObjectsPage from "./repo-comp/objects/objects";
import RepositoryChangesPage from "./repo-comp/changes/changes";
import RepositoryBranchesPage from "./repo-comp/branches/branches";
import RepositoryTagsPage from "./repo-comp/tags/tags";
import RepositoryComparePage from "./repo-comp/compare/compare";
import RepositoryCommitsIndexPage from "./commits";
import RepositoryActionsIndexPage from "./actions";
import RepositoryGeneralSettingsPage from "./settings/general";
import RepositoryRetentionPage from "./settings/retention";
import RepositorySettingsBranchesPage from "./settings/branches";
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
          <Route path="tags/*" element={<RepositoryTagsPage />} />
          <Route path="compare/*" element={<RepositoryComparePage />} />
          <Route path="actions/*" element={<RepositoryActionsIndexPage />} />
          <Route
            path="settings/*"
            element={<RepositoryGeneralSettingsPage />}
          />
          <Route
            path="settings/general/*"
            element={<RepositoryGeneralSettingsPage />}
          />
          <Route
            path="settings/retention/*"
            element={<RepositoryRetentionPage />}
          />
          <Route
            path="settings/branches/*"
            element={<RepositorySettingsBranchesPage />}
          />
          <Route path="/" element={<Navigate to="objects" />} />
        </Routes>
      </StorageConfigProvider>
    </RefContextProvider>
  );
};

export default RepositoryPage;

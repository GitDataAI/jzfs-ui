import React, {useRef, useState } from "react";
import {
    ExecuteImportButton,
    ImportDone,
    ImportForm,
    ImportPhase,
    ImportProgress,
    startImport
} from "../../../services/import_data";
import {useInterval} from "./useInterval"
import {RefTypeBranch} from "../../../../../constants";
import {Button,Modal} from "react-bootstrap";
import {imports} from "../../../../../lib/api";
import { ImportModalProps, Pair } from "../../../interface/repo_interface";



export const ImportModal: React.FC<ImportModalProps> = ({config, repoId, referenceId, referenceType, path = '', onDone, onHide, show = false}) => {
    const [importPhase, setImportPhase] = useState(ImportPhase.NotStarted);
    const [numberOfImportedObjects, setNumberOfImportedObjects] = useState(0);
    const [isImportEnabled, setIsImportEnabled] = useState(false);
    const [importError, setImportError] = useState<Error|null>(null);
    const [metadataFields, setMetadataFields] = useState<Array<any>>([])
    const [importID, setImportID] = useState("")

    const sourceRef = useRef<HTMLInputElement>(null);
    const destRef = useRef<HTMLInputElement>(null);
    const commitMsgRef = useRef<HTMLInputElement>(null);

    useInterval(() => {
        if (importID !== "" && importPhase === ImportPhase.InProgress) {
            const getState = async () => {
                try {
                    const importState = await imports.get(repoId, referenceId, importID);
                    setNumberOfImportedObjects(importState.ingested_objects);
                    if (importState.error) {
                        throw importState.error;
                    }
                    if (importState.completed) {
                        setImportPhase(ImportPhase.Completed);
                        onDone();
                    }
                } catch (error: any | null ) {
                    setImportPhase(ImportPhase.Failed);
                    setImportError(error);
                    setIsImportEnabled(false);
                }
            };
            getState()
        }
    }, 3000);
    
    if (!referenceId || referenceType !== RefTypeBranch) return <></>

    let branchId = referenceId;
    
    const resetState = () => {
        setImportError(null);
        setImportPhase(ImportPhase.NotStarted);
        setIsImportEnabled(false);
        setNumberOfImportedObjects(0);
        setMetadataFields([]);
        setImportID("");
    }

  const hide = () => {
    if (
      ImportPhase.InProgress === importPhase ||
      ImportPhase.Merging === importPhase
    )
      return;
    resetState();
    onHide();
  };

    const doImport = async () => {
        setImportPhase(ImportPhase.InProgress);
        try {
            const metadata: { [key: string]: any } = {};
            metadataFields.forEach((pair:Pair) => metadata[pair.key] = pair.value)
            setImportPhase(ImportPhase.InProgress)
            await startImport(
                setImportID,
                destRef.current?.value,
                commitMsgRef.current?.value,
                sourceRef.current?.value,
                repoId,
                branchId,
                metadata
            );
        } catch (error: any | null ) {
            setImportPhase(ImportPhase.Failed);
            setImportError(error);
            setIsImportEnabled(false);
        }
    }
    const pathStyle = {'minWidth': '25%'};

    return (
        <>
            <Modal show={show} onHide={hide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Import data from {config.blockstore_type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        (importPhase === ImportPhase.NotStarted ||
                            importPhase === ImportPhase.Failed) &&
                        <ImportForm
                            config={config}
                            pathStyle={pathStyle}
                            sourceRef={sourceRef}
                            destRef={destRef}
                            updateSrcValidity={(isValid) => setIsImportEnabled(isValid)}
                            path={path}
                            commitMsgRef={commitMsgRef}
                            shouldAddPath={true}
                            metadataFields={metadataFields}
                            setMetadataFields={setMetadataFields}
                            err={importError}
                        />
                    }
                    {
                        importPhase === ImportPhase.InProgress &&
                        <ImportProgress numObjects={numberOfImportedObjects}/>
                    }
                    {
                        importPhase === ImportPhase.Completed &&
                        <ImportDone branch={branchId}
                                    numObjects={numberOfImportedObjects}/>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ async () => {
                        if (importPhase === ImportPhase.InProgress && importID.length > 0) {
                            await imports.delete(repoId, branchId, importID);
                        }
                        hide();
                    }} hidden={importPhase === ImportPhase.Completed}>
                        Cancel
                    </Button>

                    <ExecuteImportButton
                        importPhase={importPhase}
                        importFunc={doImport}
                        doneFunc={hide}
                        isEnabled={isImportEnabled}/>
        </Modal.Footer>
      </Modal>
    </>
  );
};


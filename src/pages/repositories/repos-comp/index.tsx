import React, {useState} from "react";
import {Button,Col,Card,Row,Alert,Modal,Spinner} from "react-bootstrap";

import {RepoIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AlertError, Loading} from "../../../lib/components/controls";
import {config, repositories} from '../../../lib/api';
import {RepositoryCreateForm} from "../../../lib/components/repositoryCreateForm";
import {useAPI, useAPIWithPagination} from "../../../lib/hooks/api";
import {Paginator} from "../../../lib/components/pagination";
import {Link} from "../../../lib/components/nav";
import { CreateRepositoryButtonProps, CreateRepositoryModalProps, GetStartedProps, GettingStartedCreateRepoButtonProps, RepositoryListProps } from "../interface/repos_interface";
import { RepositoryParams } from "../../../lib/api/interface";

dayjs.extend(relativeTime);

export const CreateRepositoryButton: React.FC<CreateRepositoryButtonProps> = ({variant = "success", enabled = false, onClick}) => {
    return (
        <Button variant={variant} disabled={!enabled} onClick={onClick}>
            <RepoIcon/> Create Repository
        </Button>
    );
}
const GettingStartedCreateRepoButton: React.FC<GettingStartedCreateRepoButtonProps> = ({text, variant = "success", enabled = false, onClick, creatingRepo, style = {}}) => {
    return (
        <Button className="create-sample-repo-button" style={style} variant={variant} disabled={!enabled || creatingRepo} onClick={onClick}>
            { creatingRepo && <><Spinner as="span" role="status" aria-hidden="true" animation="border" size="sm" className="me-2"/><span className="visually-hidden">Loading...</span></> }
            {text}
        </Button>
    );
}

export const CreateRepositoryModal: React.FC<CreateRepositoryModalProps> = ({show, error, onSubmit, onCancel, inProgress, samlpleRepoChecked = false }) => {

  const [formValid, setFormValid] = useState(false);

  const { response, error: err, loading } = useAPI(() => config.getStorageConfig());

    const showError = (error) ? error : err;
    if (loading) {
        return (
            <Modal show={show} onHide={onCancel} size="lg">
                <Modal.Body>
                    <Loading/>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={onCancel} size="lg">
            <Modal.Body>
                <RepositoryCreateForm
                  id="repository-create-form"
                  config={response}
                  error={showError}
                  formValid={formValid}
                  setFormValid={setFormValid}
                  onSubmit={onSubmit}
                  samlpleRepoChecked={samlpleRepoChecked}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" form="repository-create-form" className="me-2" disabled={!formValid || inProgress}>
                { inProgress ? 'Creating...' : 'Create Repository' }
              </Button>
              <Button variant="secondary" onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export const GetStarted: React.FC<GetStartedProps> = ({onCreateEmptyRepo, creatingRepo, createRepoError }) => {
    return (
        <Card className="getting-started-card">
            <h2 className="main-title">Welcome to Pando DataHub!</h2>
            <Row className="text-container">
                <Col>
                    <p>{`To get started, create your first empty repository.`}<br />
                    {`Let's dive in 🤿`}</p>
                </Col>
            </Row>
            <Row className="button-container">
                <Col>
                    <GettingStartedCreateRepoButton text={
                      <><span>Create Repository</span> </>
                    } creatingRepo={creatingRepo} variant={"success"} enabled={true} onClick={onCreateEmptyRepo} />
                </Col>
            </Row>
            {createRepoError &&
                <Row>
                    <Col sm={6}>
                        <Alert className="mb-3" variant={"danger"}>{createRepoError.message}</Alert>
                    </Col>
                </Row>
            }

            <div className="d-flex flex-direction-row align-items-center">
                <span className="learn-more">Already working with JiaoziFS and just need an empty repository?</span>
                <GettingStartedCreateRepoButton style={{ padding: 0, width: "auto", marginLeft: "8px", display: "inline-block" }} text="Click here" variant={"link"} enabled={true} onClick={onCreateEmptyRepo} creatingRepo={false} />
            </div>

            <div>
                <img
                    src="/getting-started.png"
                    alt="getting-started"
                    className="getting-started-image"
                    style={{ width: '30%', height: 'auto'}}
                />
            </div>
        </Card>
    );
};

export const RepositoryList: React.FC<RepositoryListProps> = ({ onPaginate, prefix, after, refresh, onCreateEmptyRepo, toggleShowActionsBar, creatingRepo, createRepoError }) => {

    const {results:Repo, loading, error, nextPage} = useAPIWithPagination(() => {
        return repositories.list(prefix, after);
    }, [refresh, prefix, after]);
    const results = Repo as RepositoryParams[];
    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;
    if (!after && !prefix && results && results.length === 0 ) {
        toggleShowActionsBar();
        return <GetStarted onCreateEmptyRepo={onCreateEmptyRepo} creatingRepo={creatingRepo} createRepoError={createRepoError}/>;
    }
    toggleShowActionsBar();
    if(results)
    return (
        <div>
            {results.map((repo: RepositoryParams) => (
                <Row key={repo.id}>
                    <Col className={"mb-2 mt-2"}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <Link href={{
                                        pathname: `/repositories/:repoId/objects`,
                                        params: {repoId: repo.id}
                                    }}>
                                        {repo.id}
                                    </Link>
                                </h5>
                                <p>
                                    <small>
                                        created at <code>{dayjs.unix(repo.creation_date).toISOString()}</code> ({dayjs.unix(repo.creation_date).fromNow()})<br/>
                                        default branch: <code>{repo.default_branch}</code>,{' '}
                                        storage namespace: <code>{repo.storage_namespace}</code>
                                    </small>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}

            <Paginator after={after} nextPage={nextPage} onPaginate={onPaginate}/>
        </div>
    );
};

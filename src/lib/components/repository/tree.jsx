import React, { useCallback, useState } from "react";

import dayjs from "dayjs";
import {
  PasteIcon,
  DotIcon,
  DownloadIcon,
  FileDirectoryIcon,
  FileIcon,
  GearIcon,
  InfoIcon,
  LinkIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  LogIcon,
} from "@primer/octicons-react";
import { GoFileDirectoryFill } from "react-icons/go";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

import { cache, commits, linkToPath, objects } from "../../api";
import { ConfirmationModal } from "../modals";
import { Paginator } from "../pagination";
import { Link } from "../nav";
import { RefTypeBranch, RefTypeCommit } from "../../../constants";
import {ClipboardButton, copyTextToClipboard, AlertError, Loading} from "../controls";
import Modal from "react-bootstrap/Modal";
import { useAPI } from "../../hooks/api";
import noop from "lodash/noop";
import {FaDownload} from "react-icons/fa";
import {CommitInfoCard} from "./commits";
import { useRouter } from "../../hooks/router";

export const humanSize = (bytes) => {
  if (!bytes) return "0.0 B";
  const e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, e)).toFixed(1) + " " + " KMGTP".charAt(e) + "B"
  );
};

const Na = () => <span>&mdash;</span>;

const EntryRowActions = ({ repo, reference, entry, onDelete, presign, presign_ui = false }) => {
  const {path,is_dir}= useRouter().query
  const {user} = useRouter().params
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);
  const handleShowDeleteConfirmation = () => setShowDeleteConfirmation(true);
  const deleteConfirmMsg = `are you sure you wish to delete object "${entry.name}"?`;
  const onSubmitDeletion = () => {
    is_dir?onDelete(entry,path):onDelete(entry);
    setShowDeleteConfirmation(false);
  };

  const [showObjectStat, setShowObjectStat] = useState(false);
  const [showObjectOrigin, setShowObjectOrigin] = useState(false);

  const handleShowObjectOrigin = useCallback(
    (e) => {
      e.preventDefault();
      setShowObjectOrigin(true);
    },
    [setShowObjectOrigin]
  );

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" size="sm" className={"row-hover"}>
          <GearIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {!entry.is_dir && (
            <PathLink
              path={entry.name}
              reference={reference}
              repoId={repo.name}
              as={Dropdown.Item}
              presign={presign_ui}
            >
              <DownloadIcon /> Download
            </PathLink>
          )}
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setShowObjectStat(true);
              }}
            >
              <InfoIcon /> Object Info
            </Dropdown.Item>

          <Dropdown.Item
            onClick={(e) => {
              copyTextToClipboard(
                `http://localhost:3000/api/v1/object/${user}/${repo.name}?refName=${reference.name}&path=${entry.name}&type=${reference.type}`
                ,
                ()=>{
                }
              );
              e.preventDefault();
            }}
          >
            <PasteIcon /> Copy URI
          </Dropdown.Item>
          {/* {!entry.is_dir && reference.type === RefTypeBranch && (
            <>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  handleShowDeleteConfirmation();
                }}
              >
                <TrashIcon /> Delete
              </Dropdown.Item>
            </>
          )} */}
        </Dropdown.Menu>
      </Dropdown>

      <ConfirmationModal
        show={showDeleteConfirmation}
        onHide={handleCloseDeleteConfirmation}
        msg={deleteConfirmMsg}
        onConfirm={onSubmitDeletion}
      />

      <StatModal
        entry={entry}
        show={showObjectStat}
        onHide={() => setShowObjectStat(false)}
      />

      <OriginModal
        entry={entry}
        repo={repo}
        reference={reference}
        show={showObjectOrigin}
        onHide={() => setShowObjectOrigin(false)}
      />
    </>
  );
};

const StatModal = ({ show, onHide, entry }) => {
  return (
    <Modal show={show} onHide={onHide} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title>Object Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive hover>
          <tbody>
            <tr>
              <td>
                <strong>Path</strong>
              </td>
              <td>
                <code>{entry.name}</code>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Physical Address</strong>
              </td>
              <td>
                <code>{entry.hash}</code>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Size (Bytes)</strong>
              </td>
              <td>{`${entry.size}  (${humanSize(entry.size)})`}</td>
            </tr>
            <tr>
              <td>
                <strong>Created at</strong>
              </td>
              <td>
                <code>{entry.created_at}</code>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Last Modified</strong>
              </td>
              <td>{`${dayjs.unix(entry.updated_at/1000).fromNow()} (${dayjs
                .unix(entry.updated_at/1000)
                .format("MM/DD/YYYY HH:mm:ss")})`}</td>
            </tr>
              <tr>
                <td>
                  <strong>Content-Type</strong>
                </td>
                <td>
                  <code>{entry.is_dir? 'dir':entry.name.split('.')[entry.name.split('.').length - 1]}</code>
                </td>
              </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

const EntryMetadata = ({ metadata }) => {
    return (
        <Table hover striped>
          <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {Object.getOwnPropertyNames(metadata).map(key =>
              <tr key={`metadata:${key}`}>
                <td><code>{key}</code></td>
                <td><code>{metadata[key]}</code></td>
              </tr>
          )}
          </tbody>
        </Table>
    )
};

const OriginModal = ({ show, onHide, entry, repo, reference }) => {
  const {
    response: commit,
    error,
    loading,
  } = useAPI(async () => {
    if (show) {
      return await commits.blame(
        repo.id,
        reference.id,
        entry.path,
        entry.path_type
      );
    }
    return null;
  }, [show, repo.id, reference.id, entry.path]);

  const pathType = entry.path_type === "object" ? "object" : "prefix";

  let content = <Loading />;

  if (error) {
    content = <AlertError error={error} />;
  }
  if (!loading && !error && commit) {
    content = (
      <CommitInfoCard bare={true} repo={repo} commit={commit}/>
    );
  }

  if (!loading && !error && !commit) {
    content = (
      <>
        <h5>
          <small>
            No commit found, perhaps this is an{" "}
            <Link
              className="me-2"
              href={{
                pathname: "/repositories/:name/:repoId/changes",
                params: { repoId: repo.name },
                query: { ref: reference.name },
              }}
            >
              uncommitted change
            </Link>
            ?
          </small>
        </h5>
      </>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size={"lg"}>
      <Modal.Header closeButton>
        <Modal.Title>
          Last commit to modify <>{pathType}</>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};

const PathLink = ({ repoId, reference, path, children, presign = false, as = null }) => {
  const user = cache.get('user')
 const urllinkToPath = ({ repoId,reference, path}) => {
  return `/api/v1/object/${user}/${repoId}?refName=${reference.name}&path=${path}&type=${reference.type}`;
};
  const name = path.split("/").pop();
  const link = urllinkToPath({repoId, reference, path});
  if (as === null)
    return (
      <a href={link} download={name}>
        {children}
      </a>
    );
  return React.createElement(as, { href: link, download: name }, children);
};

export const EntryRow = ({ repo, reference, path, entry, onDelete, showActions }) => {
  const {is_dir,path:dirpath} = useRouter().query
  let rowClass = "change-entry-row ";
  const subPath = path.lastIndexOf("/") !== -1 ? path.substr(0, path.lastIndexOf("/")) : "";
  const buttonText =
      subPath.length > 0 ? entry.name.substr(subPath.length + 1) : entry.name;

  const user = cache.get('user')
  const params = { repoId: repo.name,user };
  const query = { ref: reference.name, path: entry.name,type:reference.type};
  let button;
  if(entry.is_dir){
    const filePathQuery = {
      ref: query.ref,
      path: query.path,
      type: query.type,
      is_dir: entry.is_dir
    }
    button = (
      <Link
        href={{
          pathname: "/repositories/:user/:repoId/objects",
          query: filePathQuery,
          params: params,
        }}
      >
        {buttonText}
      </Link>
    )
  } else if(!entry.is_dir && is_dir) {
    const filePathQuery = {
      ref: query.ref,
      path:dirpath +'/'+ query.path,
      type: query.type,
      filepath : query.path
    };
    button = (
      <Link
        href={{
          pathname: "/repositories/:user/:repoId/object",
          query: filePathQuery,
          params: params,
        }}
      >
        {buttonText}
      </Link>
    );
  } else if(!entry.is_dir && subPath.length>0)  {
    return
  }else {
  const filePathQuery = {
      ref: query.ref,
      path: query.path,
      type: query.type
    };
    button = (
      <Link
        href={{
          pathname: "/repositories/:user/:repoId/object",
          query: filePathQuery,
          params: params,
        }}
      >
        {buttonText}
      </Link>
    );
  }

  let size;
  if (entry.action === 2) {
    size = <Na />;
  } else {
    size = (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>{entry.size} bytes</Tooltip>}
      >
        <span>{humanSize(entry.size)}</span>
      </OverlayTrigger>
    );
  }

  let modified;
  if (entry.action ===2) {
    modified = <Na />;
  } else {
    modified = (
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            {dayjs.unix(entry.updated_at/1000).format("MM/DD/YYYY HH:mm:ss")}
          </Tooltip>
        }
      >
        <span>{dayjs.unix(entry.updated_at/1000).fromNow()}</span>
      </OverlayTrigger>
    );
  }

  let diffIndicator;
  let diffstyle;
  switch (entry.action) {
    case 2:
      diffstyle = "diif-remove"
      diffIndicator = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>removed in diff</Tooltip>}
        >
          <span>
            <TrashIcon />
          </span>
        </OverlayTrigger>
      );
      break;
    case 1:
      diffstyle = "diif-add"
      diffIndicator = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>added in diff</Tooltip>}
        >
          <span>
            <PlusIcon />
          </span>
        </OverlayTrigger>
      );
      break;
    case 3:
      diffstyle = "diif-change"
      diffIndicator = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>changed in diff</Tooltip>}
        >
          <span>
            <PencilIcon />
          </span>
        </OverlayTrigger>
      );
      break;
    default:
      diffstyle = "tree-path"
      break;
  }

  let entryActions;
  if (showActions && entry.diff_type !== "removed") {
    entryActions = (
      <EntryRowActions
        repo={repo}
        reference={reference}
        entry={entry}
        onDelete={onDelete}
        presign={repo.name}
        presign_ui={repo.name}
      />
    );
  }

  return (
    <>
      <tr className={rowClass}>
        <td className="diff-indicator">{diffIndicator}</td>
        <td className={diffstyle}>
        <span>{entry.is_dir === true ? (
            <GoFileDirectoryFill style={{fontSize:'18px',color:'blue'}}/>
          ) : (
            <FileIcon />
          )}{" "}
          {button}</span>
        </td>
        <td className="tree-size">{entry.is_dir?'Directory':size}</td>
        <td className="tree-modified">{modified}</td>
        <td className={"change-entry-row-actions"}>{entryActions}</td>
      </tr>
    </>
  );
};

function pathParts(path, isPathToFile) {
  let parts = path.replace(/^\/*|\/*$/g, '').split(/\//);
  let resolved = [];
  if (parts.length === 0) {
    return resolved;
  }

  if (parts[parts.length - 1] === "") {
    parts = parts.slice(0, parts.length - 1);
  }

  // else
  for (let i = 0; i < parts.length; i++) {
    let currentPath = parts.slice(0, i + 1).join("/");
    if (currentPath.length > 0) {
      currentPath = `${currentPath}/`;
    }
    resolved.push({
      name: parts[i],
      path: currentPath,
    });
  }

  return resolved;
}

const buildPathURL = (params, query) => {
  return { pathname: "/repositories/:user/:repoId/objects", params, query };
};

export const URINavigator = ({
  repo,
  reference,
  path,
  downloadUrl,
  relativeTo = "",
  pathURLBuilder = buildPathURL,
  isPathToFile = false,
  hasCopyButton = false,
  filepath
}) => {
  const parts = pathParts(path, isPathToFile);
  const user = cache.get('user')
  const params = {repoId: repo.name?repo.name:repo,user};
  let dir = ''
  return (
    <div className="d-flex">
      <div className="lakefs-uri flex-grow-1">

        {relativeTo === "" ? (
          (<>
            <strong>{"jzfs://"}</strong>
            <Link href={{ pathname: "/repositories/:user/:repoId/objects", params }}>
              {repo.name}
            </Link>
            <strong>{"/"}</strong>
              <Link
                href={{pathname: "/repositories/:user/:repoId/objects",params,query:{path:'',type:reference.type,ref:reference.name}}}>
              {reference.type === RefTypeCommit
                ? reference.id.substr(0, 12)
                : reference.name}
            </Link>
          {parts.length==0?(
            <>
            <strong>{"/"}</strong>
            <Link
              href={{pathname: "/repositories/:user/:repoId/objects",params,
              query:{type:reference.type,path: path,is_dir:true,ref:reference.name}}}>
              {path}
            </Link>
            </>
            ) :
            parts.map((part,index)=>{
              index==0 ? dir = part.name : dir = dir + "/" + part.name
            return index == parts.length - 1 ?(
            <>
            <strong>{"/"}</strong>
            <span>{part.name}</span>
            </>
            ):(
            <>
            <strong>{"/"}</strong>
            <Link
              href={{pathname: "/repositories/:user/:repoId/objects",params,
              query:{type:reference.type,path: dir,is_dir:true,ref:reference.name}}}>
              {part.name}
            </Link>
            </>)
            })
          }
        
          </>)
        ) : (
          <>
            <Link href={pathURLBuilder(params, {path})}>{relativeTo}</Link>
            <strong>{"/"}</strong>
          </>
        )}
        </div>
      <div className="object-viewer-buttons">
        {hasCopyButton &&
        <ClipboardButton
            text={`jzfs://${repo.name}/${reference.id}/${path}`}
            variant="link"
            size="sm"
            onSuccess={noop}
            onError={noop}
            className={"me-1"}
            tooltip={"copy URI to clipboard"}/>}
        {(
          <a
              href={downloadUrl}
              download={path.split('/').pop()}
              className="btn btn-link btn-sm download-button me-1">
            <FaDownload />
          </a>
        )}
      </div>
    </div>
  );
};

const GetStarted = ({ onUpload, onImport }) => {
  const importDisabled = true;
  return (
    <Container className="m-4 mb-5">
      <h2 className="mt-2">To get started with this repository:</h2>

      <Row className="pt-2 ms-2">
        <Col>
          <DotIcon className="me-1 mt-3" />
          <Button
            variant="link"
            className="mb-1"
            disabled={importDisabled}
            onClick={onImport}
          >
            Import
          </Button>
          &nbsp;data from jzfs. Or, see the&nbsp;
          <a
            href="https://docs.pando.network/howto/import.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
          &nbsp;for other ways to import data to your repository.
        </Col>
      </Row>

      <Row className="pt-2 ms-2">
        <Col>
          <DotIcon className="me-1 mt-1" />
          <Button variant="link" className="mb-1" onClick={onUpload}>
            Upload
          </Button>
          &nbsp;an object.
        </Col>
      </Row>

      <Row className="pt-2 ms-2">
        <Col>
          <DotIcon className="me-1 mt-1" />
          Use&nbsp;
          <a
            href="https://docs.pando.network/integrations/distcp.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            DistCp
          </a>
          &nbsp;or&nbsp;
          <a
            href="https://docs.pando.network/integrations/rclone.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rclone
          </a>
          &nbsp;to copy data into your repository.
        </Col>
      </Row>
    </Container>
  );
};

export const Tree = ({
  repo,
  reference,
  results,
  after,
  onPaginate,
  nextPage='',
  onUpload,
  onImport,
  onDelete,
  showActions = false,
  path = "",
}) => {
  let body;

  if (results.length === 0 && path === "" && reference.type === RefTypeBranch) {
    // empty state!
    body = (
      <GetStarted  onUpload={onUpload} onImport={onImport} />
    );
  } else {
    body = (
      <>
        <Table borderless size="sm">
          <tbody>
            { results? results.map((entry) => (
              <EntryRow
                key={entry.hash}
                entry={entry}
                path={entry.name}
                repo={repo}
                reference={reference}
                showActions={showActions}
                onDelete={onDelete}
              />
            )):<></>}
          </tbody>
        </Table>
      </>
    );
  }

  return (
    <div className="tree-container">
      <Card>
        <Card.Header>
          <URINavigator path={path} repo={repo} reference={reference} hasCopyButton={true}/>
        </Card.Header>
        <Card.Body>{body}</Card.Body>
      </Card>

    </div>
  );
};

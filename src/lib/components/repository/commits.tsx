import ButtonGroup from "react-bootstrap/ButtonGroup";
import {ClipboardButton, LinkButton} from "../controls";
import {BrowserIcon, LinkIcon, PackageIcon, PlayIcon} from "@primer/octicons-react";
import Table from "react-bootstrap/Table";
import {MetadataRow, MetadataUIButton} from "../../../pages/repositories/repository/commits/commit/metadata";
import {Link} from "../nav";
import dayjs from "dayjs";
import Card from "react-bootstrap/Card";
import React from "react";
import { CommitActionsProps } from "../interface/comp_interface";
import { Commit, CommitInfoCardProps, metadata } from "../../../pages/repositories/interface/repo_interface";
import { RepositoryParams } from "../../api/interface";


const CommitActions: React.FC<CommitActionsProps> = ({ repo, commit }) => {

  const buttonVariant = "outline-dark";

  return (
    <div>
      <ButtonGroup className="commit-actions">
        <LinkButton
          buttonVariant="outline-dark"
          href={{pathname: '/repositories/:repoId/objects', params: {repoId: repo.name}, query: {ref: commit.commitId}}}
          tooltip="Browse commit objects">
          <BrowserIcon/>
        </LinkButton>
        <LinkButton
          buttonVariant={buttonVariant}
          href={{pathname: '/repositories/:repoId/actions', params: {repoId: repo.name}, query: {commit: commit.commitId}}}
          tooltip="View Commit Action runs">
          <PlayIcon/>
        </LinkButton>
        <ClipboardButton variant={buttonVariant} text={commit.commitId} tooltip="Copy ID to clipboard"/>
        <ClipboardButton variant={buttonVariant} text={`jzfs://${repo.name}/${commit.commitId}`} tooltip="Copy URI to clipboard" icon={<LinkIcon/>}/>
        <ClipboardButton variant={buttonVariant} text={`s3://${repo.name}/${commit.commitId}`} tooltip="Copy S3 URI to clipboard" icon={<PackageIcon/>}/>
      </ButtonGroup>
    </div>
  );
};

const getKeysOrNull = (metadata: metadata) => {
  if (!metadata) return null;
  const keys = Object.getOwnPropertyNames(metadata);
  if (keys.length === 0) return null;
  return keys;
};

const CommitMetadataTable= ({commit}:{commit:Commit}) => {
  const keys = getKeysOrNull(commit.metadata);
  if (!keys) return null;

  return (
    <>
      <Table>
        <thead>
        <tr>
          <th>Metadata Key</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {keys.map(key =>
          <MetadataRow metadata_key={key} metadata_value={commit.metadata[key]}/>)}
        </tbody>
      </Table>
    </>
  );
};

const CommitMetadataUIButtons = ({commit}:{commit:Commit}) => {
  const keys = getKeysOrNull(commit.metadata);
  if (!keys) return null;

  return (
    <>{
      keys.map((key) => <MetadataUIButton metadata_key={key} metadata_value={commit.metadata[key]}/>)
    }</>
  );
};

const CommitLink = ({ repoId, commitId }:{ repoId:string, commitId:string }) => {
  return (
    <>
        <code>{commitId}</code>
      <br/>
    </>
  );
}

const CommitInfo = ({ repo, commit }:{ repo:RepositoryParams, commit:Commit }) => {
  return (
    <Table size="sm" borderless hover>
      <tbody>
      <tr>
        <td><strong>ID</strong></td>
        <td>
          <CommitLink repoId={repo.name} commitId={commit.commitId}/>
        </td>
      </tr>
      <tr>
        <td><strong>Committer</strong></td>
        <td>{commit.committer}</td>
      </tr>
      <tr>
        <td><strong>Creation Date</strong></td>
        <td>
          {dayjs.unix(Date.parse(commit.commitDate)/1000).format("MM/DD/YYYY HH:mm:ss")} ({dayjs.unix(Date.parse(commit.commitDate)/1000).fromNow()})
        </td>
      </tr>
      {(commit.basedhash) ? (
        <tr>
          <td>
            <strong>Parents</strong></td>
          <td>
            {
              <CommitLink key={commit.basedhash} repoId={repo.name} commitId={commit.basedhash}/>
            }
          </td>
        </tr>
      ) : <></>}
      </tbody>
    </Table>
  );
};

export const CommitInfoCard:React.FC<CommitInfoCardProps>= ({ repo, commit , bare = false }) => {
  console.log('commit:',commit);
  
  const content = (
    <>
        <div className="d-flex">
          <div className="flex-grow-1">
            <h4>{commit.message}</h4>
          </div>
          <div>
            <CommitActions repo={repo} commit={commit}/>
          </div>
        </div>

      <div className="mt-4">
        <CommitInfo repo={repo} commit={commit}/>
        <CommitMetadataUIButtons commit={commit}/>
        <div className="mt-3">
          <CommitMetadataTable commit={commit}/>
        </div>
      </div>
    </>
  );
  if (bare) return content;
  return (
    <Card>
      <Card.Body>
        {content}
      </Card.Body>
    </Card>
  )
}

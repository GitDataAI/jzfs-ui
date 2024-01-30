![Alt text](pub/jiaozifs.png)

# Jiaozi FS
JiaoziFS is an industry-leading Data-Centric Version Control File System, helps ensure Responsible AI Engineering by improving Data Versioning, Provenance, and Reproducibility.

DataHub & Data Collaboration: Collaborative Data Science & Dataset Version Management at Scale.
Data Engineering & Data Pipelines: DataOps,AIOps,MLOps.
FAIR DataSpace: FAIR data are data which meet principles of findability, accessibility, interoperability, and reusability (FAIR).
Data NFT and Data Containerization: NFTs allow data to be containerized into shareable, tradeable, and trackable assets.

## Why JiaoziFS?

In production systems with machine learning components, updates and experiments are frequent. New updates to models may be released every day or every few minutes, and different users may see the results of different models as part of A/B experiments or canary releases.

Version Everything: Data scientists are often criticized for being less disciplined with versioning their experiments(versioning of data, pipeline code, and models), especially when using computational notebooks.
Track Data Provenance: This applies to all processing steps in a machine learning pipeline, including data collection/acquisition, data merging, data cleaning, feature extraction, learning, or deployment.
Reproducibility: A final question that is often relevant for debugging, audits, and also science more broadly is to what degree data, models, and decisions can be reproduced.

## Quick Start

deploy the system to your server,you can get help from this repository:
```bash
https://github.com/jiaozifs/jiaozifs
```

clone jiaozifs-ui repository to your server:

```bash
git clone git@github.com:jiaozifs/jiaozifs-ui.git
```

Before you run the project for the first time, run the following script to install packages from `package.json`:
```bash
npm install
```
After waiting for the installation to complete,run the following script to start:
```bash
npm run dev
```
You can also deploy the code to your server by using `docker`:

```bash
docker run -it -p 12345:80 -e JIAOZIFS_API_URL=http://api.jiaozifs.com/api/v1 gitdatateam/jiaozifs-ui:latest
```

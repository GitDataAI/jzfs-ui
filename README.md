
# JZLab
JZLab is the self-hosted version of GitData.AI that allows you to deploy and manage your own DataHub and Workflow on-prem.
<p align="left">
  <a href="https://www.npmjs.com/package/npm">
       <img src="https://camo.githubusercontent.com/ae8e4bb0c53259a19bfe3a79d29797a2d7b38cf50251ac18a60c9e91846c5aa0/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6e706d2e737667" alt="npm package" />
    </a>
    <a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=flat-square" height="20"></a>
  <br/>
</p>

<a href="https://github.com/GitDataAI/jzlab"><img src="https://github.com/GitDataAI/jzlab/blob/main/pub/jzlab-ts.png?raw=true"/></a>

----
## JZLab include but not limited to：

1. Visualize and interact with JZFS repositories 
2. Visualize and interact JZFlow pipelines and Directed Acyclic Graphs (DAGs).
2. One-click to start the fully functional JupyterLab environment.
3. Examine the performance of versioned/registered models.
4. Monitor the status of model services including health and resource usage stats, and view deployment history and related logs.
5. Easily upload and manage datasets and shared resources.
6. Browse and share files with other group members in a collaborative, group-centric, environment.
7. Submit and schedule jobs to run automatically in the background. Easily monitor job progress from the job stats panel.
8. The easiest way to do the infrastructure orchestration for setting up 10+ different tools to build your infrastructure.


## How different roles use JZLab
- Data Scientist
    - Data scientists can stay informed and focused on training and running their models.
    - In the past, there was a lot of manual work of setting the environment, which is a fragmented and time consuming analysis process. And it is hard to collaborate with a team on the same project.
    - Now, you can carry out data analytics and optimizations with ML easily, and contribute your time on what really matters.
- IT Leader
    - Gives IT leaders flexibility and administration authority to configure resources.
    - In the past, it’s hard to keep track of each teams' needs and environment settings. Also, the hardware, resources, and GPU usage are unsure.
    - Now, You can equip and enable data teams with the tools and resources they need as easy as pie. And easily deploy the model within an hour.
----
## Basic Build And Usage

#### Requirement

1. todo
2. todo

#### Build And Running

deploy the system to your server,you can get help from this repository:
```bash
https://github.com/GitDataAI/jzfs
```

clone JZLab repository to your server:

```bash
git clone git@github.com:GitDataAI/jzlab.git
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


----
### Cloud

[Try without installing](https://gitdata.ai)

----
### Contributors

<a href="https://github.com/TsumikiQAQ" target="_blank"><img src="https://avatars.githubusercontent.com/u/116857998?v=4" width="5%" height="5%"/> </a>
<a href="https://github.com/hunjixin" target="_blank"><img src="https://avatars.githubusercontent.com/u/41407352?v=4" width="5%" height="5%"/> </a>
<a href="https://github.com/Brownjy" target="_blank"><img src="https://avatars.githubusercontent.com/u/54040689?v=4" width="5%" height="5%"/> </a>
<a href="https://github.com/taoshengshi" target="_blank"><img src="https://avatars.githubusercontent.com/u/33315004?v=4" width="5%" height="5%"/> </a>
<a href="https://github.com/gitdata001" target="_blank"><img src="https://avatars.githubusercontent.com/u/157772574?v=4" width="5%" height="5%"/> </a>

----
### License

Dual-licensed under [MIT](https://github.com/GitDataAI/jiaozifs/blob/main/LICENSE-MIT) + [Apache 2.0](https://github.com/GitDataAI/jiaozifs/blob/main/LICENSE-APACHE)


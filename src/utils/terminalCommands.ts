import { CommandResult, FileSystem, TerminalCommand } from '../types/terminal';

export const parseCommand = (input: string): TerminalCommand => {
  const parts = input.trim().split(/\s+/);
  const command = parts[0];
  const args: string[] = [];
  const flags: string[] = [];

  for (let i = 1; i < parts.length; i++) {
    if (parts[i].startsWith('-')) {
      flags.push(parts[i]);
    } else {
      args.push(parts[i]);
    }
  }

  return { command, args, flags };
};

export const executeTerminalCommand = async (
  input: string,
  currentDirectory: string,
  fileSystem: FileSystem
): Promise<CommandResult> => {
  const { command, args, flags } = parseCommand(input);

  switch (command.toLowerCase()) {
    case 'help':
      return {
        output: [
          '🔧 Available Commands:',
          '',
          '📁 File System:',
          '  ls [-la]           - List directory contents',
          '  cd <directory>     - Change directory',
          '  pwd                - Print working directory',
          '  mkdir <name>       - Create directory',
          '  rm <file>          - Remove file',
          '  cp <src> <dest>    - Copy file',
          '  mv <src> <dest>    - Move/rename file',
          '  cat <file>         - Display file content',
          '  clear              - Clear terminal',
          '',
          '✏️  Text Editors:',
          '  nano <file>        - Open nano editor',
          '  vi <file>          - Open vi editor',
          '  vim <file>         - Open vim editor',
          '',
          '🐙 Git Commands:',
          '  git status         - Show repository status',
          '  git log            - Show commit history',
          '  git init           - Initialize repository',
          '  git clone <url>    - Clone repository',
          '  git commit -m      - Commit changes',
          '',
          '🐳 Docker Commands:',
          '  docker ps          - List containers',
          '  docker images      - List images',
          '  docker build       - Build image',
          '  docker run         - Run container',
          '',
          '☸️  Kubernetes:',
          '  kubectl get pods   - List pods',
          '  kubectl get nodes  - List nodes',
          '  kubectl apply      - Apply configuration',
          '',
          '🏗️  Terraform:',
          '  terraform init     - Initialize Terraform',
          '  terraform plan     - Show execution plan',
          '  terraform apply    - Apply changes',
          '',
          '📝 Contact Forms:',
          '  nano contact.json  - Create JSON contact form',
          '  nano info.yaml     - Create YAML contact form',
          '  nano message.txt   - Create text message',
          ''
        ]
      };

    case 'clear':
      return { output: [] };

    case 'pwd':
      return { output: currentDirectory };

    case 'ls':
      return executeListCommand(args, flags, currentDirectory, fileSystem);

    case 'cd':
      return executeChangeDirectory(args, currentDirectory, fileSystem);

    case 'mkdir':
      return executeMakeDirectory(args, currentDirectory, fileSystem);

    case 'nano':
    case 'vi':
    case 'vim':
      return executeEditor(command, args, currentDirectory);

    case 'cat':
      return executeCat(args, currentDirectory, fileSystem);

    case 'git':
      return executeGitCommand(args);

    case 'docker':
      return executeDockerCommand(args);

    case 'kubectl':
      return executeKubectlCommand(args);

    case 'terraform':
      return executeTerraformCommand(args);

    case 'ansible':
      return executeAnsibleCommand(args);

    case 'jenkins':
      return executeJenkinsCommand(args);

    case 'top':
    case 'htop':
      return executeTopCommand();

    case 'ps':
      return executePsCommand();

    case 'whoami':
      return { output: 'kiran' };

    case 'date':
      return { output: new Date().toString() };

    case 'uptime':
      return { output: 'up 42 days, 13:37, load average: 0.15, 0.25, 0.30' };

    default:
      return {
        output: `zsh: command not found: ${command}`,
        error: true
      };
  }
};

const executeListCommand = (
  args: string[],
  flags: string[],
  currentDirectory: string,
  fileSystem: FileSystem
): CommandResult => {
  const showHidden = flags.includes('-a') || flags.includes('-la');
  const longFormat = flags.includes('-l') || flags.includes('-la');

  const items = ['..', '.'];
  
  if (longFormat) {
    return {
      output: [
        'total 8',
        'drwxr-xr-x  5 kiran  staff   160 Jan 15 10:30 .',
        'drwxr-xr-x  3 kiran  staff    96 Jan 15 09:15 ..',
        'drwxr-xr-x  3 kiran  staff    96 Jan 15 10:25 projects',
        'drwxr-xr-x  2 kiran  staff    64 Jan 15 10:20 documents',
        'drwxr-xr-x  4 kiran  staff   128 Jan 15 10:30 scripts',
        '-rw-r--r--  1 kiran  staff   256 Jan 15 10:15 README.md'
      ]
    };
  }

  return {
    output: 'projects    documents    scripts    README.md'
  };
};

const executeChangeDirectory = (
  args: string[],
  currentDirectory: string,
  fileSystem: FileSystem
): CommandResult => {
  if (args.length === 0) {
    return {
      action: {
        type: 'changeDirectory',
        path: '/home/kiran'
      }
    };
  }

  const target = args[0];
  let newPath: string;

  if (target === '..') {
    const parts = currentDirectory.split('/').filter(Boolean);
    parts.pop();
    newPath = '/' + parts.join('/');
    if (newPath === '/') newPath = '/home/kiran';
  } else if (target.startsWith('/')) {
    newPath = target;
  } else {
    newPath = `${currentDirectory}/${target}`.replace('//', '/');
  }

  return {
    action: {
      type: 'changeDirectory',
      path: newPath
    }
  };
};

const executeMakeDirectory = (
  args: string[],
  currentDirectory: string,
  fileSystem: FileSystem
): CommandResult => {
  if (args.length === 0) {
    return {
      output: 'mkdir: missing operand',
      error: true
    };
  }

  return {
    output: `Directory created: ${args[0]}`
  };
};

const executeEditor = (
  editor: string,
  args: string[],
  currentDirectory: string
): CommandResult => {
  const filename = args[0] || 'untitled.txt';
  
  return {
    action: {
      type: 'openEditor',
      file: {
        name: filename,
        content: '',
        path: `${currentDirectory}/${filename}`
      }
    }
  };
};

const executeCat = (
  args: string[],
  currentDirectory: string,
  fileSystem: FileSystem
): CommandResult => {
  if (args.length === 0) {
    return {
      output: 'cat: missing file operand',
      error: true
    };
  }

  return {
    output: `Content of ${args[0]} would be displayed here`
  };
};

const executeGitCommand = (args: string[]): CommandResult => {
  const subcommand = args[0];

  switch (subcommand) {
    case 'status':
      return {
        output: [
          'On branch main',
          'Your branch is up to date with \'origin/main\'.',
          '',
          'Changes not staged for commit:',
          '  (use "git add <file>..." to update what will be committed)',
          '  (use "git checkout -- <file>..." to discard changes in working directory)',
          '',
          '        modified:   src/components/Terminal/Terminal.tsx',
          '        modified:   src/hooks/useTerminal.ts',
          '',
          'Untracked files:',
          '  (use "git add <file>..." to include in what will be committed)',
          '',
          '        src/utils/terminalCommands.ts',
          '        src/types/terminal.ts',
          '',
          'no changes added to commit (use "git add" or "git commit -a")'
        ]
      };

    case 'log':
      return {
        output: [
          'commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0 (HEAD -> main)',
          'Author: Kiran Garud <kgarud95@gmail.com>',
          'Date:   Mon Jan 15 10:30:00 2025 +0000',
          '',
          '    feat: Add interactive terminal component',
          '',
          'commit b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1',
          'Author: Kiran Garud <kgarud95@gmail.com>',
          'Date:   Sun Jan 14 15:45:00 2025 +0000',
          '',
          '    refactor: Improve sidebar navigation'
        ]
      };

    case 'init':
      return {
        output: 'Initialized empty Git repository in ' + process.cwd() + '/.git/'
      };

    case 'clone':
      return {
        output: [
          'Cloning into \'repository\'...',
          'remote: Enumerating objects: 1234, done.',
          'remote: Counting objects: 100% (1234/1234), done.',
          'remote: Compressing objects: 100% (567/567), done.',
          'remote: Total 1234 (delta 890), reused 1100 (delta 667)',
          'Receiving objects: 100% (1234/1234), 2.5 MiB | 1.2 MiB/s, done.',
          'Resolving deltas: 100% (890/890), done.'
        ]
      };

    default:
      return {
        output: `git: '${subcommand}' is not a git command. See 'git --help'.`,
        error: true
      };
  }
};

const executeDockerCommand = (args: string[]): CommandResult => {
  const subcommand = args[0];

  switch (subcommand) {
    case 'ps':
      return {
        output: [
          'CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                    NAMES',
          'a1b2c3d4e5f6   nginx:latest   "/docker-entrypoint.…"   2 hours ago     Up 2 hours     0.0.0.0:80->80/tcp      web-server',
          'b2c3d4e5f6g7   redis:alpine   "docker-entrypoint.s…"   3 hours ago     Up 3 hours     0.0.0.0:6379->6379/tcp  redis-cache',
          'c3d4e5f6g7h8   postgres:13    "docker-entrypoint.s…"   1 day ago      Up 1 day       0.0.0.0:5432->5432/tcp  database'
        ]
      };

    case 'images':
      return {
        output: [
          'REPOSITORY    TAG       IMAGE ID       CREATED        SIZE',
          'nginx         latest    a1b2c3d4e5f6   2 weeks ago    133MB',
          'redis         alpine    b2c3d4e5f6g7   3 weeks ago    32.3MB',
          'postgres      13        c3d4e5f6g7h8   1 month ago    314MB',
          'node          18-alpine d4e5f6g7h8i9   2 months ago   110MB'
        ]
      };

    case 'build':
      return {
        output: [
          'Sending build context to Docker daemon  2.048kB',
          'Step 1/5 : FROM node:18-alpine',
          ' ---> d4e5f6g7h8i9',
          'Step 2/5 : WORKDIR /app',
          ' ---> Running in e5f6g7h8i9j0',
          ' ---> f6g7h8i9j0k1',
          'Step 3/5 : COPY package*.json ./',
          ' ---> g7h8i9j0k1l2',
          'Successfully built g7h8i9j0k1l2',
          'Successfully tagged myapp:latest'
        ]
      };

    case 'run':
      return {
        output: 'Container started successfully'
      };

    default:
      return {
        output: `docker: '${subcommand}' is not a docker command.`,
        error: true
      };
  }
};

const executeKubectlCommand = (args: string[]): CommandResult => {
  const subcommand = args[0];
  const resource = args[1];

  if (subcommand === 'get') {
    switch (resource) {
      case 'pods':
        return {
          output: [
            'NAME                                READY   STATUS    RESTARTS   AGE',
            'web-deployment-7d4b8c9f5d-abc123   1/1     Running   0          2d',
            'web-deployment-7d4b8c9f5d-def456   1/1     Running   0          2d',
            'redis-deployment-6c8d9e7f2a-ghi789 1/1     Running   1          3d',
            'postgres-deployment-5b7c8d6e1f-jkl  1/1     Running   0          5d'
          ]
        };

      case 'nodes':
        return {
          output: [
            'NAME           STATUS   ROLES                  AGE   VERSION',
            'master-node    Ready    control-plane,master   10d   v1.28.0',
            'worker-node-1  Ready    <none>                 10d   v1.28.0',
            'worker-node-2  Ready    <none>                 10d   v1.28.0'
          ]
        };

      case 'services':
        return {
          output: [
            'NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE',
            'kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP        10d',
            'web-service  NodePort    10.96.123.45    <none>        80:30080/TCP   2d',
            'redis-svc    ClusterIP   10.96.234.56    <none>        6379/TCP       3d'
          ]
        };

      default:
        return {
          output: `error: the server doesn't have a resource type "${resource}"`,
          error: true
        };
    }
  }

  return {
    output: `kubectl: command '${subcommand}' not implemented in demo`,
    error: true
  };
};

const executeTerraformCommand = (args: string[]): CommandResult => {
  const subcommand = args[0];

  switch (subcommand) {
    case 'init':
      return {
        output: [
          'Initializing the backend...',
          '',
          'Initializing provider plugins...',
          '- Finding hashicorp/aws versions matching "~> 5.0"...',
          '- Installing hashicorp/aws v5.31.0...',
          '- Installed hashicorp/aws v5.31.0 (signed by HashiCorp)',
          '',
          'Terraform has been successfully initialized!',
          '',
          'You may now begin working with Terraform. Try running "terraform plan" to see',
          'any changes that are required for your infrastructure.'
        ]
      };

    case 'plan':
      return {
        output: [
          'Terraform used the selected providers to generate the following execution plan.',
          'Resource actions are indicated with the following symbols:',
          '  + create',
          '',
          'Terraform will perform the following actions:',
          '',
          '  # aws_instance.web will be created',
          '  + resource "aws_instance" "web" {',
          '      + ami                    = "ami-0c02fb55956c7d316"',
          '      + instance_type          = "t3.micro"',
          '      + key_name               = "my-key"',
          '      + vpc_security_group_ids = (known after apply)',
          '    }',
          '',
          'Plan: 1 to add, 0 to change, 0 to destroy.'
        ]
      };

    case 'apply':
      return {
        output: [
          'Terraform will perform the following actions:',
          '',
          '  # aws_instance.web will be created',
          '  + resource "aws_instance" "web" {',
          '      + ami           = "ami-0c02fb55956c7d316"',
          '      + instance_type = "t3.micro"',
          '    }',
          '',
          'Plan: 1 to add, 0 to change, 0 to destroy.',
          '',
          'aws_instance.web: Creating...',
          'aws_instance.web: Still creating... [10s elapsed]',
          'aws_instance.web: Creation complete after 15s [id=i-0123456789abcdef0]',
          '',
          'Apply complete! Resources: 1 added, 0 changed, 0 destroyed.'
        ]
      };

    case 'destroy':
      return {
        output: [
          'Terraform will perform the following actions:',
          '',
          '  # aws_instance.web will be destroyed',
          '  - resource "aws_instance" "web" {',
          '      - ami           = "ami-0c02fb55956c7d316" -> null',
          '      - instance_type = "t3.micro" -> null',
          '    }',
          '',
          'Plan: 0 to add, 0 to change, 1 to destroy.',
          '',
          'aws_instance.web: Destroying... [id=i-0123456789abcdef0]',
          'aws_instance.web: Destruction complete after 5s',
          '',
          'Destroy complete! Resources: 1 destroyed.'
        ]
      };

    default:
      return {
        output: `Terraform command '${subcommand}' not implemented in demo`,
        error: true
      };
  }
};

const executeAnsibleCommand = (args: string[]): CommandResult => {
  return {
    output: [
      'ansible [core 2.14.1]',
      '  config file = /etc/ansible/ansible.cfg',
      '  configured module search path = [\'/home/kiran/.ansible/plugins/modules\']',
      '  ansible python module location = /usr/lib/python3/site-packages/ansible',
      '  ansible collection location = /home/kiran/.ansible/collections',
      '  executable location = /usr/bin/ansible',
      '  python version = 3.11.0'
    ]
  };
};

const executeJenkinsCommand = (args: string[]): CommandResult => {
  return {
    output: [
      'Jenkins CLI 2.414.1',
      'Usage: jenkins-cli [options...] command [args...]',
      'Options:',
      ' -s URL               : the server URL (defaults to the JENKINS_URL env var)',
      ' -webSocket           : use WebSocket transport',
      '',
      'Available commands:',
      '  build                : Build a job',
      '  list-jobs            : List all jobs',
      '  console              : Retrieves console output of a build'
    ]
  };
};

const executeTopCommand = (): CommandResult => {
  return {
    output: [
      'top - 10:30:15 up 42 days, 13:37,  2 users,  load average: 0.15, 0.25, 0.30',
      'Tasks: 245 total,   1 running, 244 sleeping,   0 stopped,   0 zombie',
      '%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.1 id,  0.4 wa,  0.0 hi,  0.0 si,  0.0 st',
      'MiB Mem :  16384.0 total,   8192.0 free,   4096.0 used,   4096.0 buff/cache',
      'MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.  11264.0 avail Mem',
      '',
      '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
      ' 1234 kiran     20   0 2048576 512000  64000 S   5.3   3.1   1:23.45 node',
      ' 5678 kiran     20   0 1024000 256000  32000 S   2.1   1.6   0:45.67 docker',
      ' 9012 kiran     20   0  512000 128000  16000 S   1.2   0.8   0:12.34 kubectl'
    ]
  };
};

const executePsCommand = (): CommandResult => {
  return {
    output: [
      '  PID TTY          TIME CMD',
      ' 1234 pts/0    00:01:23 zsh',
      ' 5678 pts/0    00:00:45 node',
      ' 9012 pts/0    00:00:12 docker',
      '3456 pts/0    00:00:05 kubectl'
    ]
  };
};
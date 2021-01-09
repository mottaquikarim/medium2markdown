# Medium to Markdown generator.

This docker image will download a medium blog post and convert it to markdown format. Inspiration for this project came from [here](https://towardsdatascience.com/converting-medium-posts-to-markdown-for-your-blog-5d6830408467), a helpful blog post that I essentially used as starter code, wrapping a simple CLI interface and docker image around the core idea.

# Usage

Mount your current working directory to the container. Simplest invocation is:

Run the image from dockerhub:

```bash
➜  medium2markdown docker run -v ${PWD}:/app medium2markdown:dev -m [MEDIUM_URL] -o [PATH_TO_FILE]
```

Example:

```bash
➜  medium2markdown docker run -it -v ${PWD}:/app medium2markdown:dev \
>       -m https://medium.com/math-musings/why-does-25-25-2-2-1-100-25-an-explanation-6c7e7b283d41 \
>       -o why-does-25-25-2-2-1-100-25-an-explanation.md
➜  medium2markdown ls -ahl | grep .md
-rw-r--r--@   1 tkarim  staff   1.9K Jan  9 01:22 README.md
-rw-r--r--    1 tkarim  staff   8.7K Jan  9 01:23 why-does-25-25-2-2-1-100-25-an-explanation.md
➜  medium2markdown
```

Help:

```bash
➜  medium2markdown docker run -v ${PWD}:/app medium2markdown:dev -h

usage: main.js [-h] [-v] [-medium url/to/your/post] [-o /path/to/output/file]

Download Medium blog post and convert it to markdown.

arguments:
  -h, --help                          show this help message and exit
  -m, --medium url/to/your/post       your blog post url
  -o, --output /path/to/output/file   file path for the markdown content

➜  medium2markdown
```


# Build your own

```bash
➜  medium2markdown make build
docker build --build-arg NODE_VERSION=15 -t medium2markdown:dev .
Sending build context to Docker daemon  17.91MB
Step 1/9 : ARG NODE_VERSION
Step 2/9 : FROM node:$NODE_VERSION-alpine
 ---> 6a9367b2c744
Step 3/9 : WORKDIR /app
 ---> Using cache
 ---> 97d622e95282
Step 4/9 : COPY main.js .
 ---> 437c94fb8ed5
Step 5/9 : COPY package.json .
 ---> 4fb3514193b8
Step 6/9 : COPY package-lock.json .
 ---> e82b8e705c17
Step 7/9 : RUN chmod +x main.js
 ---> Running in f20582d2ac30
Removing intermediate container f20582d2ac30
 ---> 56e88720f5d9
Step 8/9 : RUN npm install --save
 ---> Running in 0571d5b4bd8f
npm WARN deprecated request-promise-native@1.0.9: request-promise-native has been deprecated because it extends the now deprecated request package, see https://github.com/request/request/issues/3142
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated left-pad@1.3.0: use String.prototype.padStart()
npm WARN deprecated cheerio-select-tmp@0.1.1: Use cheerio-select instead
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 112 packages, and audited 113 packages in 4s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice
npm notice New minor version of npm available! 7.3.0 -> 7.4.0
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v7.4.0>
npm notice Run `npm install -g npm@7.4.0` to update!
npm notice
Removing intermediate container 0571d5b4bd8f
 ---> d48253fc6a35
Step 9/9 : ENTRYPOINT ["node", "/app/main.js"]
 ---> Running in 00a9fa9fca41
Removing intermediate container 00a9fa9fca41
 ---> 3656e0737d84
Successfully built 3656e0737d84
Successfully tagged medium2markdown:dev
➜  medium2markdown
```

* `NODE_VERSION` defaults to latest, can be set to anything.
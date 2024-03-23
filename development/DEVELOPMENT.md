## Local Development Setup

Create a `.env` file in the root of the project with the following contents:

```txt

```

## Server API Testing

```console
$ pipenv install
$ pipenv run python ./server/app.py
```

Use python or python3 according to your setup. Test server API at `http://127.0.0.1:3000/api/v1/<endpoint>`

## React/Flask Production Build

```console
$ npm run build --prefix client
$ pipenv install && pipenv shell
$ gunicorn --chdir server app:app
```

Visit [http://localhost:8000](http://localhost:8000) in the browser.

## Render Build Process

"Build Command" should be set to the following:

```console
$ npm install --prefix client && npm run build --prefix client && pipenv install
```

"Start Command" should be set to the following:

```console
$ gunicorn --chdir server app:app
```

"Environment Variables" should be set to the following:

```txt

```

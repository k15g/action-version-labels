build:
	@rm -rf dist
	@cp -r src/resources dist
	@cp LICENSE package.json dist/
	@npm install --only=prod --prefix ./dist
	@npx tsc
	@rm dist/package.json dist/package-lock.json dist/*.test.js

test:
	@npx tsc
	@npx jest dist

run:
	@node dist/index.js

watch:
	@npx tsc --watch

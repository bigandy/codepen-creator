MODULES = ./node_modules/.bin
SRC_BASE = src/demos

# target that checks for pen to be set
checkForPen:
ifndef PEN
	$(error PEN not set!!!)
endif


serve: checkForPen ## sets up vite local static server with livereload
	cd $(SRC_BASE)/$(PEN) && npx @11ty/eleventy --serve --config=../../eleventy.config.mjs --port=1980

develop: checkForPen openUrl ## run development task for given PEN "make develop PEN=A"
	 make serve

openUrl:
	open http://localhost:1980

create: checkForPen ## creates new source for pens by passing PEN variable
	cp -r boilerplate $(SRC_BASE)/$(PEN)

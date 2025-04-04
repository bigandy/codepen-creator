MODULES = ./node_modules/.bin
SRC_BASE = src/demos

# target that checks for pen to be set
checkForPen:
ifndef PEN
	$(error PEN not set!!!)
endif

serve: checkForPen ## sets up vite local static server with livereload
	cd $(SRC_BASE)/$(PEN) && npx @11ty/eleventy --watch --serve --config=../../eleventy.config.mjs

develop: checkForPen ## run development task for given PEN "make develop PEN=A"
	make serve

create: checkForPen ## creates new source for pens by passing PEN variable
	mkdir -pv $(SRC_BASE)/$(PEN)
	cp -r boilerplate $(SRC_BASE)/$(PEN) .
	cd $(SRC_BASE)/$(PEN) && echo '{ "title": "$(PEN)" }' > $(SRC_BASE)/$(PEN)/index.json
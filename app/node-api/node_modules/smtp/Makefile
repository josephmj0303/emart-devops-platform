doc: doc/node-smtp.3 doc/api.html doc/index.html

doc/api.html: doc/api.markdown doc/api_header.html doc/api_footer.html
	node tools/ronnjs/bin/ronn.js --fragment doc/api.markdown \
	| sed "s/<h2>\(.*\)<\/h2>/<h2 id=\"\1\">\1<\/h2>/g" \
	| cat doc/api_header.html - doc/api_footer.html > $@

doc/node-smtp.3: doc/api.markdown
	node tools/ronnjs/bin/ronn.js --roff --manual 3 doc/api.markdown > $@
